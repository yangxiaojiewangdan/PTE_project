import axios from '@/libs/api.request'
import qs from 'qs'
//url变量
export const apiUrl = 'http://192.168.31.74:8081'
//登陆
export const login = ({ Account, Password }) => {
const data = {
	Account,
	Password
}
  return axios.request({
  	url: apiUrl+'/api/Authentication/Authentication/Login?Account=admin&Password=admin',
    data,
    method: 'post',
  })
}











//获取用户信息
export const getUserInfo = (token) => {
  return axios.request({
    url: apiUrl+'/api/Authentication/UserSecurityLog/GetEntity',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}