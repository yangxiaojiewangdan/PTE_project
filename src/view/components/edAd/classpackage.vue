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
			<DatePicker v-model="StartEndDate" type="daterange" @on-change="queryData;StartEndDate=$event" format="yyyy-MM-dd" placeholder="请选择" style="width: 300px;margin-left:20px;"></DatePicker>
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
				<Button type="success" class="tableTops" @click="Add">添加</Button>
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
			<Table height="550" size="small" highlight-row stripe border ref="selection" :columns="CoursePackage" :data="CoursePackageData" @on-select="BatchDelete" @on-select-cancel="CancelBatchDelete" @on-row-dblclick="dblclickUpData" @on-select-all="allselectionId" @on-select-all-cancel="allcancelselectionId"></Table>

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
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="85" inline>
				<Row>
					<!--					<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">添加课包信息</Divider>
-->
					<!--基本信息-->
					<FormItem label="所属业务群" prop="BusinessGroup">
						<Input v-model="formValidate.BusinessGroup" placeholder="请输入" style="width:200px" disabled></Input>
					</FormItem>
					<FormItem label="所属业务品牌" prop="BusinessType">
						<Select v-model="formValidate.BusinessType" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem label="门店名称" prop="StoreId">
						<Select v-model="formValidate.StoreId" style="width:200px">
							<Option v-for="item in store" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>

					<FormItem label="课包类型" prop="PackageType">
						<Select v-model="formValidate.PackageType" style="width:200px" @on-change="v=>{setOption1(v,'type')}">
							<Option v-for="item in ClassPackage" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					<FormItem label="课包代码" prop="Code">
						<Input v-model="formValidate.Code" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="课包名称" prop="PackageName">
						<Input v-model="formValidate.PackageName" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					
					<FormItem label="期限(月)" prop="FixedPeriods" v-if="qixian">
						<Input v-model="formValidate.FixedPeriods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="总课时" prop="TotalPeriods" v-if="keshi">
						<Input v-model="formValidate.TotalPeriods" placeholder="请输入" style="width: 200px;"></Input>
					</FormItem>
					<FormItem label="销售课时" prop="SellPeriods" v-if="keshi">
						<Input v-model="formValidate.SellPeriods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="赠送课时" prop="ComplimentPeriods" v-if="keshi">
						<Input v-model="formValidate.ComplimentPeriods" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="销售截止日期" prop="BeginSellDate">
						<DatePicker v-model="formValidate.BeginSellDate" type="daterange" @on-change="queryData;StartEndDate=$event" format="yyyy-MM-dd" placeholder="请选择" style="width: 200px;"></DatePicker>
					</FormItem>
					<FormItem label="售价" prop="SellPrice">
						<Input v-model="formValidate.SellPrice" placeholder="请输入" style="width:200px"></Input>
					</FormItem>
					<FormItem label="课包描述" prop="Description">
						<Input v-model="formValidate.Description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width: 500px;"></Input>
					</FormItem>
					<!--<FormItem label="销售开始日期" prop="BeginSellDate">
						<DatePicker v-model="formValidate.BeginSellDate" @on-change="formValidate.BeginSellDate=$event" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
					</FormItem>
					<FormItem label="销售结束日期" prop="EndSellDate">
						<DatePicker v-model="formValidate.EndSellDate" @on-change="formValidate.EndSellDate=$event" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
					</FormItem>-->
					
					<!--单选-->
					<Col span="24">
					<FormItem label="" prop="IsPromotion" style="width:70px ;">
						<Checkbox v-model="formValidate.IsPromotion" style="width: 60px;">促销包</Checkbox>
					</FormItem>
					<FormItem label="" prop="IsAudition" style="width:70px ;">
						<Checkbox v-model="formValidate.IsAudition" style="width: 60px;">试听包</Checkbox>
					</FormItem>
					<FormItem label="" prop="IsExclusive" style="width:200px ;">
						<Checkbox v-model="formValidate.IsExclusive" style="width: 100px;">门店专属课包</Checkbox>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="" prop="AllowReturns" style="width:70px ;">
						<Checkbox v-model="formValidate.AllowReturns" style="width: 60px;">可退费</Checkbox>
					</FormItem>
					<FormItem label="" prop="AllowAdjustment" style="width:70px ;">
						<Checkbox v-model="formValidate.AllowAdjustment" style="width: 60px;">可调课</Checkbox>
					</FormItem>
					<FormItem label="" prop="AllowOnline" style="width:90px ;">
						<Checkbox v-model="formValidate.AllowOnline" style="width: 80px;">可线上销售</Checkbox>
					</FormItem>
					<FormItem label="" prop="AllowDiscount" style="width:70px ;">
						<Checkbox v-model="formValidate.AllowDiscount" style="width: 60px;">可折扣</Checkbox>
					</FormItem>
					
					<FormItem label="" prop="Enabled">
						<i-switch v-model="formValidate.Enabled" size="large">
							<span slot="open">启用</span>
							<span slot="close">禁止</span>
						</i-switch>
					</FormItem>
					</Col>
					<!--基本信息结束-->
					
				</Row>
				<Row>
					<!--课包明细实体-->
					<!--<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">课包明细实体</Divider>-->
					<div class="line">
						课包明细实体
					</div>
					<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="DetailedPackage" :columns="colDetailedPackage" @on-delete="handleDeleteDetail" border stripe height="200" @on-row-dblclick="dblclickUpDetail" />
					<Button type="info" @click="AddDetail = true">
              <Icon type="md-add"/>添加课包明细实体
            </Button>
				</Row>
				<!--课包价格实体-->
				<!--				<Divider orientation="left" class="line" style="font-weight: 900; color: #5555AA;">课包价格实体</Divider>-->
				<div class="line">
					课包价格实体
				</div>
				<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="PricePackage" :columns="colPricePackage" @on-delete="handleDeletePrise" border stripe height="200" @on-row-dblclick="dblclickUpPrise" />
				<Button type="info" @click="AddPrise = true">
              <Icon type="md-add"/>添加课包价格实体
            </Button>
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
		<!--课包实体弹框-->
		<Modal v-model="AddDetail" width="700" title="添加课包实体信息" :mask-closable="false">
			<Form ref="CousreDetailFrom" :model="CousreDetailFrom" :rules="ruleValidate" :label-width="85" inline>
				<!--<FormItem label="课包Id" prop="PackageId">
					<Select v-model="CousreDetailFrom.PackageId" style="width:200px">
						<Option v-for="item in CoursePackageData" :value="item.Id" :key="item.value">{{ item.PackageName }}</Option>
					</Select>
				</FormItem>-->
				<FormItem label="课程名称" prop="CourseId">
					<Select v-model="CousreDetailFrom.CourseId" style="width:200px" :label-in-value="true" @on-change="v=>{selectPeriods(v,'type')}">
						<Option v-for="item in CourseData" :value="item.Id">{{ item.CourseName }}</Option>
					</Select>

				</FormItem>
				<FormItem label="课时数" prop="Periods">
					<Input v-model="CousreDetailFrom.Periods" placeholder="请输入" style="width:200px"></Input>
				</FormItem>
				<FormItem label="" prop="IsLimited">
					<Checkbox v-model="CousreDetailFrom.IsLimited" style="width: 80px;">固定课时</Checkbox>
				</FormItem>
			</Form>
			<div slot="footer">
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="DetailhandleReset('CousreDetailFrom');AddDetail = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="DetailhandleSubmit('CousreDetailFrom');">
                        <span>保存</span>
                    </button>
			</div>
		</Modal>
		<!--课包价格弹框-->
		<Modal v-model="AddPrise" width="600" title="添加课包价格信息" :mask-closable="false">
			<Form ref="CousrePriseFrom" :model="CousrePriseFrom" :rules="ruleValidate" :label-width="120" inline>
				<Row>
					<Col span="24">
					<FormItem label="门店" prop="Store">
						<Select v-model="CousrePriseFrom.StoreId" style="width:300px">
							<Option v-for="item in store" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<!--<FormItem label="销售开始日期" prop="BeginSellDate">
						<DatePicker v-model="CousrePriseFrom.BeginSellDate" @on-change="CousrePriseFrom.BeginSellDate=$event" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
					</FormItem>
					<FormItem label="销售结束日期" prop="EndSellDate">
						<DatePicker v-model="CousrePriseFrom.EndSellDate" @on-change="CousrePriseFrom.EndSellDate=$event" format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
					</FormItem>-->
					<FormItem label="销售截止日期" prop="BeginSellDate">
						<DatePicker v-model="CousrePriseFrom.BeginSellDate" type="daterange" @on-change="queryData;StartEndDate=$event" format="yyyy-MM-dd" placeholder="请选择" style="width: 300px;"></DatePicker>
					</FormItem>
					<FormItem label="售价" prop="SellPrice">
						<Input v-model="CousrePriseFrom.SellPrice" placeholder="请输入" style="width:300px"></Input>
					</FormItem>
					<Col span="24">
					<FormItem label="" prop="AllowDiscount">
						<Checkbox v-model="CousrePriseFrom.AllowDiscount" style="width: 100px;" @on-change="Smallprice()">可折扣</Checkbox>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="最低售价" prop="LimitPrice" v-if="IsLimitPrice">
						<Input v-model="CousrePriseFrom.LimitPrice" placeholder="请输入" style="width:300px" ></Input>
					</FormItem>
					</Col>
					
				</Row>
			</Form>
			<div slot="footer">

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
	import { AddOrUpdateCourse, AddOrUpdatePrice, RemoveCourse, RemovePrice } from '@/api/data'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities } from '@/api/api'
	export default {
		name: 'classPackage',
		components: {
			Tables
		},
		inject: ["reload"],
		data() {
			return {
				Interface: 'CoursePackage',
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
				//CourseData: [],
				getTableData: {
					Filters: {}
				},
				//日期
				StartEndDate: "",
				button1: '',
				querySelect: "",
				querySelectList: '',
				queryvalue: '',
				qixian: false,
				keshi: false,
				AddDepartment: false,
				delModal: false,
				AddDetail: false,
				AddPrise: false,
				IsLimitPrice:false,
				//添加弹框表单表头
				CoursePackage: [{
						type: "selection",
						width: 45
				},
					{
						title: "课包类型",
						key: "PackageType",
						sortable: true,
						width: 110,
						render: (h, params) => {
							let texts = "";
							if(params.row.PackageType == 0) {
								texts = "课时包";
							} else if(params.row.PackageType == 1) {
								texts = "固定期限";
							}
							return h(
								"div", {
									props: {}
								},
								texts
							);
						},
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
						width: 95,
						render: (h, params) => {
							let texts = "";
							if(params.row.IsPromotion == true) {
								texts = "是";
							} else if(params.row.IsPromotion == false) {
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
							if(params.row.IsAudition == true) {
								texts = "是";
							} else if(params.row.IsAudition == false) {
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
							if(params.row.AllowReturns == true) {
								texts = "是";
							} else if(params.row.AllowReturns == false) {
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
							if(params.row.AllowAdjustment == true) {
								texts = "是";
							} else if(params.row.AllowAdjustment == false) {
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
							if(params.row.AllowOnline == true) {
								texts = "是";
							} else if(params.row.AllowOnline == false) {
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
							if(params.row.IsExclusive == true) {
								texts = "是";
							} else if(params.row.IsExclusive == false) {
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
				],
				//表格数组
				CoursePackageData: [],
				//表单
				formValidate: {
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
					Id: '',
				},
				ruleValidate: {},
				//课包明细实体数组
				DetailedPackage: [],
				//课包价格实体
				PricePackage: [],
				//明细实体表头
				colDetailedPackage: [{
						title: "课包名称",
						key: "PackageId",
						sortable: true
					},
					{
						title: "课程名称",
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
					{
						title: "操作",
						key: "handle",
						width: 70,
						options: ["delete"]
					}
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
					{
						title: "操作",
						key: "handle",
						width: 70,
						options: ["delete"]
					}
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
				//课包Id
				packageId: '',
				packageDetail: [],
				packagePrise: [],
				//勾选中的数组的Id
				BatchDeleteList: [],
				//课包价格和明细赋值
				PackageDetailCollection: [],
				PackagePriceCollection: [],
				setId: '',
				upPackageId: '',
				AddPackageDetail: [],
				AddPackagePrice: [],
				PackagePriseID: '',
				PackageDetailID: '',
				UpPackageDetail: [],
				UpPackagePrise: [],
			}
		},
		methods: {
			Smallprice(){
				this.IsLimitPrice = true;
			},
			//判断课包类型
			setOption1(value, type) {
				this.setId = value
				if(value === 0) {
					this.keshi = true;
					this.qixian = false;
				} else if(value === 1) {
					this.keshi = false;
					this.qixian = true;
				}
			},
			//选择课时
			selectPeriods(value) {
				console.log(value)
			},
			Add() {
				this.AddDepartment = true;
				this.formValidate = {};
				this.DetailedPackage = [];
				this.PricePackage = [];
				let userInfo = sessionStorage.getItem('userInfo');
				let array = JSON.parse(userInfo);
				console.log(array)
				this.formValidate.BusinessGroup = array.BusinessUnit

			},
			//查询全部
			allinformationData() {

			},
			queryData() {

			},
			//取消添加
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
			},
			//添加
			handleSubmit(name) {
				this.$refs[name].validate(valid => {
					if(valid && this.formValidate.Id == undefined || this.formValidate.Id == "") {
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
						Create(this.Interface, this.formValidate).then(res => {
							console.log(res.data)
							this.reload();
							//拿课包的Id和明细价格
							this.packageId = res.data.Data.Id
							this.packageDetail = JSON.parse(
								localStorage.DetailedPackage
							);
							console.log(this.packageDetail)
							this.packagePrise = JSON.parse(
								localStorage.PricePackage
							);
							console.log(this.packagePrise)
							if(res.data.ErrCode === '0') {
								AddOrUpdateCourse(this.Interface, {
									PackageId: this.packageId,
									CourseCollection: this.packageDetail
								}).then(res => {
									console.log(res.data)
								}).catch(err => {
									console.log(err)
								})
								AddOrUpdatePrice(this.Interface, {
									PackageId: this.packageId,
									PriceCollection: this.packagePrise
								}).then(res => {
									console.log(res.data)
									this.$Message.success("添加成功");
									this.reload();
								}).catch(err => {
									console.log(err)
								})
							}
						}).catch(err => {
							console.log(err)
						})

					} else {
						//修改大表单
						Update(this.Interface, this.formValidate).then(res => {
							console.log(res.data)
							this.$Message.success("修改信息成功");
							this.reload();
						}).catch(err => {
							console.log(err)
						})

					}
				})
			},
			//删除数组
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
			//双击表格
			dblclickUpData(index) {
				console.log(index)
				this.upPackageId = index.Id
				this.DetailedPackage = index.PackageDetailCollection
				this.PricePackage = index.PackagePriceCollection
				this.formValidate.Id = index.Id
				this.formValidate.BusinessGroup = index.BusinessGroup
				this.formValidate.BusinessType = index.BusinessType
				this.formValidate.StoreId = index.StoreId
				this.formValidate.PackageType = index.PackageType
				this.formValidate.Code = index.Code
				this.formValidate.PackageName = index.PackageName
				this.formValidate.Description = index.Description
				this.formValidate.FixedPeriods = index.FixedPeriods
				this.formValidate.TotalPeriods = index.TotalPeriods
				this.formValidate.SellPeriods = index.SellPeriods
				this.formValidate.ComplimentPeriods = index.ComplimentPeriods
				this.formValidate.SellPrice = index.SellPrice
				this.formValidate.BeginSellDate = index.BeginSellDate
				this.formValidate.EndSellDate = index.EndSellDate
				this.formValidate.IsPromotion = index.IsPromotion
				this.formValidate.IsAudition = index.IsAudition
				this.formValidate.AllowReturns = index.AllowReturns
				this.formValidate.AllowAdjustment = index.AllowAdjustment
				this.formValidate.AllowOnline = index.AllowOnline
				this.formValidate.AllowDiscount = index.AllowDiscount
				this.formValidate.IsExclusive = index.IsExclusive
				this.formValidate.Enabled = index.Enabled

				console.log(this.formValidate)
				this.AddDepartment = true;
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
			handleDeleteDetail(params) {
				console.log(params);
				let PackageId = params.row.PackageId;
				let CourseId = params.row.Id;
				RemoveCourse(PackageId, CourseId).then(res => {
					console.log(res.data)
					this.$Message.success('删除成功!');
				}).catch(err => {
					console.log(err)
				})
			},
			handleDeletePrise(params) {
				console.log(params);
				let PackageId = params.row.PackageId;
				let PriceId = params.row.Id;
				RemovePrice(PackageId, PriceId).then(res => {
					console.log(res.data)
				}).catch(err => {
					console.log(err)
				})
			},
			//取消课包明细保存
			DetailhandleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
			},
			//保存明细
			DetailhandleSubmit(name) {
				this.$refs[name].validate(valid => {
					if(valid && this.CousreDetailFrom.Id == undefined || this.CousreDetailFrom.Id == "") {
						this.DetailedPackage.push(this.CousreDetailFrom)
						console.log(this.DetailedPackage)
						console.log(this.CousreDetailFrom)
						this.AddPackageDetail.push(this.CousreDetailFrom)
						console.log(this.AddPackageDetail)
						this.CousreDetailFrom = {
							brand_right: 0
						};
						//添加明细
						AddOrUpdateCourse(this.Interface, {
							PackageId: this.upPackageId,
							//单独添加的一条，，再添加的发送过去
							CourseCollection: this.AddPackageDetail
						}).then(res => {
							console.log(res.data)

						}).catch(err => {
							console.log(err)
						});
						this.AddDetail = false;

					} else {
						//修改明细
						this.UpPackageDetail.push(this.CousreDetailFrom)
						AddOrUpdateCourse(this.Interface, {
							PackageId: this.PackageDetailID,
							//单独修改的一条
							CourseCollection: this.UpPackageDetail
						}).then(res => {
							console.log(res.data)

						}).catch(err => {
							console.log(err)
						});
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
					if(valid && this.CousrePriseFrom.Id == undefined || this.CousrePriseFrom.Id == "") {
						this.PricePackage.push(this.CousrePriseFrom)
						this.AddPackagePrice.push(this.CousrePriseFrom)
						this.CousrePriseFrom = {
							brand_right: 0
						};
						//修改价格
						AddOrUpdatePrice(this.Interface, {
							PackageId: this.upPackageId,
							//单独添加的一条，，再添加的发送过去
							PriceCollection: this.AddPackagePrice
						}).then(res => {

							console.log(res.data)
						}).catch(err => {
							console.log(err)
						});
						this.AddPrise = false;
					} else {
						//修改明细
						this.UpPackagePrise.push(this.CousrePriseFrom)
						AddOrUpdateCourse(this.Interface, {
							PackageId: this.PackageDetailID,
							//单独修改的一条
							CourseCollection: this.UpPackagePrise
						}).then(res => {
							console.log(res.data)

						}).catch(err => {
							console.log(err)
						});
					}
				})
			},
			dblclickUpDetail(index) {
				console.log(index)
				this.CousreDetailFrom = index
				this.PackageDetailID = index.PackageId
				this.AddDetail = true
			},
			dblclickUpPrise(index) {
				console.log(index)
				this.CousrePriseFrom = index
				this.PackagePriseID = index.PackageId
				this.AddPrise = true
			}
		},
		mounted() {
			//获取课包
			GetEntities(this.Interface, this.getTableData).then(res => {
				this.CoursePackageData = res.data
				console.log(this.CoursePackageData)
			}).catch(err => {
				console.log(err)
			})
			//获取课程
			GetEntities("Course", this.getTableData).then(res => {
				this.CourseData = res.data;
				console.log(this.CourseData)
			}).catch(err => {
				console.log(err)
			})
			//门店Id
			GetEntities("BusinessStore", this.getTableData).then(res => {
				this.store = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			})
			//课包类型
			DataDictionaryGetEntities("PACKAGE_TYPE").then(res => {
				this.ClassPackage = res.data;
				//console.log(this.ClassPackage)
			}).catch(err => {
				console.log(err)
			});
			let userInfo = sessionStorage.getItem('userInfo');
			let array = JSON.parse(userInfo);
			console.log(array)
			this.formValidate.BusinessGroup = array.BusinessUnit
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
		margin-top: 10px;
	}
</style>