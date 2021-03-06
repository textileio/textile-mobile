import { Platform, AppState, NativeModules, Linking } from 'react-native'
import { delay } from 'redux-saga'
import {
  call,
  put,
  take,
  takeEvery,
  takeLatest,
  all,
  select
} from 'redux-saga/effects'
import { ActionType, getType } from 'typesafe-actions'

import Textile, {
  Notification,
  INotificationList
} from '@textile/react-native-sdk'
import NavigationService from '../../Services/NavigationService'

import { cafesActions } from '../cafes'
import * as cafeSelectors from '../cafes/selectors'
import { groupActions } from '../group'
import ThreadsActions from '../../Redux/ThreadsRedux'
import { ThreadData } from '../../Redux/GroupsRedux'
import { threadDataByThreadId, allThreadIds } from '../../Redux/GroupsSelectors'
import PhotoViewingActions from '../../Redux/PhotoViewingRedux'
import { PreferencesSelectors, ServiceType } from '../../Redux/PreferencesRedux'

import * as actions from './actions'
import * as selectors from './selectors'
import TextileEventsActions, {
  TextileEventsSelectors
} from '../../Redux/TextileEventsRedux'
import * as NotificationsServices from '../../Services/Notifications'
import { logNewEvent } from '../../Sagas/DeviceLogs'
import { RootState } from '../../Redux/Types'
import { LocalAlertType } from './models'
import VersionNumber from 'react-native-version-number'
import { contactsActions, contactsSelectors } from '../contacts'

export function* waitUntilOnline(ms: number) {
  let ttw = ms
  let online = yield select(TextileEventsSelectors.online)
  while (!online && ttw > 0) {
    yield delay(50)
    online = yield select(TextileEventsSelectors.online)
    ttw -= 50
  }
  return online
}

export function* enable() {
  yield call(NotificationsServices.enable)
}

export function* readAllNotifications(
  action: ActionType<typeof actions.readAllNotificationsRequest>
) {
  try {
    yield call(Textile.notifications.readAll)
  } catch (error) {
    yield put(
      TextileEventsActions.newErrorMessage(
        'readAllNotifications',
        error.message
      )
    )
  }
}

export function* handleNewNotification(
  action: ActionType<typeof actions.newNotificationRequest>
) {
  yield call(logNewEvent, 'Notifications', 'new request')
  try {
    const service = yield select(PreferencesSelectors.service, 'notifications')
    // if No notifications enabled, return
    if (!service || service.status !== true) {
      return
    }
    const { notification } = action.payload
    const type = notification.type

    // if notifications for this type are not enabled, return
    const typeString = NotificationsServices.notificationTypeToString(type)
    const preferences = yield select(
      PreferencesSelectors.service,
      typeString as ServiceType
    )
    if (!preferences || preferences.status !== true) {
      return
    }

    // Ensure we aren't in the foreground (Android only req)
    // const queriedAppState = yield select(TextileNodeSelectors.appState)
    const queriedAppState = AppState.currentState
    if (Platform.OS === 'ios' || queriedAppState.match(/background/)) {
      // fire the notification
      yield call(logNewEvent, 'Notifications', 'creating local')
      yield call(NotificationsServices.createNew, notification)
    } else {
      yield call(logNewEvent, 'Notifications', 'creating local')
    }
  } catch (error) {
    const message = typeof error === 'string' ? error : error.message
    yield call(logNewEvent, 'Notifications', message, true)
  }
}

export function* handleEngagement(
  action: ActionType<typeof actions.notificationEngagement>
) {
  // Deals with the Engagement response from clicking a native notification
  const data: any = action.payload.engagement.data
  try {
    if (!data || !data.hasOwnProperty('notification')) {
      return
    }
    yield call(delay, 350)
    yield put(actions.notificationSuccess(data.notification))
  } catch (error) {
    // Nothing to do
  }
}

