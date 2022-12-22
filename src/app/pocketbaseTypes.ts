export interface PocketbaseResponse {
  code: number;
}

export interface Message {
  collectionId: string,
  collectionName: string,
  created: string,
  expand: Expand,
  id: string,
  text: string,
  updated: string,
  user: string
}

export interface Expand {
  user: User
}

export interface User {
  avatar: string,
  collectionId: string,
  collectionName: string,
  created: string,
  email: string,
  emailVisibility: Boolean,
  id: string,
  name: string,
  updated: string,
  username: string,
  verified: boolean
}
