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
		<Modal v-model="AddDepartment" scrollable width="1100" title="添加学员档案信息" :mask-closable="false" :styles="{top: '20px'}">
			<Form ref="CustomerFrom" :model="CustomerFrom" :rules="ruleValidate" :label-width="80" inline>
				<Row>
					<Col span="20">
					<!--<p class="lineTitle">基本信息</p>
				<div class="lineTop"></div>-->
					<Divider orientation="left" class='line'>基本信息</Divider>
					<FormItem label="姓" prop="FirstName">
						<Input v-model="CustomerFrom.FirstName" placeholder="Enter something..." style="width: 200px;"></Input>
					</FormItem>
					<FormItem label="名" prop="LastName">
						<Input v-model="CustomerFrom.LastName" placeholder="Enter something..." style="width: 200px;"></Input>
					</FormItem>
					<FormItem label="性别" prop="Gender">
						<RadioGroup v-model="CustomerFrom.Gender" style="width: 200px;">
							<Radio v-for="item in radioList" :label="item.Code">
								<span>{{item.Description}}</span>
							</Radio>
						</RadioGroup>
					</FormItem>
					<Col span="20">
					<FormItem label="昵称" prop="NickName">
						<Input v-model="CustomerFrom.NickName" placeholder="Enter something..." style="width: 200px;"></Input>
					</FormItem>
					<FormItem label="英文名" prop="EngName">
						<Input v-model="CustomerFrom.EngName" placeholder="Enter something..." style="width: 200px;"></Input>
					</FormItem>
					</Col>
					<FormItem label="出生日期" prop="BrithDate">
						<DatePicker @on-change="handleChange" type="date" placeholder="Select date" v-model="CustomerFrom.BrithDate" style="width: 200px;" :options="options3"></DatePicker>
					</FormItem>
					</Col>
					<Col span="4">
					<FormItem label="">
						<Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="width: 100px;margin-left: -300px; margin-top: 100px;">
							<div style="padding: 5px">
								<Icon type="ios-cloud-upload" size="50"></Icon>
								<p>上传照片</p>
							</div>
						</Upload>
					</FormItem>
					<!--<FormItem label="普通照片">
						<Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
							<div style="padding: 5px">
								<Icon type="ios-cloud-upload" size="50"></Icon>
							</div>
						</Upload>
					</FormItem>-->
					</Col>
				</Row>

				<!--客源信息-->
				<!--<p class="lineTitle">基本信息</p>
				<div class="lineTop"></div>-->
				<Divider orientation="left" class='line'>客源信息</Divider>
				<FormItem label="客户类型" prop="CustomerType">
					<Select v-model="CustomerFrom.CustomerType" style="width: 200px;">
						<Option v-for="item in customerTypeData" :value="item.Code">{{item.Description}}</Option>
					</Select>
				</FormItem>

				<FormItem label="会员类型" prop="MemberType">
					<Select v-model="CustomerFrom.MemberType" style="width: 200px;">
						<Option v-for="item in MemberTypeData" :value="item.Code">{{item.Description}}</Option>

					</Select>
				</FormItem>
				<FormItem label="会员号" prop="MemberNo">
					<Input v-model="CustomerFrom.MemberNo" placeholder="Enter something..." style="width: 200px;"></Input>
				</FormItem>
				<FormItem label="来源渠道" prop="ChannelCode">
					<Select v-model="CustomerFrom.ChannelCode" style="width: 200px;">
						<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				<FormItem label="市场分类" prop="MarketClass">
					<Select v-model="CustomerFrom.MarketClass" style="width: 200px;">
						<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				<FormItem label="市场代码" prop="MarketCode">
					<Select v-model="CustomerFrom.MarketCode" style="width: 200px;">
						<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				<!--地址-->
				<!--<p class="lineTitle">基本信息</p>
				<div class="lineTop"></div>-->
				<Divider orientation="left" class='line'>所在地址</Divider>
				<FormItem label="所在省" prop="ProviceCode">
					<Select v-model="CustomerFrom.ProviceCode" @on-change="SelectProviceCode" style="width:200px">
						<Option v-for="item in province" :value="item.Id" :key="item.value">{{ item.Name }}</Option>
					</Select>
				</FormItem>
				<FormItem label="所在市" prop="CityCode">
					<Select v-model="CustomerFrom.CityCode" @on-change="SelectCityCode" style="width:200px">
						<Option v-for="item in city" :value="item.Id" :key="item.value">{{ item.Name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="所在县区" prop="DistinctCode">
					<Select v-model="CustomerFrom.DistinctCode" style="width:200px">
						<Option v-for="item in county" :value="item.Id" :key="item.value">{{ item.Name }}</Option>
					</Select>
				</FormItem>
				<FormItem label="所在小区" prop="VillageCode">
					<Select v-model="CustomerFrom.VillageCode" style="width: 200px;">
						<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				<FormItem label="详细地址" prop="Address">
					<Input v-model="CustomerFrom.Address" placeholder="Enter something..." style="width: 200px;"></Input>
				</FormItem>
				<!--联系人信息-->
				<!--<p class="lineTitle">基本信息</p>
				<div class="lineTop"></div>-->
				<Divider orientation="left" class='line'>联系人信息</Divider>
				<FormItem label="家长姓名" prop="ContactName">
					<Input v-model="CustomerFrom.ContactName" placeholder="Enter something..." style="width: 200px;"></Input>
				</FormItem>
				<FormItem label="家长手机" prop="ContactPhone">
					<Input v-model="CustomerFrom.ContactPhone" placeholder="Enter something..." style="width: 200px;"></Input>
				</FormItem>
				<FormItem label="家长邮箱" prop="ContactEMail">
					<Input v-model="CustomerFrom.ContactEMail" placeholder="Enter something..." style="width: 200px;"></Input>
				</FormItem>
				<FormItem label="业务部门" prop="BusinessUnit">
					<Select v-model="CustomerFrom.BusinessUnit" style="width: 200px;">
						<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				<FormItem label="负责人" prop="BusinessUnit">
					<Select v-model="CustomerFrom.BusinessUnit" style="width: 200px;">
						<Option value="beijing">New York</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				<FormItem label="业务部门ID" prop="BusinessUnitId">
					<Input v-model="CustomerFrom.BusinessUnitId" placeholder="Enter something..." style="width: 200px;"></Input>
				</FormItem>

				<FormItem label="负责人ID" prop="OwnerId">
					<Input v-model="CustomerFrom.OwnerId" placeholder="Enter something..." style="width: 200px;"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<div class="footer_left">
					<div class="footer_left1">
						<div>
							<span>创建人:闫子健</span>
						</div>
						<div>
							<span>更新人:闫子健</span>
						</div>
					</div>
					<div class="footer_left2">
						<div>
							<span>创建时间:2018/12/13/ 13:00:00</span>
						</div>
						<div>
							<span>更新时间:2018/12/13/ 13:00:00</span>
						</div>
					</div>
				</div>
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset('CustomerFrom');AddDepartment = false;">
          <span>取消</span>
        </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit('CustomerFrom');">
          <span>确定</span>
        </button>
			</div>
		</Modal>
		<!--修改弹框-->
		<Modal v-model="upDepartment" scrollable width="1100" title="查看学员明细及添加联系人" :mask-closable="false" footer-hide :styles="{top: '20px'}">
			<!--table标签-->
			<Tabs value="name1">
				<TabPane label="查看学员明细" name="name1">
					<Form ref="upCustomerFrom" :model="upCustomerFrom" :rules="ruleValidate" :label-width="80" inline>
						<Row>
							<Col span="20">
							<Divider orientation="left" class='line'>基本信息</Divider>
							<FormItem label="姓" prop="FirstName">
								<Input v-model="upCustomerFrom.FirstName" placeholder="Enter something..." style="width: 200px;"></Input>
							</FormItem>
							<FormItem label="名" prop="LastName">
								<Input v-model="upCustomerFrom.LastName" placeholder="Enter something..." style="width: 200px;"></Input>
							</FormItem>
							<FormItem label="性别" prop="Gender">
								<RadioGroup v-model="upCustomerFrom.Gender" style="width: 200px;">
									<Radio v-for="item in radioList" :label="item.Code">
										<span>{{item.Description}}</span>
									</Radio>
								</RadioGroup>
							</FormItem>
							<Col span="20">
							<FormItem label="昵称" prop="NickName">
								<Input v-model="upCustomerFrom.NickName" placeholder="Enter something..." style="width: 200px;"></Input>
							</FormItem>
							<FormItem label="英文名" prop="EngName">
								<Input v-model="upCustomerFrom.EngName" placeholder="Enter something..." style="width: 200px;"></Input>
							</FormItem>
							</Col span="4">
							<FormItem label="出生日期" prop="BrithDate">
								<DatePicker type="date" placeholder="Select date" v-model="CustomerFrom.BrithDate" style="width: 200px;"></DatePicker>
							</FormItem>
							<FormItem label="月龄" prop="BornMonth">
								<Input v-model="upCustomerFrom.BornMonth" readonly placeholder="Enter something..." readonly style="width: 200px;"></Input>
							</FormItem>
							</Col>
							<Col span="4">
							<FormItem label="">
								<Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="width: 100px;margin-left: -300px; margin-top: 100px;">
									<div style="padding: 5px">
										<Icon type="ios-cloud-upload" size="50"></Icon>
										<p>上传照片</p>
									</div>
								</Upload>
							</FormItem>
							<!--<FormItem label="普通照片">
								<Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
									<div style="padding: 5px">
										<Icon type="ios-cloud-upload" size="50"></Icon>
									</div>
								</Upload>
							</FormItem>-->
							</Col>
						</Row>
						<Divider orientation="left" class='line'>客源信息</Divider>
						<FormItem label="客户类型" prop="CustomerType">
							<Select v-model="upCustomerFrom.CustomerType" style="width: 200px;">
								<Option v-for="item in customerTypeData" :value="item.Code">{{item.Description}}</Option>
							</Select>
						</FormItem>

						<FormItem label="会员类型" prop="MemberType">
							<Select v-model="upCustomerFrom.MemberType" style="width: 200px;">
								<Option v-for="item in MemberTypeData" :value="item.Code">{{item.Description}}</Option>

							</Select>
						</FormItem>
						<FormItem label="会员号" prop="MemberNo">
							<Input v-model="upCustomerFrom.MemberNo" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="来源渠道" prop="ChannelCode">
							<Select v-model="upCustomerFrom.ChannelCode" style="width: 200px;">
								<Option value="beijing">New York</Option>
								<Option value="shanghai">London</Option>
								<Option value="shenzhen">Sydney</Option>
							</Select>
						</FormItem>
						<FormItem label="市场分类" prop="MarketClass">
							<Select v-model="upCustomerFrom.MarketClass" style="width: 200px;">
								<Option value="beijing">New York</Option>
								<Option value="shanghai">London</Option>
								<Option value="shenzhen">Sydney</Option>
							</Select>
						</FormItem>
						<FormItem label="市场代码" prop="MarketCode">
							<Select v-model="upCustomerFrom.MarketCode" style="width: 200px;">
								<Option value="beijing">New York</Option>
								<Option value="shanghai">London</Option>
								<Option value="shenzhen">Sydney</Option>
							</Select>
						</FormItem>
						<Divider orientation="left" class='line'>详细地址</Divider>
						<FormItem label="所在省" prop="ProviceCode">
							<Select v-model="upCustomerFrom.ProviceCode" @on-change="SelectProviceCode" style="width: 200px;">
								<Option v-for="item in province" :value="item.Id" :key="item.value">{{ item.Name }}</Option>
							</Select>
						</FormItem>
						<FormItem label="所在市" prop="CityCode">
							<Select v-model="upCustomerFrom.CityCode" @on-change="SelectCityCode" style="width: 200px;">
								<Option v-for="item in city" :value="item.Id" :key="item.value">{{ item.Name }}</Option>
							</Select>
						</FormItem>
						<FormItem label="所在县区" prop="DistinctCode">
							<Select v-model="upCustomerFrom.DistinctCode" style="width: 200px;">
								<Option v-for="item in county" :value="item.Id" :key="item.value">{{ item.Name }}</Option>
							</Select>
						</FormItem>
						<FormItem label="所在小区" prop="VillageCode">
							<Select v-model="upCustomerFrom.VillageCode" style="width: 200px;">
								<Option value="beijing">New York</Option>
								<Option value="shanghai">London</Option>
								<Option value="shenzhen">Sydney</Option>
							</Select>
						</FormItem>
						<FormItem label="详细地址" prop="Address">
							<Input v-model="upCustomerFrom.Address" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<Divider orientation="left" class='line'>联系人信息</Divider>
						<FormItem label="家长姓名" prop="ContactName">
							<Input v-model="upCustomerFrom.ContactName" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="家长手机" prop="ContactPhone">
							<Input v-model="upCustomerFrom.ContactPhone" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="家长邮箱" prop="ContactEMail">
							<Input v-model="upCustomerFrom.ContactEMail" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="业务部门ID" prop="BusinessUnitId">
							<Input v-model="upCustomerFrom.BusinessUnitId" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="业务部门" prop="BusinessUnit">
							<Select v-model="upCustomerFrom.BusinessUnit" style="width: 200px;">
								<Option value="beijing">New York</Option>
								<Option value="shanghai">London</Option>
								<Option value="shenzhen">Sydney</Option>
							</Select>
						</FormItem>
						<FormItem label="负责人ID" prop="OwnerId">
							<Input v-model="upCustomerFrom.OwnerId" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="负责人" prop="BusinessUnit">
							<Select v-model="upCustomerFrom.BusinessUnit" style="width: 200px;">
								<Option value="beijing">New York</Option>
								<Option value="shanghai">London</Option>
								<Option value="shenzhen">Sydney</Option>
							</Select>
						</FormItem>
					</Form>
					<div id="footer">
						<div class="footer_left">
							<div class="footer_left1">
								<div>
									<span>创建人:闫子健</span>
								</div>
								<div>
									<span>更新人:闫子健</span>
								</div>
							</div>
							<div class="footer_left2">
								<div>
									<span>创建时间:2018/12/13/ 13:00:00</span>
								</div>
								<div>
									<span>更新时间:2018/12/13/ 13:00:00</span>
								</div>
							</div>
						</div>
						<div class="btn">
							<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleResetUp('upCustomerFrom');upDepartment = false;">
          <span>取消</span>
        </button>
							<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmitUp('upCustomerFrom');">
          <span>修改</span>
        </button>
						</div>

					</div>

				</TabPane>
				<!--添加联系人信息-->
				<TabPane label="添加联系人信息" name="name2">
					<Form ref="AddCustomerFrom" :model="AddCustomerFrom" :rules="ruleValidate" :label-width="80" inline>
						<Divider orientation="left" class='line'>基本信息</Divider>
						<FormItem label="姓" prop="FirstName">
							<Input v-model="AddCustomerFrom.FirstName" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="名" prop="LastName">
							<Input v-model="AddCustomerFrom.LastName" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="全名" prop="FullName">
							<Input v-model="AddCustomerFrom.FullName" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="关系" prop="RelationType">
							<Select v-model="AddCustomerFrom.RelationType" style="width:200px">
								<Option v-for="item in  relationship" :value="item.Code" :key="item.value">{{ item.Description }}</Option>
							</Select>
						</FormItem>
						<FormItem label="主要标识" prop="IsPrimary">
							<i-switch v-model="AddCustomerFrom.IsPrimary">
								<span slot="open">On</span>
								<span slot="close">Off</span>
							</i-switch>
						</FormItem>
						<FormItem label="启用" prop="Enabled">
							<i-switch v-model="AddCustomerFrom.Enabled">
								<span slot="open">On</span>
								<span slot="close">Off</span>
							</i-switch>
						</FormItem>
						<Divider orientation="left" class='line'>联系方式</Divider>
						<FormItem label="手机号" prop="TelPhone">
							<Input v-model="AddCustomerFrom.TelPhone" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="微信号" prop="WeChat">
							<Input v-model="AddCustomerFrom.WeChat" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="QQ号" prop="QQ">
							<Input v-model="AddCustomerFrom.QQ" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="邮箱" prop="EMail">
							<Input v-model="AddCustomerFrom.EMail" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="职业" prop="Career">
							<Input v-model="AddCustomerFrom.Career" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="登陆密码" prop="Password">
							<Input v-model="AddCustomerFrom.Password" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="渠道代码" prop="ChannelCode">
							<Input v-model="AddCustomerFrom.ChannelCode" placeholder="Enter something..." style="width: 200px;"></Input>
						</FormItem>
						<FormItem label="自主注册" prop="IsSelfRegister">
							<i-switch v-model="AddCustomerFrom.IsSelfRegister">
								<span slot="open">On</span>
								<span slot="close">Off</span>
							</i-switch>
						</FormItem>
						<Divider orientation="left" class='line'>描述</Divider>
						<FormItem label="部门描述" prop="Comments">
							<Input v-model="AddCustomerFrom.Comments" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width:460px"></Input>
						</FormItem>
					</Form>
					<div id="footer2">
						<div class="footer_left">
							<div class="footer_left1">
								<div>
									<span>创建人:闫子健</span>
								</div>
								<div>
									<span>更新人:闫子健</span>
								</div>
							</div>
							<div class="footer_left2">
								<div>
									<span>创建时间:2018/12/13/ 13:00:00</span>
								</div>
								<div>
									<span>更新时间:2018/12/13/ 13:00:00</span>
								</div>
							</div>
						</div>
						<div class="btn">
							<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleResetAdd('AddCustomerFrom');upDepartment = false;">
          <span>取消</span>
        </button>
							<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmitAdd('AddCustomerFrom');">
          <span>添加</span>
        </button>
						</div>

					</div>

				</TabPane>
			</Tabs>
		</Modal>
	</div>
</template>
<script>
	import { CustomerData, DataDictionary, CustomerCreate, CustomerDelete, CustomerUp, CustomerQuery, CustomerContactCreate } from "@/api/data";
	import { DistrictGetProvince, DistrictGetArea } from "@/api/api";
	export default {
		inject: ['reload'],
		name: 'CustomerProfile',
		data() {
			return {
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
						title: "姓",
						key: "FirstName",
						width: 120,
						sortable: true
					},
					{
						title: "名",
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
				upDepartment: false,
				delModal: false,
				CustomerFrom: {
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
				upCustomerFrom: {
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
					IdPhotoUrl: '',
					LifePhotoUrl: '',
					ContactName: '',
					ContactPhone: '',
					ContactEMail: '',
					BusinessUnitId: '',
					BusinessUnit: '',
					OwnerId: '',
					BusinessUnit: '',
				},
				AddCustomerFrom: {
					FirstName: '',
					LastName: '',
					FullName: '',
					RelationType: '',
					TelPhone: '',
					WeChat: '',
					QQ: '',
					EMail: '',
					Career: '',
					IsPrimary: true,
					IsSelfRegister: false,
					Password: '',
					ChannelCode: '',
					Enabled: true,
					Comments: '',
					//学员的Id
					CustomerId: '',
				},
				ruleValidate: {

				},
				//选中的数组id
				batchArr: [],
				queryDistinctCode: "",

			}
		},
		methods: {
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
				CustomerDelete(this.batchArr).then(res => {
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
				this.upDepartment = true;
				this.upCustomerFrom = index;
				console.log(index)
				this.AddCustomerFrom.CustomerId = index.Id
			},
			//点击修改
			handleSubmitUp() {
				CustomerUp(this.upCustomerFrom).then(res => {
					this.$Message.success("修改成功!");
					this.reload();
					console.log(res)
				}).catch(err => {
					console.log(err)
					this.$Message.error("修改失败!");
				})
			},
			handleResetUp() {
				this.$Message.info('已取消添加部门');
			},
			// 点击全部查询全部数据
			allinformationData() {
				CustomerData(this.CustomerData1).then(res => {
					console.log(res)
					this.RadioGroupStatus = '';
					this.CustomerData = res.data;
				}).catch(err => {
					console.log(err)
				});
			},
			//添加学员
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						CustomerCreate(this.CustomerFrom).then( res=>{
							console.log(res.data)
							this.$Message.success('添加成功!');
							this.reload();
						}).catch( err=>{
							console.log(err)
							this.$Message.error('添加失败!');
						})
					} else {
						this.$Message.error('失败!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消添加部门');
			},
			//添加联系人信息
			handleSubmitAdd(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						CustomerContactCreate(this.AddCustomerFrom).then(res => {
							console.log(res)
							this.$Message.success('添加成功!');
							this.reload();
						}).catch(err => {
							this.$Message.error('添加失败!');
							console.log(err)
						})
					} else {
						this.$Message.error('失败!');
					}
				})
			},
			handleResetAdd(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消添加联系人信息');
			},
			//客户类型查询
			queryCustomerDate(data) {
				console.log(data)
				CustomerQuery({
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
				CustomerQuery({
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
				let time = new Date(showData)
				let targetTime = time.valueOf();
				let currentTime = (new Date()).valueOf();
				let differenceTime = currentTime - targetTime;
				let age = Math.floor(differenceTime / (30 * 24 * 60 * 60 * 1000))
				this.CustomerFrom.BornMonth = age;
			},

		},
		mounted() {
			//获取表格数据
			CustomerData(this.CustomerData1).then(res => {
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
			DataDictionary({
				dataCategory: "GENDER_TYPE",
				businessGroup: '*'
			}).then(res => {
				this.radioList = res.data
			}).catch(err => {
				console.log(err)
			});
			//客户类型
			DataDictionary({
				dataCategory: "CUSTOMER_TYPE",
				businessGroup: '*'
			}).then(res => {
				this.customerTypeData = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			//会员类型
			DataDictionary({
				dataCategory: "MEMBERSHIP_TYPE",
				businessGroup: '*'
			}).then(res => {
				this.MemberTypeData = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			//关系、
			DataDictionary({
				dataCategory: "CUSTOMER_RELATION_TYPE",
				businessGroup: '*'
			}).then(res => {
				this.relationship = res.data
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			});
			DistrictGetProvince().then(res => {
				console.log(res.data)
				this.province = res.data;
			}).catch(err => {
				console.log(err)
			})

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
</style>