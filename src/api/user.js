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
  	url: apiUrl+'/api/Authentication/Login',
    data,
    method: 'post',
  })
}
//获取用户信息
export const getUserInfo = (SessionToken) => {
  return axios.request({
    url: apiUrl+'/api/BusinessUser/GetEntity',
    params: {
      SessionToken,
      keyId:'100'
    },
    method: 'get'
  })
}
//退出登陆
export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
//此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}
//获取消息列表，其中包含未读、已读、回收站三个列表
export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}
//根据当前点击的消息的id获取内容
export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}
 // 把一个未读消息标记为已读
export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}
// 删除一个已读消息到回收站
export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}
 // 还原一个已删除消息到已读消息
export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}