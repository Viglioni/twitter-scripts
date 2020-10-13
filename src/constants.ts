import {joinPath} from './logic/string';
import * as dotenv from 'dotenv';
import { or } from 'ramda';

dotenv.config();

/*
 * API urls V2
 */
export const baseUrl = 'https://api.twitter.com/2';

export const userByIdUrl = joinPath(baseUrl, 'users');

export const userByUsernameUrl = joinPath(userByIdUrl, 'by');

/*
 * API urls V1
 */

export const followersUrl = "https://api.twitter.com/1.1/followers/list.json"

/*
 * ENV constants
 */

export const bearerEnv = or(process.env.BEARER, null)


