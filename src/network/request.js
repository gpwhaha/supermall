import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
// 拦截器
  instance.interceptors.request.use(config => {
    return config
  },err =>{
    console.log(err)
  })

// 相应拦截
  instance.interceptors.response.use(res =>{
    return res.data
  },err =>{
    console.log(err)
  })

    return instance(config)
}

export function myRequest(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers:{
      'Content-Type': "application/json;charset=utf-8"
    },
  })
// 拦截器
  instance.interceptors.request.use(config => {
    return config
  },err =>{
    console.log(err)
  })

// 相应拦截
  instance.interceptors.response.use(res =>{
    return res.data
  },err =>{
    console.log(err)
  })

  return instance(config)
}