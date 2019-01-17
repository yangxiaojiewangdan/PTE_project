import axios from "@/libs/api.request";
//url变量
export const apiUrl = "http://192.168.31.74:8081";

//未分配权限
export const GetUnAssignedPermission = (Interface,roleId) => {
	return axios.request({
		url: apiUrl + "/api/" + Interface + "/GetUnAssignedPermission?roleId=" + roleId,
		method: "get",
	});
};
//已分配权限
export const GetAssignedPermission = (Interface,roleId) => {
	return axios.request({
		url: apiUrl + "/api/" + Interface + "/GetAssignedPermission?roleId=" + roleId,
		method: "get",
	});
};
//增加删减权限接口
export const AssignedPermission =  (Interface, Data) => {
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