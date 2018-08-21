import { Store } from 'redux'
import { Linking, Platform } from 'react-native'

import UIActions from '../../Redux/UIRedux'
import {RootState} from '../../Redux/Types'

export default class DeepLinkEventHandler {
  store: Store<RootState>

  constructor(store: Store<RootState>) {
    this.store = store
    this.setup()
  }

  _handleIOS (event: any) {
    this._handleUrl(event.url)
    this.store.dispatch(UIActions.routeDeepLinkRequest(event.url))
  }

  _handleUrl (url: string) {
    this.store.dispatch(UIActions.routeDeepLinkRequest(url))
  }

  setup () {
    if (Platform.OS === 'ios') {
      Linking.addEventListener('url', this._handleIOS.bind(this))
    }
    // just uses Android method or iOS when init
    Linking.getInitialURL().then(this._handleUrl.bind(this))
  }

  tearDown () {
    if (Platform.OS !== 'android') {
      Linking.removeEventListener('url', this._handleIOS);
    }
  }
}
