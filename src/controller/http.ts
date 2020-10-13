import axios from 'axios';
import {concat} from './../logic/string';
import {not, or, merge} from 'ramda';
import {bearerEnv} from 'root/constants';

const auth = (bearer : string) => ({
  Authorization: concat('Bearer ', bearer),
});

const get = (bearer:string) =>
  async (url: string, {headers = {}, query ={}}) => {
    return axios({
      url,
      method: 'get',
      headers: merge(auth(bearer), headers),
      params: query,
    });
  };

export const http = (bearerToken ?: string) =>{
  const bearer = or(bearerToken, bearerEnv);
  if (not(bearer)) throw new Error('Bearer Token is missing');
  return {
    GET: get(bearer as string),
  }
}

