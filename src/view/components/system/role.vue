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
			<Table height="520" ref="selection" :columns="columns4" :data="data1" @on-row-dblclick="upRoleData" stripe size="small" highlight-row @on-select="deleteBusinessRole"></Table>
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
					<FormItem label="角色级别" prop='DataPermissionLevel'>
						<RadioGroup v-model="formValidate.DataPermissionLevel">
							<Radio label="无"></Radio>
							<Radio label="个人"></Radio>
							<Radio label="本部门"></Radio>
							<Radio label="本部门及下属部门"></Radio>
							<Radio label="全组织"></Radio>
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
						<i-switch v-model="formValidate.Enabled" size="large">
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
		<!-- 添加信息 弹出框 end-->
		<!-- 分配权限 弹出框-->
		<Modal v-model="businessRoles" width="800" title="分配业务角色信息" :mask-closable="false">
			<Form ref="formRoleValidate" :model="formRoleValidate" :rules="ruleValidate" :label-width="80">
				<Row>
					<Col span="12">
					<FormItem label="角色代码" prop>
						<Input v-model="formRoleValidate.Code" :readonly="true" style="width:250px"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="角色名称" prop>
						<Input v-model="formRoleValidate.Description" :readonly="true" style="width:250px"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="角色级别" prop='DataPermissionLevel'>
						<RadioGroup v-model="formRoleValidate.DataPermissionLevel">
							<Radio label="无"></Radio>
							<Radio label="个人"></Radio>
							<Radio label="本部门"></Radio>
							<Radio label="本部门及下属部门"></Radio>
							<Radio label="全组织"></Radio>
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
						<i-switch v-model="formRoleValidate.Enabled" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
					<Col span="24">
					<tree-transfer :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' height='540px' openAll>
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
	import { getBusinessRolesData, addBusinessRole, deleteBusinessRole, leftRole, rightRole } from '@/api/data'
	export default {
		name: 'role',
		components: {
			treeTransfer
		},
		data() {
			return {
				model1: '',
				value: '',
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
						key: 'Supervisor',
						width: 160,
						sortable: true,

					},
					{
						title: '排序码',
						key: 'Enabled',
						width: 150,
						sortable: true,

					},
					{
						title: '创建人',
						key: 'SortKey',
						width: 200,
						sortable: true,

					},
					{
						title: '创建时间',
						key: 'CreateBy',
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
					Enabled: true,
					Code: '',
					Description: '',
					Supervisor: '',
				},
				formRoleValidate: {
					Code: '',
					Description: '',
				},
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
				fromData: [{
					id: "1",
					pid: 0,
					label: "一级 1",
					children: [{
							id: "1-1",
							pid: "1",
							label: "二级 1-1",
							children: []
						},
						{
							id: "1-2",
							pid: "1",
							label: "二级 1-2",
							children: [{
									id: "1-2-1",
									pid: "1-2",
									children: [],
									label: "二级 1-2-1"
								},
								{
									id: "1-2-2",
									pid: "1-2",
									children: [],
									label: "二级 1-2-2"
								}
							]
						}
					]
				}, ],
				toData: []
			}
		},
		methods: {
			upRoleData(index) {
				this.businessRoles = true;
				console.log(index);
				this.formRoleValidate = index;
				this.roleId = index.Id;
				console.log(this.roleId);
				//未分配的权限接口
				leftRole({roleId:this.roleId}).then(res => {
					this.fromData = res.data
				}).catch(err => {
					console.log(err)
				});
				//已分配的权限接口
				rightRole({roleId:this.roleId}).then(res => {
					this.toData = res.data
				}).catch(err => {
					console.log(err)
				})

			},
			// 监听穿梭框组件添加
			add(fromData, toData, obj) {
				// 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的        {keys,nodes,halfKeys,halfNodes}对象
				// 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
				console.log("fromData:", fromData);
				console.log("toData:", toData);
				console.log("obj:", obj);
			},
			// 监听穿梭框组件移除
			remove(fromData, toData, obj) {
				// 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
				// 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
				console.log("fromData:", fromData);
				console.log("toData:", toData);
				console.log("obj:", obj);
			},
			//删除
			deleteList() {
				if(this.delBusinessRoleList.length == 0) {
					this.$Message.info('请先选中删除的数据');
				} else {
					deleteBusinessRole(this.delBusinessRoleList).then(res => {
						this.$Message.success('删除成功!')
						this.reload();
					}).catch(err => {
						this.$Message.error('删除失败!')
						console.log(err)
					})
				}
			},
			// 删除信息 弹出框函数
			ok() {
				this.$Message.info('已删除');
			},
			cancel() {
				this.$Message.info('已取消');
			},
			//删除组织赋值
			deleteBusinessRole(selection) {
				console.log(selection);
				this.delBusinessRoleList = selection;
				for(var i = 0; i < this.delBusinessRoleList.length; i++) {
					this.delBusinessRoleArrs.push(this.delBusinessRoleList[i].Id)
				};
				console.log(this.delBusinessRoleArrs);

			},
			// 删除信息弹出框函数 end
			// 添加信息弹出框函数
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						addBusinessRole(this.formValidate).then(res => {
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
			// 添加信息 弹出框函数 end

			// 权限信息弹出框函数
			handleSubmit2(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Message.success('成功!');
					} else {
						this.$Message.error('失败!');
					}
				})
			},
			handleReset2(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
				this.businessRoles = false
			},

		},
		mounted() {
			//获取data信息
			getBusinessRolesData(this.BusinessRolesData).then(res => {
				this.data1 = res.data;
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