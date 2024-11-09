import { CarModification } from '@lib/_generated/graphql_sdk'

export type ExtendedCarModification = CarModification & {
  [key: string]: any;
};