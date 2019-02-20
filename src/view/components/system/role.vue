<template>
	<div class="role">
		<Row>
			<Col span="24" style="height:100px;">
			<h1 class="setHeader">系统角色设置</h1>
			</Col>
		</Row>
		<Row>
			<!--增删改查-->
			<Col span="7" push="16">
			<div class="organization">
				<Button  class="organization_tableTop" @click="AddBtn">添加</Button>
				<Button  class="organization_tableTop" @click="deleteList">删除</Button>
				<Select v-model="model1" style="width:100px" class="organization_tableTop">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input v-model="value" placeholder="请输入" style="width: 150px" class="organization_tableTop" />
				<Button type="primary" class="organization_tableTop">查询</Button>
			</div>
			</Col>
		</Row>

		<Row>
			<!--表格-->
			<Col span="22" push="1">
			<Table height="600" ref="selection" :columns="columns4" :data="data1" @on-row-dblclick="upRoleData" stripe size="small" highlight-row @on-select="BatchDelete" @on-select-cancel="CancelBatchDelete" @on-select-all="allselectionId" @on-select-all-cancel="allcancelselectionId" :loading=loading></Table>
			</Col>
			<!--分页-->
			<Col span="10" push="12">
			<Page :total="100" class="page" />
			</Col>
		</Row>
		<!-- 添加信息 弹出框-->
		<Modal v-model="AddDepartment" width="700" :mask-closable="false">
			<p slot="header" style="text-align: left; line-height: 1;">
				<span v-if="add">添加系统角色</span>
				<span v-if="see">查看系统角色</span>
			</p>
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" inline>
				<Row>
					<Col span="24">
					<FormItem label="所属业务群" prop="BusinessGroup">
						<Select v-model="formValidate.BusinessGroup" style="width:416px" placeholder="请选择" :disabled='isDisabled'>
							<Option v-for="item in ParentId" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="角色代码" prop="Code">
						<Input v-model="formValidate.Code" placeholder="请输入" :disabled='isDisabled'></Input>
					</FormItem>

					<FormItem label="角色名称" prop='Description'>
						<Input v-model="formValidate.Description" placeholder="请输入"   :disabled='isDisabled'></Input>
					</FormItem>
					<Col span="24">
					<FormItem label="排序码" prop='SortKey'>
						<Input type="text" v-model="formValidate.SortKey" placeholder="请输入" :disabled='isDisabled'></Input>
					</FormItem>
					</Col>
					</Col>
					<FormItem label="数据权限" prop='DataPermissionLevel'>
						<RadioGroup v-model="formValidate.DataPermissionLevel">
							<Radio v-for="item in radioList" :label="item.Id">
								<span>{{item.Description}}</span>
							</Radio>
						</RadioGroup>
					</FormItem>
					<Col span="24">
					<FormItem label="" prop='IsHeadquarter' style="width: 80px;">
						<Checkbox v-model="formValidate.IsHeadquarter" style="width: 80px;">总部可用</Checkbox>
					</FormItem>

					<FormItem label="" prop="IsStoreFranchise" style="width: 80px;">
						<Checkbox v-model="formValidate.IsStoreFranchise" style="width: 80px;">门店可用</Checkbox>
					</FormItem>
					<FormItem label="" prop='Enabled' style="width: 80px; margin-left: 20px;">
						<Checkbox v-model="formValidate.Enabled" style="width: 80px;">启用</Checkbox>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<tree-transfer :title="title" :from_data='fromData' :to_data='toData' :class="{ 'addclass': isactive }" :defaultProps="{label:'Description',children:'PermissionCollection'}" @addBtn='addTo' @removeBtn='remove' height='400px' node_key="Id" pid="ParentId" :button_text="['添加', '删减']" leafOnly >
			</tree-transfer>
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
		<!-- 删除信息弹出框 -->
		<Modal v-model="delModal" title="提示" @on-ok="ok" @on-cancel="cancel">
			<h2>确定删除此数据？</h2>
		</Modal>
		<!-- 分配权限 弹出框-->
	</div>
