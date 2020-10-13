import { map, replace, unapply, reduce, concat as rConcat, join, equals, all, compose, and} from 'ramda';

const { isArray } = Array

export const concat = unapply(reduce(rConcat, ''))

const removePathSlash = replace(/(^\/|\/$)/g, '')

export const joinPath = unapply(
    (paths : readonly string[]) => join('/')
    (map(removePathSlash, paths)));


export const queryList = join(',')

export const isStrArr = (input : any | any[]) => and(
  isArray(input) ,
  compose(all(equals("string")), map(el=> typeof el))(input))

