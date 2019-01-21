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
				<Radio v-for="item in radioList" :label="item.Code">
					<span>{{item.Description}}</span>
				</Radio>
			</RadioGroup>
			</Col>
			<Col span="24" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">销课方式：</h3>
			<Button @click="allinformationData" type="text" class="tableTops">全部</Button>
			<RadioGroup v-model="button1" type="button">
				<Radio v-for="item in Destruction" :label="item.Id">
					<span>{{item.Description}}</span>
				</Radio>
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
			<Table height="550" size="small" highlight-row stripe border ref="selection" :columns="CourseTable" :data="CourseData" @on-select="BatchDelete" @on-select-cancel="CancelBatchDelete" @on-row-dblclick="dblclickUpData" @on-select-all="BatchDelete" @on-selection-change="wowowo"></Table>
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
		<Modal v-model="AddDepartment" width="1000" title="添加课程信息" :mask-closable="false">
			<Form ref="CourseForm" :model="CourseForm" :rules="ruleValidate" :label-width="85" inline>
				<Row>
					<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">添加课程信息</Divider>
					<FormItem label="课程代码" prop="Code">
						<Input v-model="CourseForm.Code" placeholder="请输入" style="width:200px"></Input>
					</FormItem>

					<FormItem label="课程名称" prop="CourseName">
						<Input v-model="CourseForm.CourseName" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="课程类型" prop="CourseType">
						<Select v-model="CourseForm.CourseType" style="width:200px">
							<Option v-for="item in radioList" :value="item.Code" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>

					<FormItem label="课时数" prop="Periods">
						<Input v-model="CourseForm.Periods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="销课划课方式" prop="CountType">
						<Select v-model="CourseForm.CountType" style="width:200px">
							<Option v-for="item in Destruction" :value="item.Id">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					<FormItem label="上级代码" prop="ParentId">
						<Input v-model="CourseForm.ParentId" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="所属业务群" prop="BusinessGroup">
						<!--<Select v-model="CourseForm.BusinessGroup" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>-->
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

					<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="dataRoyaltyCodeDetail" :columns="columnsRoyaltyCodeDetail" @on-delete="handleDelete" border stripe />

					<Button type="info" @click="AddRoyalty = true">
              <Icon type="md-add"/>添加阶段信息
            </Button>
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
		<!-- 添加阶段信息-->
		<Modal v-model="AddRoyalty" width="700" title="添加课程阶段信息" :mask-closable="false">
			<Form ref="stageForm" :model="stageForm" :rules="ruleValidate" :label-width="85" inline>
				<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">课程阶段详情</Divider>
				<FormItem label="课程Id" prop="CousreId">
					<Input v-model="stageForm.CousreId" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="阶段名称" prop="PhaseName">
					<Input v-model="stageForm.PhaseName" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="阶段描述" prop="Description">
					<Input v-model="stageForm.Description" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="销课划课方式" prop="CountType">
					<Select v-model="CourseForm.CountType" style="width:200px">
						<Option v-for="item in Destruction" :value="item.Id">{{ item.Description}}</Option>
					</Select>
				</FormItem>
				<FormItem label="课时数" prop="Periods">
					<Input v-model="stageForm.Periods" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="课时长" prop="Duration">
					<Input v-model="stageForm.Duration" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">课程适合年龄</Divider>
				<FormItem label="适合最小月龄" prop="MinMonth">
					<Input v-model="stageForm.MinMonth" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="适合最大月龄" prop="MaxMonth">
					<Input v-model="stageForm.MaxMonth" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="适合最小年龄" prop="MinAge">
					<Input v-model="stageForm.MinAge" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="适合最大年龄" prop="MaxAge">
					<Input v-model="stageForm.MaxAge" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
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
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="stagehandleSubmit('stageForm');">
                        <span>保存</span>
                    </button>
			</div>
		</Modal>
		<!--修改弹框-->
		<Modal v-model="UpDepartment" width="1000" title="修改课程信息" :mask-closable="false">
			<Form ref="UpCourseForm" :model="UpCourseForm" :rules="ruleValidate" :label-width="85" inline>
				<Row>
					<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">修改课程信息</Divider>
					<FormItem label="课程代码" prop="Code">
						<Input v-model="UpCourseForm.Code" placeholder="请输入" style="width:200px"></Input>
					</FormItem>

					<FormItem label="课程名称" prop="CourseName">
						<Input v-model="UpCourseForm.CourseName" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="课程类型" prop="CourseType">
						<Select v-model="UpCourseForm.CourseType" style="width:200px">
							<Option v-for="item in radioList" :value="item.Code" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>

					<FormItem label="课时数" prop="Periods">
						<Input v-model="UpCourseForm.Periods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="销课划课方式" prop="CountType">
						<Select v-model="UpCourseForm.CountType" style="width:200px">
							<Option v-for="item in Destruction" :value="item.Id">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					<FormItem label="上级代码" prop="ParentId">
						<Input v-model="UpCourseForm.ParentId" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="所属业务群" prop="BusinessGroup">
						<Select v-model="UpCourseForm.BusinessGroup" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>

					<FormItem label="业务类型" prop="BusinessType">
						<Select v-model="UpCourseForm.BusinessType" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<Col span="18">
					<FormItem label="课程描述" prop="Description">
						<Input v-model="UpCourseForm.Description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width: 600px;"></Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="启用" prop="Enabled">
						<i-switch v-model="UpCourseForm.Enabled" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">阶段信息</Divider>
					<!--阶段信息表-->

					<tables disabled-hover search-place="top" ref="tables" size="small" border stripe v-model="seedataRoyaltyCodeDetail" :columns="seecolumnsRoyaltyCodeDetail" @on-delete="handleDelete" />
					<Button type="info" @click="UpRoyalty = true">
              <Icon type="md-add"/>添加阶段信息
           </Button>
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
				<!--<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="UphandleReset('UpCourseForm');AddDepartment = false;">
                        <span>取消</span>
                    </button>-->
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="UphandleSubmit('UpCourseForm');">
                        <span>修改</span>
                    </button>
			</div>
		</Modal>
		<!--修改信息-->
		<Modal v-model="UpRoyalty" width="700" title="添加课程阶段信息" :mask-closable="false">
			<Form ref="UpstageForm" :model="UpstageForm" :rules="ruleValidate" :label-width="85" inline>
				<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">课程阶段详情</Divider>
				<FormItem label="课程Id" prop="CousreId">
					<Input v-model="UpstageForm.CousreId" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="阶段名称" prop="PhaseName">
					<Input v-model="UpstageForm.PhaseName" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="阶段描述" prop="Description">
					<Input v-model="UpstageForm.Description" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="销课划课方式" prop="CountType">
					<Select v-model="CourseForm.CountType" style="width:200px">
						<Option v-for="item in Destruction" :value="item.Id">{{ item.Description }}</Option>
					</Select>
				</FormItem>
				<FormItem label="课时数" prop="Periods">
					<Input v-model="UpstageForm.Periods" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="课时长" prop="Duration">
					<Input v-model="UpstageForm.Duration" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">课程适合年龄</Divider>
				<FormItem label="适合最小月龄" prop="MinMonth">
					<Input v-model="UpstageForm.MinMonth" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="适合最大月龄" prop="MaxMonth">
					<Input v-model="UpstageForm.MaxMonth" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="适合最小年龄" prop="MinAge">
					<Input v-model="UpstageForm.MinAge" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="适合最大年龄" prop="MaxAge">
					<Input v-model="UpstageForm.MaxAge" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
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
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="UpstagehandleSubmit('UpstageForm');">
                        <span>保存</span>
                    </button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import Tables from "_c/tables";
	import { CourseData, CourseCreate, CoursePhase, DataDictionary, CourseDelete, CourseRemove, CourseUpData } from '@/api/data'
	export default {
		name: 'drag_list_page',
		components: {
			Tables
		},
		inject: ["reload"],
		data() {
			return {
				button1: '',
				querySelect: '',
				querySelectList: '',
				queryvalue: "",
				delModal: false,
				AddDepartment: false,
				AddRoyalty: false,
				UpDepartment: false,
				UpRoyalty: false,
				radioList: [],
				Destruction: [],
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
						key: "CourseName",

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
						sortable: true,
						render: (h, params) => {
							let texts = "";
							if(params.row.Enabled == true) {
								texts = "是";
							} else if(params.row.Enabled == false) {
								texts = "否";
							}
							return h(
								"div", {
									props: {}
								},
								texts
							);
						}
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
					ParentId: "",
					BusinessGroup: '*',
					BusinessType: '',
					Code: '',
					CourseName: '',
					Description: '',
					CourseType: '',
					Periods: '',
					CountType: '',
					Enabled: true,
				},
				UpCourseForm: {
					ParentId: "",
					BusinessGroup: '',
					BusinessType: '',
					Code: '',
					CourseName: '',
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
				dataRoyaltyCodeDetail: [],
				seedataRoyaltyCodeDetail: [],
				columnsRoyaltyCodeDetail: [{
						title: "课程Id",
						key: "CousreId",
						width: 150,
						editable: true
					},
					{
						title: "阶段名称",
						key: "PhaseName",
						width: 150,
						editable: true
					},
					{
						title: "阶段描述",
						key: "Description",
						width: 150,
						editable: true
					},
					{
						title: "销课方式",
						key: "CountType",
						width: 150,
						editable: true
					},
					{
						title: "课时数",
						key: "Periods",
						width: 150,
						editable: true
					},
					{
						title: "课时长",
						key: "Duration",
						width: 150,
						editable: true
					},
					{
						title: "适合最小月龄",
						key: "MinMonth",
						width: 150,
						editable: true
					},
					{
						title: "适合最大月龄",
						key: "MaxMonth",
						width: 150,
						editable: true
					},
					{
						title: "适合最小年龄",
						key: "MinAge",
						width: 150,
						editable: true
					}, {
						title: "适合最大年龄",
						key: "MaxAge",
						width: 150,
						editable: true
					},
					{
						title: "操作",
						key: "handle",
						width: 70,
						options: ["delete"]
					}
				],
				seecolumnsRoyaltyCodeDetail: [{
						title: "课程Id",
						key: "CousreId",
						width: 150,
						editable: true
					},
					{
						title: "阶段名称",
						key: "PhaseName",
						width: 150,
						editable: true
					},
					{
						title: "阶段描述",
						key: "Description",
						width: 150,
						editable: true
					},
					{
						title: "销课方式",
						key: "CountType",
						width: 150,
						editable: true
					},
					{
						title: "课时数",
						key: "Periods",
						width: 150,
						editable: true
					},
					{
						title: "课时长",
						key: "Duration",
						width: 150,
						editable: true
					},
					{
						title: "适合最小月龄",
						key: "MinMonth",
						width: 150,
						editable: true
					},
					{
						title: "适合最大月龄",
						key: "MaxMonth",
						width: 150,
						editable: true
					},
					{
						title: "适合最小年龄",
						key: "MinAge",
						width: 150,
						editable: true
					}, {
						title: "适合最大年龄",
						key: "MaxAge",
						width: 150,
						editable: true
					},
					{
						title: "操作",
						key: "handle",
						width: 70,
						options: ["delete"]
					}
				],
				stageForm: {
					CousreId: "",
					PhaseName: '',
					Description: '',
					CountType: '',
					Periods: '',
					Duration: '',
					MinMonth: '',
					MaxMonth: '',
					MinAge: '',
					MaxAge: '',
				},
				UpstageForm: {
					CousreId: "",
					PhaseName: '',
					Description: '',
					CountType: '',
					Periods: '',
					Duration: '',
					MinMonth: '',
					MaxMonth: '',
					MinAge: '',
					MaxAge: '',
				},
				//多选选中的ID
				BatchDeleteList: [],
				aaa: [],
				//课程Id
				CourseId: '',
			}
		},
		methods: {
			//勾选中的那条数的Id
			BatchDelete(selection) {
				for(var i = 0; i < selection.length; i++) {
					this.BatchDeleteList.push(selection[i].Id);
				}
				function uniq(array) {
					var temp = []; //一个新的临时数组
					for(var i = 0; i < array.length; i++) {
						if(temp.indexOf(array[i]) == -1) {
							temp.push(array[i]);
						}
					}
					return temp;
				};
				console.log(uniq(this.BatchDeleteList))
			},

			//			//取消勾选的数据
			CancelBatchDelete(selection) {
				//console.log(selection)
//				for(var i = 0; i < selection.length; i++) {
//					this.aaa = selection[i].Id;
//				}
//				console.log(this.aaa)
//			
		},
		wowowo(selection) {
							//console.log(selection)
			//				console.log(selection.Id)
			//				selection.forEach(item => {
			//					console.log(item.Id)
			//					this.BatchDeleteList.push(item.Id)
			//				})
			//console.log(this.BatchDeleteList)

		},
		//添加课程并添加阶段
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				//保存阶段信息
				localStorage.setItem(
					"dataRoyaltyCodeDetail",
					JSON.stringify(this.dataRoyaltyCodeDetail)
				);
				if(valid) {
					CourseCreate(this.CourseForm).then(res => {
						console.log(res.data);
						let Id = res.data.Data.Id;
						let DetailCollection = JSON.parse(
							localStorage.dataRoyaltyCodeDetail
						);
						if(res.data.ErrCode === '0') {
							CoursePhase({
								CourseId: Id,
								CoursePhaseCollection: DetailCollection
							}).then(res => {
								console.log(res.data)
								this.$Message.success('添加成功!');
								localStorage.removeItem("dataRoyaltyCodeDetail");
								this.CourseForm = {
									brand_right: 0
								};
								this.reload();
							}).catch(err => {
								console.log(err)
							})
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					this.$Message.error('失败!');
				}
			})
		},
		//取消添加
		handleReset(name) {
			this.$refs[name].resetFields();
			this.$Message.info('已取消添加课程信息');
		},
		//保存阶段信息按钮
		stagehandleSubmit(name) {
			this.$refs[name].validate(valid => {
				if(valid) {
					this.dataRoyaltyCodeDetail.push(this.stageForm);
					this.stageForm = {
						brand_right: 0
					};
					this.AddRoyalty = false;
				}
			});
		},
		UpstagehandleSubmit(name) {
			this.$refs[name].validate(valid => {
				if(valid) {
					this.seedataRoyaltyCodeDetail.push(this.UpstageForm);
					this.UpstageForm = {
						brand_right: 0
					};
					this.UpRoyalty = false;
					//存添加的阶段信息
					localStorage.setItem(
						"dataRoyaltyCodeDetail",
						JSON.stringify(this.seedataRoyaltyCodeDetail)
					);
					let DetailCollection = JSON.parse(localStorage.dataRoyaltyCodeDetail);
					CoursePhase({
						CourseId: this.CourseId,
						CoursePhaseCollection: DetailCollection
					}).then(res => {
						console.log(res.data);
						this.$Message.success("成功!");
						this.UpstageForm = {
							brand_right: 0
						};
					}).catch(err => {
						console.log(err)
					})

				}
			});
		},
		//删除课程阶段
		handleDelete(params) {
			console.log(params);
			let CourseId = params.row.CourseId;
			let PhaseId = params.row.Id;
			CourseRemove(CourseId, PhaseId).then(res => {
				this.$Message.success('删除成功!');
			}).catch(err => {
				console.log(err)
			})
		},
		//删除数据
		deleteList() {
			if(this.BatchDeleteList.length == 0) {
				this.$Message.info("请先选中删除的数据");
			} else {
				this.delModal = true;
			}
		},
		//确定删除
		ok() {
			CourseDelete(this.BatchDeleteList).then(res => {
				console.log(res)
				this.reload();
			}).catch(err => {
				console.log(err)
			})
		},
		//取消删除
		cancel() {
			this.$refs[name].resetFields();
			this.$Message.info('已取消');
		},
		//双击表格得到整条数据赋值操作
		dblclickUpData(index) {
			console.log(index);
			this.CourseId = index.Id;
			this.UpDepartment = true;
			this.UpCourseForm = index;
			this.seedataRoyaltyCodeDetail = index.CoursePhaseCollection;
		},
		//修改课程
		UphandleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if(valid) {
					CourseUpData(this.UpCourseForm).then(res => {
						this.$Message.success('修改成功!');
						this.reload();
					}).catch(err => {
						console.log(err)
					})
				}
			})

		},
		//查询全部
		allinformationData() {
			CourseData(this.CourseData1).then(res => {
				this.CourseData = res.data;
			}).catch(err => {
				console.log(err)
			})
		},
	},
	mounted() {
		//获取信息接口
		CourseData(this.CourseData1).then(res => {
			this.CourseData = res.data;
		}).catch(err => {
			console.log(err)
		})
		//课程类型
		DataDictionary({
			dataCategory: "COURSE_TYPE",
			businessGroup: '*'
		}).then(res => {
			this.radioList = res.data
		}).catch(err => {
			console.log(err)
		});
		//销课划课方式
		DataDictionary({
			dataCategory: "COUNT_TYPE",
			businessGroup: '*'
		}).then(res => {
			this.Destruction = res.data
		}).catch(err => {
			console.log(err)
		});
	}
	}
</script>
<style lang="less" scoped>
	.Col {
		margin-top: 16px;
	}
</style>