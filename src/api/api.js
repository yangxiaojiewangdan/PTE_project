import axios from "@/libs/api.request";
//url变量
export const apiUrl = "http://192.168.31.74:8081";

// //获取所有大区的数据
// export const DistrictGetRegion = () => {
//   return axios.request({
//     url: apiUrl + "/api/District/GetRegion",
//     method: "get"
//   });
// };
// //获取指定大区省份信息
// export const DistrictGetProvince = () => {
//   return axios.request({
//     url: apiUrl + "/api/District/GetProvince",
//     method: "get"
//   });
// };
// //获取指定大区省份信息
// export const DistrictGetArea = (ParentId) => {
//   return axios.request({
//     url: apiUrl + "/api/District/GetArea?ParentId=" + ParentId,
//     method: "get"
//   });
// };
// //  根据数据主键(Id)查询单条数据
// export const DistrictGetEntity = (keyId) => {
//   return axios.request({
//     url: apiUrl + "/api/District/GetEntity?keyId=" + keyId,
//     method: "get"
//   });
// };









//查询信息渲染到表格
export const GetEntities = (Interface, Data) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/GetEntities",
    data: Data,
    method: "post"
  });
};
// 根据数据主键(Id)查询单条数据
export const GetEntity = (Interface, keyId) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/GetEntity?keyId" + keyId,
    method: "get"
  });
};
//添加接口
export const Create = (Interface, Data) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/Create",
    data: Data,
    method: "post"
  });
};
//修改接口
export const Update = (Interface, Data) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/Update",
    data: Data,
    method: "post"
  });
};
//删除指定主键ID数据
export const Delete = (Interface, keyId) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/Delete?keyId=" + keyId,
    method: "post"
  });
};
//删除指定主键ID数据
export const BatchDelete = (Interface, keyId) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/BatchDelete?keyId=" + keyId,
    method: "post"
  });
};
// 根据数据主键(Id)查询单条数据
export const Copy = (Interface, keyId) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/Copy?keyId" + keyId,
    method: "get"
  });
};
// 获取组织树结构
export const GetBusinessUnit = Interface => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/GetBusinessUnit",
    method: "get"
  });
};
// 校验代码是否得
export const ValidateUnique = (Interface, Code, BusinessGroup) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/ValidateUnique?Code=" + Code + "&BusinessGroup=" + BusinessGroup,
    method: "get"
  });
};

// 查询数据字典的数据项
export const DataDictionaryGetEntities = (dataCategory) => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=" + dataCategory + "&BusinessGroup=*",
    method: "get"
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