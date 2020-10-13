import {all,  match, equals, head, compose, cond, always as returns, T as Else, F as Null, not } from 'ramda';
import { userByUsernameUrl, userByIdUrl } from '../constants';
import { queryList, isStrArr } from './string';



export const isId = (str: string) => equals(str, head(match(/[0-9]*/, str)))

export const allIds = all(isId)

export const isUsername = compose(not, isId)

export const allUsernames = all(isUsername)



export const getUserUrl = cond([
  [allUsernames, returns(userByUsernameUrl)],
  [allIds,  returns(userByIdUrl)],
  [Else, Null]
])

export const getQuery = (userInfo : string[]) => cond([
  [allUsernames, returns({usernames: queryList(userInfo)})],
  [allIds,  returns({ids: queryList(userInfo)})],
  [Else, Null]
])(userInfo)


export const idsForQuery = (ids : string | string[]) =>
  isStrArr(ids) ?
  ids as string[]
  : [ids as string]
