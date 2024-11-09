import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type CacheConfig = {
  customKey?: InputMaybe<Scalars['String']['input']>
  extraKeys?: InputMaybe<Array<Scalars['String']['input']>>
  ttlMin?: InputMaybe<Scalars['Int']['input']>
  useCache?: InputMaybe<Scalars['Boolean']['input']>
}

export type CarBrand = {
  __typename?: 'CarBrand'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type CarBrandData = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export enum CarCoupe {
  Convertible = 'CONVERTIBLE',
  Coupe = 'COUPE',
  Hatchback = 'HATCHBACK',
  Sedan = 'SEDAN',
  Suv = 'SUV',
  Truck = 'TRUCK',
  Van = 'VAN',
  Wagon = 'WAGON',
}

export type CarModel = {
  __typename?: 'CarModel'
  brand: CarBrand
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type CarModelData = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type CarModification = {
  __typename?: 'CarModification'
  coupe: CarCoupe
  horsePower: Scalars['Int']['output']
  id: Scalars['ID']['output']
  model: CarModel
  name: Scalars['String']['output']
  weight: Scalars['Float']['output']
}

export type CarModificationData = {
  coupe?: InputMaybe<CarCoupe>
  horsePower?: InputMaybe<Scalars['Int']['input']>
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  weight?: InputMaybe<Scalars['Float']['input']>
}

export type ClearCacheConfig = {
  clear?: InputMaybe<Scalars['Boolean']['input']>
  extraKeys?: InputMaybe<Array<Scalars['String']['input']>>
}

export enum Constraint {
  Email = 'EMAIL',
  Max = 'MAX',
  Min = 'MIN',
  Numeric = 'NUMERIC',
  OneOf = 'ONE_OF',
  Password = 'PASSWORD',
  Required = 'REQUIRED',
}

export type EditExtraValidations = {
  afterSave?: InputMaybe<Array<Scalars['String']['input']>>
  beforeSave?: InputMaybe<Array<Scalars['String']['input']>>
}

export enum EntityFilterSort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type EntityToModel = {
  enable?: InputMaybe<Scalars['Boolean']['input']>
  excludeFields?: InputMaybe<Array<Scalars['String']['input']>>
}

export type Filter = {
  Condition: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  _health?: Maybe<Scalars['Boolean']['output']>
  createCarBrand: CarBrand
  createCarModel: CarModel
  createCarModification: CarModification
  deleteCarBrand: Scalars['Boolean']['output']
  deleteCarModel: Scalars['Boolean']['output']
  deleteCarModification: Scalars['Boolean']['output']
  editCarBrand: CarBrand
  editCarModel: CarModel
  editCarModification: CarModification
}

export type MutationCreateCarBrandArgs = {
  name: Scalars['String']['input']
}

export type MutationCreateCarModelArgs = {
  brandId: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationCreateCarModificationArgs = {
  modelId: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationDeleteCarBrandArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteCarModelArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteCarModificationArgs = {
  id: Scalars['ID']['input']
}

export type MutationEditCarBrandArgs = {
  data: CarBrandData
}

export type MutationEditCarModelArgs = {
  data: CarModelData
}

export type MutationEditCarModificationArgs = {
  data: CarModificationData
}

export type Query = {
  __typename?: 'Query'
  _health?: Maybe<Scalars['Boolean']['output']>
  allCarModifications: Array<CarModification>
  carBrands: Array<CarBrand>
  carModels: Array<CarModel>
  carModifications: Array<CarModification>
}

export type QueryCarModelsArgs = {
  brandId: Scalars['ID']['input']
}

export type QueryCarModificationsArgs = {
  modelId: Scalars['ID']['input']
}

export type ResultsPager = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  sortField: Scalars['String']['input']
  sortOrder?: EntityFilterSort
}

export type ValidationCheck = {
  check: Constraint
  value?: InputMaybe<Scalars['String']['input']>
}

export type CarBrandDataFragment = {
  __typename?: 'CarBrand'
  id: string
  name: string
}

export type GetBrandsQueryVariables = Exact<{ [key: string]: never }>

export type GetBrandsQuery = {
  __typename?: 'Query'
  carBrands: Array<{ __typename?: 'CarBrand'; id: string; name: string }>
}

export type CreateBrandMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CreateBrandMutation = {
  __typename?: 'Mutation'
  createCarBrand: { __typename?: 'CarBrand'; id: string; name: string }
}

export type EditBrandMutationVariables = Exact<{
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type EditBrandMutation = {
  __typename?: 'Mutation'
  editCarBrand: { __typename?: 'CarBrand'; id: string; name: string }
}

export type DeleteBrandMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteBrandMutation = {
  __typename?: 'Mutation'
  deleteCarBrand: boolean
}

export type CarModelDataFragment = {
  __typename?: 'CarModel'
  id: string
  name: string
  brand: { __typename?: 'CarBrand'; id: string; name: string }
}

export type CreateModelMutationVariables = Exact<{
  brandId: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type CreateModelMutation = {
  __typename?: 'Mutation'
  createCarModel: {
    __typename?: 'CarModel'
    id: string
    name: string
    brand: { __typename?: 'CarBrand'; id: string; name: string }
  }
}

export type GetModelsQueryVariables = Exact<{
  brandId: Scalars['ID']['input']
}>

export type GetModelsQuery = {
  __typename?: 'Query'
  carModels: Array<{
    __typename?: 'CarModel'
    id: string
    name: string
    brand: { __typename?: 'CarBrand'; id: string; name: string }
  }>
}

export type EditModelMutationVariables = Exact<{
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type EditModelMutation = {
  __typename?: 'Mutation'
  editCarModel: {
    __typename?: 'CarModel'
    id: string
    name: string
    brand: { __typename?: 'CarBrand'; id: string; name: string }
  }
}

export type DeleteModelMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteModelMutation = {
  __typename?: 'Mutation'
  deleteCarModel: boolean
}

export type CarModificationDataFragment = {
  __typename?: 'CarModification'
  id: string
  name: string
  horsePower: number
  weight: number
  coupe: CarCoupe
  model: {
    __typename?: 'CarModel'
    id: string
    name: string
    brand: { __typename?: 'CarBrand'; id: string; name: string }
  }
}

export type CreateModificationMutationVariables = Exact<{
  modelId: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type CreateModificationMutation = {
  __typename?: 'Mutation'
  createCarModification: {
    __typename?: 'CarModification'
    id: string
    name: string
    horsePower: number
    weight: number
    coupe: CarCoupe
    model: {
      __typename?: 'CarModel'
      id: string
      name: string
      brand: { __typename?: 'CarBrand'; id: string; name: string }
    }
  }
}

export type GetAllCarModificationsQueryVariables = Exact<{
  [key: string]: never
}>

export type GetAllCarModificationsQuery = {
  __typename?: 'Query'
  allCarModifications: Array<{
    __typename?: 'CarModification'
    id: string
    name: string
    horsePower: number
    weight: number
    coupe: CarCoupe
    model: {
      __typename?: 'CarModel'
      id: string
      name: string
      brand: { __typename?: 'CarBrand'; id: string; name: string }
    }
  }>
}

export type GetCarModificationsQueryVariables = Exact<{
  modelId: Scalars['ID']['input']
}>

export type GetCarModificationsQuery = {
  __typename?: 'Query'
  carModifications: Array<{
    __typename?: 'CarModification'
    id: string
    name: string
    horsePower: number
    weight: number
    coupe: CarCoupe
    model: {
      __typename?: 'CarModel'
      id: string
      name: string
      brand: { __typename?: 'CarBrand'; id: string; name: string }
    }
  }>
}

export type EditModificationMutationVariables = Exact<{
  data: CarModificationData
}>

export type EditModificationMutation = {
  __typename?: 'Mutation'
  editCarModification: {
    __typename?: 'CarModification'
    id: string
    name: string
    horsePower: number
    weight: number
    coupe: CarCoupe
    model: {
      __typename?: 'CarModel'
      id: string
      name: string
      brand: { __typename?: 'CarBrand'; id: string; name: string }
    }
  }
}

export type DeleteModificationMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteModificationMutation = {
  __typename?: 'Mutation'
  deleteCarModification: boolean
}

export const CarBrandDataFragmentDoc = gql`
  fragment CarBrandData on CarBrand {
    id
    name
  }
`
export const CarModelDataFragmentDoc = gql`
  fragment CarModelData on CarModel {
    brand {
      id
      name
    }
    id
    name
  }
`
export const CarModificationDataFragmentDoc = gql`
  fragment CarModificationData on CarModification {
    id
    name
    horsePower
    weight
    model {
      id
      name
      brand {
        id
        name
      }
    }
    coupe
  }
`
export const GetBrandsDocument = gql`
  query GetBrands {
    carBrands {
      ...CarBrandData
    }
  }
  ${CarBrandDataFragmentDoc}
`
export const CreateBrandDocument = gql`
  mutation CreateBrand($name: String!) {
    createCarBrand(name: $name) {
      id
      name
    }
  }
`
export const EditBrandDocument = gql`
  mutation EditBrand($id: ID!, $name: String!) {
    editCarBrand(data: { id: $id, name: $name }) {
      id
      name
    }
  }
`
export const DeleteBrandDocument = gql`
  mutation DeleteBrand($id: ID!) {
    deleteCarBrand(id: $id)
  }
`
export const CreateModelDocument = gql`
  mutation CreateModel($brandId: ID!, $name: String!) {
    createCarModel(brandId: $brandId, name: $name) {
      ...CarModelData
    }
  }
  ${CarModelDataFragmentDoc}
`
export const GetModelsDocument = gql`
  query GetModels($brandId: ID!) {
    carModels(brandId: $brandId) {
      ...CarModelData
    }
  }
  ${CarModelDataFragmentDoc}
`
export const EditModelDocument = gql`
  mutation EditModel($id: ID!, $name: String!) {
    editCarModel(data: { id: $id, name: $name }) {
      ...CarModelData
    }
  }
  ${CarModelDataFragmentDoc}
`
export const DeleteModelDocument = gql`
  mutation DeleteModel($id: ID!) {
    deleteCarModel(id: $id)
  }
`
export const CreateModificationDocument = gql`
  mutation CreateModification($modelId: ID!, $name: String!) {
    createCarModification(modelId: $modelId, name: $name) {
      ...CarModificationData
    }
  }
  ${CarModificationDataFragmentDoc}
`
export const GetAllCarModificationsDocument = gql`
  query GetAllCarModifications {
    allCarModifications {
      ...CarModificationData
    }
  }
  ${CarModificationDataFragmentDoc}
`
export const GetCarModificationsDocument = gql`
  query GetCarModifications($modelId: ID!) {
    carModifications(modelId: $modelId) {
      ...CarModificationData
    }
  }
  ${CarModificationDataFragmentDoc}
`
export const EditModificationDocument = gql`
  mutation EditModification($data: CarModificationData!) {
    editCarModification(data: $data) {
      ...CarModificationData
    }
  }
  ${CarModificationDataFragmentDoc}
`
export const DeleteModificationDocument = gql`
  mutation DeleteModification($id: ID!) {
    deleteCarModification(id: $id)
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    GetBrands(
      variables?: GetBrandsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetBrandsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetBrandsQuery>(GetBrandsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetBrands',
        'query'
      )
    },
    CreateBrand(
      variables: CreateBrandMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateBrandMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateBrandMutation>(CreateBrandDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateBrand',
        'mutation'
      )
    },
    EditBrand(
      variables: EditBrandMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<EditBrandMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditBrandMutation>(EditBrandDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EditBrand',
        'mutation'
      )
    },
    DeleteBrand(
      variables: DeleteBrandMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<DeleteBrandMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteBrandMutation>(DeleteBrandDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteBrand',
        'mutation'
      )
    },
    CreateModel(
      variables: CreateModelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateModelMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateModelMutation>(CreateModelDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateModel',
        'mutation'
      )
    },
    GetModels(
      variables: GetModelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetModelsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetModelsQuery>(GetModelsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetModels',
        'query'
      )
    },
    EditModel(
      variables: EditModelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<EditModelMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditModelMutation>(EditModelDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EditModel',
        'mutation'
      )
    },
    DeleteModel(
      variables: DeleteModelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<DeleteModelMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteModelMutation>(DeleteModelDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteModel',
        'mutation'
      )
    },
    CreateModification(
      variables: CreateModificationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateModificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateModificationMutation>(
            CreateModificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'CreateModification',
        'mutation'
      )
    },
    GetAllCarModifications(
      variables?: GetAllCarModificationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetAllCarModificationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllCarModificationsQuery>(
            GetAllCarModificationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetAllCarModifications',
        'query'
      )
    },
    GetCarModifications(
      variables: GetCarModificationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetCarModificationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCarModificationsQuery>(
            GetCarModificationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetCarModifications',
        'query'
      )
    },
    EditModification(
      variables: EditModificationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<EditModificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditModificationMutation>(
            EditModificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'EditModification',
        'mutation'
      )
    },
    DeleteModification(
      variables: DeleteModificationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<DeleteModificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteModificationMutation>(
            DeleteModificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'DeleteModification',
        'mutation'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
