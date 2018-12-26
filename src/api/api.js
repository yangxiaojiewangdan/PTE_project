import axios from "@/libs/api.request";
//url变量
export const apiUrl = "http://192.168.31.74:8081";



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
export const deleteSettlementCode = delSettlementCodeList => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/DeleteRange",
    data: delSettlementCodeList,
    method: "post"
  });
};
