import axios from '@/libs/api.request'
//url变量
export const apiUrl = 'http://192.168.31.74:8081'
//获取组织结构的树形结构
export const getTreeList = () => {
  return axios.request({
    url: apiUrl+'/api/Orginazation/BusinessUnit/GetBusinessUnit',
    method: 'get'
  })
}
export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
//添加人员信息接口
export const uploadMessage= formData => {
  return axios.request({
    url: apiUrl+'/api/Orginazation/BusinessUser/Create',
    data: formData,
    method: 'post'
  })

}



