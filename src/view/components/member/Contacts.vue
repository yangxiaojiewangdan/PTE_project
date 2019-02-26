<template>
	<div class="Contacts">
		<Row>
			<Col span="24" style="height:50px;">
			<h1 class="queryHeader">联系人</h1>
			</Col>
		</Row>
		<!--查询条件-->
		<Row>
			<Col span="24" class="querycriteria" style="height: 120px;">
			<Col span="12" class="Col">
			<h3 class="queryquery" style="padding-left:58px;">关系：</h3>
			<Select v-model="model1" style="width:200px">
				<Option v-for="item in  relationship" :value="item.Code" :key="item.value">{{ item.Description }}</Option>
			</Select>
			</Col>
			<Col span="24" class="Col">
			<Col span="6">
			<h3 class="queryquery" style="padding-left:32px;">对应学员：</h3>
			<Select v-model="model1" style="width:200px">
				<Option v-for="item in  CustomerProfileList" :value="item.Id" :key="item.value">{{ item.LastName }}</Option>
			</Select>
			</Col>
			<!--<Col span="6">
			<Checkbox v-model="Identification">主要标识</Checkbox>
			<Checkbox v-model="IsEnable" style="padding-left: 20px;">启用</Checkbox>
			</Col>-->
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
				<Button class="tableTops" @click="AddTo">添加</Button>
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
			<Table height="560" border size="small" ref="selection" :columns="columns4" :data="data1" @on-select="BatchDelete" @on-select-cancel="CancelBatchDelete" @on-select-all="allselectionId" @on-select-all-cancel="allcancelselectionId" @on-row-dblclick="upDataBusinessUnit">
			</Table>
			</Col>
			<Col span="24">
			<!-- 分页 -->
			<Page :total="100" class="page" />
			</Col>
		</Row>
		<Modal v-model="delModal" title="提示" @on-ok="ok" @on-cancel="cancel">
			<h2>确定删除此数据？</h2>
		</Modal>
		<Modal v-model="AddDepartment" scrollable width="600" title="添加学员档案信息" :mask-closable="false">
			<p slot="header" style="text-align: left; line-height: 1;">
				<span v-if="add">联系人</span>
				<span v-if="see">修改联系人</span>
			</p>
			<Row>
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<Col span="22">
					<FormItem label="姓名" prop="LastName">
						<Input v-model="formValidate.LastName" placeholder="请输入" />
					</FormItem>
					</Col>
					<Col span="22">
					<FormItem label="对应学员" prop="CustomerId">
						<Select v-model="formValidate.CustomerId" filterable  placeholder="请输入学员名称">
							<Option v-for="item in  CustomerProfileList" :value="item.Id" :key="item.value">{{ item.LastName }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="22">
					<FormItem label="关系" prop="RelationType">
						<Select v-model="formValidate.RelationType">
							<Option v-for="item in  relationship" :value="item.Code" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="22">
					<FormItem label="手机号" prop="TelPhone">
						<Input v-model="formValidate.TelPhone" placeholder="请输入" />
					</FormItem>
					</Col>
					<Col span="22">
					<FormItem label="邮箱" prop="EMail">
						<Input v-model="formValidate.EMail" placeholder="请输入" />
					</FormItem>
					</Col>
					<Col span="22">
					<FormItem label="微信" prop="WeChat">
						<Input v-model="formValidate.WeChat" placeholder="请输入" />
					</FormItem>
					</Col>
					<Col span="22">
					<FormItem label="QQ" prop="QQ">
						<Input v-model="formValidate.QQ" placeholder="请输入" />
					</FormItem>
					</Col>
					<Col span="22">
					<FormItem label="职业" prop="Career">
						<Input v-model="formValidate.Career" placeholder="请输入" />
					</FormItem>
					</Col>
					<Col span="22">
					<FormItem label="备注" prop="Comments">
						<Input v-model="formValidate.Comments" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="22">
					<FormItem label="" prop="IsPrimary" style="display: inline-block;">
						<Checkbox v-model="formValidate.IsPrimary">主要联系人</Checkbox>
					</FormItem>
					<FormItem label="" prop="Enabled" style="display: inline-block;">
						<Checkbox v-model="formValidate.Enabled">启用</Checkbox>
					</FormItem>
					</Col>
				</Form>
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
	</div>
</template>
<script>
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities } from '@/api/api'
	export default {
		name: 'Contacts',
		inject: ["reload"],
		data() {
			return {
				Interface: "CustomerContact",
				add: '',
				see: '',
				model1: "",
				querySelect: '',
				queryvalue: '',
				querySelectList: [],
				RelationTypeLIst: [],
				CustomerProfileList: [],
				BatchDeleteList: [],
				relationship: [],
				Identification: '',
				IsEnable: '',
				delModal: false,
				AddDepartment: false,
				data1: [],
				CustomerData1: {
					"Filters": {},
				},
				ruleValidate: {},
				columns4: [{
						type: 'selection',
						width: 50,
						align: 'center',
					},
					{
						title: '姓名',
						key: 'LastName',
						sortable: true
					},
					{
						title: '关系',
						key: 'RelationType',
						sortable: true,
						render: (h, params) => {
							let texts = "";
							if(params.row.RelationType == 0) {
								texts = "母亲";
							} else if(params.row.RelationType == 1) {
								texts = "父亲";
							} else if(params.row.RelationType == 2) {
								texts = "爷爷奶奶";
							} else if(params.row.RelationType == 3) {
								texts = "外公外婆";
							} else if(params.row.RelationType == 4) {
								texts = "其他";
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
						title: '手机号',
						key: 'TelPhone',
						sortable: true
					},
					{
						title: '邮箱',
						key: 'EMail',
						sortable: true
					},
					{
						title: '主要标识',
						key: 'IsPrimary',
						sortable: true,
						render: (h, params) => {
							let texts = "";
							if(params.row.IsPrimary == true) {
								texts = "是";
							} else if(params.row.IsPrimary == false) {
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
						title: '创建人',
						key: 'CreateBy',
						sortable: true
					},
					{
						title: '创建时间',
						key: 'CreateOn',
						sortable: true
					}
				],

				formValidate: {
					LastName: '',
					RelationType: "",
					CustomerId: '',
					TelPhone: "",
					EMail: '',
					IsPrimary: '',
					Enabled: "",
					WeChat: '',
					QQ: '',
					Career: '',
					Comments: '',
					IsSelfRegister: '',
					ChannelCode: '',
					Id:'',

				},

			}
		},
		methods: {
			AddTo() {
				this.AddDepartment = true;
				this.add = true;
				this.see = false;
				this.formValidate = {};

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
					if(valid && this.formValidate.Id == undefined || this.formValidate.Id == "") {
						Create(this.Interface, this.formValidate).then(res => {
							this.$Message.success('成功!');
							this.AddDepartment = false;
							this.reload();
						}).catch(err => {
							console.log(err)
						})
					} else {
						Update(this.Interface, this.formValidate).then(res => {
							this.$Message.success('修改成功!');
							this.reload();
						}).catch(err => {
							console.log(err)
						})
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消添加部门');
			},
			upDataBusinessUnit(index) {
				this.add = false;
				this.see = true;
				this.AddDepartment = true;
				this.formValidate = index;
				console.log(index)
			},
		},
		mounted() {
			DataDictionaryGetEntities("CUSTOMER_RELATION_TYPE").then(res => {
				this.relationship = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			GetEntities("CustomerProfile", this.CustomerData1).then(res => {
				this.CustomerProfileList = res.data;
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			//获取联系人
			GetEntities(this.Interface, this.CustomerData1).then(res => {
				this.data1 = res.data;
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
		},
	}
</script>
<style scoped lang="less">
	.Col {
		margin-top: 16px;
	}
</style>