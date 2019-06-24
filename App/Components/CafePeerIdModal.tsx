import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle
} from 'react-native'
import Modal from 'react-native-modal'

import Input from '../SB/components/Input'

import { color, fontFamily, fontSize, spacing, size } from '../styles'

const ModalView: ViewStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  padding: 0,
  margin: 0
}

const Container: ViewStyle = {
  flex: 1,
  backgroundColor: color.screen_primary,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch'
}

const Header: TextStyle = {
  textAlign: 'center',
  fontFamily: fontFamily.bold,
  fontSize: fontSize._24,
  paddingVertical: spacing._024
}

const InputContainer: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: spacing._024,
  paddingBottom: spacing._024
}

const PeerIdInput: ViewStyle = {
  height: size._048
}

const Buttons: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingTop: spacing._024
}

const CancelButton: TextStyle = {
  fontFamily: fontFamily.regular,
  color: color.grey_3
}

const SubmitButton: TextStyle = {
  fontFamily: fontFamily.regular,
  color: color.brandBlue
}

const DisabledButton: TextStyle = {
  color: color.grey_4
}

interface OwnProps {
  isVisible: boolean
  complete: (peerId: string) => void
  close: () => void
}

type Props = OwnProps

interface State {
  peerId: string
}

export default class CafePeerIdModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      peerId: ''
    }
  }

  render() {
    const inputIsBlank = this.state.peerId === ''
    return (
      <Modal
        isVisible={this.props.isVisible}
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
        avoidKeyboard={true}
        backdropOpacity={0.5}
        style={{ margin: 0, padding: 0 }}
      >
        <KeyboardAvoidingView behavior="height" style={ModalView}>
          <View style={Container}>
            <Text style={Header}>Search for a Cafe by Peer ID</Text>
            <View style={InputContainer}>
              <Input
                style={PeerIdInput}
                value={this.state.peerId}
                label={inputIsBlank ? 'Enter Peer ID...' : ''}
                onChangeText={this.handleNewPeerId}
              />
            </View>
            <View style={Buttons}>
              <TouchableOpacity onPress={this.props.close}>
                <Text style={CancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={inputIsBlank}
                onPress={() => this.props.complete}
              >
                <Text style={[SubmitButton, inputIsBlank && DisabledButton]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    )
  }

  handleNewPeerId = (peerId: string) => {
    this.setState({
      peerId
    })
  }
}
