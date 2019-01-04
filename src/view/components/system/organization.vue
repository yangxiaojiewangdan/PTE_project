<template>
	<div id="PersonnelManagement">
		<Row>
			<Col span="24" style="height:100px;">
			<h1 class="setHeader">组织结构设置</h1>
			</Col>
		</Row>
		<Row class="content">
			<Col span="6" style="height:750px;">
			<Col span="24" style="height:40px;">
			<h2 class="content_left">公司组织结构</h2>
			</Col>
			<!-- 树状图 -->
			<Col span="24">
			<Tree :data="treeList" :render="renderContent" children-key="ChildNodes" class="tree" show-checkbox ref="tree" @on-check-change="choiceAll" @on-select-change='selectChange'></Tree>
			</Col>
			<!-- 树状图 end-->
			</Col>
			<Col span="18" style="height:750px;">
			<Col span="24" style="height:40px;">
			<h2 class="content_left">部门列表</h2>
			</Col>
			<Col span="24">
			<!-- 表格上面的功能 -->
			<Col span="24">
			<div class="organization">
				<Button @click="AddDepartment = true" type="success" class="organization_tableTop">添加</Button>
				<Button @click="deleteList" type="error" class="organization_tableTop">删除</Button>
				<Select v-model="formSend.label" style="width:100px">
					<Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input v-model="query" placeholder="请输入" style="width: 150px" class="organization_tableTop" />
				<Button type="primary" class="organization_tableTop" @click="queryData">查询</Button>
			</div>
			</Col>
			<!-- 表格上面的功能 end-->
			</Col>
			<Col span="24">
			<!-- 表格 -->
			<Table height="560" border ref="selection" :columns="columns4" :data="data1" @on-select="delBusinessUnitData" @on-row-dblclick="upDataBusinessUnit" :loading=loading>
			</Table>
			<!-- 表格 end-->
			</Col>
			<Col span="24">
			<!-- 分页 -->
			<Page :total="100" class="page" />
			<!-- 分页 end-->
			</Col>
			</Col>
		</Row>
		<!-- 删除信息弹出框 -->
		<Modal v-model="delModal" title="提示" @on-ok="ok" @on-cancel="cancel">
			<h2>确定删除此数据？</h2>
		</Modal>
		<!-- 删除信息弹出框 end-->
		<!-- 添加信息 弹出框-->
		<Modal v-model="AddDepartment" width="600" title="添加部门信息" :mask-closable="false">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<Row>
					<Col span="24">
					<FormItem label="上级部门" prop="ParentId">
						<Select v-model="formValidate.ParentId" disabled style="width:460px" placeholder="请选择">
							<Option v-for="item in ParentId" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="部门代码" prop="Code">
						<Input v-model="formValidate.Code" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="部门名称" prop="Description">
						<Input v-model="formValidate.Description" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="部门描述" prop="LongDescription">
						<Input v-model="formValidate.LongDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="主管姓名" prop="Supervisor">
						<Select v-model="formValidate.Supervisor" style="width:460px" placeholder="请选择">
							<Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="24">
					<Col span="15">
					<FormItem label="排序码" prop="SortKey">
						<Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					</Col>
					<Col span="9">
					<FormItem label="启用" prop="Enabled">
						<i-switch v-model="formValidate.Enabled" size="large" :true-value="Number(1)" :false-value="Number(0)">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					</Col>
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
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset('formValidate');AddDepartment = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit('formValidate');">
                        <span>确定</span>
                    </button>
			</div>
		</Modal>
		<!-- 添加信息 弹出框 end-->
		<!--查看修改弹框-->
		<Modal v-model="upDepartment" width="600" title="修改部门信息" :mask-closable="false">
			<Form ref="upValidate" :model="upValidate" :rules="ruleValidate" :label-width="80">
				<Row>
					<Col span="24">
					<FormItem label="上级部门" prop="ParentId">
						<Select v-model="upValidate.ParentId" disabled style="width:460px" placeholder="请选择">
							<Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="部门代码" prop="Code">
						<Input v-model="upValidate.Code" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="部门名称" prop="Description">
						<Input v-model="upValidate.Description" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="部门描述" prop="LongDescription">
						<Input v-model="upValidate.LongDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="主管姓名" prop="Supervisor">
						<Select v-model="upValidate.Supervisor" style="width:460px" placeholder="请选择">
							<Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="24">
					<Col span="15">
					<FormItem label="排序码" prop="SortKey">
						<Input type="number" v-model="upValidate.SortKey" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					</Col>
					<Col span="9">
					<FormItem label="启用" prop="Enabled">
						<i-switch v-model="upValidate.Enabled" size="large" :true-value="Number(1)" :false-value="Number(0)">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					</Col>
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
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset('upValidate');upDepartment = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="upHandleSubmit('upValidate');">
                        <span>修改</span>
                    </button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import { getTreeList, getBusinessUnitData, addBusinessUnit, deleteBusinessUnit, BusinessUnitGetEntities, upBusinessUnit } from '@/api/data'
	export default {
		inject: ['reload'],
		data() {
			return {
				loading: true,
				formSend: {
					value: '',
					label: ''
				},
				// input框中的值
				query: '技术部',
				department: [{
						value: '技术部',
						label: '技术部'
					},
					{
						value: '开发部',
						label: '开发部'
					},
					{
						value: '运营部',
						label: '运营部'
					},
				],
				//				BusinessUnitQuery: {
				//					"Filters": [{
				//						"Relational": 0,
				//						"Conditions": [{
				//							"FilterField": "string",
				//							"Relational": 0,
				//							"FilterValue":this.query,
				//						}]
				//					}],
				//					"OrderBy": {
				//						"SortField": "string",
				//						"Sortable": 0
				//					},
				//					"Paging": true,
				//					"PageSize": 0,
				//					"PageIndex": 0
				//				},
				// input框中的值 end
				// 树形图
				treeList: [],
				renderContent: (h, {
					root,
					node,
					data
				}) => {
					return(
							<span> { data.Description } </span>

							)
						},
						// 树形图 end
						// 表格
						columns4: [{
								type: 'selection',
								width: 50,
								align: 'center',
								fixed: 'left'
							},
							{
								title: '部门代码',
								key: 'Code',
								width: 150,
								sortable: true
							},
							{
								title: '部门名称',
								key: 'Description',
								width: 200,
								sortable: true
							},
							{
								title: '主管姓名',
								key: 'Supervisor',
								width: 150,
								sortable: true
							},
							{
								title: '启用',
								key: 'Enabled',
								width: 100,
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
								title: '排序码',
								key: 'SortKey',
								width: 100,
								sortable: true
							},
							{
								title: '创建人',
								key: 'CreateBy',
								width: 200,
								sortable: true
							},
							{
								title: '创建时间',
								key: 'CreateOn',
								width: 240,
								sortable: true
							}

						],
						ParentId: [{
								value: 'New York',
								label: '招商部'
							},
							{
								value: 'London',
								label: '运营部'
							},
							{
								value: 'Sydney',
								label: '技术部'
							}
						],
						data1: [],
						BusinessUnitData: {
							"Filters": {},
						},
						treePid: '',
						delBusinessUnitList: [],
						delBusinessUnitArrs: [],
						// 表格 end      
						// 删除信息弹出框
						delModal: false,
						// 删除信息弹出框 end   
						// 添加信息 弹出框
						cityList: [{
							value: 'New York',
							label: 'New York'
						}],
						cityList1: [],
						cityList2: [{
								value: 'Ottawa',
								label: 'Ottawa'
							},
							{
								value: 'Paris',
								label: 'Paris'
							},
							{
								value: 'Canberra',
								label: 'Canberra'
							}
						],
						Supervisor: '',
						AddDepartment: false,
						upDepartment: false,
						formValidate: {
							ParentId: '',
							Enabled: 1,
							Code: '',
							Description: '',
							Supervisor: '',
						},
						upValidate: {
							Enabled: 1,
							Code: '',
							Description: '',
							Supervisor: '',
						},
						ruleValidate: {
							Code: [{
									required: true,
									message: '部门代码不能为空',
									trigger: 'blur'
								},
								{
									min: '',
									max: '',
									message: "",
									trigger: "blur"
								},
								//						{
								//							pattern: /[\u4e00-\u9fa5]/gm,
								//							message: "必须是字母加数值",
								//							trigger: "blur"
								//						}
							],
							Description: [{
								required: true,
								message: '部门名称不能为空!',
								trigger: 'blur'
							}, ],
							Supervisor: [{
								required: true,
								message: '请选择主管姓名',
								trigger: 'change'
							}],
						}
					// 添加信息 弹出框 end  
				}
			},
			methods: {
					selectChange(selectedList) {
						console.log(selectedList);

					},
					choiceAll(data) {
						console.log(data)
						//let choicesAll=this.$refs.tree.getCheckedNodes;
						//console.log(choicesAll)
						data.forEach(item => {
							this.treePid = item.ParentId
						})
						this.loading = true;
						//调用接口刷新页面
						BusinessUnitGetEntities({
							"Filters": [{
								"Relational": 'Or',
								"Conditions": [{
									"FilterField": 'ParentId',
									"Relational": "Equal",
									"FilterValue": this.treePid,
								}]
							}]
						}).then(res => {
							console.log(res)
							this.data1 = res.data;
							this.loading = false;
						}).catch(err => {
							console.log(err)
						})

					},
					deleteList() {
						if(this.delBusinessUnitList.length == 0) {
							this.$Message.info('请先选中删除的数据');
						} else {
							this.delModal = true;
						}
					},
					// 删除信息 弹出框函数
					ok() {
						deleteBusinessUnit(this.delBusinessUnitArrs).then(res => {
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
					// 删除信息 弹出框函数 end
					// 添加信息 弹出框函数
					handleSubmit(name) {
						this.$refs[name].validate((valid) => {
							if(valid) {
								addBusinessUnit(this.formValidate).then(res => {
									this.treeList = res.data
									this.$Message.success('成功!');
									this.AddDepartment = false;
									this.reload();
								}).catch(err => {
									console.log(err)
								})
							} else {
								this.$Message.error('请输入正确的格式!');
							}
						})
					},
					handleReset(name) {

						this.$refs[name].resetFields();
						this.$Message.info('已取消添加部门');
					},
					// 删除组织接口
					delBusinessUnitData(selection) {
						console.log(selection);
						this.delBusinessUnitList = selection;
						for(var i = 0; i < this.delBusinessUnitList.length; i++) {
							this.delBusinessUnitArrs.push(this.delBusinessUnitList[i].Id)
						};
						console.log(this.delBusinessUnitArrs);

					},
					//组织查询事件
					queryData() {
						BusinessUnitGetEntities({
							"Filters": [{
								"Relational": or,
								"Conditions": [{
									"FilterField": this.formSend.label,
									"Relational": "Equal",
									"FilterValue": this.query,
								}]
							}],
							"OrderBy": {
								"SortField": "string",
								"Sortable": 0
							},
							"Paging": false,
							"PageSize": 0,
							"PageIndex": 0
						}).then(res => {
							console.log(res)
						}).catch(err => {
							console.log(err)
						})
					},
					//详情修改页面
					upDataBusinessUnit(index) {
						this.upDepartment = true;
						this.upValidate = index;
						console.log(index)
					},
					//点击修改按钮
					upHandleSubmit() {
						upBusinessUnit(this.upValidate).then(res => {
							this.$Message.success('修改成功!');
							this.reload();
						}).catch(err => {
							console.log(err)
						})
					}

				},
				mounted() {
					//获取树形结构
					getTreeList().then(res => {
						this.treeList = res.data
					}).catch(err => {
						console.log(err)
					});
					//获取表格
					getBusinessUnitData(this.BusinessUnitData).then(res => {
						this.data1 = res.data
						this.loading = false;
						//循环主管姓名
						this.data1.forEach(item => {
							this.cityList1.push(item.Supervisor)
							console.log(this.cityList1)
						})
					}).catch(err => {
						console.log(err)
					})
				}
		}
</script>
<style lang="less" scoped>
	#PersonnelManagement {
		.content {
			background: #fff;
			.content_left {
				border-bottom: 1px solid #dcdee2;
				line-height: 40px;
				margin: 10px;
			}
			.tree {
				margin: 30px 0 0 30px;
			}
			.organization {
				margin: 30px 20px 10px 0;
				float: right;
				.organization_tableTop {
					margin: 0 4px;
				}
			}
			.page {
				margin: 20px 30px 0 0;
				float: right;
			}
		}
	}
</style>