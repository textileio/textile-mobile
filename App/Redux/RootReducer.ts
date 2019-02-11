import { combineReducers } from 'redux'

import { reducer as accountReducer } from './AccountRedux'
import { reducer as authReducer } from './AuthRedux'
import { reducer as cameraRollReducer } from './CameraRollRedux'
import { reducer as contactsReducer } from './ContactsRedux'
import { reducer as photoViewingReducer } from './PhotoViewingRedux'
import { reducer as prefrencesReducer } from './PreferencesRedux'
import { reducer as notificationsReducer } from './NotificationsRedux'
import { reducer as threadsReducer } from './ThreadsRedux'
import { reducer as uiReducer } from './UIRedux'
import { reducer as uploadingImagesReducer } from './UploadingImagesRedux'
import { reducer as processingImagesReducer } from './ProcessingImagesRedux'
import { reducer as storageReducer } from './StorageRedux'
import { reducer as startupReducer } from './StartupRedux'
import { reducer as deviceLogsReducer } from './DeviceLogsRedux'
import { reducer as migrationReducer } from './MigrationRedux'
import { reducer as textileEventsReducer } from './TextileEventsRedux'
import { reducer as groupsReducer } from './GroupsRedux'

export default combineReducers({
  auth: authReducer,
  cameraRoll: cameraRollReducer,
  contacts: contactsReducer,
  photoViewing: photoViewingReducer,
  preferences: prefrencesReducer,
  notifications: notificationsReducer,
  threads: threadsReducer,
  ui: uiReducer,
  uploadingImages: uploadingImagesReducer,
  processingImages: processingImagesReducer,
  storage: storageReducer,
  startup: startupReducer,
  deviceLogs: deviceLogsReducer,
  migration: migrationReducer,
  account: accountReducer,
  textile: textileEventsReducer,
  groups: groupsReducer
})
