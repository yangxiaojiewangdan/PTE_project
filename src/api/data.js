import axios from '@/libs/api.request'
//url变量
export const apiUrl = 'http://192.168.31.74:8081'

//获取人员信息表格  多个数据
export const getTableData = data4 => {
  return axios.request({
    url: apiUrl+'/api/BusinessUser/GetEntities',
    method: 'post',
    data:data4
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
    url: apiUrl+'/api/BusinessUser/Create',
    data: formData,
    method: 'post'
  })
}

//修改人员信息接口
export const UpdateUserData= formData => {
  return axios.request({
    url: apiUrl+'/api/BusinessUser/Update',
    data: formData,
    method: 'post'
  })
}

