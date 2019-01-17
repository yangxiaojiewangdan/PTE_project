<template>
	<div class="role">
		<Row>
			<Col span="24" style="height:100px;">
			<h1 class="setHeader">系统角色设置</h1>
			</Col>
		</Row>
		<Row>
			<!--增删改查-->
			<Col span="7" push="14">
			<div class="organization">
				<Button type="success" class="organization_tableTop" @click="AddDepartment = true">添加</Button>
				<Button type="error" class="organization_tableTop" @click="deleteList">删除</Button>
				<Select v-model="model1" style="width:100px" class="organization_tableTop">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input v-model="value" placeholder="Enter something..." style="width: 150px" class="organization_tableTop" />
				<Button type="primary" class="organization_tableTop">查询</Button>
			</div>
			</Col>
		</Row>

		<Row>
			<!--表格-->
			<Col span="20" push="1">
			<Table height="520" ref="selection" :columns="columns4" :data="data1" @on-row-dblclick="upRoleData" stripe size="small" highlight-row @on-select="deleteBusinessRole" :loading=loading></Table>
			</Col>
			<!--分页-->
			<Col span="10" push="10">
			<Page :total="100" class="page" />
			</Col>
		</Row>
		<!-- 添加信息 弹出框-->
		<Modal v-model="AddDepartment" width="600" title="添加系统角色" :mask-closable="false">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<Row>
					<Col span="24">
					<FormItem label="所属业务群" prop="BusinessGroup">
						<Select v-model="formValidate.BusinessGroup" placeholder="请选择" style="width:460px">
							<Option value="技术部">技术部</Option>
							<Option value="运营部">运营部</Option>
							<Option value="财务部">财务部</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="角色代码" prop="Code">
						<Input v-model="formValidate.Code" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="角色名称" prop='Description'>
						<Input v-model="formValidate.Description" placeholder="请输入" style="width:460px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="排序码" prop='SortKey'>
						<Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="数据权限" prop='DataPermissionLevel'>
						<RadioGroup v-model="formValidate.DataPermissionLevel">
							<Radio v-for="item in radioList" :label="item.Id">
								<span>{{item.Description}}</span>
							</Radio>
						</RadioGroup>
					</FormItem>
					</Col>

				</Row>
				<Row>
					<Col span="12">
					<FormItem label="总部可用" prop='IsHeadquarter'>
						<i-switch v-model="formValidate.IsHeadquarter" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="门店可用" prop="IsStoreFranchise">
						<i-switch v-model="formValidate.IsStoreFranchise" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="内置角色" prop='IsIntemal'>
						<i-switch v-model="formValidate.IsIntemal" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="启用" prop='Enabled'>
						<i-switch v-model="formValidate.Enabled" size="large" :true-value="Number(1)" :false-value="Number(0)">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
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
		<!-- 删除信息弹出框 -->
		<Modal v-model="delModal" title="提示" @on-ok="ok" @on-cancel="cancel">
			<h2>确定删除此数据？</h2>
		</Modal>
		<!-- 添加信息 弹出框 end-->
		<!-- 分配权限 弹出框-->
		<Modal v-model="businessRoles" width="800" title="分配业务角色信息" :mask-closable="false">
			<Form ref="formRoleValidate" :model="formRoleValidate" :rules="ruleValidate" :label-width="80">
				<Row>
					<Col span="12">
					<FormItem label="角色代码" prop="Code">
						<Input v-model="formRoleValidate.Code" :readonly="true" style="width:250px"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="角色名称" prop="Description">
						<Input v-model="formRoleValidate.Description" :readonly="true" style="width:250px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="数据权限" prop='DataPermissionLevel'>
						<RadioGroup v-model="formRoleValidate.DataPermissionLevel">
							<Radio v-for="item in radioList" :label="item.Id">
								<span>{{item.Description}}</span>
							</Radio>
						</RadioGroup>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="6">
					<FormItem label="总部可用" prop='IsHeadquarter'>
						<i-switch v-model="formRoleValidate.IsHeadquarter" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="门店可用" prop="IsStoreFranchise">
						<i-switch v-model="formRoleValidate.IsStoreFranchise" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="内置角色" prop='IsIntemal'>
						<i-switch v-model="formRoleValidate.IsIntemal" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="启用" prop='Enabled'>
						<i-switch v-model="formRoleValidate.Enabled" size="large" :true-value="Number(1)" :false-value="Number(0)">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					<Col span="24">
					<tree-transfer :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'Description',children:'PermissionCollection'}" @addBtn='add' @removeBtn='remove' height='540px' node_key="Id" pid="ParentId" :button_text="['添加', '删减']" leafOnly>
					</tree-transfer>
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
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset2('formRoleValidate');AddDepartment = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit2('formRoleValidate');">
                        <span>确定</span>
                   </button>
			</div>
		</Modal>
		<!-- 分配权限 弹出框 end-->
	</div>
