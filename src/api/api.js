import axios from "@/libs/api.request";
//url变量
export const apiUrl = "http://192.168.31.74:8081";

// 加盟商结算规则  加盟商结算规则  加盟商结算规则  加盟商结算规则  加盟商结算规则  加盟商结算规则

//获取加盟商结算规则信息渲染到表格
export const getSettlementCodeData = SettlementCodeData => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/GetEntities",
    data: SettlementCodeData,
    method: "post"
  });
};

//添加加盟商结算规则接口
export const SettlementCodeCreate = CreateSettlementCode => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/Create",
    data: CreateSettlementCode,
    method: "post"
  });
};
//删除加盟商结算规则接口
export const SettlementCodeBatchDelete = BatchDeleteList => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/BatchDelete",
    data: BatchDeleteList,
    method: "post"
  });
};
//修改加盟商结算规则接口
export const SettlementCodeUpdate = UpdateList => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/Update",
    data: UpdateList,
    method: "post"
  });
};

//获取加盟商结算规则信息    数据字典里的结算方式  SETTLE_TYPE
export const getSettleType = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=SETTLE_TYPE&businessGroup=*",
    method: "get"
  });
};

















// 权益金  权益金  权益金  权益金  权益金  权益金  权益金  权益金  权益金  权益金  权益金  权益金  权益金

//获取权益金规则信息渲染到表格
export const RoyaltyCodeGetEntities = SettlementCodeData => {
  return axios.request({
    url: apiUrl + "/api/RoyaltyCode/GetEntities",
    data: SettlementCodeData,
    method: "post"
  });
};

//添加权益金规则接口
export const RoyaltyCodeCreate = CreateSettlementCode => {
  return axios.request({
    url: apiUrl + "/api/RoyaltyCode/Create",
    data: CreateSettlementCode,
    method: "post"
  });
};
//删除权益金规则接口
export const RoyaltyCodeBatchDelete = BatchDeleteList => {
  return axios.request({
    url: apiUrl + "/api/RoyaltyCode/BatchDelete",
    data: BatchDeleteList,
    method: "post"
  });
};
//修改权益金规则接口
export const RoyaltyCodeUpdate = UpdateList => {
  return axios.request({
    url: apiUrl + "/api/RoyaltyCode/Update",
    data: UpdateList,
    method: "post"
  });
};
//获取权益金规则信息    权益金方式  
export const getROYALTY_TYPE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=ROYALTY_TYPE&businessGroup=*",
    method: "get"
  });
};
//获取权益金规则信息    权益金固定值类型  
export const getROYALTY_FLAT_TYPE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=ROYALTY_FLAT_TYPE&businessGroup=*",
    method: "get"
  });
};
//获取权益金规则信息    天数不足月或年折算方式  
export const getOBVERSION_TYPE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=OBVERSION_TYPE&businessGroup=*",
    method: "get"
  });
};
//获取权益金规则信息    权益金计算基准  
export const getROYALTY_BENCH_MARK = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=ROYALTY_BENCH_MARK&businessGroup=*",
    method: "get"
  });
};
  
