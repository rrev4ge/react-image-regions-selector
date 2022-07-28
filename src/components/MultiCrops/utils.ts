import { v4 as uuidv4 } from 'uuid';
import { assoc, map, omit } from 'ramda'

export const addId = map(assoc('id', uuidv4()))

export const removeId = map(omit(['id']))
