import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

import { RootState } from '../Redux/Types'

interface Props extends NavigationScreenProps<{}> {
  onboarded: boolean
}

class OnboardingCheck extends React.Component<Props> {
  
  constructor (props: Props) {
    super(props)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(this.props.onboarded ? 'PhotosNavigation' : 'OnboardingNavigation')
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator />
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {onboarded: state.preferences.onboarded}
}

export default connect(mapStateToProps, undefined)(OnboardingCheck)
