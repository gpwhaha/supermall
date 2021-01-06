import {myRequest} from "@/network/request";
export function getDetail(id) {
  return myRequest({
    url:'/detail',
    params:{
      id
    }
  })
}