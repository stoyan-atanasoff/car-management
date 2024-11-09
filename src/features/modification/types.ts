import { CarModification } from '@lib/_generated/graphql_sdk'

// This is a fix of the automatically generated type CarModification
// Usually it is needed and once the generation is fixed it should be removed
export type CarModificationFix = Omit<CarModification, 'id'> & { id : number };
