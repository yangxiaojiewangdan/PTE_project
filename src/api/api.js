import axios from "@/libs/api.request";
//url变量
export const apiUrl = "http://192.168.31.74:8081";
// 地区信息获取 地区信息获取 地区信息获取 地区信息获取 地区信息获取 地区信息获取
//获取学员档案
export const CustomerData = CustomerData => {
  return axios.request({
    url: apiUrl + "/api/CustomerProfile/GetEntities",
    method: "post",
    data: CustomerData,
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
//查询人员接口
export const BusinessUserGetEntities = BusinessUserQuery => {
  return axios.request({
    url: apiUrl + "/api/BusinessUser/GetEntities",
    data: BusinessUserQuery,
    method: "post"
  });
};
//获取所有大区的数据
export const DistrictGetRegion = () => {
  return axios.request({
    url: apiUrl + "/api/District/GetRegion",
    method: "get"
  });
};
//获取指定大区省份信息
export const DistrictGetProvince = () => {
  return axios.request({
    url: apiUrl + "/api/District/GetProvince",
    method: "get"
  });
};
//获取指定大区省份信息
export const DistrictGetArea = (ParentId) => {
  return axios.request({
    url: apiUrl + "/api/District/GetArea?ParentId=" + ParentId,
    method: "get"
  });
};
//  根据数据主键(Id)查询单条数据
export const DistrictGetEntity = (keyId) => {
  return axios.request({
    url: apiUrl + "/api/District/GetEntity?keyId=" + keyId,
    method: "get"
  });
};
// 结算规则  结算规则   结算规则   结算规则   结算规则   结算规则   结算规则   结算规则   结算规则  
//获取结算规则信息渲染到表格
export const getSettlementCodeData = SettlementCodeData => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/GetEntities",
    data: SettlementCodeData,
    method: "post"
  });
};
//添加结算规则接口
export const SettlementCodeCreate = CreateSettlementCode => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/Create",
    data: CreateSettlementCode,
    method: "post"
  });
};
//删除结算规则接口
export const SettlementCodeBatchDelete = BatchDeleteList => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/BatchDelete",
    data: BatchDeleteList,
    method: "post"
  });
};
//修改结算规则接口
export const SettlementCodeUpdate = UpdateList => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/Update",
    data: UpdateList,
    method: "post"
  });
};
//获取结算规则信息    数据字典里的结算方式  SETTLE_TYPE
export const getSettleType = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=SETTLE_TYPE&businessGroup=*",
    method: "get"
  });
};
//查重Code结算规则接口 
export const SettlementCodeValidateUnique = (Code, BusinessGroup) => {
  return axios.request({
    url: apiUrl + "/api/SettlementCode/ValidateUnique?Code=" + Code + '&BusinessGroup=' + BusinessGroup,
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
//添加权益金阶梯规则接口
export const RoyaltyCodeAddOrUpdateLadder = AddOrUpdateLadderList => {
  return axios.request({
    url: apiUrl + "/api/RoyaltyCode/AddOrUpdateLadder",
    data: AddOrUpdateLadderList,
    method: "post"
  });
};
//删除权益金阶梯规则接口
export const RoyaltyCodeBatchRemoveLadder = (royaltyId, detailId) => {
  return axios.request({
    url: apiUrl + "/api/RoyaltyCode/RemoveLadder?royaltyId=" + royaltyId + '&detailId=' + detailId,
    // data: BatchRemoveLadderList,
    method: "post"
  });
};
//查重Code权益金接口 
export const RoyaltyCodeValidateUnique = (Code, BusinessGroup) => {
  return axios.request({
    url: apiUrl + "/api/RoyaltyCode/ValidateUnique?Code=" + Code + '&BusinessGroup=' + BusinessGroup,
    method: "get"
  });
};
// 加盟商基本信息 加盟商基本信息 加盟商基本信息 加盟商基本信息 加盟商基本信息
//获取加盟商基本信息渲染到表格
export const FranchiserProfileGetEntities = FranchiserProfileGetEntities => {
  return axios.request({
    url: apiUrl + "/api/FranchiserProfile/GetEntities",
    data: FranchiserProfileGetEntities,
    method: "post"
  });
};
//添加加盟商基本信息
export const FranchiserProfileCreate = FranchiserProfileCreate => {
  return axios.request({
    url: apiUrl + "/api/FranchiserProfile/Create",
    data: FranchiserProfileCreate,
    method: "post"
  });
};
//删除加盟商基本信息接口
export const FranchiserProfileBatchDelete = FranchiserProfileBatchDelete => {
  return axios.request({
    url: apiUrl + "/api/FranchiserProfile/BatchDelete",
    data: FranchiserProfileBatchDelete,
    method: "post"
  });
};
//修改加盟商基本信息接口
export const FranchiserProfileUpdate = FranchiserProfileUpdate => {
  return axios.request({
    url: apiUrl + "/api/FranchiserProfile/Update",
    data: FranchiserProfileUpdate,
    method: "post"
  });
};
//获取加盟商基本信息    业务状态
export const getFRANCHISER_STATUS = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=FRANCHISER_STATUS&businessGroup=*",
    method: "get"
  });
};
//获取加盟商基本信息    加盟商类型
export const getFRANCHISER_TYPE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=FRANCHISER_TYPE&businessGroup=*",
    method: "get"
  });
};
//获取加盟商基本信息    证件类型
export const getCERTIFICATE_TYPE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=CERTIFICATE_TYPE&businessGroup=*",
    method: "get"
  });
};
//获取加盟商基本信息    加盟方式
export const getLEAGE_MODE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=LEAGE_MODE&businessGroup=*",
    method: "get"
  });
};
// 门店管理  门店管理  门店管理  门店管理  门店管理  门店管理  门店管理  门店管理  门店管理
//获取门店管理    业务类型
export const getSTORE_BUSINESS_TYPE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=STORE_BUSINESS_TYPE&businessGroup=*",
    method: "get"
  });
};
//获取门店管理    门店类型
export const getSTORE_TYPE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=STORE_TYPE&businessGroup=*",
    method: "get"
  });
};
//获取门店管理    业务状态
export const getSTORE_STATUS = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=STORE_STATUS&businessGroup=*",
    method: "get"
  });
};
//获取门店信息渲染到表格
export const BusinessStoreGetEntities = BusinessStoreGetEntities => {
  return axios.request({
    url: apiUrl + "/api/BusinessStore/GetEntities",
    data: BusinessStoreGetEntities,
    method: "post"
  });
};
//添加门店信息
export const BusinessStoreCreate = BusinessStoreCreate => {
  return axios.request({
    url: apiUrl + "/api/BusinessStore/Create",
    data: BusinessStoreCreate,
    method: "post"
  });
};
//删除门店信息
export const BusinessStoreBatchDelete = BusinessStoreBatchDelete => {
  return axios.request({
    url: apiUrl + "/api/BusinessStore/BatchDelete",
    data: BusinessStoreBatchDelete,
    method: "post"
  });
};
//修改门店信息
export const BusinessStoreUpdate = BusinessStoreUpdate => {
  return axios.request({
    url: apiUrl + "/api/BusinessStore/Update",
    data: BusinessStoreUpdate,
    method: "post"
  });
};
// 教室管理 教室管理 教室管理 教室管理 教室管理 教室管理 教室管理 教室管理 教室管理
//获取教室管理   教室类型
export const getSTORE_ROOM_TYPE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=STORE_ROOM_TYPE&businessGroup=*",
    method: "get"
  });
};
//获取教室管理   教室当前状态
export const getSTORE_ROOM_STATUS = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=STORE_ROOM_STATUS&businessGroup=*",
    method: "get"
  });
};
//获取教室信息渲染到表格
export const ClassRoomGetEntities = ClassRoomGetEntities => {
  return axios.request({
    url: apiUrl + "/api/ClassRoom/GetEntities",
    data: ClassRoomGetEntities,
    method: "post"
  });
};
//添加教室信息
export const ClassRoomCreate = ClassRoomCreate => {
  return axios.request({
    url: apiUrl + "/api/ClassRoom/Create",
    data: ClassRoomCreate,
    method: "post"
  });
};
//删除教室信息
export const ClassRoomBatchDelete = ClassRoomBatchDelete => {
  return axios.request({
    url: apiUrl + "/api/ClassRoom/BatchDelete",
    data: ClassRoomBatchDelete,
    method: "post"
  });
};
//修改教室信息
export const ClassRoomUpdate = ClassRoomUpdate => {
  return axios.request({
    url: apiUrl + "/api/ClassRoom/Update",
    data: ClassRoomUpdate,
    method: "post"
  });
};
// 订单管理 订单管理 订单管理 订单管理 订单管理 订单管理 订单管理 订单管理 订单管理 订单管理
//获取订单管理    订单状态
export const getORDER_STATUS = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=ORDER_STATUS&businessGroup=*",
    method: "get"
  });
};

