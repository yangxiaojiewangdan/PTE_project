import axios from "@/libs/api.request";
//url变量
export const apiUrl = "http://192.168.31.74:8081";

//获取人员信息表格  多个数据
export const getTableData = data4 => {
  return axios.request({
    url: apiUrl + "/api/BusinessUser/GetEntities",
    method: "post",
    data: data4
  });
};
//添加人员信息接口
export const uploadMessage = formData => {
  return axios.request({
    url: apiUrl + "/api/BusinessUser/Create",
    data: formData,
    method: "post"
  });
};
//修改人员信息接口
export const UpdateUserData = formData => {
  return axios.request({
    url: apiUrl + "/api/BusinessUser/Update",
    data: formData,
    method: "post"
  });
};
//删除人员信息接口
export const deleteBusinessUser = delBusinessUnitList => {
  return axios.request({
    url: apiUrl + "/api/BusinessUser/BatchDelete",
    data: delBusinessUnitList,
    method: "post"
  });
};

//查询人员接口
export const BusinessUserGetEntities = BusinessUserQuery => {
  return axios.request({
    url: apiUrl + "/api/BusinessUser/GetEntities",
    data: BusinessUserQuery,
    method: "post"
  });
};

//添加组织信息接口
export const addBusinessUnit = formData => {
  return axios.request({
    url: apiUrl + "/api/BusinessUnit/Create",
    data: formData,
    method: "post"
  });
};
//删除组织信息接口多个
export const deleteBusinessUnit = delBusinessUnitList => {
  return axios.request({
    url: apiUrl + "/api/BusinessUnit/BatchDelete",
    data: delBusinessUnitList,
    method: "post"
  });
};

//查询组织接口
export const BusinessUnitGetEntities = BusinessUnitQuery => {
  return axios.request({
    url: apiUrl + "/api/BusinessUnit/GetEntities",
    data: BusinessUnitQuery,
    method: "post"
  });
};
//获取组织表格
export const getBusinessUnitData = BusinessUnitData => {
  return axios.request({
    url: apiUrl + "/api/BusinessUnit/GetEntities",
    data: BusinessUnitData,
    method: "post"
  });
};

//获取组织树形结构
export const getTreeList = () => {
  return axios.request({
    url: apiUrl + "/api/BusinessUnit/GetBusinessUnit",
    method: "get"
  });
};
//修改更新组织
export const upBusinessUnit = upValidate => {
  return axios.request({
    url: apiUrl + "/api/BusinessUnit/Update",
    data: upValidate,
    method: "post"
  });
};


//系统角色表格
export const getBusinessRolesData = BusinessRolesData => {
  return axios.request({
    url: apiUrl + "/api/BusinessRole/GetEntities",
    data: BusinessRolesData,
    method: "post"
  });
};
//添加系统角色
export const addBusinessRole = formValidate => {
  return axios.request({
    url: apiUrl + "/api/BusinessRole/Create",
    data: formValidate,
    method: "post"
  });
};
//删除系统角色
export const deleteBusinessRole = delBusinessRoleArrs => {
  return axios.request({
    url: apiUrl + "/api/BusinessRole/BatchDelete",
    data: delBusinessRoleArrs,
    method: "post"
  });
};
//未分配权限
export const leftRole = params => {
  return axios.request({
    url: apiUrl + "/api/BusinessRole/GetUnAssignedPermission",
    method: "get",
    params,
  });
};
//已分配权限
export const rightRole = params => {
  return axios.request({
    url: apiUrl + "/api/BusinessRole/GetAssignedPermission",
    method: "get",
    params,
    
  });
};
//增加删减权限接口
export const branchRole = roleData => {
  return axios.request({
    url: apiUrl + "/api/BusinessRole/AssignedPermission",
    method: "post",
    data: roleData,
  });
};
//修改角色权限的接口
export const upBusinessRole = upRole => {
  return axios.request({
    url: apiUrl + "/api/BusinessRole/Update",
    data: upRole,
    method: "post"
  });
};
//系统角色查询
export const queryBusinessRole = queryRole => {
  return axios.request({
    url: apiUrl + "/api/BusinessRole/GetEntities",
    data: queryRole,
    method: "post"
  });
};
//获取数据字典
export const DataDictionary = params => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities",
    method: "get",
    params,
    
  });
};
//获取学员档案
export const CustomerData = CustomerData => {
  return axios.request({
    url: apiUrl + "/api/CustomerProfile/GetEntities",
    method: "post",
    data:CustomerData,
  });
};
//添加学员接口
export const CustomerCreate = CustomerFrom => {
  return axios.request({
    url: apiUrl + "/api/CustomerProfile/Create",
    method: "post",
    data:CustomerFrom,
  });
};
//删除信息的接口
export const CustomerDelete = batchArr => {
  return axios.request({
    url: apiUrl + "/api/CustomerProfile/BatchDelete",
    method: "post",
    data:batchArr,
  });
};
//修改学员信息
export const CustomerUp = upCustomerFrom => {
  return axios.request({
    url: apiUrl + "/api/CustomerProfile/Update",
    method: "post",
    data:upCustomerFrom,
  });
};
//学院查询接口
export const CustomerQuery = data => {
  return axios.request({
    url: apiUrl + "/api/CustomerProfile/GetEntities",
    method: "post",
    data:data,
  });
};
//添加联系人信息(多对多的关系)
export const CustomerContactCreate = AddCustomerFrom => {
  return axios.request({
    url: apiUrl + "/api/CustomerContact/Create",
    method: "post",
    data:AddCustomerFrom,
  });
};
//
//获取学员档案
export const CourseData = CourseData => {
  return axios.request({
    url: apiUrl + "/api/Course/GetEntities",
    method: "post",
    data:CourseData,
  });
};
//添加课程
export const CourseCreate = CourseFrom => {
  return axios.request({
    url: apiUrl + "/api/Course/Create",
    method: "post",
    data:CourseFrom,
  });
};
//增加修改课程阶段
export const CoursePhase = dataRoyaltyCodeDetail => {
  return axios.request({
    url: apiUrl + "/api/Course/AddOrUpdateCoursePhase",
    method: "post",
    data:dataRoyaltyCodeDetail,
  });
};
//删除课程
export const CourseDelete = BatchDeleteList => {
  return axios.request({
    url: apiUrl + "/api/Course/BatchDelete",
    method: "post",
    data:BatchDeleteList,
  });
};
//删除 课程阶段
export const CourseRemove = (CourseId,PhaseId) => {
  return axios.request({
    url: apiUrl + "/api/Course/RemovePhase?CourseId=" + CourseId + '&PhaseId=' + PhaseId,
    method: "post",
    //data:CourseRemoveData,
  });
};
//修改按钮
export const CourseUpData = UpCourseForm => {
  return axios.request({
    url: apiUrl + "/api/Course/Update",
    method: "post",
    data:UpCourseForm,
  });
};
//添加课包
export const CoursePackageCreate = CourseFrom => {
  return axios.request({
    url: apiUrl + "/api/CoursePackage/Create",
    method: "post",
    data:CourseFrom,
  });
};