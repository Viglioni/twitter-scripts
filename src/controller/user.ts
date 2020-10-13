import {http} from 'controller/http';
import { getUserUrl, getQuery, idsForQuery } from '../logic/user';
import { not, assoc, merge, length, concat } from 'ramda';
import { queryList } from '../logic/string';
import { followersUrl } from '../constants';

const {GET} = http();

const userFields = {
  "user.fields": queryList(["created_at", "description", "entities", "id", "location", "name", "pinned_tweet_id", "profile_image_url", "protected", "public_metrics", "url", "username", "verified", "withheld"])
}

export const getUsers = async (users : string | string[]) => {
  const userInfo = idsForQuery(users)
  const url = getUserUrl(userInfo)
  const idQuery = getQuery(userInfo)
  const query = {query : merge( idQuery, userFields)}
  if(not(url)) throw new Error("List must be Ids only or Usernames only")
  return GET(url, query)
}

// export const getFollowers = async (id: string, cursor: number = -1, n:number=1) => {
//   console.log(n)

//   const {data: {users, next_cursor : nextCursor}} = (async()=>{
//     try {
//       return await GET(followersUrl, {query: {user_id : id, cursor }})
//     }
//   })()

//   if(nextCursor == 0) return users
//   return new Promise(async (resolve, _) => {
//     resolve(concat(users, await getFollowers(id, nextCursor,n+1)))
//   })
// }

