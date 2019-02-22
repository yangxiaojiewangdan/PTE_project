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
			<DatePicker v-model="StartEndDate" type="daterange" @on-change="queryData;StartEndDate=$event" format="yyyy-MM-dd" placeholder="请选择" style="width: 300px;margin-left:20px;"></DatePicker>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">班级名称：</h3>
			<Select v-model="model11" filterable style="width:200px;margin-left:20px;">
				<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">教室：</h3>
			<Select v-model="model11" filterable style="width:200px;margin-left:20px;">
				<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">班主任：</h3>
			<Select v-model="model11" filterable style="width:200px;margin-left:20px;">
				<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			</Col>
			<Button class="tableTops" @click="timeCourse">排课</Button>
			</Col>
		</Row>
		<RowCourse v-if="true"></RowCourse>
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
			<Row>
				<Col span="6" style="border-right: 1px solid #999999;">
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
					<Col span="20">
					<FormItem label="门店名称" prop="Store">
						<Input v-model="formValidate.Store" placeholder="请输入" disabled></Input>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="班级名称" prop="ClassesName">
						<Select v-model="formValidate.ClassesName">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="教室" prop="ClassRoom">
						<Select v-model="formValidate.ClassRoom">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="开课/结课日期" prop="time">
						<DatePicker v-model="formValidate.time" type="daterange" @on-change="queryData" format="yyyy-MM-dd" placeholder="请选择"></DatePicker>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="班主任" prop="ClassesLeader">
						<Select v-model="formValidate.ClassesLeader">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="20">
					<FormItem label="授课老师" prop="Teacher">
						<Select v-model="formValidate.Teacher">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
				<Col span="24" push="21">
				<Button class="tableTops" @click="SearchModal"style="margin-bottom: 10px;">添加上课学员</Button>
				</Col>
				<Col span="24" push="1">
				<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="StudentData" :columns="StudentDataHeader" @on-delete="handleDeleteDetail" border stripe @on-row-dblclick="dblclickUpDetail" />
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
		<SearchStuden v-if="SearchStuden"></SearchStuden>
	</div>
</template>

<script>
	import Tables from "_c/tables";
	import RowCourse from "_c/RowCourse";
	import SearchStuden from "_c/SearchStuden";
	import { AddOrUpdateCourse, AddOrUpdatePrice, RemoveCourse, RemovePrice } from '@/api/data'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities } from '@/api/api'
	export default {
		name: 'classes',
		components: {
			Tables,
			RowCourse,
			SearchStuden
		},
		inject: ["reload"],
		data() {
			return {
				Interface: 'Classes',
				StartEndDate: '',
				querySelect: '',
				querySelectList: [],
				queryvalue: '',
				StudentData: [],
				StudentData2: [],
				classesStuden:[],
				SearchStuden:false,
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

					},
				],
				formValidate: {
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
				StudentDataHeader: [{
						type: "selection",
						width: 45
					},
					{
						title: "订单号",
						key: "Status",
						sortable: true,

					},
					{
						title: "姓名",
						key: "Status",
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
						key: "Status",
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
				classesData: [],
				delModal: false,
				AddDepartment: false,
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
			}
		},
		methods: {
			queryData() {

			},
			Add() {
				this.AddDepartment = true;
			},
			deleteList() {

			},
			BatchDelete() {

			},
			CancelBatchDelete() {

			},
			dblclickUpData() {

			},
			allselectionId() {

			},
			allcancelselectionId() {

			},
			ok() {

			},
			cancel() {

			},
			queryData() {

			},
			handleDeleteDetail() {

			},
			dblclickUpDetail() {

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

					}
				})
			},
			timeCourse(){
				
			},
			SearchModal(){
				this.SearchStuden = !this.SearchStuden;
			}

		},
		mounted() {
			//获取已有的班级
			GetEntities(this.Interface, this.getTableData).then(res => {
				this.classesData = res.data
				console.log(this.classesData)
			}).catch(err => {
				console.log(err)
			})
			//状态
			DataDictionaryGetEntities("CLASS_STATUS").then(res => {
				this.classesStuden = res.data;
				console.log(this.classesStuden)
			}).catch(err => {
				console.log(err)
			});
			//登陆者信息
			let userInfo = sessionStorage.getItem('userInfo');
			let userData = JSON.parse(userInfo);
			console.log(userData)
		}
	}
</script>

<style lang="less" scoped>
	.Col {
		margin-top: 16px;
	}
</style>