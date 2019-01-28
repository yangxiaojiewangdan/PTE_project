<template>
	<div id="CustomerProfile">
		<Row>
			<Col span="24" style="height:50px;">
			<h1 class="queryHeader">学员档案</h1>
			</Col>
		</Row>
		<!--查询条件-->
		<Row>
			<Col span="24" class="querycriteria" style="height: 200px;">
			<Col span="24" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">客户类型：</h3>
			<Button @click="allinformationData" type="text" class="tableTops">全部</Button>
			<RadioGroup v-model="customerType" type="button" @on-change="queryCustomerDate">
				<Radio v-for="item in customerTypeData" :label="item.Code">
					<span>{{item.Description}}</span>
				</Radio>
			</RadioGroup>
			</Col>
			<Col span="24" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">会员类型：</h3>
			<Button @click="allinformationData" type="text" class="tableTops">全部</Button>
			<RadioGroup v-model="MemberType" type="button" @on-change="queryMemberDate">
				<Radio v-for="item in MemberTypeData" :label="item.Code">
					<span>{{item.Description}}</span>
				</Radio>
			</RadioGroup>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">来源渠道：</h3>
			<Select v-model="model1" style="width:200px">
				<Option v-for="item in  SourceChannel" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery">市场分类：</h3>
			<Select v-model="model1" style="width:200px">
				<Option v-for="item in  MarketClassification" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery">市场代码：</h3>
			<Select v-model="model1" style="width:200px">
				<Option v-for="item in  MarketCode" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery">所在小区：</h3>
			<Select v-model="model1" style="width:200px">
				<Option v-for="item in  ResidentialQuarters" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">业务部门：</h3>
			<Select v-model="model1" style="width:200px">
				<Option v-for="item in  BusinessDepartment" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			</Col>
			<Col span="6" class="Col">
			<h3 class="queryquery">负责人员：</h3>
			<Select v-model="model1" style="width:200px">
				<Option v-for="item in  ResponsiblePerson" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
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
				<Button type="success" class="tableTops" @click="AddDepartment = true;add=true;see=false;">添加</Button>
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
			<Table height="550" size="small" highlight-row stripe border ref="selection" :columns="CustomerTable" :data="CustomerData" @on-select="BatchDelete" @on-row-dblclick="dblclickUpData" @on-select-all="BatchDelete"></Table>
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
		<Modal v-model="AddDepartment" scrollable width="1100" title="添加学员档案信息" :mask-closable="false" :styles="{top: '40px'}">
			<p slot="header" style="text-align: left; line-height: 1;">
				<span v-if="add">基本信息</span>
				<span v-if="see">修改学员</span>
			</p>
			<Row>
				<Col span="16">
				<Tabs value="name1" @on-click="tabsPage">
					<!--添加学员-->
					<TabPane label="基本信息" name="name1" style="height:730px;overflow-y:auto;overflow-x:hidden;">
						<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" inline>
							<Row>
								<Col span="24">
								<FormItem label="姓名" prop="LastName">
									<Input v-model="formValidate.LastName" placeholder="请输入" style="width: 200px;"></Input>
								</FormItem>
								<FormItem label="性别" prop="Gender">
									<RadioGroup v-model="formValidate.Gender" style="width: 200px;">
										<Radio v-for="item in radioList" :label="item.Code">
											<span>{{item.Description}}</span>
										</Radio>
									</RadioGroup>
								</FormItem>

								<FormItem label="昵称" prop="NickName">
									<Input v-model="formValidate.NickName" placeholder="请输入" style="width: 200px;"></Input>
								</FormItem>
								<FormItem label="英文名" prop="EngName">
									<Input v-model="formValidate.EngName" placeholder="请输入" style="width: 200px;"></Input>
								</FormItem>

								<FormItem label="出生日期" prop="BrithDate">
									<DatePicker @on-change="handleChange;formValidate.BrithDate=$event" format="yyyy-MM-dd" type="date" placeholder="Select date" v-model="formValidate.BrithDate" style="width: 200px;" :options="options3"></DatePicker>
								</FormItem>

								<!--<Col span="4">
							<FormItem label="">
								<Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
									<div style="padding: 5px">
										<Icon type="ios-cloud-upload" size="50"></Icon>
										<p>上传照片</p>
									</div>
								</Upload>
							</FormItem>
							<FormItem label="普通照片">
								<Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
									<div style="padding: 5px">
										<Icon type="ios-cloud-upload" size="50"></Icon>
									</div>
								</Upload>
							</FormItem>
							</Col>-->

								<FormItem label="家长姓名" prop="ContactName">
									<Input v-model="formValidate.ContactName" placeholder="请输入" style="width: 200px;"></Input>
								</FormItem>
								<FormItem label="家长手机" prop="ContactPhone">
									<Input v-model="formValidate.ContactPhone" placeholder="请输入" style="width: 200px;"></Input>
								</FormItem>
								<FormItem label="家长邮箱" prop="ContactEMail">
									<Input v-model="formValidate.ContactEMail" placeholder="请输入" style="width: 200px;"></Input>
								</FormItem>
								<!--客源信息-->
								<!--<p class="lineTitle">基本信息</p>
				<div class="lineTop"></div>-->
								<Divider orientation="left" class='line'></Divider>
								<FormItem label="客户类型" prop="CustomerType">
									<Select v-model="formValidate.CustomerType" style="width: 200px;">
										<Option v-for="item in customerTypeData" :value="item.Code">{{item.Description}}</Option>
									</Select>
								</FormItem>

								<FormItem label="会员类型" prop="MemberType">
									<Select v-model="formValidate.MemberType" style="width: 200px;">
										<Option v-for="item in MemberTypeData" :value="item.Code">{{item.Description}}</Option>

									</Select>
								</FormItem>
								<FormItem label="会员号" prop="MemberNo">
									<Input v-model="formValidate.MemberNo" placeholder="请输入" style="width: 200px;"></Input>
								</FormItem>
								<FormItem label="来源渠道" prop="ChannelCode">
									<Select v-model="formValidate.ChannelCode" style="width: 200px;">
										<Option value="beijing">New York</Option>
										<Option value="shanghai">London</Option>
										<Option value="shenzhen">Sydney</Option>
									</Select>
								</FormItem>
								<FormItem label="市场分类" prop="MarketClass">
									<Select v-model="formValidate.MarketClass" style="width: 200px;">
										<Option value="beijing">New York</Option>
										<Option value="shanghai">London</Option>
										<Option value="shenzhen">Sydney</Option>
									</Select>
								</FormItem>
								<FormItem label="市场代码" prop="MarketCode">
									<Select v-model="formValidate.MarketCode" style="width: 200px;">
										<Option value="beijing">New York</Option>
										<Option value="shanghai">London</Option>
										<Option value="shenzhen">Sydney</Option>
									</Select>
								</FormItem>
								<!--地址-->
								<!--<p class="lineTitle">基本信息</p>
				<div class="lineTop"></div>-->
								<Divider orientation="left" class='line'></Divider>
								<FormItem label="所在省" prop="ProviceCode">
									<Select v-model="formValidate.ProviceCode" @on-change="SelectProviceCode" style="width:200px">
										<Option v-for="item in province" :value="item.Id" :key="item.value">{{ item.Name }}</Option>
									</Select>
								</FormItem>
								<FormItem label="所在市" prop="CityCode">
									<Select v-model="formValidate.CityCode" @on-change="SelectCityCode" style="width:200px">
										<Option v-for="item in city" :value="item.Id" :key="item.value">{{ item.Name}}</Option>
									</Select>
								</FormItem>
								<FormItem label="所在县区" prop="DistinctCode">
									<Select v-model="formValidate.DistinctCode" style="width:200px">
										<Option v-for="item in county" :value="item.Id" :key="item.value">{{ item.Name }}</Option>
									</Select>
								</FormItem>
								<FormItem label="所在小区" prop="VillageCode">
									<Select v-model="formValidate.VillageCode" style="width: 200px;">
										<Option value="beijing">New York</Option>
										<Option value="shanghai">London</Option>
										<Option value="shenzhen">Sydney</Option>
									</Select>
								</FormItem>
								<FormItem label="详细地址" prop="Address">
									<Input v-model="formValidate.Address" placeholder="请输入" style="width: 490px;"></Input>
								</FormItem>
								<FormItem label="业务部门" prop="BusinessUnit">
									<Select v-model="formValidate.BusinessUnit" style="width: 200px;">
										<Option value="beijing">New York</Option>
										<Option value="shanghai">London</Option>
										<Option value="shenzhen">Sydney</Option>
									</Select>
								</FormItem>
								<FormItem label="负责人" prop="BusinessUnit">
									<Select v-model="formValidate.BusinessUnit" style="width: 200px;">
										<Option value="beijing">New York</Option>
										<Option value="shanghai">London</Option>
										<Option value="shenzhen">Sydney</Option>
									</Select>
								</FormItem>
								</Col>
							</Row>
						</Form>
					</TabPane>
					<!--添加联系人-->
					<TabPane label="联系人" name="name2" v-if="isAdd" style="height:730px;overflow-y:auto;overflow-x:hidden;">
						<Row>
							<Col span="10" offset="1" v-for="(item, index) in ContactsList" :key="index" style="margin-bottom:10px;">
							<Card>
								<p slot="title">联系人1</p>
								<!--<Button slot="extra" size="small" type="text" @click="say(index,$event)">{{ EditSave }}</Button>-->
								<Form ref="FormContacts" :model="FormContacts" :rules="ruleValidate" label-position="right" :label-width="60">
									<Row>
										<Button slot="extra" size="small" type="text" @click="say(index,$event)">{{ EditSave }}</Button>
										<Col span="20">
										<FormItem label="电话:" prop="TelPhone" class="margin_bottom">
											<Input v-if="BusinessStoresInput" v-model="FormContacts.TelPhone"></Input>
											<p v-if="BusinessStoresP">{{item.TelPhone}}</p>
										</FormItem>
										</Col>
										<Col span="20">
										<FormItem label="姓名:" prop="LastName" class="margin_bottom">
											<Input v-if="BusinessStoresInput" v-model="FormContacts.LastName"></Input>
											<p v-if="BusinessStoresP">{{item.LastName}}</p>
										</FormItem>
										</Col>
										<Col span="20">
										<!--<FormItem label="关系:" prop="RelationType" class="margin_bottom">
											<Select v-model="FormContacts.RelationType" >
												<Option v-for="item in  relationship" :value="item.Code" :key="item.value">{{ item.Description }}</Option>
											</Select>
											<Input v-if="BusinessStoresInput" v-model="FormContacts.RelationType"></Input>
											<p v-if="BusinessStoresP">妈妈</p>
										</FormItem>-->
										</Col>
										<Col span="20">
										<FormItem label="邮箱:" prop="EMail" class="margin_bottom">
											<Input v-if="BusinessStoresInput" v-model="FormContacts.EMail"></Input>
											<p v-if="BusinessStoresP">{{item.EMail}}</p>
										</FormItem>
										</Col>
										<Col span="20">
										<FormItem label="微信:" prop="WeChat" class="margin_bottom">
											<Input v-if="BusinessStoresInput" v-model="FormContacts.WeChat"></Input>
											<p v-if="BusinessStoresP">{{item.WeChat}}</p>
										</FormItem>
										</Col>
										<Col span="20">
										<FormItem label="QQ:" prop="QQ" class="margin_bottom">
											<Input v-if="BusinessStoresInput" v-model="FormContacts.QQ"></Input>
											<p v-if="BusinessStoresP">{{item.QQ}}</p>
										</FormItem>
										</Col>
										<Col span="20">
										<FormItem label="职业:" prop="Career" class="margin_bottom">
											<Input v-if="BusinessStoresInput" v-model="FormContacts.Career"></Input>
											<p v-if="BusinessStoresP">{{item.Career}}</p>
										</FormItem>
										</Col>
									</Row>
								</Form>
							</Card>
							</Col>
						</Row>

					</TabPane>
				</Tabs>
				</Col>
				<!--<Col span="8" class="information"> 动态信息
				</Col>-->
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
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset;AddDepartment = false;">
          <span>取消</span>
        </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit()">
          <span>确定</span>
        </button>
			</div>
		</Modal>
	</div>
