import { UseMutationResult } from '@tanstack/react-query'

export type QueryFn = UseMutationResult<any, Error, Record<string, string>, unknown>;
export type QueryArgs = { fn: QueryFn; args: Record<string, string>};
export type QueryFnArgs = QueryFn | QueryArgs;
