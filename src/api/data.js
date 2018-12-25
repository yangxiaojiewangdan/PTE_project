import axios from '@/libs/api.request'
//url变量
export const apiUrl = 'http://192.168.31.74:8081'

//获取人员信息表格  多个数据
export const getTableData = data4 => {
  return axios.request({
    url: apiUrl + '/api/BusinessUser/GetEntities',
    method: 'post',
    data: data4
  })
}
//添加人员信息接口
export const uploadMessage = formData => {
  return axios.request({
    url: apiUrl + '/api/BusinessUser/Create',
    data: formData,
    method: 'post'
  })
}
//修改人员信息接口
export const UpdateUserData = formData => {
  return axios.request({
    url: apiUrl + '/api/BusinessUser/Update',
    data: formData,
    method: 'post'
  })
}
//删除人员信息接口
export const deleteBusinessUser = delBusinessUnitList => {
  return axios.request({
    url: apiUrl + '/api/BusinessUser/DeleteRange',
    data: delBusinessUnitList,
    method: 'post'
  })
}

//添加组织信息接口
export const addBusinessUnit = formData => {
  return axios.request({
    url: apiUrl + '/api/BusinessUnit/Create',
    data: formData,
    method: 'post'
  })
}
//删除组织信息接口多个
export const deleteBusinessUnit = delBusinessUnitList => {
  return axios.request({
    url: apiUrl + '/api/BusinessUnit/DeleteRange',
    data: delBusinessUnitList,
    method: 'post'
  })
}

//查询组织接口
export const BusinessUnitGetEntities = BusinessUnitQuery => {
  return axios.request({
    url: apiUrl + '/api/BusinessUnit/GetEntities',
    data: BusinessUnitQuery,
    method: 'post'
  })
}
//获取组织表格
export const getBusinessUnitData = BusinessUnitData => {
  return axios.request({
    url: apiUrl + '/api/BusinessUnit/GetEntities',
    data: BusinessUnitData,
    method: 'post'
  })
}

//获取组织树形结构
export const getTreeList = () => {
  return axios.request({
    url: apiUrl + '/api/BusinessUnit/GetBusinessUnit',
    method: 'get'
  })
}
//修改更新组织
export const upBusinessUnit = upValidate => {
  return axios.request({
    url: apiUrl + '/api/BusinessUnit/Update',
    data: upValidate,
    method: 'post'
  })
}


//获取结算规则信息渲染到表格
export const getSettlementCodeData = SettlementCodeData => {
  return axios.request({
    url: apiUrl + '/api/SettlementCode/GetEntities',
    data: SettlementCodeData,
    method: 'post'
  })
}

//添加加盟商结算规则接口
export const SettlementCodeCreate = CreateSettlementCode => {
  return axios.request({
    url: apiUrl + '/api/SettlementCode/Create',
    data: CreateSettlementCode,
    method: 'post'
  })
}
//删除加盟商结算规则接口
export const deleteSettlementCode = delSettlementCodeList => {
  return axios.request({
    url: apiUrl + '/api/SettlementCode/DeleteRange',
    data: delSettlementCodeList,
    method: 'post'
  })
}