</template>
<script>
	//	import { CustomerData, DataDictionary, CustomerCreate, CustomerDelete, CustomerUp, CustomerQuery, CustomerContactCreate } from "@/api/data";
	import { DistrictGetProvince, DistrictGetArea } from "@/api/api";
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities } from '@/api/api'
	export default {
		inject: ['reload'],
		name: 'CustomerProfile',
		data() {
			return {
				EditSave: "编辑",
				BusinessStoresInput: false,
				BusinessStoresP: true,
				ContactsList:[
					{
						TelPhone:"13593453487",
						LastName:'德玛西亚',
						EMail:'1149265110@qq.com',
						WeChat:'147258369',
						QQ:'1149265110',
						Career:'销售',	
					},
					{
						TelPhone:"13661050032",
						LastName:'提莫队长',
						EMail:'13661050032.com',
						WeChat:'895623741',
						QQ:'852369879845',
						Career:'技术',	
					},
					
				],
				isAdd: false,
				value3: '',
				add: "",
				see: "",
				Interface: "CustomerProfile",
				//设置不可选日期
				time: Date.now(),
				options3: {
					disabledDate: date => {
						// this成功指向vue实例
						return date && date.valueOf() > this.time
					}
				},
				radioList: [],
				province: [],
				city: [],
				county: [],
				relationship: [],
				customerTypeData: [],
				MemberTypeData: [],
				customerType: '',
				MemberType: '',
				addressInp: '',
				model1: '',
				//渠道
				SourceChannel: [],
				//市场分类
				MarketClassification: [],
				//市场代码
				MarketCode: [],
				//所在小区
				ResidentialQuarters: [],
				//负责人员
				ResponsiblePerson: [],
				//业务部门
				BusinessDepartment: [],
				querySelect: '',
				querySelectList: '',
				queryvalue: '',
				CustomerData1: {
					"Filters": {},
				},
				CustomerData: [],
				CustomerTable: [{
						type: "selection",
						width: 45
					},
					{
						title: "姓名",
						key: "LastName",
						width: 120,
						sortable: true
					},
					{
						title: "昵称",
						key: "NickName",
						width: 120,
						sortable: true
					},
					{
						title: "英文名",
						key: "EngName",
						width: 120,
						sortable: true
					},
					{
						title: "客户类型",
						key: "CustomerType",
						width: 120,
						sortable: true,
						render: (h, params) => {
							let texts = "";
							if(params.row.CustomerType == 0) {
								texts = "新客户";
							} else if(params.row.CustomerType == 1) {
								texts = "续费客户";
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
						title: "姓别",
						key: "Gender",
						width: 120,
						sortable: true,
						render: (h, params) => {
							let texts = "";
							if(params.row.Gender == 0) {
								texts = "男";
							} else if(params.row.Gender == 1) {
								texts = "女";
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
						title: "出生日期",
						key: "BrithDate",
						width: 120,
						sortable: true
					},
					{
						title: "月龄",
						key: "BornMonth",
						width: 120,
						sortable: true
					},
					{
						title: "会员类型",
						key: "MemberType",
						width: 120,
						sortable: true,
						render: (h, params) => {
							let texts = "";
							if(params.row.MemberType == 0) {
								texts = "普通会员";
							} else if(params.row.MemberType == 1) {
								texts = "一星会员";
							} else if(params.row.MemberType == 2) {
								texts = "二星会员";
							} else if(params.row.MemberType == 3) {
								texts = "三星会员";
							} else if(params.row.MemberType == 4) {
								texts = "四星会员";
							} else if(params.row.MemberType == 5) {
								texts = "五星会员";
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
						title: "会员号",
						key: "MemberNo",
						width: 120,
						sortable: true
					},
					{
						title: "来源渠道",
						key: "ChannelCode",
						width: 120,
						sortable: true
					},
					{
						title: "市场分类",
						key: "MarketClass",
						width: 120,
						sortable: true
					},
					{
						title: "市场代码",
						key: "MarketCode",
						width: 120,
						sortable: true
					},
					{
						title: "所在小区",
						key: "VillageCode",
						width: 120,
						sortable: true
					},
					{
						title: "详细地址",
						key: "Address",
						width: 120,
						sortable: true
					},
					{
						title: "家长姓名",
						key: "ContactName",
						width: 120,
						sortable: true
					},
					{
						title: "家长手机",
						key: "ContactPhone",
						width: 120,
						sortable: true
					},
					{
						title: "业务部门",
						key: "BusinessUnit",
						width: 120,
						sortable: true
					},
					{
						title: "负责人",
						key: "BusinessUnit",
						width: 120,
						sortable: true
					},
				],
				AddDepartment: false,
				delModal: false,
				formValidate: {
					FirstName: '',
					LastName: '',
					NickName: '',
					EngName: '',
					CustomerType: '',
					Gender: '',
					BrithDate: '',
					BornMonth: '',
					MemberType: '',
					MemberNo: '',
					ChannelCode: '',
					MarketClass: '',
					MarketCode: '',
					ProviceCode: '',
					CityCode: '',
					DistinctCode: '',
					VillageCode: '',
					Address: '',
					ContactName: '',
					ContactPhone: '',
					ContactEMail: '',
					BusinessUnitId: '',
					BusinessUnit: '',
					OwnerId: '',
					BusinessUnit: '',
				},
				FormContacts: {
					LastName: '',
					RelationType: '',
					TelPhone: '',
					WeChat: '',
					QQ: '',
					EMail: '',
					Career: '',
				},
				ruleValidate: {

				},
				//选中的数组id
				batchArr: [],
				queryDistinctCode: "",
				aaa: 'name1',
			}
		},
		methods: {
			say(index, e) {
				// e.target 是你当前点击的元素
				// e.currentTarget 是你绑定事件的元素
				console.log(e.target);
				console.log(e.currentTarget);
				console.log(this.ContactsList[index]);
				if(this.ContactsList[index]) {
					if(this.EditSave == "编辑") {
						this.EditSave = "保存";
						this.BusinessStoresInput = true;
						this.BusinessStoresP = false;
					} else if(this.EditSave == "保存") {
						this.EditSave = "编辑";
						this.BusinessStoresInput = false;
						this.BusinessStoresP = true;
					}
				}
			},
			tabsPage(name) {
				this.aaa = name;
			},

			SelectProviceCode(Id) {
				DistrictGetArea(Id).then(res => {
					this.city = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			SelectCityCode(Id) {
				DistrictGetArea(Id).then(res => {
					this.county = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			//批量操作的ID
			BatchDelete(selection) {
				console.log(selection)
				for(var i = 0; i < selection.length; i++) {
					this.batchArr.push(selection[i].Id)
				};
			},
			deleteList() {
				if(this.batchArr.length == 0) {
					this.$Message.info('请先选中删除的数据');
				} else {
					this.delModal = true;
				}
			},
			//确定删除
			ok() {
				BatchDelete(this.Interface, this.batchArr).then(res => {
					this.$Message.success('删除成功!')
					this.reload();
				}).catch(err => {
					this.$Message.success('删除失败!')
					console.log(err)
				})
			},
			cancel() {
				this.$Message.info('已取消');
			},
			//修改赋值
			dblclickUpData(index) {
				this.add = false;
				this.see = true;
				this.isAdd = true;
				this.AddDepartment = true;
				this.formValidate = index;
				//this.ContactsList = index.ContactCollection;
				console.log(index)
			},
			handleResetUp() {
				this.$Message.info('已取消添加部门');
			},
			// 点击全部查询全部数据
			allinformationData() {
				GetEntities(this.Interface, this.CustomerData1).then(res => {
					console.log(res)
					this.RadioGroupStatus = '';
					this.CustomerData = res.data;
				}).catch(err => {
					console.log(err)
				});
			},
			//添加学员
			handleSubmit() {
				if(this.aaa == "name1") {
					this.$refs.formValidate.validate((valid) => {
						if(valid && this.formValidate.Id == undefined) {
							Create(this.Interface, this.formValidate).then(res => {
								console.log(res.data)
								this.$Message.success('添加成功,可以为他添加几个联系人哦!');
								this.reload();
							}).catch(err => {
								console.log(err)
								this.$Message.error('添加失败!');
							})
						} else {
							Update(this.Interface, this.formValidate).then(res => {
								this.$Message.success("修改成功!");
								this.reload();
								console.log(res)
							}).catch(err => {
								console.log(err)
								this.$Message.error("修改失败!");
							})
						}
					})
				} else if(this.aaa == "name2") {
					this.$refs.AddCustomerFrom.validate((valid) => {
						if(valid) {
							Create(this.Interface, this.AddCustomerFrom).then(res => {
								console.log(res)
								this.$Message.success('添加联系人成功!');
								this.reload();
							}).catch(err => {
								this.$Message.error('添加失败!');
								console.log(err)
							})
						} else {
							this.$Message.error('失败!');
						}
					})
				}

			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消添加部门');
			},
			handleResetAdd(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消添加联系人信息');
			},
			//客户类型查询
			queryCustomerDate(data) {
				console.log(data)
				GetEntities(this.Interface, {
					"Filters": [{
						"Relational": 'Or',
						"Conditions": [{
							"FilterField": "CustomerType",
							"Relational": 'Equal',
							"FilterValue": data
						}]
					}],
				}).then(res => {
					console.log(res)
					this.CustomerData = res.data;
				}).catch(err => {
					console.log(err)
				})
			},
			//会员类型
			queryMemberDate(data) {
				console.log(data)
				GetEntities(this.Interface, {
					"Filters": [{
						"Relational": 'Or',
						"Conditions": [{
							"FilterField": "MemberType",
							"Relational": 'Equal',
							"FilterValue": data
						}]
					}],
				}).then(res => {
					console.log(res)
					this.CustomerData = res.data;
				}).catch(err => {
					console.log(err)
				})
			},
			//计算月龄
			handleChange(showData) {
				//				let time = new Date(showData)
				//				let targetTime = time.valueOf();
				//				let currentTime = (new Date()).valueOf();
				//				let differenceTime = currentTime - targetTime;
				//				let age = Math.floor(differenceTime / (30 * 24 * 60 * 60 * 1000))
				//				this.CustomerFrom.BornMonth = age;
			},

		},
		mounted() {
			//获取表格数据
			GetEntities(this.Interface, this.CustomerData1).then(res => {
				this.CustomerData = res.data;
				console.log(res.data)
				//				this.CustomerData.forEach(item => {
				//					this.SourceChannel.push(item.ChannelCode)
				//					console.log(this.SourceChannel)
				//					this.MarketClassification.push(item.MarketClass)
				//					this.MarketCode.push(item.MarketCode)
				//					this.ResidentialQuarters.push(item.VillageCode)
				//					this.ResponsiblePerson.push(item.Owner)
				//					this.BusinessDepartment.push(item.BusinessUnit)
				//					
				//				})
			}).catch(err => {
				console.log(err)
			});
			//性别
			DataDictionaryGetEntities("GENDER_TYPE").then(res => {
				this.radioList = res.data
			}).catch(err => {
				console.log(err)
			});
			//客户类型
			DataDictionaryGetEntities("CUSTOMER_TYPE").then(res => {
				this.customerTypeData = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			//会员类型
			DataDictionaryGetEntities("MEMBERSHIP_TYPE").then(res => {
				this.MemberTypeData = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			//关系、
			DataDictionaryGetEntities("CUSTOMER_RELATION_TYPE").then(res => {
				this.relationship = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});

			//			DistrictGetProvince().then(res => {
			//				console.log(res.data)
			//				this.province = res.data;
			//			}).catch(err => {
			//				console.log(err)
			//			})

		}
	}
</script>
<style lang="less" scoped>
	.Col {
		margin-top: 16px;
	}
	
	#footer {
		width: 100%;
		height: 50px;
		border-top: 1px solid #DCDCDC;
		/*background: #ddd;*/
		.btn {
			float: right;
			margin-right: 30px;
		}
		.footer_left {
			padding-top: 8px;
		}
	}
	
	#footer2 {
		width: 100%;
		height: 50px;
		border-top: 1px solid #DCDCDC;
		/*background: #ddd;*/
		position: fixed;
		bottom: 0;
		.btn {
			float: right;
			margin-right: 30px;
		}
		.footer_left {
			padding-top: 8px;
		}
	}
	
	.lineTitle {
		font-size: 14px;
		font-weight: 900;
		color: #5555AA;
	}
	
	.lineTop {
		width: 80%;
		height: 2px;
		margin: 5px 0;
		border-top: solid #E6E6E6 2px;
	}
	
	.line {
		color: #5555AA;
		width: 80%;
		font-weight: 900;
	}
	
	.margin_bottom {
		margin-bottom: 10px;
	}
	.information {
		
	}
</style>