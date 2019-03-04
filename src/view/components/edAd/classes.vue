<template>
	<div class="classes">
		<Row>
			<Col span="24" style="height:50px;">
			<h1 class="queryHeader">班级信息</h1>
			</Col>
		</Row>
		<!--查询条件-->
		<Row>
			<Col span="24" class="querycriteria" style="height: 120px;">
			<Col span="24" class="Col">
			<h3 class="queryquery">开课/结课日期：</h3>
			<DatePicker v-model="queryClassesData" type="daterange" @on-change="queryData;StartEndDate=$event" format="yyyy-MM-dd" placeholder="请选择" style="width: 300px;margin-left:20px;"></DatePicker>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">班级名称：</h3>
			<Select v-model="queryClassesName" filterable style="width:200px;margin-left:20px;" @on-change="ConditionalQuery">
				<Option v-for="item in classesData" :value="item.Id" :key="item.value">{{ item.ClassesName }}</Option>
			</Select>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">教室：</h3>
			<Select v-model="queryClassesRoom" filterable style="width:200px;margin-left:20px;" @on-change="ConditionalQuery">
				<Option v-for="item in classesRoomLIst" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
			</Select>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">班主任：</h3>
			<Select v-model="queryClassesLeader" filterable style="width:200px;margin-left:20px;" @on-change="ConditionalQuery">
				<Option v-for="item in peopleUserList" :value="item.Id" :key="item.value">{{ item.LastName }}</Option>
			</Select>
			</Col>
			<Button class="tableTops" @click="timeCourse">排课</Button>
			<Button class="tableTops" @click="timeCourse1">排课</Button>
			</Col>
		</Row>
		<!--增删改查按钮-->
		<Row>
			<Col span="15" class="queryEnd">
			<h2>查询结果</h2>
			</Col>
			<Col span="8">
			<div class="tableTop">
				<Button class="tableTops" @click="Add">添加</Button>
				<Button @click="deleteList" class="tableTops">删除</Button>
				<Select v-model="querySelect" :label-in-value="true" style="width:120px">
					<Option v-for="item in querySelectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input v-model="queryvalue" placeholder="请输入" style="width: 150px" class="tableTops" />
				<Button type="primary" class="tableTops">查询</Button>
			</div>
			</Col>
			<Col span="24">
			<!-- 表格 -->
			<Table height="550" size="small" highlight-row stripe border ref="selection" :columns="classes" :data="classesData" @on-select="BatchDelete" @on-select-cancel="CancelBatchDelete" @on-row-dblclick="dblclickUpData" @on-select-all="allselectionId" @on-select-all-cancel="allcancelselectionId"></Table>

			</Col>
			<Col span="24">
			<!-- 分页 -->
			<Page :total="100" class="page" />
			</Col>

		</Row>
		<!--确定删除弹框-->
		<Modal v-model="delModal" title="提示" @on-ok="ok" @on-cancel="cancel">
			<h2>确定删除此数据？</h2>
		</Modal>
		<!--添加弹框-->
		<Modal v-model="AddDepartment" width="1300" title="添加班级信息" :mask-closable="false">
			<p slot="header" id="Modal_header">
				<span v-if="add">添加班级</span>
				<span v-if="see">查看班级</span>
			</p>
			<Row>
				<Col span="6" style="border-right: 1px solid #999999;">
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
					<Col span="20">
					<!--<FormItem label="门店名称" prop="Store">
						<Input v-model="formValidate.Store" placeholder="请输入" disabled></Input>
					</FormItem>-->
					<FormItem label="门店名称" prop="Store">
						<Select v-model="formValidate.Store" @on-change="selectStore">
							<Option v-for="item in storeList" :value="item.Description" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="班级名称" prop="ClassesName">
						<!--<Select v-model="formValidate.ClassesName">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>-->
						<Input v-model="formValidate.ClassesName" placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="教室" prop="ClassRoom">
						<Select v-model="formValidate.ClassRoom">
							<Option v-for="item in classesRoomLIst" :value="item.Description" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="开课/结课日期" prop="time">
						<DatePicker v-model="formValidate.time" type="daterange" @on-change="queryData" format="yyyy-MM-dd" placeholder="请选择"></DatePicker>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="授课老师" prop="Teacher">
						<Select v-model="formValidate.Teacher" @on-change="selectTeach">
							<Option v-for="item in peopleUserList" :value="item.LastName" :key="item.value">{{ item.LastName }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="班主任" prop="ClassesLeader">
						<Select v-model="formValidate.ClassesLeader" @on-change="selectClassesLeader">
							<Option v-for="item in peopleUserList" :value="item.LastName" :key="item.value">{{ item.LastName }}</Option>
						</Select>
					</FormItem>
					</Col>

					<Col span="20">
					<FormItem label="状态" prop="Status">
						<Select v-model="formValidate.Status">
							<Option v-for="item in classesStuden" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="班级描述" prop="Description">
						<Input v-model="formValidate.Description" type="textarea" placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<FormItem label="班主任ID" v-if="false">
						<Input v-model="formValidate.ClassesLeaderId"></Input>
					</FormItem>
					<FormItem label="授课老师ID" v-if="false">
						<Input v-model="formValidate.TeacherId"></Input>
					</FormItem>
					<FormItem label="门店ID" v-if="false">
						<Input v-model="formValidate.StoreId"></Input>
					</FormItem>
					<FormItem label="开课日期" v-if="false">
						<Input v-model="formValidate.OpenDate"></Input>
					</FormItem>
					<FormItem label="结课日期" v-if="false">
						<Input v-model="formValidate.CloseDate"></Input>
					</FormItem>
				</Form>
				</Col>
				<Col span="17">
				<Col span="1" push="22">
				<Button class="tableTops" @click="SearchModal" style="margin-bottom: 10px;">添加上课学员</Button>
				</Col>
				<Col span="24" push="1">
				<tables disabled-hover search-place="top" height="400" ref="tables" size="small" editable v-model="StudentData" :columns="StudentDataHeader" @on-delete="handleDeleteDetail" border stripe @on-row-dblclick="dblclickUpDetail" />
				</Col>
				</Col>
			</Row>
			<div slot="footer">
				<div class="footer_left">
					<div class="footer_left1">
						<div>
							<span>创建人:</span>
							<span>{{ formValidate.CreateByName }}</span>
						</div>
						<div>
							<span>更新人:</span>
							<span>{{ formValidate.UpdateByName }}</span>
						</div>
					</div>
					<div class="footer_left2">
						<div>
							<span>创建时间:</span>
							<span>{{ formValidate.CreateOn }}</span>
						</div>
						<div>
							<span>更新时间:</span>
							<span>{{ formValidate.UpdateOn }}</span>
						</div>
					</div>
				</div>
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset('formValidate');AddDepartment = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit('formValidate');">
                        <span>确定</span>
                   </button>
			</div>
		</Modal>
		<!--分班弹框-->
		<Modal v-model="upClassesDepartment" width="600" title="分班" :mask-closable="false">
			<Row>
				<Col span="24">
				<p class="Classes">所在班级</p>
				<Input v-model="FromClasses" class="selectClasses" disabled></Input>
				</Col>
				<Col span="24">
				<p class="Classes">目标班级</p>
				<Select v-model="ToClasses" class="selectClasses" @on-change="SelectToClasses">
					<Option v-for="item in classesData" :value="item.Id" :key="item.value">{{ item.ClassesName }}</Option>
				</Select>
				</Col>
				<Col span="24">
				<p class="Classes">备注说明</p>
				<Input type="textarea" v-model="CommentsClasses" class="selectClasses"></Input>
				</Col>
			</Row>
			<div slot="footer">
				<div class="footer_left">
					<div class="footer_left1">
						<div>
							<span>创建人:</span>
							<span>{{ formValidate.CreateByName }}</span>
						</div>
						<div>
							<span>更新人:</span>
							<span>{{ formValidate.UpdateByName }}</span>
						</div>
					</div>
					<div class="footer_left2">
						<div>
							<span>创建时间:</span>
							<span>{{ formValidate.CreateOn }}</span>
						</div>
						<div>
							<span>更新时间:</span>
							<span>{{ formValidate.UpdateOn }}</span>
						</div>
					</div>
				</div>
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleResetAdd;AddDepartment = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmitAdd">
                        <span>确定</span>
                   </button>
			</div>
		</Modal>
		<SearchStuden v-on:childStudenList="childStudenList" v-if="aaa" :inputName="classesId"></SearchStuden>
		<RowCourse v-if="bbb"></RowCourse>
		<stageScheduling v-if="ccc"></stageScheduling>
	</div>
</template>

<script>
	import Tables from "_c/tables";
	import RowCourse from "_c/RowCourse";
	import StageScheduling from "_c/StageScheduling";
	import SearchStuden from "_c/SearchStuden";
	import { AddOrUpdateCourse, AddOrUpdatePrice, RemoveCourse, RemovePrice } from '@/api/data'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities, DistrictGetEntity, RemoveMember, UpClasses } from '@/api/api'
	export default {
		name: 'classes',
		components: {
			Tables,
			RowCourse,
			SearchStuden,
			StageScheduling
		},
		inject: ["reload"],
		data() {
			return {
				Interface: 'Classes',
				queryClassesName:'',
				queryClassesRoom:'',
				queryClassesLeader:'',
				queryClassesData:'',
				StartEndDate: '',
				querySelect: '',
				querySelectList: [],
				queryvalue: '',
				StudentData2: [],
				classesStuden: [],
				SearchStuden: false,
				getTableData: {
					Filters: {}
				},
				classes: [{
						type: "selection",
						width: 45
					},
					{
						title: "门店名称",
						key: "Store",
						sortable: true,

					},
					{
						title: "班级名称",
						key: "ClassesName",
						sortable: true,
						width: 120,

					},
					{
						title: "教室",
						key: "ClassRoom",
						sortable: true,

					},
					{
						title: "班级描述",
						key: "Description",
						sortable: true,
						width: 250,
					},
					{
						title: "开课日期",
						key: "OpenDate",
						sortable: true,

					},
					{
						title: "结课日期",
						key: "CloseDate",
						sortable: true,

					},
					{
						title: "授课老师",
						key: "Teacher",
						sortable: true,

					},
					{
						title: "班主任",
						key: "ClassesLeader",
						sortable: true,

					},
					{
						title: "状态",
						key: "Status",
						sortable: true,
						render: (h, params) => {
							let texts = "";
							if(params.row.Status == 0) {
								texts = "准备开课";
							} else if(params.row.Status == 1) {
								texts = "已开课";
							} else if(params.row.Status == 2) {
								texts = "已结课";
							} else if(params.row.Status == 3) {
								texts = '取消'
							}
							return h(
								"div", {
									props: {}
								},
								texts
							);
						}

					},
				],
				formValidate: {
					BusinessGroup: '',
					Id: '',
					StoreId: '',
					Store: '',
					ClassRoom: '',
					ClassesName: '',
					Description: '',
					OpenDate: '',
					CloseDate: '',
					TeacherId: '',
					Teacher: '',
					ClassesLeaderId: '',
					ClassesLeader: '',
					Status: '',
					time: [],

				},
				StudentData: [],
				StudentDataHeader: [{
						type: "selection",
						width: 45
					},
					{
						title: "订单号",
						key: "OrderNo",
						sortable: true,

					},
					{
						title: "姓名",
						key: "LastName",
						sortable: true,
						width: 80

					},
					{
						title: "昵称",
						key: "Status",
						sortable: true,
						width: 80

					},
					{
						title: "订单类型",
						key: "OrderType",
						sortable: true,
						width: 120

					},
					{
						title: "总课时",
						key: "Status",
						sortable: true,
						width: 100

					},
					{
						title: "已销课时",
						key: "Status",
						sortable: true,
						width: 120

					},
					{
						title: "剩余课时",
						key: "Status",
						sortable: true,
						width: 120

					},
					{
						title: "操作",
						key: "handle",
						width: 70,
						options: ["delete"]
					}

				],

				ruleValidate: {

				},
				name1: '',
				classesData: [],
				delModal: false,
				AddDepartment: false,
				upClassesDepartment: false,
				aaa: false,
				bbb: false,
				ccc: false,
				add: '',
				see: '',
				model11: '',
				cityList: [{
						value: 'New York',
						label: 'New York'
					},
					{
						value: 'London',
						label: 'London'
					},
					{
						value: 'Sydney',
						label: 'Sydney'
					},
				],
				//门店数组
				storeList: [],
				//教室数组
				classesRoomLIst: [],
				//人员实体
				peopleUserList: [],
				//批量选中
				BatchDeleteList: [],
				//确定后生成的班级
				classesId: '',
				detailedClassesId: '',
				removeClassesId: '',
				ToClasses: '',
				ToClassesId: '',
				FromClasses: "",
				FromClassesId: '',
				CommentsClasses: '',
				branchClasses: '',
			}
		},
		methods: {
			Add() {
				this.formValidate = [];
				this.StudentData = [];
				this.AddDepartment = true;
				this.add = true;
				this.see = false;
			},
			deleteList() {
				if(this.BatchDeleteList.length == 0) {
					this.$Message.info("请先选中删除的数据");
				} else {
					this.delModal = true;
				}
			},
			BatchDelete(selection, row) {
				for(var i = 0; i < selection.length; i++) {
					this.BatchDeleteList.push(selection[i].Id);
				};

				function uniq(array) {
					var temp = []; //一个新的临时数组
					for(var i = 0; i < array.length; i++) {
						if(temp.indexOf(array[i]) == -1) {
							temp.push(array[i]);
						}
					}
					return temp;
				};
				this.BatchDeleteList = uniq(this.BatchDeleteList)
			},
			CancelBatchDelete(selection, row) {
				function removeByValue(arr, val) {  
					for(var i = 0; i < arr.length; i++) {    
						if(arr[i] == val) {      
							arr.splice(i, 1);      
							break;    
						}  
					}
				}
				removeByValue(this.BatchDeleteList, row.Id);
			},
			dblclickUpData(index) {
				console.log(index)
				this.detailedClassesId = index.Id
				this.FromClasses = index.ClassesName
				this.add = false;
				this.see = true;
				this.AddDepartment = true;
				this.formValidate = index;
				DistrictGetEntity(this.Interface, this.detailedClassesId).then(res => {
					console.log(res.data.ClassesMemberCollection)
					this.StudentData = res.data.ClassesMemberCollection
					console.log(this.StudentData)
				}).catch(err => {
					console.log(err)
				})
			},
			//全选
			allselectionId(selection) {
				for(var i = 0; i < selection.length; i++) {
					this.BatchDeleteList.push(selection[i].Id);
				}
			},
			//取消全选
			allcancelselectionId(selection) {
				this.BatchDeleteList = selection
			},
			ok() {
				BatchDelete(this.Interface, this.BatchDeleteList).then(res => {
					this.$Message.success('删除成功!')
					this.reload();
				}).catch(err => {
					this.$Message.error('删除失败!')
					console.log(err)
				})
				this.reload();
			},
			cancel() {
				this.$Message.info('已取消');
			},
			queryData() {

			},
			//移除班级学员
			handleDeleteDetail(params) {
				this.removeClassesId = params.row.Id
				RemoveMember({
					ClassesId: this.detailedClassesId,
					ClassesMemberId: [this.removeClassesId]
				}).then(res => {
					console.log(res.data)
					this.$Message.success('移除成功!')
				}).catch(err => {
					console.log(err)
				})
			},
			//双击分班
			dblclickUpDetail(index) {
				console.log(index)
				this.upClassesDepartment = true;
				this.FromClassesId = index.ClassesId
				this.branchClasses = index.Id
			},
			//取消添加
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
			},
			//确认添加
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.add = true) {
							Create(this.Interface, this.formValidate).then(res => {
								console.log(res.data)
								this.classesId = res.data.Data.Id;
								this.$Message.info('请添加班级学员');
							}).catch(err => {
								console.log(err)
							})
						} else if(this.see = true) {
							Update(this.Interface, this.formValidate).then(res => {
								console.log(res.data)
							}).catch(err => {
								console.log(err)
							})
						}

					}
				})
			},
			timeCourse() {
				this.bbb = !this.bbb
			},
			timeCourse1() {
				this.ccc = !this.ccc
			},
			SearchModal() {
				this.name1 = true;
				console.log(this.name1)
				this.aaa = !this.aaa
			},
			selectStore(value) {
				this.formValidate.StoreId = value;
			},
			childByValue(childValue) {
				this.name = childValue
				console.log(this.name)
			},
			//子组件传来的学员订单
			childStudenList(childValue) {
				console.log(childValue.Data.ClassesMemberCollection)
			},
			selectTeach(value) {
				this.formValidate.TeacherId = value;
			},
			selectClassesLeader(value) {
				this.formValidate.ClassesLeaderId = value;
			},
			SelectToClasses(value) {
				this.ToClassesId = value
			},
			handleResetAdd() {
				this.$Message.info('已取消');
			},
			handleSubmitAdd() {
				UpClasses({
					TargetClassesId: this.ToClassesId,
					ClassesId: this.detailedClassesId,
					ClassesMemberId: [this.branchClasses],
					Comments: this.CommentsClasses
				}).then(res => {
					console.log(res.data)
					this.reload();
					this.$Message.success('分班成功!')
				}).catch(err => {
					console.log(err)
				})
			},
			//查询联动
