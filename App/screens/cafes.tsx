import React, { Component } from 'react'
import { View, FlatList, ListRenderItemInfo } from 'react-native'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'
import { ICafeSession } from '@textile/react-native-sdk'

import { cafesSelectors } from '../features/cafes'
import { Item, TextileHeaderButtons } from '../Components/HeaderButtons'
import ListItem from '../Components/ListItem'
import RowSeparator from '../Components/RowSeparator'
import { RootState } from '../Redux/Types'

interface StateProps {
  readonly sessions: ReadonlyArray<ICafeSession>
}

type Props = StateProps & NavigationScreenProps

class Cafes extends Component<Props> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    const goBack = () => navigation.goBack()
    const headerLeft = (
      <TextileHeaderButtons left={true}>
        <Item title="Back" onPress={goBack} iconName="arrow-left" />
      </TextileHeaderButtons>
    )
    return {
      headerLeft,
      headerTitle: 'Registered Bots'
    }
  }

  showCafeSession = (cafeSession: ICafeSession) => {
    return () =>
      this.props.navigation.navigate('CafeSession', {
        cafeSessionId: cafeSession.id
      })
  }

  keyExtractor = (cafeSession: ICafeSession) => cafeSession.id

  renderRow = ({ item }: ListRenderItemInfo<ICafeSession>) => {
    const re = /\-/gi // eslint-disable-line
    const title = (item.cafe.url as string)
      .split('//')
      .reverse()[0]
      .split('.')[0]
      .replace(re, ' ') as string
    return (
      <ListItem
        title={title}
        subtitle={'Storage Bot'}
        onPress={this.showCafeSession(item)}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.sessions}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderRow}
          ItemSeparatorComponent={RowSeparator}
        />
      </View>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {
    sessions: cafesSelectors.sessions(state.cafes)
  }
}

export default connect(
  mapStateToProps,
  undefined
)(Cafes)
