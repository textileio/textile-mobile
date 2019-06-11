import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { IContact, Thread } from '@textile/react-native-sdk'

// Components
import Avatar from '../Components/Avatar'
import Button from '../Components/LargeButton'
import PhotoWithTextBox from '../SB/components/PhotoWithTextBox'
import { TextileHeaderButtons, Item } from '../Components/HeaderButtons'
import CreateThreadModal from '../Components/CreateThreadModal'

// Styles
import styles from '../Components/Styles/ContactModal'
import { color, spacing, fontFamily, fontSize } from '../styles'

// Redux
import { RootState, RootAction } from '../Redux/Types'
import PhotoViewingActions, {
  ThreadThumbs,
  ThreadData
} from '../Redux/PhotoViewingRedux'
import {
  getThreadThumbs,
  getDirectMessageThread
} from '../Redux/PhotoViewingSelectors'
import { contactsActions } from '../features/contacts'
import { cafes } from '../features/contacts/selectors'

const buttons: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}

const addOrRemoveButton: ViewStyle = {
  marginRight: spacing._012
}

const cafesList: ViewStyle = {
  width: '100%',
  flex: 0,
  paddingHorizontal: spacing._016,
  paddingTop: spacing._024
}

const cafesHeader: TextStyle = {
  fontFamily: fontFamily.bold,
  fontSize: fontSize._16,
  marginBottom: spacing._012
}

const cafesTitle: TextStyle = {
  fontFamily: fontFamily.regular,
  fontSize: fontSize._14,
  marginBottom: spacing._012
}

interface NavProps {
  contact: IContact
}

interface StateProps {
  threadThumbs: ReadonlyArray<ThreadThumbs>
  isContact: boolean
  removing: boolean
  adding: boolean
  directMessageThread: ThreadData | undefined
}

interface DispatchProps {
  removeContact: () => void
  addContact: () => void
  createDirectMessageThread: () => void
}

type Props = StateProps & DispatchProps & NavigationScreenProps<NavProps>

interface State {
  showCreateGroupModal: boolean
}

class ContactModal extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: NavigationScreenProps<NavProps>) => {
    const back = () => navigation.goBack()
    const headerLeft = (
      <TextileHeaderButtons left={true}>
        <Item title="Back" iconName="arrow-left" onPress={back} />
      </TextileHeaderButtons>
    )
    return {
      headerLeft,
      headerTitle: 'Contact Details'
    }
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      showCreateGroupModal: false
    }
  }

  navigateToThread(id: string) {
    return () => {
      this.props.navigation.navigate('ViewThread', { threadId: id })
    }
  }

  render() {
    const contact = this.props.navigation.getParam('contact')
    const { name, address, avatar } = contact
    const removingText = this.props.removing ? 'Removing' : 'Remove'
    const addingText = this.props.adding ? 'Adding' : 'Add'
    const buttonText = this.props.isContact ? removingText : addingText
    const buttonDisabled = this.props.adding || this.props.removing
    const displayName = name ? name : address.substring(0, 12)
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Avatar
            style={{ width: 72, height: 72, backgroundColor: color.grey_5 }}
            target={avatar}
          />
          <Text style={styles.username}>{displayName}</Text>
          <View style={buttons}>
            <Button
              text={buttonText}
              style={{
                ...addOrRemoveButton,
                backgroundColor: this.props.isContact
                  ? color.severe_3
                  : color.action_3
              }}
              disabled={buttonDisabled}
              onPress={this.props.isContact ? this.onRemove : this.onAdd}
            />
            <Button
              text={'Send Message'}
              onPress={this.createOrNavigateToDirectMessageThread}
            />
          </View>
        </View>
        <ScrollView style={styles.threadsList}>
          <Text style={styles.threadsTitle}>
            {this.props.threadThumbs.length > 0
              ? 'Sharing in Groups:'
              : 'Not part of any shared groups'}
          </Text>
          {this.props.threadThumbs.map((thread, i) => (
            <TouchableOpacity
              key={i}
              onPress={this.navigateToThread(thread.id)}
            >
              <PhotoWithTextBox
                key={i}
                text={thread.name}
                photo={thread.thumb}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView style={cafesList}>
          <Text style={cafesHeader}>Registered With the Following Cafes:</Text>
          {cafes(contact).map((cafe, i) => (
            <Text key={i} style={cafesTitle}>
              {cafe.address}
            </Text>
          ))}
        </ScrollView>
        <CreateThreadModal
          isVisible={this.state.showCreateGroupModal}
          fullScreen={false}
          selectToShare={false}
          navigateTo={true}
          invites={[address]}
          cancel={this.cancelCreateThread}
          complete={this.completeCreateThread}
        />
      </View>
    )
  }

  onRemove = () => {
    this.props.removeContact()
  }

  onAdd = () => {
    this.props.addContact()
  }

  cancelCreateThread = () => {
    this.setState({
      showCreateGroupModal: false
    })
  }

  completeCreateThread = () => {
    this.setState({
      showCreateGroupModal: false
    })
  }

  createOrNavigateToDirectMessageThread = () => {
    if (this.props.directMessageThread) {
      // Navigate to direct message thread
      const { id, name } = this.props.directMessageThread
      this.props.navigation.navigate('ViewThread', {
        threadId: id,
        groupName: name
      })
    } else {
      this.props.createDirectMessageThread()
    }
  }
}

const mapStateToProps = (
  state: RootState,
  ownProps: NavigationScreenProps<NavProps>
): StateProps => {
  const contact = ownProps.navigation.getParam('contact')
  const address = contact.address
  // Check if this contact is already added
  const isContact = state.contacts.contacts.some(c => c.address === address)
  // Check if this contact is currently being removed
  const removing =
    Object.keys(state.contacts.removingContacts).indexOf(address) > -1
  // Check if this contact is currently being added
  const adding =
    Object.keys(state.contacts.addingContacts).indexOf(address) > -1
  const directMessageThread = getDirectMessageThread(state, address)
  return {
    threadThumbs: getThreadThumbs(state, address, 'name'),
    isContact,
    removing,
    adding,
    directMessageThread
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>,
  ownProps: NavigationScreenProps<NavProps>
): DispatchProps => {
  const contact = ownProps.navigation.getParam('contact')
  const { address, name } = contact
  const threadConfig = {
    name,
    whitelist: [address],
    type: Thread.Type.OPEN,
    sharing: Thread.Sharing.NOT_SHARED
  }
  return {
    removeContact: () =>
      dispatch(contactsActions.removeContact.request(address)),
    addContact: () => dispatch(contactsActions.addContactRequest(contact)),
    createDirectMessageThread: () =>
      dispatch(
        PhotoViewingActions.addThreadRequest(threadConfig, { navigate: true })
      )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactModal)
