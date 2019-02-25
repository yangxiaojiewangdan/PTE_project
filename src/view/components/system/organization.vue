<template>
	<div id="PersonnelManagement">
		<Row>
			<Col span="24" style="height:100px;">
			<h1 class="setHeader">组织架构设置</h1>
			</Col>
		</Row>
		<Row class="content">
			<Col span="6" style="height:750px;">
			<Col span="24" style="height:40px;">
			<h2 class="content_left">公司组织架构</h2>
			</Col>
			<!-- 树状图 -->
			<Col span="24">
			<!--:render="renderContent"-->
			<Tree :data="treeList" children-key="ChildNodes" class="tree" @on-select-change='selectChange'></Tree>
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
				<Button @click="Add" class="organization_tableTop">添加</Button>
				<Button @click="deleteList" class="organization_tableTop">删除</Button>
				<!--<Select v-model="formSend.label" style="width:100px">
					<Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input v-model="query" placeholder="请输入" style="width: 150px" class="organization_tableTop" />
				<Button type="primary" class="organization_tableTop" @click="queryData">查询</Button>-->
			</div>
			</Col>
			<!-- 表格上面的功能 end-->
			</Col>
			<Col span="24">
			<!-- 表格 -->
			<Table height="560" border ref="selection" :columns="columns4" :data="data1" @on-select="BatchDelete" @on-select-cancel="CancelBatchDelete" @on-select-all="allselectionId" @on-select-all-cancel="allcancelselectionId" @on-row-dblclick="upDataBusinessUnit" :loading=loading>
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
		<Modal v-model="AddDepartment" width="600" :mask-closable="false">
			<p slot="header" style="text-align: left; line-height: 1;">
				<span v-if="add">添加组织</span>
				<span v-if="see">查看组织</span>
			</p>
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<Row>
					<Col span="24">
					<FormItem label="所属业务群" prop="BusinessGroup" v-if="is">
						<Input v-model="formValidate.BusinessGroup" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					<FormItem label="部门Id" prop="Id" v-if="is">
						<Input v-model="formValidate.Id" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="上级部门" prop="ParentId">
						<Input v-model="formValidate.ParentId" placeholder="请输入" style="width:460px" disabled></Input>
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
					<!--<Col span="24">
					<FormItem label="主管姓名" prop="Supervisor">
						<Select v-model="formValidate.Supervisor" style="width:460px" placeholder="请选择">
							<Option v-for="item in cityList1" :value="item.Id" :key="item.value">{{ item.LastName }}</Option>
						</Select>
					</FormItem>
					</Col>-->
					<Col span="24">
					<FormItem label="部门描述" prop="LongDescription">
						<Input v-model="formValidate.LongDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>

					<Col span="24">
					<Col span="15">
					<FormItem label="排序码" prop="SortKey">
						<Input type="text" v-model="formValidate.SortKey" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					</Col>
					<Col span="9">
					<FormItem label="" prop="Enabled">
						<i-switch v-model="formValidate.Enabled" size="large">
							<span slot="open">启用</span>
							<span slot="close">禁用</span>
						</i-switch>
					</FormItem>
					</Col>
					</Col>
				</Row>
			</Form>
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
		<!-- 添加信息 弹出框 end-->
	</div>
</template>
<script>
	//import { getTreeList, getBusinessUnitData, addBusinessUnit, deleteBusinessUnit, BusinessUnitGetEntities, upBusinessUnit } from '@/api/data'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities } from '@/api/api'

	export default {
		inject: ['reload'],
		data() {
			return {
				is: false,
				add: "",
				see: "",
				Interface: "BusinessUnit",
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
				// 树形图
				treeList: [],
				renderContent: (h, {
					root,
					node,
					data
				}) => {
					return(
						<span style="color:red" onClick={(e)=>alert("1")}>{ data.Description }</span>
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
						width: 110,
						sortable: true
					},
					{
						title: '部门名称',
						key: 'Description',
						width: 250,
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
						width: 100,
						sortable: true
					},
					{
						title: '创建时间',
						key: 'CreateOn',
						sortable: true
					}

				],
				ParentId: [{
						value: "*",
						label: "*"
					}

				],
				data1: [],
				BusinessUnitData: {
					"Filters": {},
				},
				treeCode: '',
				BatchDeleteList: [],
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
				formValidate: {
					BusinessGroup: '',
					ParentId: "",
					Enabled: true,
					Code: '',
					Description: '',
					Supervisor: '',
					Id: '',
				},
				ruleValidate: {},
				ParentIdData: "",
				departmentId: "",
				BusinessGroupData: '',
				// 添加信息 弹出框 end  
			}
		},
		methods: {
			Add() {
				this.AddDepartment = true;
				this.add = true;
				this.see = false;
				this.formValidate = {};
				this.formValidate.BusinessGroup = this.BusinessGroupData
				this.formValidate.ParentId = this.ParentIdData
				this.formValidate.Id = this.departmentId

			},
			selectChange(dataList) {
				console.log(dataList)
				this.ParentIdData = dataList[0].ParentId
				this.departmentId = dataList[0].Id
				console.log(this.departmentId)
				dataList.forEach(item => {
					//console.log(item)
					this.treeCode = item.Code
				})

				GetEntities(this.Interface, {
					"Filters": [{
						"Relational": 'Or',
						"Conditions": [{
							"FilterField": 'Code',
							"Relational": "Equal",
							"FilterValue": this.treeCode,
						}]
					}]
				}).then(res => {
					//console.log(res.data)
					this.data1 = res.data;

				}).catch(err => {
					console.log(err)
				})

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
			// 删除信息 弹出框函数
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
			// 添加信息 弹出框函数
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.add) {
							Create(this.Interface, this.formValidate).then(res => {
								this.treeList = res.data
								this.$Message.success('成功!');
								this.AddDepartment = false;
								this.reload();
							}).catch(err => {
								console.log(err)
							})
						} else if(this.see) {
							Update(this.Interface, this.formValidate).then(res => {
								this.$Message.success('修改成功!');
								this.reload();
							}).catch(err => {
								console.log(err)
							})
						}

					} else {
						this.$Message.error('验证失败!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消添加部门');
			},
			// 删除组织接口
			selectionId(selection) {
				console.log(selection);
				this.delBusinessUnitList = selection;
				for(var i = 0; i < this.delBusinessUnitList.length; i++) {
					this.delBusinessUnitArrs.push(this.delBusinessUnitList[i].Id)
				};
				console.log(this.delBusinessUnitArrs);

			},
			//组织查询事件
			queryData() {
				GetEntities(this.Interface, {
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
				this.add = false;
				this.see = true;
				this.AddDepartment = true;
				this.formValidate = index;
				console.log(index)
			},
		},
		mounted() {
			//获取用户信息
			let userInfo = sessionStorage.getItem('userInfo');
			let array = JSON.parse(userInfo);
			this.BusinessGroupData = array.BusinessUnit
			console.log(this.BusinessGroupData)
			//获取树形结构
			GetBusinessUnit(this.Interface, this.BusinessGroupData).then(res => {
				this.treeList = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			//获取表格
			GetEntities(this.Interface, this.BusinessUnitData).then(res => {
				this.data1 = res.data
				this.loading = false;
			}).catch(err => {
				console.log(err)
			})
			//获取业务群
			GetEntities("BusinessGroup", this.BusinessUnitData).then(res => {}).catch(err => {
				console.log(err)
			})
			//主管姓名
			GetEntities("BusinessUser", this.BusinessUnitData).then(res => {
				//console.log(res.data)
				this.cityList1 = res.data
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
				margin-right: 100px;
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