//获取订单管理    订单类型
export const getORDER_TYPE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=ORDER_TYPE&businessGroup=*",
    method: "get"
  });
};
//获取订单管理    折扣原因代码
export const getDISCOUNT_REASON_CODE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=DISCOUNT_REASON_CODE&businessGroup=*",
    method: "get"
  });
};
//获取订单管理    退课原因代码
export const getCANCLE_REASON_CODE = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=CANCLE_REASON_CODE&businessGroup=*",
    method: "get"
  });
};
//获取订单管理    支付状态 
export const getORDER_PAYMENT_STATUS = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetEntities?dataCategory=ORDER_PAYMENT_STATUS&businessGroup=*",
    method: "get"
  });
};
//获取订单信息渲染到表格
export const CustomerOrderGetEntities = CustomerOrderGetEntities => {
  return axios.request({
    url: apiUrl + "/api/CustomerOrder/GetEntities",
    data: CustomerOrderGetEntities,
    method: "post"
  });
};

//添加订单信息
export const CustomerOrderPurchaseOrder = CustomerOrderPurchaseOrder => {
  return axios.request({
    url: apiUrl + "/api/CustomerOrder/PurchaseOrder",
    data: CustomerOrderPurchaseOrder,
    method: "post"
  });
};
//删除教室信息
export const CustomerOrderBatchDelete = CustomerOrderBatchDelete => {
  return axios.request({
    url: apiUrl + "/api/CustomerOrder/BatchDelete",
    data: CustomerOrderBatchDelete,
    method: "post"
  });
};