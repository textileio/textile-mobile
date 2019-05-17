/*
Container to rename a group.

URL: "RenameGroup"
Parameters:
- threadId: the ID of the group to be renamed

When the user submits a new name or presses back, they are taken back to the
group screen.
*/

import React from 'react'
import { connect } from 'react-redux'

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { NavigationScreenProps } from 'react-navigation'

import { TextileHeaderButtons, Item as TextileHeaderButtonsItem } from '../Components/HeaderButtons'
import Button from '../Components/LargeButton'
import Input from '../SB/components/Input'

import { RootState, RootAction } from '../Redux/Types'
import { groupActions } from '../features/groups'

import styles from './Styles/RenameGroup'
import { color } from '../styles'

interface NavProps {
  threadId: string
  groupName: string
}

interface StateProps {
  groupName: string
  adding: boolean
}

interface DispatchProps {
  rename: (newName: string) => void
}

type Props = StateProps & DispatchProps & NavigationScreenProps<NavProps>

interface State {
  newName: string
}

class RenameGroup extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: NavigationScreenProps<NavProps>) => {
    const groupName = navigation.getParam('groupName')
    const back = () => navigation.goBack()
    const headerLeft = (
      <TextileHeaderButtons left={true}>
        <TextileHeaderButtonsItem title='Back' iconName='arrow-left' onPress={back} />
      </TextileHeaderButtons>
    )
    return {
      headerLeft,
      headerTitle: `Rename ${groupName}`
    }
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      newName: props.navigation.getParam('groupName')
    }
  }

  render() {
    const groupName = this.props.navigation.getParam('groupName')
    return (
      <View style={styles.container}>
        <Input
          style={styles.inputStyle}
          value={this.state.newName}
          label={this.state.newName === '' ? 'Change the group name' : ''}
          onChangeText={this.handleNewText}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          disabled={this.props.adding}
          onPress={this.rename}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Rename</Text>
        </TouchableOpacity>
      </View>
    )
  }

  handleNewText = (text: string) => {
    this.setState({
      newName: text
    })
  }

  rename = () => {
    this.props.rename(this.state.newName)
  }
}

const mapStateToProps = (state: RootState, ownProps: NavigationScreenProps<NavProps>): StateProps => {
  const threadId = ownProps.navigation.getParam('threadId')
  const threadData = state.photoViewing.threads[threadId]
  const groupName = threadData ? threadData.name : 'Unknown'
  const adding = Object.keys(state.group.renameGroup).indexOf(threadId) > -1
  return {
    groupName,
    adding
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, ownProps: NavigationScreenProps<NavProps>) : DispatchProps => {
  return {
    rename: (newName: string) => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenameGroup)