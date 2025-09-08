/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  token: Scalars['String']['output'];
  user: User;
};

export type CreateGroupInput = {
  name: Scalars['String']['input'];
};

export type CreateInformationInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateLocationInput = {
  name: Scalars['String']['input'];
};

export type CreateSceneInput = {
  name: Scalars['String']['input'];
};

export type CreateSportsInput = {
  name: Scalars['String']['input'];
};

export type CreateTeamInput = {
  groupId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  userIds: Array<Scalars['ID']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Group = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  teams: Array<Team>;
  users: Array<User>;
};

export type Information = {
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Location = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type LoginInput = {
  code: Scalars['String']['input'];
  redirectURL: Scalars['String']['input'];
};

export type Mutation = {
  addGroupUsers: Group;
  createGroup: Group;
  createInformation: Information;
  /** 場所を追加する */
  createLocation: Location;
  createScene: Scene;
  createSports: Sport;
  /** チームを作成する */
  createTeam: Team;
  createUser: User;
  deleteGroup: Group;
  deleteInformation: Information;
  /** 場所を削除する */
  deleteLocation: Location;
  deleteScene: Scene;
  deleteSports: Sport;
  /** チームを削除する */
  deleteTeam: Team;
  login: AuthResponse;
  removeGroupUsers: Group;
  updateGroup: Group;
  updateInformation: Information;
  /** 場所の情報を更新する */
  updateLocation: Location;
  updateScene: Scene;
  updateSports: Sport;
  /** チームの情報を更新する */
  updateTeam: Team;
  /** チームメンバーを更新する */
  updateTeamUsers: Team;
};


export type MutationAddGroupUsersArgs = {
  id: Scalars['ID']['input'];
  input: UpdateGroupUsersInput;
};


export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};


export type MutationCreateInformationArgs = {
  input: CreateInformationInput;
};


export type MutationCreateLocationArgs = {
  input: CreateLocationInput;
};


export type MutationCreateSceneArgs = {
  input: CreateSceneInput;
};


export type MutationCreateSportsArgs = {
  input: CreateSportsInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteInformationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSceneArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSportsArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemoveGroupUsersArgs = {
  id: Scalars['ID']['input'];
  input: UpdateGroupUsersInput;
};


export type MutationUpdateGroupArgs = {
  id: Scalars['ID']['input'];
  input: UpdateGroupInput;
};


export type MutationUpdateInformationArgs = {
  id: Scalars['ID']['input'];
  input: UpdateInformationInput;
};


export type MutationUpdateLocationArgs = {
  id: Scalars['ID']['input'];
  input: UpdateLocationInput;
};


export type MutationUpdateSceneArgs = {
  id: Scalars['ID']['input'];
  input: UpdateSceneInput;
};


export type MutationUpdateSportsArgs = {
  id: Scalars['ID']['input'];
  input: UpdateSportsInput;
};


export type MutationUpdateTeamArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTeamInput;
};


export type MutationUpdateTeamUsersArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTeamUsersInput;
};

export type Query = {
  Information: Information;
  Informations: Array<Information>;
  group: Group;
  groups: Array<Group>;
  /** ID指定で場所を取得する */
  location: Location;
  /** 場所をまとめて取得する */
  locations: Array<Location>;
  me: User;
  scene: Scene;
  scenes: Array<Scene>;
  sport: Sport;
  sports: Array<Sport>;
  /** ID指定でチームを取得する */
  team: Team;
  /** チームをまとめて取得する */
  teams: Array<Team>;
  user: User;
  users: Array<User>;
};


export type QueryInformationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLocationArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySceneArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySportArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTeamArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Scene = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Sport = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  weight: Scalars['Int']['output'];
};

export type Team = {
  group: Group;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type UpdateGroupInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGroupUsersInput = {
  userIds: Array<Scalars['ID']['input']>;
};

export type UpdateInformationInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLocationInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSceneInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSportsInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTeamInput = {
  groupId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTeamUsersInput = {
  addUserIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  removeUserIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type User = {
  email: Scalars['String']['output'];
  groups: Array<Group>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  teams: Array<Team>;
};

export type LoginMutationVariables = Exact<{
  code: Scalars['String']['input'];
  redirect_uri: Scalars['String']['input'];
}>;


export type LoginMutation = { login: { token: string } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { me: { name: string } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"redirect_uri"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"redirectURL"},"value":{"kind":"Variable","name":{"kind":"Name","value":"redirect_uri"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;