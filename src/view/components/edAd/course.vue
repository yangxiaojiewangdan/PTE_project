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
			<RadioGroup v-model="button2" type="button">
				<Radio v-for="item in BusinessTypeList" :label="item.Code">
					<span>{{item.Description}}</span>
				</Radio>
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
				<Button  class="tableTops" @click="AddDepartment = true">添加</Button>
				<Button @click="deleteList"  class="tableTops">删除</Button>
				<Select v-model="querySelect" :label-in-value="true" style="width:120px">
					<Option v-for="item in querySelectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input v-model="queryvalue" placeholder="请输入" style="width: 150px" class="tableTops" />
				<Button type="primary" class="tableTops">查询</Button>
			</div>
			</Col>
			<Col span="24">
			<!-- 表格 -->
			<Table height="550" size="small" highlight-row stripe border ref="selection" :columns="CourseTable" :data="CourseData" @on-select="BatchDelete" @on-select-cancel="CancelBatchDelete" @on-row-dblclick="dblclickUpData" @on-select-all="allselectionId" @on-select-all-cancel="allcancelselectionId"></Table>
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
		<Modal v-model="AddDepartment" width="800" title="添加课程信息" :mask-closable="false" :styles="{top: '20px'}">
			<Form ref="CourseForm" :model="CourseForm" :rules="ruleValidate" :label-width="90" inline>
				<Row>
					<Col span="10">
					<FormItem label="所属业务群" prop="BusinessGroup">
						<!--<Select v-model="CourseForm.BusinessGroup" style="width:200px" disabled>
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>-->
						<Input v-model="CourseForm.BusinessGroup" placeholder="请输入" disabled style="width:200px"></Input>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem label="业务类型" prop="BusinessType">
						<Select v-model="CourseForm.BusinessType" style="width:200px">
							<Option v-for="item in BusinessTypeList" :value="item.Code" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="10">
					<!--<FormItem label="上级课程" prop="ParentId">
						<Input v-model="CourseForm.ParentId" placeholder="请输入" disabled style="width:200px"></Input>
					</FormItem>-->
					<FormItem label="课程类型" prop="CourseType">
						<Select v-model="CourseForm.CourseType" style="width:200px">
							<Option v-for="item in radioList" :value="item.Code" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem label="课程代码" prop="Code">
						<Input v-model="CourseForm.Code" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="课程名称" prop="CourseName">
						<Input v-model="CourseForm.CourseName" placeholder="请输入" style="width:520px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
						<Col span="10">
					<FormItem label="课时数" prop="Periods">
						<Input v-model="CourseForm.Periods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem label="销课划课方式" prop="CountType">
						<Select v-model="CourseForm.CountType" style="width:200px">
							<Option v-for="item in Destruction" :value="item.Id">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					</Col>
					<Col span="24">
					<FormItem label="课程描述" prop="Description">
						<Input v-model="CourseForm.Description" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入" style="width: 520px;"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="" prop="Enabled">
						<i-switch v-model="CourseForm.Enabled" size="large">
							<span slot="open">启用</span>
							<span slot="close">禁止</span>
						</i-switch>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<div class="line">
						课程阶段明细
					</div>
					<tables disabled-hover search-place="top" ref="tables" size="small" v-model="dataRoyaltyCodeDetail" :columns="columnsRoyaltyCodeDetail" @on-delete="handleDelete" border stripe height="200" @on-row-dblclick="dblclickUpDetail"/>

					<Button type="info" @click="AddRoyalty = true" class="addMessage">
              <Icon type="md-add"/>添加阶段信息
            </Button>
				</Row>
			</Form>
			<div slot="footer">
				<div class="footer_left">
					<div class="footer_left1">
						<div>
							<span>创建人:</span>
							<span>{{ CourseForm.CreateByName }}</span>
						</div>
						<div>
							<span>更新人:</span>
							<span>{{ CourseForm.UpdateByName }}</span>
						</div>
					</div>
					<div class="footer_left2">
						<div>
							<span>创建时间:</span>
							<span>{{ CourseForm.CreateOn }}</span>
						</div>
						<div>
							<span>更新时间:</span>
							<span>{{ CourseForm.UpdateOn }}</span>
						</div>
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
				<Row>
					<FormItem label="阶段名称" prop="PhaseName">
						<Input v-model="stageForm.PhaseName" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<Col span="24">
					<FormItem label="课时数" prop="Periods">
						<Input v-model="stageForm.Periods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="课时长" prop="Duration">
						<Input v-model="stageForm.Duration" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					</Col>

					<Col span="24">
					<FormItem label="销课划课方式" prop="CountType">
						<Select v-model="stageForm.CountType" style="width:200px">
							<Option v-for="item in Destruction" :value="item.Id">{{ item.Description}}</Option>
						</Select>
					</FormItem>
					</Col>
					<FormItem label="阶段描述" prop="Description">
						<Input v-model="stageForm.Description" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入" style="width:500px"></Input>
					</FormItem>

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
				</Row>
			</Form>
			<div slot="footer">
				<!--<div class="footer_left">
					<div class="footer_left1">
						<div><span>创建人:闫子健</span></div>
						<div><span>更新人:闫子健</span></div>
					</div>
					<div class="footer_left2">
						<div><span>创建时间:2018/12/13/ 13:00:00</span></div>
						<div><span>更新时间:2018/12/13/ 13:00:00</span></div>
					</div>
				</div>-->
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="stagehandleSubmit('stageForm');">
                        <span>保存</span>
                    </button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import Tables from "_c/tables";
	import { CourseRemove, AddOrUpdateCoursePhase } from '@/api/data'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities } from '@/api/api'
	export default {
		name: 'drag_list_page',
		components: {
			Tables
		},
		inject: ["reload"],
		data() {
			return {
				Interface: "Course",
				button1: '',
				button2:'',
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
						title: "课程代码",
						key: "Code",
						width:120,
						sortable: true
					},
					{
						title: "课程名称",
						key: "CourseName",
						width:220,
						sortable: true
					},
					{
						title: "课程描述",
						key: "Description",
						width:320,
						sortable: true
					},
					{
						title: "课程类型",
						key: "CourseType",
						width:120,
						render: (h, params) => {
							let texts = "";
							if(params.row.CourseType == 0) {
								texts = "核心主课";
							} else if(params.row.CourseType == 1) {
								texts = "辅课";
							}
							return h(
								"div", {
									props: {}
								},
								texts
							);
						},

						sortable: true
					},
					{
						title: "课时数",
						key: "Periods",
						width:100,
						sortable: true
					},
					{
						title: "销课划课方式",
						key: "CountType",
						sortable: true,
						render: (h, params) => {
							let texts = "";
							if(params.row.CountType == 0) {
								texts = "按次消课";
							} else if(params.row.CountType == 1) {
								texts = "一次性消课";
							} else if(params.row.CountType == 2) {
								texts = "自定义消课";
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
						title: "启用",
						key: "Enabled",
						sortable: true,
						width:120,
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
						width:120,
						sortable: true
					},
					{
						title: "创建时间",
						key: "CreateOn",

						sortable: true
					},
				],
				ruleValidate: {
				},
				CourseForm: {
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
					Id:"",
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
				columnsRoyaltyCodeDetail: [{
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
						title: "销课划课方式",
						key: "CountType",
						width: 150,

						render: (h, params) => {
							let texts = "";
							if(params.row.CountType == 0) {
								texts = "按次消课";
							} else if(params.row.CountType == 1) {
								texts = "一次性消课";
							} else if(params.row.CountType == 2) {
								texts = "自定义消课";
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
					CousreId: '',
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
				AddCourseDetail: [],
				CourseDetailId:'',
				UpDetail:[],
				BusinessTypeList:[],
			}
		},
		methods: {
			//勾选中的那条数的Id
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
			//取消勾选的某一项
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
			//添加课程并添加阶段
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid && this.CourseForm.Id == undefined || this.CourseForm.Id == "") {
						//保存阶段信息
						localStorage.setItem(
							"dataRoyaltyCodeDetail",
							JSON.stringify(this.dataRoyaltyCodeDetail)
						);
						Create(this.Interface, this.CourseForm).then(res => {
							console.log(res.data);
							let Id = res.data.Data.Id;
							let DetailCollection = JSON.parse(
								localStorage.dataRoyaltyCodeDetail
							);
							if(res.data.ErrCode === '0') {
								AddOrUpdateCoursePhase(this.Interface, {
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
						Update(this.Interface, this.CourseForm).then(res => {
							console.log(res.data);
							this.$Message.success('修改成功!');
						}).catch(err => {
							console.log(err)
							this.$Message.error('失败!');
						})
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
					if(valid && this.stageForm.Id == undefined || this.stageForm.Id == "") {
						this.dataRoyaltyCodeDetail.push(this.stageForm);
						this.AddCourseDetail.push(this.stageForm);
						//点击保存添加课程阶段
						AddOrUpdateCoursePhase(this.Interface, {
							CourseId: this.CourseId,
							CoursePhaseCollection: this.AddCourseDetail
						}).then(res => {
							console.log(res.data)
							this.$Message.success('添加成功!');
							this.stageForm = {
								brand_right: 0
							};
						}).catch(err => {
							console.log(err)
						});
						this.AddRoyalty = false;
					} else {
						this.UpDetail.push(this.stageForm)
						AddOrUpdateCoursePhase(this.Interface,{
							CourseId:this.CourseDetailId,
							CoursePhaseCollection:this.UpDetail
						}).then(res =>{
							console.log(res.data)
							this.$Message.success('修改成功!');
						}).then(err=>{
							console.log(err)
						});
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
				BatchDelete(this.Interface, this.BatchDeleteList).then(res => {
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
				console.log(index)
				this.CourseId = index.Id;
				this.CourseForm.Id = index.Id;
				this.CourseForm.ParentId = index.ParentId;
				this.CourseForm.BusinessGroup = index.BusinessGroup;
				this.CourseForm.BusinessType = index.BusinessType;
				this.CourseForm.Code = index.Code;
				this.CourseForm.CourseName = index.CourseName;
				this.CourseForm.Description = index.Description;
				this.CourseForm.CourseType = index.CourseType;
				this.CourseForm.Periods = index.Periods;
				this.CourseForm.CountType = index.CountType;
				this.CourseForm.Enabled = index.Enabled;
				this.dataRoyaltyCodeDetail = index.CoursePhaseCollection;
				this.AddDepartment = true;
			},
			dblclickUpDetail(index){
				console.log(index)
				this.CourseDetailId = index.CourseId 
				this.stageForm = index;
				this.AddRoyalty = true; 
			},
			//查询全部
			allinformationData() {
				GetEntities(this.Interface, this.CourseData1).then(res => {
					this.CourseData = res.data;
				}).catch(err => {
					console.log(err)
				})
			},
		},
		mounted() {
			//获取信息接口
			GetEntities(this.Interface, this.CourseData1).then(res => {
				this.CourseData = res.data;
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			})
			//课程类型
			DataDictionaryGetEntities("COURSE_TYPE").then(res => {
				this.radioList = res.data
			}).catch(err => {
				console.log(err)
			});
			//销课划课方式
			DataDictionaryGetEntities("COUNT_TYPE").then(res => {
				this.Destruction = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			//sessionStorage里取业务群
			let userInfo = sessionStorage.getItem('userInfo');
			let array = JSON.parse(userInfo);
			console.log(array)
			this.CourseForm.BusinessGroup = array.BusinessUnit
			//上级代码
			this.CourseForm.ParentId = array.SupervisorId
			this.BusinessTypeList = JSON.parse(localStorage.STORE_BUSINESS_TYPE);
			console.log(this.BusinessTypeList)
		}
		
	}
</script>
<style lang="less" scoped>
	.Col {
		margin-top: 16px;
	}
	
	.line {
		font-size: 16px;
		font-weight: 600;
		color: #000;
		width: 100%;
		height: 30px;
		border-bottom: 2px solid #999;
		margin-bottom: 10px;
	}
	
	.addMessage {
		/*margin-left: 48%;*/
	}
</style>