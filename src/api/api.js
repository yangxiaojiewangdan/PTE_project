import axios from "@/libs/api.request";
//url变量
export const apiUrl = "http://192.168.31.74:8081";

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
export const DistrictGetEntity = (Interface,keyId) => {
  return axios.request({
    url: apiUrl + "/api/"+ Interface + "/GetEntity?keyId=" + keyId,
    method: "get"
  });
};









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
    url: apiUrl + "/api/" + Interface + "/GetEntity?keyId=" + keyId,
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
//批量删除数据
export const BatchDelete = (Interface, keyId) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/BatchDelete",
    data: keyId,
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
export const GetBusinessUnit = (Interface, businessGroup) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/GetBusinessUnit?businessGroup=" + businessGroup,
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
// 获取数据字典分类结构
export const DataDictionaryGetDataCatalog = () => {
  return axios.request({
    url: apiUrl + "/api/DataDictionary/GetDataCatalog",
    method: "get"
  });
};


//未分配权限
export const GetUnAssignedPermission = (Interface, roleId) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/GetUnAssignedPermission?roleId=" + roleId,
    method: "get",
  });
};
//已分配权限
export const GetAssignedPermission = (Interface, roleId) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/GetAssignedPermission?roleId=" + roleId,
    method: "get",
  });
};
//增加删减权限接口
export const AssignedPermission = (Interface, Data) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/AssignedPermission",
    method: "post",
    data: Data,
  });
};

//增加修改课程阶段
export const AddOrUpdateCoursePhase = (Interface, Data) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/AddOrUpdateCoursePhase",
    method: "post",
    data: Data,
  });
};
//删除 课程阶段
export const CourseRemove = (CourseId, PhaseId) => {
  return axios.request({
    url: apiUrl + "/api/Course/RemovePhase?CourseId=" + CourseId + '&PhaseId=' + PhaseId,
    method: "post",
    //data:CourseRemoveData,
  });
};
//添加课包明细接口
export const AddOrUpdateCourse = (Interface, Data) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/AddOrUpdateCourse",
    data: Data,
    method: "post"
  });
};
//添加课包价格接口
export const AddOrUpdatePrice = (Interface, Data) => {
  return axios.request({
    url: apiUrl + "/api/" + Interface + "/AddOrUpdatePrice",
    data: Data,
    method: "post"
  });
}
//添加订单
export const CustomerOrderPurchaseOrder = Data => {
  return axios.request({
    url: apiUrl + "/api/CustomerOrder/PurchaseOrder",
    data: Data,
    method: "post"
  });
}
//删除订单
export const CustomerOrderBatchDeleteOrder = Data => {
  return axios.request({
    url: apiUrl + "/api/CustomerOrder/BatchDeleteOrder",
    data: Data,
    method: "post"
  });
}
//修改订单
export const CustomerOrderUpdateOrder = Data => {
  return axios.request({
    url: apiUrl + "/api/CustomerOrder/UpdateOrder",
    data: Data,
    method: "post"
  });
}
//订单支付
export const CustomerOrderPaymentOrder = Data => {
  return axios.request({
    url: apiUrl + "/api/CustomerOrder/PaymentOrder",
    data: Data,
    method: "post"
  });
}
//取消订单
export const CustomerOrderCancelOrderRequest = Data => {
  return axios.request({
    url: apiUrl + "/api/CustomerOrder/CancelOrderRequest",
    data: Data,
    method: "post"
  });
}
//添加权益金的阶梯
export const RoyaltyCodeAddOrUpdateLadder = Data => {
  return axios.request({
    url: apiUrl + "/api/RoyaltyCode/AddOrUpdateLadder",
    data: Data,
    method: "post"
  });
}
//删除权益金的阶梯
export const RoyaltyCodeRemoveLadder = (royaltyId, detailId) => {
  return axios.request({
    url: apiUrl + "/api/RoyaltyCode/RemoveLadder?royaltyId=" + royaltyId + "&detailId=" + detailId,
    method: "post"
  });
}
//查看订单交易记录
export const GetTransactionJournalByOrder = (OrderId) => {
  return axios.request({
    url: apiUrl + "/api/Transaction/GetTransactionJournalByOrder?OrderId=" + OrderId + "&IncludeDeposit=true",
    method: "get"
  });
}
// 排课

// 查询天课表
export const EducationalGetTimeTableByDate = Data => {
  return axios.request({
    url: apiUrl + "/api/Educational/GetTimeTableByDate",
    data: Data,
    method: "post"
  });
}
//查询周课表摘要汇总信息
export const EducationalGetTimeTableSummaryByWeek = (StoreId,DateInQuery) => {
  return axios.request({
    url: apiUrl + "/api/Educational/GetTimeTableSummaryByWeek?StoreId="+StoreId+"&DateInQuery="+DateInQuery,
    method: "get"
  });
}
//查询月课表摘要汇总信息
export const EducationalGetTimeTableSummaryByMonth = (StoreId,DateInQuery) => {
  return axios.request({
    url: apiUrl + "/api/Educational/GetTimeTableSummaryByMonth?StoreId="+StoreId+"&DateInQuery="+DateInQuery,
    method: "get"
  });

}
//获取加盟商门店信息
//获取直营门店
//获取所有大区的数据 
export const GetDirectStore = () => {
  return axios.request({
    url: apiUrl + "/api/BusinessStore/GetDirectStore",
    method: "get"
  });
};
export const GetFranchiseStore = (FranchiserId) => {
  return axios.request({
    url: apiUrl + "/api/BusinessStore/GetFranchiseStore?FranchiserId="+ FranchiserId,
    method: "get"
  });
};

//单次排课
export const SingleArrangement = Data => {
  return axios.request({
    url: apiUrl + "/api/Educational/SingleArrangement",
    data: Data,
    method: "post"
  });
};
//阶段排课
export const BatchArrangement = Data => {
  return axios.request({
    url: apiUrl + "/api/Educational/BatchArrangement",
    data: Data,
    method: "post"
  });
}
//自定义排课
export const CustomArrangement = Data => {
  return axios.request({
    url: apiUrl + "/api/Educational/CustomArrangement",
    data: Data,
    method: "post"
  });
}
//通过订单学员添加学员到班级
export const AddMemberViaOrder = Data => {
  return axios.request({
    url: apiUrl + "/api/Classes/AddMemberViaOrder",
    data: Data,
    method: "post"
  });
}
//删除班级里的学员
export const RemoveMember = Data => {
  return axios.request({
    url: apiUrl + "/api/Classes/RemoveMember",
    data: Data,
    method: "post"
  });
}
//给学员更换班级
export const UpClasses = Data => {
  return axios.request({
    url: apiUrl + "/api/Classes/UpClasses",
    data: Data,
    method: "post"
  });
}


