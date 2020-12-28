import {request,myRequest} from "@/network/request";
import Qs from 'qs'
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

export function getMyTest(id) {
  return myRequest({
    url: '/test',
    params: {
      id
    }
  })
}

export function getMyGoods(type) {
  return myRequest({
    url: '/mallIndex',
    // params: {
    //   type
    // },
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:Qs.stringify({
      type
    }),
  })
}