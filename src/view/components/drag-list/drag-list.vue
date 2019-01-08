<template>
	<div>
		<Row>
			<Col span="24" style="height:50px;">
			<h1 class="queryHeader">课程信息</h1>
			</Col>
		</Row>
		<!--查询条件-->
		<Row>
			<Col span="24" class="querycriteria" style="height: 160px;">
			<Col span="24" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">业务类型：</h3>
			<Button @click="allinformationData" type="text" class="tableTops">全部</Button>
			<RadioGroup v-model="button1" type="button">
				<Radio label="北京"></Radio>
				<Radio label="上海"></Radio>
				<Radio label="深圳"></Radio>
				<Radio label="杭州"></Radio>
			</RadioGroup>
			</Col>
			<Col span="24" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">课程类型：</h3>
			<Button @click="allinformationData" type="text" class="tableTops">全部</Button>
			<RadioGroup v-model="button1" type="button">
				<Radio label="北京"></Radio>
				<Radio label="上海"></Radio>
				<Radio label="深圳"></Radio>
				<Radio label="杭州"></Radio>
			</RadioGroup>
			</Col>
			<Col span="24" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">销课方式：</h3>
			<Button @click="allinformationData" type="text" class="tableTops">全部</Button>
			<RadioGroup v-model="button1" type="button">
				<Radio label="北京"></Radio>
				<Radio label="上海"></Radio>
				<Radio label="深圳"></Radio>
				<Radio label="杭州"></Radio>
			</RadioGroup>
			</Col>
			</Col>
		</Row>
		<!--增删改查-->
		<Row>
			<Col span="15" class="queryEnd">
			<h2>查询结果</h2>
			</Col>
			<Col span="8">
			<div class="tableTop">
				<Button type="success" class="tableTops" @click="AddDepartment = true">添加</Button>
				<Button @click="deleteList" type="error" class="tableTops">删除</Button>
				<Select v-model="querySelect" :label-in-value="true" style="width:120px">
					<Option v-for="item in querySelectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input v-model="queryvalue" placeholder="请输入" style="width: 150px" class="tableTops" />
				<Button type="primary" class="tableTops">查询</Button>
			</div>
			</Col>
			<Col span="24">
			<!-- 表格 -->
			<Table height="550" size="small" highlight-row stripe border ref="selection" :columns="CourseTable" :data="CourseData" @on-select="BatchDelete" @on-row-dblclick="dblclickUpData" @on-select-all="BatchDelete"></Table>
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
		<!--添加信息弹框-->
		<Modal v-model="AddDepartment" width="1400" title="添加课程信息" :mask-closable="false">
			<Form ref="CourseForm" :model="CourseForm" :rules="ruleValidate" :label-width="80" inline>
				<Row>
					<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">添加课程信息</Divider>
					<FormItem label="课程代码" prop="Code">
						<Input v-model="CourseForm.Code" placeholder="请输入" style="width:200px"></Input>
					</FormItem>

					<FormItem label="课程名称" prop="CousreName">
						<Input v-model="CourseForm.CousreName" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="课程类型" prop="CourseType">
						<Select v-model="CourseForm.CourseType" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>

					<FormItem label="课时数" prop="Periods">
						<Input v-model="CourseForm.Periods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="销课划课" prop="CountType">
						<Select v-model="CourseForm.CountType" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem label="上级代码" prop="ParentId">
						<Input v-model="CourseForm.ParentId" placeholder="请输入" style="width:200px"></Input>
					</FormItem>

					<FormItem label="所属业务群" prop="BusinessGroup">
						<Input v-model="CourseForm.BusinessGroup" placeholder="请输入" style="width:200px"></Input>
					</FormItem>

					<FormItem label="业务类型" prop="BusinessType">
						<Select v-model="CourseForm.BusinessType" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<Col span="18">
					<FormItem label="课程描述" prop="Description">
						<Input v-model="CourseForm.Description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width: 600px;"></Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="启用" prop="Enabled">
						<i-switch v-model="CourseForm.Enabled" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">添加阶段信息</Divider>
					<!--阶段信息表-->
					<Table border :columns="stageHeader" :data="stage">
						<template slot-scope="{ row }" slot="name">
							<strong>{{ row.name }}</strong>
						</template>
						<template slot-scope="{ row, index }" slot="action">
							<Button type="error" size="small" @click="remove(index)">删除</Button>
						</template>
					</Table>
				</Row>
			</Form>
			<div slot="footer">
				<div class="footer_left">
					<div class="footer_left1">
						<div><span>创建人:闫子健</span></div>
						<div><span>更新人:闫子健</span></div>
					</div>
					<div class="footer_left2">
						<div><span>创建时间:2018/12/13/ 13:00:00</span></div>
						<div><span>更新时间:2018/12/13/ 13:00:00</span></div>
					</div>
				</div>
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset('CourseForm');AddDepartment = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit('CourseForm');">
                        <span>确定</span>
                    </button>
			</div>
		</Modal>
		<!-- 添加信息 弹出框 end-->
	</div>
