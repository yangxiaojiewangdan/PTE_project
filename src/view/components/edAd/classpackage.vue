<template>
	<div class="classPackage">
		<Row>
			<Col span="24" style="height:50px;">
			<h1 class="queryHeader">课包信息</h1>
			</Col>
		</Row>
		<!--查询条件-->
		<Row>
			<Col span="24" class="querycriteria" style="height: 120px;">
			<Col span="24" class="Col">
			<h3 class="queryquery">开始/结束日期：</h3>
			<DatePicker v-model="StartEndDate" type="daterange" @on-change="queryData" placeholder="Select date and time(Excluding seconds)" style="width: 300px;margin-left:20px;"></DatePicker>
			</Col>
			<Col span="24" class="Col">
			<h3 class="queryquery" style="padding-left:32px;">课包类型：</h3>
			<Button @click="allinformationData" type="text" class="tableTops">全部</Button>
			<RadioGroup v-model="button1" type="button">
				<Radio v-for="item in ClassPackage" :label="item.Id">
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
			<Table height="550" size="small" highlight-row stripe border ref="selection" :columns="CoursePackage" :data="CoursePackageData" @on-select="BatchDelete" @on-select-cancel="CancelBatchDelete" @on-row-dblclick="dblclickUpData"></Table>
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
		<Modal v-model="AddDepartment" width="1000" title="添加课包信息" :mask-closable="false" :styles="{top: '20px'}">
			<Form ref="CousreFrom" :model="CousreFrom" :rules="ruleValidate" :label-width="85" inline>
				<Row>
					<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">添加课包信息</Divider>
					<FormItem label="所属业务群" prop="BusinessGroup">
						<Select v-model="CousreFrom.BusinessGroup" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem label="所属业务品牌" prop="BusinessType">
						<Select v-model="CousreFrom.BusinessType" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem label="门店Id" prop="StoreId">
						<Select v-model="CousreFrom.StoreId" style="width:200px">
							<Option v-for="item in store" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>

					<FormItem label="课包类型" prop="PackageType">
						<Select v-model="CousreFrom.PackageType" style="width:200px" @on-change="v=>{setOption(v,'type')}">
							<Option v-for="item in ClassPackage" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					<FormItem label="课包代码" prop="Code">
						<Input v-model="CousreFrom.Code" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="课包名称" prop="PackageName">
						<Input v-model="CousreFrom.PackageName" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="课包描述" prop="Description">
						<Input v-model="CousreFrom.Description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width: 500px;"></Input>
					</FormItem>
					<FormItem label="期限(月)" prop="FixedPeriods" v-if="qixian">
						<Input v-model="CousreFrom.FixedPeriods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="总课时" prop="TotalPeriods" v-if="keshi">
						<Input v-model="CousreFrom.TotalPeriods" placeholder="请输入" style="width: 200px;"></Input>
					</FormItem>
					<FormItem label="销售课时" prop="SellPeriods" v-if="keshi">
						<Input v-model="CousreFrom.SellPeriods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="赠送课时" prop="ComplimentPeriods" v-if="keshi">
						<Input v-model="CousreFrom.ComplimentPeriods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="售价" prop="SellPrice">
						<Input v-model="CousreFrom.SellPrice" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="销售开始日期" prop="BeginSellDate">
						<DatePicker v-model="CousreFrom.BeginSellDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
					</FormItem>
					<FormItem label="销售结束日期" prop="EndSellDate">
						<DatePicker v-model="CousreFrom.EndSellDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
					</FormItem>
					<!--单选-->
					<Col span="24">
					<FormItem label="" prop="IsPromotion" style="width:70px ;">
						<Checkbox v-model="CousreFrom.IsPromotion" style="width: 60px;">促销包</Checkbox>
					</FormItem>
					<FormItem label="" prop="IsAudition" style="width:70px ;">
						<Checkbox v-model="CousreFrom.IsAudition" style="width: 60px;">试听包</Checkbox>
					</FormItem>
					<FormItem label="" prop="AllowReturns" style="width:70px ;">
						<Checkbox v-model="CousreFrom.AllowReturns" style="width: 60px;">可退费</Checkbox>
					</FormItem>
					<FormItem label="" prop="AllowAdjustment" style="width:70px ;">
						<Checkbox v-model="CousreFrom.AllowAdjustment" style="width: 60px;">可调课</Checkbox>
					</FormItem>
					<FormItem label="" prop="AllowOnline" style="width:90px ;">
						<Checkbox v-model="CousreFrom.AllowOnline" style="width: 80px;">可线上销售</Checkbox>
					</FormItem>
					<FormItem label="" prop="AllowDiscount" style="width:70px ;">
						<Checkbox v-model="CousreFrom.AllowDiscount" style="width: 60px;">可折扣</Checkbox>
					</FormItem>
					<FormItem label="" prop="IsExclusive" style="width:200px ;">
						<Checkbox v-model="CousreFrom.IsExclusive" style="width: 100px;">门店专属课包</Checkbox>
					</FormItem>
					<FormItem label="启用" prop="Enabled">
						<i-switch v-model="CousreFrom.Enabled" size="large">
							<span slot="open">On</span>
							<span slot="close">Off</span>
						</i-switch>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<!--课包明细实体-->
					<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">课包明细实体</Divider>
					<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="DetailedPackage" :columns="colDetailedPackage" @on-delete="handleDeleteDetail" border stripe />
					<Button type="info" @click="AddDetail = true">
              <Icon type="md-add"/>添加课包明细实体
            </Button>
				</Row>
				<!--课包价格实体-->
				<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">课包价格实体</Divider>
				<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="PricePackage" :columns="colPricePackage" @on-delete="handleDeletePrise" border stripe />
				<Button type="info" @click="AddPrise = true">
              <Icon type="md-add"/>添加课包价格实体
            </Button>
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
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset('CousreFrom');AddDepartment = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit('CousreFrom');">
                        <span>确定</span>
                    </button>
			</div>
		</Modal>
		<!--课包实体弹框-->
		<Modal v-model="AddDetail" width="700" title="添加课包实体信息" :mask-closable="false">
			<Form ref="CousreDetailFrom" :model="CousreDetailFrom" :rules="ruleValidate" :label-width="85" inline>
				<FormItem label="课包Id" prop="PackageId">
					<Select v-model="CousreDetailFrom.PackageId" style="width:200px">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="课程Id" prop="CourseId">
					<Select v-model="CousreDetailFrom.CourseId" style="width:200px">
						<Option v-for="item in CourseData" :value="item.Id">{{ item.Description }}</Option>
					</Select>
				</FormItem>
				<FormItem label="课时数" prop="Periods">
					<Input v-model="CousreDetailFrom.Periods" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="固定课时" prop="IsLimited">
					<i-switch v-model="CousreFrom.IsLimited" size="large">
						<span slot="open">On</span>
						<span slot="close">Off</span>
					</i-switch>
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
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="DetailhandleReset('CousreDetailFrom');AddDetail = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="DetailhandleSubmit('CousreDetailFrom');">
                        <span>保存</span>
                    </button>
			</div>
		</Modal>
		<!--课包价格弹框-->
		<Modal v-model="AddPrise" width="700" title="添加课包价格信息" :mask-closable="false">
			<Form ref="CousrePriseFrom" :model="CousrePriseFrom" :rules="ruleValidate" :label-width="85" inline>
				<FormItem label="课包Id" prop="PackageID">
					<Select v-model="CousrePriseFrom.PackageID" style="width:200px">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="门店Id" prop="StoreId">
					<Select v-model="CousrePriseFrom.StoreId" style="width:200px">
						<Option v-for="item in CourseData" :value="item.Id">{{ item.Description }}</Option>
					</Select>
				</FormItem>
				<FormItem label="门店" prop="Store">
					<Input v-model="CousrePriseFrom.Store" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="销售开始日期" prop="BeginSellDate">
					<DatePicker v-model="CousrePriseFrom.BeginSellDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
				</FormItem>
				<FormItem label="销售结束日期" prop="EndSellDate">
					<DatePicker v-model="CousrePriseFrom.EndSellDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
				</FormItem>
				<FormItem label="售价" prop="SellPrice">
					<Input v-model="CousrePriseFrom.SellPrice" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="最低售价" prop="LimitPrice">
					<Input v-model="CousrePriseFrom.LimitPrice" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="可折扣" prop="AllowDiscount">
					<i-switch v-model="CousrePriseFrom.AllowDiscount" size="large">
						<span slot="open">On</span>
						<span slot="close">Off</span>
					</i-switch>
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
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="PrisehandleReset('CousrePriseFrom');AddPrise = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="PrisehandleSubmit('CousrePriseFrom');">
                        <span>保存</span>
                    </button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import Tables from "_c/tables";
	import { CourseData, DataDictionary,CoursePackageCreate} from '@/api/data'
	import { BusinessStoreGetEntities } from '@/api/api'
	export default {
		name: 'classPackage',
		components: {
			Tables
		},
		inject: ["reload"],
		data() {
			return {
				//课程数组
				CourseData: [],
				//课包类型
				ClassPackage: [],
				cityList: [{
					value: '*',
					label: '*'
				}, ],
				//门店数组
				store: [],
				//课程数组
				CourseData: [],
				getTableData: {
					Filters: {}
				},
				//日期
				StartEndDate: "",
				button1: '',
				querySelect: "",
				querySelectList: '',
				queryvalue: '',
				qixian:false,
				keshi:false,
				AddDepartment: false,
				delModal: false,
				AddDetail: false,
				AddPrise: false,
				CoursePackage: [{
						type: "selection",
						width: 45
					},
					{
						title: "所属业务群",
						key: "BusinessGroup",
						width: 115,
						sortable: true
					},
					{
						title: "所属业务品牌",
						key: "BusinessType",
						width: 130,
						sortable: true
					},
					{
						title: "门店ID",
						key: "StoreId",
						width: 100,
						sortable: true
					},
					{
						title: "课包类型",
						key: "PackageType",
						sortable: true,
						width: 110,
					},
					{
						title: "课包代码",
						key: "Code",
						sortable: true,
						width: 110,
					},
					{
						title: "课包名称",
						key: "PackageName",
						sortable: true,
						width: 110,
					},
					{
						title: "课包描述",
						key: "Description",
						sortable: true,
						width: 110,
					},
					{
						title: "期限(月)",
						key: "FixedPeriods",
						sortable: true,
						width: 100,
					},
					{
						title: "总课时",
						key: "TotalPeriods",
						sortable: true,
						width: 95,
					},
					{
						title: "销售课时",
						key: "SellPeriods",
						sortable: true,
						width: 105,
					},
					{
						title: "赠送课时",
						key: "ComplimentPeriods",
						sortable: true,
						width: 105,
					},
					{
						title: "售价",
						key: "SellPrice",
						sortable: true,
						width: 80,
					},
					{
						title: "销售开始日期",
						key: "BeginSellDate",
						sortable: true,
						width: 130,
					},
					{
						title: "销售结束日期",
						key: "EndSellDate",
						sortable: true,
						width: 130,
					},
					{
						title: "促销包",
						key: "IsPromotion",
						sortable: true,
						width: 100,
						render: (h, params) => {
							let texts = "";
							if(params.row.AllowDiscount == true) {
								texts = "是";
							} else if(params.row.AllowDiscount == false) {
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
						title: "试听包",
						key: "IsAudition",
						sortable: true,
						width: 100,
						render: (h, params) => {
							let texts = "";
							if(params.row.AllowDiscount == true) {
								texts = "是";
							} else if(params.row.AllowDiscount == false) {
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
						title: "可退费",
						key: "AllowReturns",
						sortable: true,
						width: 100,
						render: (h, params) => {
							let texts = "";
							if(params.row.AllowDiscount == true) {
								texts = "是";
							} else if(params.row.AllowDiscount == false) {
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
						title: "可调课",
						key: "AllowAdjustment",
						sortable: true,
						width: 100,
						render: (h, params) => {
							let texts = "";
							if(params.row.AllowDiscount == true) {
								texts = "是";
							} else if(params.row.AllowDiscount == false) {
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
						title: "可线上销售",
						key: "AllowOnline",
						sortable: true,
						width: 115,
						render: (h, params) => {
							let texts = "";
							if(params.row.AllowDiscount == true) {
								texts = "是";
							} else if(params.row.AllowDiscount == false) {
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
						title: "可折扣",
						key: "AllowDiscount",
						sortable: true,
						width: 100,
						render: (h, params) => {
							let texts = "";
							if(params.row.AllowDiscount == true) {
								texts = "是";
							} else if(params.row.AllowDiscount == false) {
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
						title: "门店专属课包",
						key: "IsExclusive",
						sortable: true,
						width: 130,
						render: (h, params) => {
							let texts = "";
							if(params.row.AllowDiscount == true) {
								texts = "是";
							} else if(params.row.AllowDiscount == false) {
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
						title: "启用",
						key: "Enabled",
						sortable: true,
						width: 80,
						render: (h, params) => {
							let texts = "";
							if(params.row.AllowDiscount == true) {
								texts = "是";
							} else if(params.row.AllowDiscount == false) {
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
				],
				CoursePackageData: [],
				//表单
				CousreFrom: {
					BusinessGroup: '',
					BusinessType: '',
					StoreId: '',
					PackageType: '',
					Code: '',
					PackageName: '',
					Description: '',
					FixedPeriods: '',
					TotalPeriods: '',
					SellPeriods: '',
					ComplimentPeriods: '',
					SellPrice: '',
					BeginSellDate: '',
					EndSellDate: '',
					IsPromotion: '',
					IsAudition: '',
					AllowReturns: '',
					AllowAdjustment: '',
					AllowOnline: '',
					AllowDiscount: '',
					IsExclusive: '',
					Enabled: '',
				},
				ruleValidate: {},
				//课包明细实体数组
				DetailedPackage: [],
				//课包价格实体
				PricePackage: [],
				//明细实体表头
				colDetailedPackage: [{
						title: "课包Id",
						key: "PackageId",
						sortable: true
					},
					{
						title: "课程Id",
						key: "CourseId",
						sortable: true
					},
					{
						title: "课时数",
						key: "Periods",
						sortable: true
					},
					{
						title: "固定课时",
						key: "IsLimited",
						sortable: true
					},
				],
				//课包明细实体表单
				CousreDetailFrom: {
					PackageId: '',
					CourseId: '',
					Periods: '',
					IsLimited: '',
				},
				//课包价格表头
				colPricePackage: [{
						title: "课包Id",
						key: "PackageId",
						sortable: true
					},
					{
						title: "门店Id",
						key: "StoreId",
						sortable: true
					},
					{
						title: "门店",
						key: "Store",
						sortable: true
					},
					{
						title: "销售开始日期",
						key: "BeginSellDate",
						sortable: true,
						width: 130,
					},
					{
						title: "销售结束日期",
						key: "EndSellDate",
						sortable: true,
						width: 130,
					},
					{
						title: "售价",
						key: "SellPrice",
						sortable: true
					},
					{
						title: "最低售价",
						key: "LimitPrice",
						sortable: true
					},
					{
						title: "可折扣",
						key: "AllowDiscount",
						sortable: true,
						render: (h, params) => {
							let texts = "";
							if(params.row.AllowDiscount == true) {
								texts = "是";
							} else if(params.row.AllowDiscount == false) {
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
				],
				//课包价格实体表单
				CousrePriseFrom: {
					PackageId: '',
					StoreId: '',
					Store: '',
					BeginSellDate: '',
					EndSellDate: '',
					SellPrice: '',
					LimitPrice: '',
					AllowDiscount: '',
				},
			}
		},
		methods: {
			 setOption(value, type) {
			 	console.log(value)
			 	if (value === 0 ) {
			        this.keshi = true;
			        this.qixian = false;
			      }else if(value === 1){
			      	this.keshi = false;
			      	this.qixian = true;
			      }
			 },
			//查询全部
			allinformationData() {

			},
			queryData() {

			},
			deleteList() {

			},
			BatchDelete() {

			},
			CancelBatchDelete() {

			},
			dblclickUpData() {

			},
			ok() {

			},
			cancel() {

			},
			handleDeleteDetail() {

			},
			handleDeletePrise() {

			},
			//取消课包明细保存
			DetailhandleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
			},
			//保存明细
			DetailhandleSubmit(name) {
				this.$refs[name].validate(valid => {
					if(valid) {
						this.DetailedPackage.push(this.CousreDetailFrom)
						this.CousreDetailFrom = {
							brand_right: 0
						};
						this.AddDetail = false;

					}
				})
			},
			//取消课包价格保存
			PrisehandleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
			},
			//保存价格
			PrisehandleSubmit(name) {
				this.$refs[name].validate(valid => {
					if(valid) {
						this.PricePackage.push(this.CousrePriseFrom)
						this.CousrePriseFrom = {
							brand_right: 0
						};
						this.AddPrise = false;
					}
				})
			},
			//取消添加
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
			},
			handleSubmit(name) {
				this.$refs[name].validate(valid => {
					if(valid) {
						//存课包明细信息
						localStorage.setItem(
							"DetailedPackage",
							JSON.stringify(this.DetailedPackage)
						);
						//存课包价格
						localStorage.setItem(
							"PricePackage",
							JSON.stringify(this.PricePackage)
						);
						//接口发送上边的data
						CoursePackageCreate(this.CousreFrom).then( res=>{
							console.log(res.data)
						}).catch(err=>{
							console.log(err)
						})

					}
				})
			}
		},
		mounted() {
			//获取课程接口
			CourseData(this.getTableData).then(res => {
				this.CourseData = res.data;
				console.log(this.CourseData)
			}).catch(err => {
				console.log(err)
			})
			//门店Id
			BusinessStoreGetEntities(this.getTableData).then(res => {
				console.log(res)
				this.store = res.data
				console.log(this.store)
			}).catch(err => {
				console.log(err)
			})
			//课包类型
			DataDictionary({
				dataCategory: "PACKAGE_TYPE",
				businessGroup: '*'
			}).then(res => {
				this.ClassPackage = res.data;
				console.log(this.ClassPackage)
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