function* requestAndNavigateTo(threadId: string, photoBlock?: string) {
  // Cache our thread data in redux
  yield put(groupActions.feed.loadFeedItems.request({ id: threadId }))
  // Select the thread
  yield put(PhotoViewingActions.viewThread(threadId))

  if (photoBlock) {
    // if photo supplied, select and navigate to it
    yield put(PhotoViewingActions.viewPhoto(photoBlock))
    yield call(NavigationService.navigate, 'PhotoScreen')
  } else {
    // if no photo, navigate to the thread only
    yield call(NavigationService.navigate, 'ViewThread', { threadId })
  }
}

export function* notificationView(
  action: ActionType<typeof actions.notificationSuccess>
) {
  // Handles a view request for in App notification clicking or Engagement notification clicking
  // Avoids duplicating the below logic about where to send people for each notification type
  const { notification } = action.payload
  try {
    yield call(Textile.notifications.read, notification.id)
    switch (notification.type) {
      case Notification.Type.LIKE_ADDED:
      case Notification.Type.COMMENT_ADDED: {
        const threadData: ThreadData | undefined = yield select(
          threadDataByThreadId,
          notification.threadId
        )
        if (threadData) {
          // notification.target of a COMMENT_ADDED / LIKE_ADDED is the photo block, so where we want to navigate
          yield call(requestAndNavigateTo, threadData.id, notification.target)
        }
        break
      }
      case Notification.Type.FILES_ADDED: {
        const threadData: ThreadData | undefined = yield select(
          threadDataByThreadId,
          notification.threadId
        )
        if (threadData) {
          // notification.block of a FILES_ADDED is the photo block, so where we want to navigate
          yield call(requestAndNavigateTo, threadData.id, notification.block)
        }
        break
      }
      case Notification.Type.MESSAGE_ADDED:
      case Notification.Type.PEER_JOINED:
      case Notification.Type.PEER_LEFT: {
        const threadData: ThreadData | undefined = yield select(
          threadDataByThreadId,
          notification.threadId
        )
        if (threadData) {
          yield call(requestAndNavigateTo, threadData.id)
        }
        break
      }
      case Notification.Type.INVITE_RECEIVED: {
        yield* waitUntilOnline(1000)
        yield put(actions.reviewNotificationThreadInvite(notification))
        break
      }
    }
  } catch (error) {
    yield put(actions.notificationFailure(notification))
  }
}

export function* refreshNotifications() {
  try {
    const busy: boolean = yield select((state: RootState) =>
      selectors.refreshing(state.updates)
    )
    // skip multi-request back to back
    if (busy) {
      return
    }
    yield* waitUntilOnline(1000)
    yield put(actions.refreshNotificationsStart())
    const notificationResponse: INotificationList = yield call(
      Textile.notifications.list,
      '',
      50
    ) // TODO: offset?
    const appThreadIds = yield select(allThreadIds)
    const typedNotifs = notificationResponse.items
      .map(notificationData =>
        NotificationsServices.toTypedNotification(notificationData)
      )
      .filter(notification => {
        // converts the notification to Any since not all notifications have a threadId
        const { threadId } = notification as any
        if (threadId === undefined) {
          // These are device adds or new thread invites (not easy to know which app yet)
          return true
        } else {
          return appThreadIds.indexOf(threadId) > -1
        }
      })
    yield put(actions.refreshNotificationsSuccess(typedNotifs))
  } catch (error) {
    yield put(
      TextileEventsActions.newErrorMessage(
        'refreshNotifications',
        error.message
      )
    )
    yield put(actions.refreshNotificationsFailure())
  }
}

export function* reviewThreadInvite(
  action: ActionType<typeof actions.reviewNotificationThreadInvite>
) {
  const { notification } = action.payload
  try {
    const payload = NotificationsServices.toPayload(notification)
    if (!payload) {
      return
    }
    yield call(NotificationsServices.displayInviteAlert, payload.message)
    yield put(
      ThreadsActions.acceptInviteRequest(
        notification.id,
        notification.threadName,
        false
      )
    )
  } catch (error) {
    // Ignore invite
  }
}

/**
 * Checks if the user has a storage bot added to their account. If none
 * then it creates a LocalAlert.
 * Run each time the app starts up and finishes checking cafe sessions.
 */