</template>
<script>
	import treeTransfer from 'el-tree-transfer'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities, leftRole, rightRole, branchRole } from '@/api/api'
	import { GetAssignedPermission, GetUnAssignedPermission, AssignedPermission } from '@/api/data'
	export default {
		inject: ['reload'],
		name: 'role',
		components: {
			treeTransfer
		},
		data() {

			return {
				add: "",
				see: "",
				Interface: 'BusinessRole',
				model1: '',
				loading: true,
				isactive : true,
				isDisabled:false,
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
				ParentId: [{
						value: "*",
						label: "*"
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
						
						sortable: true,

					},
					{
						title: '角色名称',
						key: 'Description',
						
						sortable: true,

					},
					{
						title: '启用',
						key: 'Enabled',
						
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
						
						sortable: true,

					},
					{
						title: '创建人',
						key: 'CreateBy',
						
						sortable: true,

					},
					{
						title: '创建时间',
						key: 'CreateOn',
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

				formValidate: {
					Enabled: 1,
					Code: '',
					Description: '',
					Supervisor: '',
					IsHeadquarter: false,
					IsStoreFranchise: false,
					IsIntemal: false,
					DataPermissionLevel: '',
					Id: ''
				},
				radioList: [],
				ruleValidate: {},
				//删除数组
				BatchDeleteList: [],
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
			}
		},
		methods: {
			AddBtn() {
				this.AddDepartment = true
				this.formValidate = {}
				this.add = true;
				this.see = false;
				this.isactive = true;
				this.isDisabled = false;
			},
			//分配权限
			upRoleData(index) {
				console.log(index)
				this.isDisabled = true;
				this.isactive = false;
				this.AddDepartment = true;
				this.add = false;
				this.see = true;
				this.formValidate = index;
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
				GetAssignedPermission(this.Interface, this.roleId).then(res => {
					this.toData = res.data
					console.log(this.toData)
				}).catch(err => {
					console.log(err)
				})

			},
			// 监听穿梭框组件添加
			addTo(fromData, toData, obj) {
				//循环toData
				console.log(fromData)
				console.log(toData)
				toData.forEach(item => {
					console.log(item)
					item.PermissionCollection.forEach(e => {
						//添加到新数组
						this.toDataRole.push(e)
					})
				})
				console.log(this.toDataRole)
				//调用增删权限的接口
				AssignedPermission(this.Interface, {
					RoleId: this.roleId,	
					PermissionItemCollection: this.toDataRole
				}).then(res => {
					console.log(this.toDataRole)
					this.$Message.success('添加成功!')
					console.log(res.data)
				}).catch(err => {
					console.log(err)
				})
			},
			// 监听穿梭框组件移除
			remove(fromData, toData, obj) {
				fromData.forEach(item => {
					item.PermissionCollection.forEach(e => {
						//添加到新数组
						this.tofromDataRole.push(e)
					})
				})
				//调用增删权限的接口
				AssignedPermission(this.Interface, {
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
				if(this.BatchDeleteList.length == 0) {
					this.$Message.info('请先选中删除的数据');
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
					console.log(err)
				})
			},
			cancel() {
				this.$Message.info('已取消');
			},
			// 添加信息弹出框函数
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid && this.formValidate.Id == undefined || this.formValidate.Id == "") {
						Create(this.Interface, this.formValidate).then(res => {
							console.log(res.data)
							this.roleId =res.data.Data.Id
							console.log(this.roleId)
							this.$Message.success('成功!');
							this.isactive = false;
						}).catch(err => {
							console.log(err)
						})
					} else {
						Updata(this.Interface, this.formValidate).then(res => {
							this.$Message.success('修改成功!')
						}).catch(err => {
							console.log(err)
						});
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
				this.businessRoles = false
			},
		},
		mounted() {
			//获取data信息
			GetEntities(this.Interface, this.BusinessRolesData).then(res => {
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
			//未分配的权限接口
			GetUnAssignedPermission(this.Interface,
				1
			).then(res => {
				this.fromData = res.data;
			}).catch(err => {
				console.log(err)
			});
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
	.addclass{
    	display: none;
	}
</style>