//			ConditionalQuery() {
//				GetEntities(this.Interface, {
//					Relational: "And",
//					Conditions: [{
//							FilterField: ClassesName, //字段名
//							Relational: "Equal",
//							FilterValue: this.RadioBusinessType //字段名里面的值
//						},
//						{
//							FilterField: StoreType, //字段名
//							Relational: "Equal",
//							FilterValue: this.RadioStoreType //字段名里面的值
//						},
//						{
//							FilterField: Status, //字段名
//							Relational: "Equal",
//							FilterValue: this.RadioStatus //字段名里面的值
//						},
//						{
//							FilterField: this.querySelect, //字段名
//							Relational: "Contain",
//							FilterValue: this.queryvalue //字段名里面的值
//						}
//					]
//				}).then(res => {
//					console.log(res.data)
//				}).catch(err => {
//					console.log(err)
//				})
//			}

		},
		mounted() {
			//获取已有的班级
			GetEntities(this.Interface, this.getTableData).then(res => {
				this.classesData = res.data;
				console.log(this.classesData)
			}).catch(err => {
				console.log(err)
			})
			//状态
			DataDictionaryGetEntities("CLASS_STATUS").then(res => {
				this.classesStuden = res.data;
			}).catch(err => {
				console.log(err)
			});
			//门店
			GetEntities("BusinessStore", this.getTableData).then(res => {
				this.storeList = res.data
			}).catch(err => {
				console.log(err)
			})
			//获取教室
			GetEntities("ClassRoom", this.getTableData).then(res => {
				this.classesRoomLIst = res.data;
			}).catch(err => {
				console.log(err)
			})
			//人员实体
			GetEntities("BusinessUser", this.getTableData).then(res => {
				this.peopleUserList = res.data;
			}).catch(err => {
				console.log(err)
			})
			//登陆者信息
			let userInfo = sessionStorage.getItem('userInfo');
			let userData = JSON.parse(userInfo);
			this.formValidate.BusinessGroup = userData.BusinessGroup
		}
	}
</script>

<style lang="less" scoped>
	.Col {
		margin-top: 16px;
	}
	
	.Classes {
		display: inline-block;
		margin-bottom: 30px;
		margin-right: 16px;
	}
	
	.selectClasses {
		display: inline-block;
		width: 80%;
	}
</style>