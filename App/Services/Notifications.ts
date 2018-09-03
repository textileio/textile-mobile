import PushNotification from 'react-native-push-notification'
import { Notification, NotificationEngagement, NotificationType } from '../Models/TextileTypes'
import { Alert, Platform } from 'react-native'

export interface INotificationsPayload {
  title: string,
  message: string,
  feed: string
  typeString: string,
}

export function isPhoto(notification: Notification): boolean {
  if (!notification.data_id) {
    return false
  }
  switch (notification.type) {
    case NotificationType.receivedInviteNotification:
    case NotificationType.deviceAddedNotification:
    case NotificationType.peerJoinedNotification:
    case NotificationType.peerLeftNotification:
      return false
    case NotificationType.photoAddedNotification:
    case NotificationType.commentAddedNotification:
    case NotificationType.likeAddedNotification:
      return true
  }
}

export function toPayload(notification: Notification): INotificationsPayload | undefined {
  const typeString = NotificationType[notification.type] as string
  const actor = notification.actor_username || 'A peer'

  switch (notification.type) {
    case(NotificationType.receivedInviteNotification): {
      const title = 'New Invite'
      const message =  [actor, notification.body].join(' ')
      const feed = [actor, notification.body, 'to', notification.subject].join(' ')
      return { title, message, feed, typeString }
    }
    case(NotificationType.deviceAddedNotification): {
      const title = 'New Device'
      const message = 'You paired with a new device'
      const feed = message
      return { title, message, feed, typeString }
    }
    case(NotificationType.photoAddedNotification): {
      const title = notification.subject
      const message =  [actor, notification.body].join(' ')
      const feed = [actor, notification.body, 'to', notification.subject].join(' ')
      return { title, message, feed, typeString }
    }
    case(NotificationType.commentAddedNotification): {
      const title =  notification.subject
      const message = [actor, notification.body].join(' ')
      const body = notification.body.split(': ')
      const feed = [actor, body[0], 'in', notification.subject].join(' ')
      return { title, message, feed, typeString }
    }
    case(NotificationType.likeAddedNotification): {
      const title = notification.subject
      const message = [actor, notification.body].join(' ')
      const feed = [actor, notification.body, 'in', notification.subject].join(' ')
      return { title, message, feed, typeString }
    }
    case(NotificationType.peerJoinedNotification): {
      const title = notification.subject
      const message =  [actor, notification.body].join(' ')
      const feed = [actor, notification.body, 'thread', notification.subject].join(' ')
      return { title, message, feed, typeString }
    }
    case(NotificationType.peerLeftNotification): {
      const title = notification.subject
      const message =  [actor, notification.body].join(' ')
      const feed = [actor, notification.body, 'thread', notification.subject].join(' ')
      return { title, message, feed, typeString }
    }
    default: {
      return undefined
    }
  }
}

export function getData(engagement: NotificationEngagement): any {
  if (Platform.OS !== 'ios') {
    const { data } = engagement
    return data
  }
}

export async function createNew(notification: Notification): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      const payload = toPayload(notification)
      if (!payload) {
        return
      }
      PushNotification.localNotification({
        title: payload.title,
        message: `${payload.message}.`,
        /* Android Only Property */
        group: payload.typeString, // (optional) add group to message
        /* iOS Only Property */
        category: payload.typeString, // (optional) default: null
        userInfo: { notification },

        /* Android Only Properties */
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
        smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        // id: '22', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        // ticker: "My Notification Ticker", // (optional)
        // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        // subText: "This is a subText", // (optional) default: none

        /* iOS only properties */
        // alertAction: 'view' // (optional) default: view
        playSound: false,
        vibrate: false
      })
      resolve()
    } catch (error) {
      reject()
    }
  })
}

export async function enable(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      PushNotification.requestPermissions()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export function displayInvitePromise(message: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    Alert.alert(
      'Accept Invite',
      message,
      [
        {
          text: 'Accept',
          onPress: resolve
        },
        {
          text: 'Ignore',
          style: 'cancel',
          onPress: reject
        }
      ],
      { cancelable: false }
    )
  })
}

export async function displayInviteAlert(message: string) {
  await displayInvitePromise(message)
  return true
}