</template>
<script>
	import { CourseData, CourseCreate } from '@/api/data'
	export default {
		name: 'drag_list_page',
		data() {
			return {
				button1: '',
				querySelect: '',
				querySelectList: '',
				queryvalue: "",
				delModal: false,
				AddDepartment: false,
				CourseData: [],
				CourseData1: {
					"Filters": {},
				},
				CourseTable: [{
						type: "selection",
						width: 45
					},
					{
						title: "所属业务群",
						key: "BusinessGroup",

						sortable: true
					},
					{
						title: "业务类型",
						key: "BusinessType",

						sortable: true
					},
					{
						title: "课程代码",
						key: "Code",

						sortable: true
					},
					{
						title: "课程名称",
						key: "CousreName",

						sortable: true
					},
					{
						title: "课程描述",
						key: "Description",

						sortable: true
					},
					{
						title: "课程类型",
						key: "CourseType",

						sortable: true
					},
					{
						title: "课时数",
						key: "Periods",

						sortable: true
					},
					{
						title: "销课划课方式",
						key: "CountType",

						sortable: true
					},
					{
						title: "启用",
						key: "Enabled",

						sortable: true
					},
					{
						title: "创建人",
						key: "CreateBy",

						sortable: true
					},
					{
						title: "创建时间",
						key: "CreateOn",

						sortable: true
					},
				],
				ruleValidate: {},
				CourseForm: {
					ParentId: '',
					BusinessGroup: '',
					BusinessType: '',
					Code: '',
					CousreName: '',
					Description: '',
					CourseType: '',
					Periods: '',
					CountType: '',
					Enabled: true,
				},
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
				stage: [{
					CousreId: '1',
					PhaseName: '1',
					Description: '1',
					Periods: '1',
					MinMonth: '1',
					MaxMonth: '1',
					MinAge: '1',
					MaxAge: '1',
					Duration: '1',
					CountType:'1'
					
				}, ],
				stageHeader: [{
						title: "课程Id",
						key: "CousreId",
						editable: true
					},
					{
						title: "阶段名称",
						key: "PhaseName",
						editable: true
					},
					{
						title: "阶段描述",
						key: "Description",
						editable: true
					},
					{
						title: "销课方式",
						key: "CountType",
						editable: true
					},
					{
						title: "课时数",
						key: "Periods",
						editable: true
					},
					{
						title: "课时长",
						key: "Duration",
						editable: true
					},
					{
						title: "适合最小月龄",
						key: "MinMonth",
						editable: true
					},
					{
						title: "适合最大月龄",
						key: "MaxMonth",
						editable: true
					},
					{
						title: "适合最小年龄",
						key: "MinAge",
						editable: true
					}, {
						title: "适合最大年龄",
						key: "MaxAge",
						editable: true
					},
					{
						title: "操作",
						slot: 'action',
						width: 170,
						align: 'center'
					}
				],
			}
		},
		methods: {
			remove(index) {
				this.stage.splice(index, 1);
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						CourseCreate(this.CourseForm).then(res => {
							console.log(res)
							this.$Message.success('添加成功!');
							this.reload();
						}).catch(err => {
							this.$Message.error('添加失败!');
							console.log(err)
						})
					} else {
						this.$Message.error('失败!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消添加联系人信息');
			},
			//查询全部
			allinformationData() {

			},
			//删除数据
			deleteList() {
				//				if(this.batchArr.length == 0) {
				//					this.$Message.info('请先选中删除的数据');
				//				} else {
				//					this.delModal = true;
				//				}
			},
			BatchDelete() {

			},
			dblclickUpData() {

			},
			ok() {

			},
			cancel() {

			},
		},
		mounted() {
			//获取信息接口
			CourseData(this.CourseData1).then(res => {
				console.log(res.data)
				this.CourseData = res.data;
			}).catch(err => {
				console.log(err)
			})
		}
	}
</script>
<style lang="less" scoped>
	.Col {
		margin-top: 16px;
	}
</style>