</template>
<script>
	import treeTransfer from 'el-tree-transfer'
	import { GetEntities,GetEntity,Create,Update,Delete,BatchDelete,Copy,GetBusinessUnit,ValidateUnique,DataDictionaryGetEntities,leftRole,rightRole,branchRole} from '@/api/api'
	import { GetAssignedPermission,GetUnAssignedPermission,AssignedPermission} from '@/api/data'
	export default {
		inject: ['reload'],
		name: 'role',
		components: {
			treeTransfer
		},
		data() {
			
			return {
				Interface:'BusinessRole',
				model1: '',
				loading: true,
				value: '',
				delModal: false,
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
					{
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
				cityList1: [{
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
					}
				],
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
				// 表格
				columns4: [{
						type: 'selection',
						width: 50,
						fixed: 'left'

					},
					{
						title: '角色代码',
						key: 'Code',
						width: 200,
						sortable: true,

					},
					{
						title: '角色名称',
						key: 'Description',
						width: 200,
						sortable: true,

					},
					{
						title: '启用',
						key: 'Enabled',
						width: 160,
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
						width: 150,
						sortable: true,

					},
					{
						title: '创建人',
						key: 'CreateBy',
						width: 200,
						sortable: true,

					},
					{
						title: '创建时间',
						key: 'CreateOn',
						width: 400,
						sortable: true,

					},

				],
				data1: [],
				BusinessRolesData: {
					"Filters": {},
				},
				// 表格 end  
				//添加人员信息弹框
				AddDepartment: false,
				//权限分配弹框
				businessRoles: false,
				formValidate: {
					Enabled: 1,
					Code: '',
					Description: '',
					Supervisor: '',
					IsHeadquarter: false,
					IsStoreFranchise: false,
					IsIntemal: false,
					DataPermissionLevel: '',
				},
				formRoleValidate: {
					Enabled: 1,
					Code: '',
					Description: '',
					Supervisor: '',
					IsHeadquarter: false,
					IsStoreFranchise: false,
					IsIntemal: false
				},
				radioList: [],
				ruleValidate: {
//					Code: [{
//							required: true,
//							message: '部门代码不能为空',
//							trigger: 'blur'
//						},
//						{
//							min: 8,
//							max: 8,
//							message: "长度必须是8位字符",
//							trigger: "blur"
//						},
//						{
//							pattern: /^[0-9a-zA-Z]*$/g,
//							message: "必须是字母加数值",
//							trigger: "blur"
//						}
//					],
//					Description: [{
//						required: true,
//						message: '部门名称部能为空!',
//						trigger: 'blur'
//					}, ],
//					Supervisor: [{
//						required: true,
//						message: '请选择主管姓名',
//						trigger: 'change'
//					}],
				},
				//删除数组
				delBusinessRoleList: [],
				delBusinessRoleArrs: [],
				//j角色权限id
				roleId: '',
				title: ['未分配权限', '已有权限'],
				fromData: [],
				toData: [],
				nodes: [],
				toDataRole: [],
				tofromDataRole: [],
				finalRole: [],
				aaa: [],
			}
		},
		methods: {
			//分配权限
			upRoleData(index) {
				this.businessRoles = true;
				this.formRoleValidate = index;
				this.roleId = index.Id;
				//未分配的权限接口
				GetUnAssignedPermission(this.Interface,
					this.roleId
				).then(res => {
					this.fromData = res.data;
				}).catch(err => {
					console.log(err)
				});
				//已分配的权限接口
				GetAssignedPermission(this.Interface,this.roleId).then(res => {
					this.toData = res.data	
					console.log(this.toData)
				}).catch(err => {
					console.log(err)
				})

			},
			// 监听穿梭框组件添加
			add(fromData, toData, obj) {
				//循环toData
				this.toData.forEach(item => {
					item.PermissionCollection.forEach(e => {
						//添加到新数组
						this.toDataRole.push(e)
					})
				})
				//调用增删权限的接口
				AssignedPermission(this.Interface,{
					RoleId: this.roleId,
					PermissionItemCollection: this.toDataRole
				}).then(res => {
					this.$Message.success('修改成功!')
					console.log(res.data)
				}).catch(err => {
					console.log(err)
				})
			},
			// 监听穿梭框组件移除
			remove(fromData, toData, obj) {
				this.fromData.forEach(item => {
					item.PermissionCollection.forEach(e => {
						//添加到新数组
						this.tofromDataRole.push(e)
					})
				})
				//调用增删权限的接口
				AssignedPermission(this.Interface,{
					RoleId: this.roleId,
					PermissionItemCollection: this.tofromDataRole
				}).then(res => {
					this.$Message.success('修改成功!')
					console.log(res.data)
				}).catch(err => {
					console.log(err)
				})

			},
			//删除
			deleteList() {
				if(this.delBusinessRoleList.length == 0) {
					this.$Message.info('请先选中删除的数据');
				} else {
					this.delModal = true;
				}
			},
			// 删除信息 弹出框函数
			ok() {
				BatchDelete(this.Interface,this.delBusinessRoleArrs).then(res => {
					this.$Message.success('删除成功!')
					this.reload();
				}).catch(err => {
					console.log(err)
				})
			},
			cancel() {
				this.$Message.info('已取消');
			},
			//循环拿到组织的id
			deleteBusinessRole(selection) {
				console.log(selection);
				this.delBusinessRoleList = selection;
				for(var i = 0; i < this.delBusinessRoleList.length; i++) {
					this.delBusinessRoleArrs.push(this.delBusinessRoleList[i].Id)
				};
				console.log(this.delBusinessRoleArrs);

			},
			// 添加信息弹出框函数
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						Create(this.Interface,this.formValidate).then(res => {
							console.log(res)
							this.$Message.success('成功!');
						}).catch(err => {
							console.log(err)
						})
					} else {
						this.$Message.error('失败!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
				this.businessRoles = false
			},

			//详情弹框提交
			handleSubmit2(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						//修改信息的接口
						Updata(this.Interface,this.formRoleValidate).then(res => {
							this.$Message.success('修改成功!')
						}).catch(err => {
							console.log(err)
						});

					} else {
						this.$Message.error('失败!');
					}
				});
			},
			handleReset2(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
				this.businessRoles = false
			},

		},
		mounted() {
			//获取data信息
			GetEntities(this.Interface,this.BusinessRolesData).then(res => {
				this.data1 = res.data;
				this.loading = false;
			}).catch(err => {
				console.log(err)
			});
			//获取数据字典
			DataDictionaryGetEntities("DATA_PERMISSION_LEVEL").then(res => {
				this.radioList = res.data
			}).catch(err => {
				console.log(err)
			})
		}
	}
</script>
<style lang="less">
	.page {
		margin: 20px 30px 0 0;
	}
	
	.organization {
		margin: 0 0 30px 0;
	}
	
	.organization_tableTop {
		margin: 0 5px;
	}
</style>