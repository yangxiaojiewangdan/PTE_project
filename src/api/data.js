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
export const uploadMessage = formData => {
	return axios.request({
		url: apiUrl + '/api/BusinessUser/Create',
		data: formData,
		method: 'post'
	})
}

export const UpdateUserData= formData1 => {
  return axios.request({
    url: apiUrl+'/api/BusinessUser/Update',
    data: formData1,
    method: 'post'
  })
}


//获取组织结构的树形结构
export const getTreeList = () => {
	return axios.request({
		url: apiUrl + '/api/BusinessUnit/GetBusinessUnit',
		method: 'get'
	})
}

//获取组织信息表格  多个数据
export const getBusinessUnitData = BusinessUnitData => {
	return axios.request({
		url: apiUrl + '/api/BusinessUnit/GetEntities',
		method: 'post',
		data: BusinessUnitData
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