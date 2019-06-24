import React, { Component } from 'react'
import { SafeAreaView, Text, ViewStyle, TextStyle, Alert } from 'react-native'
import { connect } from 'react-redux'

import CafesList from '../Components/CafesList'
import Button from '../Components/LargeButton'
import CafeListHeader from '../Components/CafeListHeader'
import CafePeerIdModal from '../Components/CafePeerIdModal'

import { color, fontFamily, fontSize, spacing } from '../styles'

const Container: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flex: 1
}

const Header: TextStyle = {
  fontFamily: fontFamily.bold,
  textAlign: 'center',
  fontSize: fontSize._36,
  color: color.grey_0,
  marginTop: spacing._024,
  marginBottom: spacing._016
}

const Subheader: TextStyle = {
  fontFamily: fontFamily.regular,
  fontSize: fontSize._20,
  paddingHorizontal: spacing._024,
  marginBottom: spacing._016
}

const SubmitButton: ViewStyle = {
  marginTop: spacing._016
}

interface OwnProps {
  onSuccess: () => void
}

type Props = OwnProps

interface State {
  selected: string
  peerIdModalIsVisible: boolean
}

class ChooseCafe extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selected: '',
      peerIdModalIsVisible: false
    }
  }

  onSelect = (peerId: string) => {
    // If already selected, deselect it
    this.setState(prevState => {
      return {
        selected: prevState.selected === peerId ? '' : peerId
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={Container}>
        <Text style={Header}>Choose a Cafe</Text>
        <Text style={Subheader}>
          Cafes are trustless, always-on nodes that assist the peer network.
          Don&apos;t select a cafe to proceed without registering with one.
        </Text>
        <CafesList
          selected={this.state.selected}
          onSelect={this.onSelect}
          ListHeaderComponent={
            <CafeListHeader onPress={this.togglePeerIdModal} />
          }
        />
        <Button
          text="Submit"
          onPress={this.onButtonPress}
          style={SubmitButton}
        />
        <CafePeerIdModal
          isVisible={this.state.peerIdModalIsVisible}
          complete={this.registerByPeerId}
          close={this.togglePeerIdModal}
        />
      </SafeAreaView>
    )
  }

  onButtonPress = () => {
    if (this.state.selected === '') {
      Alert.alert(
        'Are you sure?',
        'Do you want to proceed without registering with a cafe?',
        [
          {
            text: 'Go back',
            style: 'cancel'
          },
          {
            text: 'Continue',
            onPress: () => this.props.onSuccess()
          }
        ]
      )
    } else {
      this.props.onSuccess()
    }
  }

  registerByPeerId = (peerId: string) => {
    this.setState({
      selected: peerId
    })
    this.togglePeerIdModal()
  }

  togglePeerIdModal = () => {
    this.setState(prevState => {
      return {
        peerIdModalIsVisible: !prevState.peerIdModalIsVisible
      }
    })
  }
}

export default connect(
  undefined,
  undefined
)(ChooseCafe)