export function* updateCafeAlert() {
  const cafes = yield select((state: RootState) =>
    cafeSelectors.registeredCafes(state.cafes)
  )
  if (cafes.length > 0) {
    yield put(actions.removeAlert(LocalAlertType.NoStorageBot))
  } else {
    yield put(actions.insertAlert(LocalAlertType.NoStorageBot, 5))
  }
}

/**
 * Checks what the latest release is via URL. If the release is newer
 * than the current install, it will create a LocalAlert for the user.
 * Run each time the app starts up and finishes checking cafe sessions.
 */
export function* updateReleasesAlert() {
  // Only supported on iOS right now
  if (Platform.OS !== 'ios') {
    return
  }
  // Compares a semver, returns True of a < b
  function outOfDate(a: string, b: string) {
    let i
    const regExStrip0 = /(\.+)+$/
    const segmentsA = a
      .replace('v', '')
      .replace(regExStrip0, '')
      .split('.')
    const segmentsB = b
      .replace('v', '')
      .replace(regExStrip0, '')
      .split('.')
    const l = Math.min(segmentsA.length, segmentsB.length)
    for (i = 0; i < l; i++) {
      const semA = parseInt(segmentsA[i], 10)
      const semB = parseInt(segmentsB[i], 10)
      if (semA === semB) {
        continue
      } else {
        return semA < semB
      }
    }
    return segmentsA.length < segmentsB.length
  }
  try {
    // Attempt to check latest releasae in the user's region
    const locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
    const iso = locale
      .split('_')
      .reverse()[0]
      .toLowerCase()
    const country = iso && iso.length === 2 ? `&country=${iso}` : ''
    const query = yield call(
      fetch,
      `https://itunes.apple.com/lookup?id=1366428460${country}`
    )
    const result = yield call([query, query.json])
    // Continue only if data returned
    if (result.results && result.results.length > 0) {
      const version = yield call(Textile.version)
      const needUpgrade = outOfDate(version, result.results[0].version)
      // Check app store version against local API version
      if (needUpgrade) {
        yield put(actions.insertAlert(LocalAlertType.UpgradeNeeded, 3))
        return
      } else {
        yield put(actions.removeAlert(LocalAlertType.UpgradeNeeded))
      }
    }
  } catch (err) {
    // Default no alert
    yield put(actions.removeAlert(LocalAlertType.UpgradeNeeded))
  }
}

/**
 * Checks if the user has any contacts. If none, then it will create
 * a LocalAlert for the user.
 * Run each time interface updates the contact list.
 */
export function* updateContactsAlert(
  action: ActionType<typeof contactsActions.getContactsSuccess>
) {
  const { contacts } = action.payload
  if (contacts.length > 0) {
    yield put(actions.removeAlert(LocalAlertType.NoContacts))
  } else {
    yield put(actions.insertAlert(LocalAlertType.NoContacts, 2))
  }
}

function* watchForContactUpdates() {
  const contacts = yield select((state: RootState) => state.contacts.contacts)
  const threads = yield select((state: RootState) => state.groups.threads)
  if (contacts.length > 0 || threads.length > 0) {
    // Don't bother showing it if the user is already creating threads.
    // This is in case they plan to use the app without contacts.
    yield put(actions.removeAlert(LocalAlertType.NoContacts))
  } else {
    yield put(actions.insertAlert(LocalAlertType.NoContacts, 2))
    yield takeLatest(
      getType(contactsActions.getContactsSuccess),
      updateContactsAlert
    )
  }
}

export function* refreshAlerts() {
  yield all([
    updateReleasesAlert(),
    updateCafeAlert(),
    watchForContactUpdates()
  ])
}

export default function*() {
  yield all([
    takeEvery(getType(cafesActions.getCafeSessions.success), refreshAlerts),
    takeEvery(getType(actions.newNotificationRequest), handleNewNotification),
    takeEvery(getType(actions.notificationEngagement), handleEngagement),
    takeEvery(getType(actions.notificationSuccess), notificationView),
    takeEvery(
      getType(actions.refreshNotificationsRequest),
      refreshNotifications
    ),
    takeEvery(
      getType(actions.reviewNotificationThreadInvite),
      reviewThreadInvite
    ),
    takeEvery(
      getType(actions.readAllNotificationsRequest),
      readAllNotifications
    )
  ])
}
