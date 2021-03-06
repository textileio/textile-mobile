import { IContact } from '@textile/react-native-sdk'
import Contacts from 'react-native-contacts'

export interface AddingContact {
  readonly error?: string
}

export interface AddingContacts {
  readonly [key: string]: AddingContact
}

export interface RemovingContact {
  readonly error?: string
}

export interface RemovingContacts {
  readonly [key: string]: RemovingContact
}

interface ContactSearchEvent {
  type: 'contact'
  contact: IContact
}

interface ErrorSearchEvent {
  type: 'error'
  error: any
}

export type SearchEvent = ContactSearchEvent | ErrorSearchEvent

export interface ContactSearchResult {
  readonly key: string
  readonly type: 'contact'
  readonly data: IContact
}

export interface TextileSearchResult {
  readonly key: string
  readonly type: 'textile'
  readonly data: {
    contact: IContact
    isContact: boolean
    adding: boolean
  }
}

export interface AddressBookSearchResult {
  readonly key: string
  readonly type: 'addressBook'
  readonly data: Contacts.Contact
}

export interface ErrorSearchResult {
  readonly key: string
  readonly type: 'error'
  readonly data: string
}

export interface LoadingSearchResult {
  readonly key: string
  readonly type: 'loading'
}

export interface EmptySearchResult {
  readonly key: string
  readonly type: 'empty'
}

export type SearchResult =
  | TextileSearchResult
  | AddressBookSearchResult
  | ErrorSearchResult
  | LoadingSearchResult
  | EmptySearchResult
  | ContactSearchResult

export interface SearchResultsSection {
  readonly key: string
  readonly title: string
  readonly data: SearchResult[]
}
