<template>
  <div id="information">
    <Row>
      <Col span="24" style="height:50px;">
        <h1 class="queryHeader">订单管理</h1>
      </Col>
    </Row>
    <!-- 查询条件 -->
    <Row>
      <Col span="24" class="querycriteria" style="height:200px;">
        <!-- 滚动 -->
        <Col span="24">
          <Row>
            <Col span="15" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:46px;">加盟商：</h3>
              <Select v-model="SelectFranchiser" @on-change="queryquerychange" style="width:200px;margin-left:20px;">
                <Option
                  v-for="item in FranchiserList"
                  :value="item.Code"
                  :key="item.Id"
                >{{ item.Code }}</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span="15" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:60px;">门店：</h3>
              <Select v-model="SelectStore" @on-change="queryquerychange" style="width:200px;margin-left:20px;">
                <Option
                  v-for="item in StoreList"
                  :value="item.Id"
                  :key="item.Id"
                >{{ item.Code }}</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery">开始/结束日期：</h3>
              <DatePicker
                v-model="StartEndDate"
                type="daterange"
                placeholder="Select date and time(Excluding seconds)"
                style="width: 300px;margin-left:20px;"
              ></DatePicker>
            </Col>
          </Row>
          <Row>
            <Col span="15" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">订单状态：</h3>
              <Button type="text" class="tableTops">全部</Button>
              <RadioGroup v-model="RadioOrderStatus" type="button">
                <Radio v-for="item in OrderStatusList" :key="item.Code" :label="item.Id">
                  <span>{{item.Description}}</span>
                </Radio>
              </RadioGroup>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
    <!-- 查询结果 -->
    <Row>
      <Col span="15" class="queryEnd">
        <h2>查询结果</h2>
      </Col>
      <!-- 表格上面的功能 -->
      <Col span="8">
        <div class="tableTop">
          <Button @click="AddDepartment1" type="success" class="tableTops">添加</Button>
          <Button @click="deleteList" type="error" class="tableTops">删除</Button>
          <Select v-model="querySelect" :label-in-value="true" style="width:120px">
            <Option
              v-for="item in querySelectList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <Input
            v-model="queryvalue"
            placeholder="Enter something..."
            style="width: 150px"
            class="tableTops"
          />
          <Button type="primary" class="tableTops">查询</Button>
        </div>
      </Col>
      <!-- 表格上面的功能 end-->
      <Col span="24">
        <!-- 表格 -->
        <Table
          height="530"
          size="small"
          highlight-row
          stripe
          border
          ref="selection"
          :columns="informationTable"
          :data="informationData"
          @on-row-dblclick="dblclickUpData"
          @on-select="OneselectionId"
          @on-select-all="allselectionId"
          @on-select-all-cancel="allcancelselectionId"
          @on-select-cancel="OnecancelselectionId"
        ></Table>
        <!-- 表格 end-->
      </Col>
      <Col span="24">
        <!-- 分页 -->
        <Page :total="100" class="page"/>
        <!-- 分页 end-->
      </Col>
    </Row>
    <Enquiringcustomers v-if="Enquiringcustomers1" v-on:childByValue="childByValue"></Enquiringcustomers>
    <!-- 添加信息 弹出框-->
    <Modal v-model="AddDepartment" scrollable width="1300" :mask-closable="false">
      <p slot="header" style="text-align:left;line-height: 1;">
        <span v-if="add">添加订单</span>
        <span v-if="see">查看订单详情</span>
      </p>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="80"
      >
        <Row>
          <Col span="18">
            <Col span="8">
              <FormItem label="所属门店" prop="StoreId">
                <Select v-model="formValidate.StoreId" @on-change="SelectStoreId">
                  <Option
                    v-for="item in StoreList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Code }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="15">
              <FormItem label="所属加盟商" prop="Franchiser">
                <Input v-model="formValidate.Franchiser" placeholder="选择门店将加盟商带出" disabled></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="客户" prop="ProfileId">
                <Input v-if="ProfileIdHide" v-model="formValidate.ProfileId" placeholder="请输入"></Input>
                <Input
                  v-model="formValidate.LastName"
                  readonly
                  @on-search="Enquiringcustomers"
                  search
                  placeholder="请点击搜索选择客户"
                ></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="昵称" prop="NickName">
                <Input v-model="formValidate.NickName" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="出生年月" prop="BrithDate">
                <Input v-model="formValidate.BrithDate" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="课包" prop="PackageId">
                <Select
                  v-model="formValidate.PackageId"
                  @on-change="PackageIdchange"
                  :label-in-value="true"
                >
                  <Option
                    v-for="item in PackageIdList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem label="课包类型" prop="PackageTypeDesc">
                <Input v-model="formValidate.PackageTypeDesc" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem label="定价" prop="OriginalPrice">
                <Input  v-model="formValidate.OriginalPrice" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="5" v-if="ifTotalPeriod">
              <FormItem label="总课时" prop="TotalPeriod">
                <Input v-model="formValidate.TotalPeriod" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="5" v-if="ifFixedPeriods">
              <FormItem label="期限(月)" prop="FixedPeriods">
                <Input v-model="formValidate.FixedPeriods" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="售价" prop="SalePrice">
                <Input
                  :disabled="isdisabledFn"
                  v-model="formValidate.SalePrice"
                  @on-change="SalePricechange"
                  @on-blur="SalePriceblur"
                  placeholder="请输入"
                ></Input>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem label="数量" prop="Quantity">
                <InputNumber
                  v-model="formValidate.Quantity"
                  @on-change="SalePricechange"
                  placeholder="请输入"
                ></InputNumber>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="赠送课时" prop="q">
                <Input v-model="q" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="总金额" prop="BalanceAmt">
                <Input v-model="formValidate.BalanceAmt" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="开始日期" prop="StartDate">
                <DatePicker
                  type="date"
                  v-model="formValidate.StartDate"
                  @on-change="StartDatechange"
                  placeholder="Select date"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="结束日期" prop="EndDate">
                <DatePicker
                  type="date"
                  readonly
                  v-model="formValidate.EndDate"
                  placeholder="Select date"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem label="负责人" prop="OwnerId">
                <Select v-model="formValidate.OwnerId" @on-change="OwnerIdchange" placeholder="请输入">
                  <Option
                    v-for="item in OwnerList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Account }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="业务部门" prop="BusinessUnit">
                <Input v-model="formValidate.BusinessUnit" disabled placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="折扣原因" prop="DiscountCode" v-if="ifDiscountCode">
                <Select v-model="formValidate.DiscountCode">
                  <Option
                    v-for="item in DiscountCodeList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="15">
              <FormItem label="折扣备注" prop="DiscountReason" v-if="ifDiscountCode">
                <Input v-model="formValidate.DiscountReason" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="备注" prop="Comments">
                <Input
                  v-model="formValidate.Comments"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="请输入"
                ></Input>
              </FormItem>
            </Col>
            <Col span="22" offset="1">
              <Tabs value="name1">
                <TabPane label="支付记录" name="name1">
                  <Table ref="selection" :columns="columns1" :data="data1" size="small"></Table>
                </TabPane>
                <TabPane label="销课记录" name="name2">标签二的内容</TabPane>
                <TabPane label="退课记录" name="name3">标签三的内容</TabPane>
              </Tabs>
            </Col>
          </Col>
          <Col span="6" style="border-left:1px solid #eee;">
            <Col span="23">
              <FormItem label="订单类型" prop="OrderType">
                <Select v-model="formValidate.OrderType">
                  <Option
                    v-for="item in OrderTypeList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="来源渠道" prop="ChannelCode">
                <Select v-model="formValidate.ChannelCode">
                  <Option
                    v-for="item in StoreList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Code }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="市场分类" prop="MarketClass">
                <Select v-model="formValidate.MarketClass">
                  <Option
                    v-for="item in StoreList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Code }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="市场代码" prop="MarketCode">
                <Select v-model="formValidate.MarketCode">
                  <Option
                    v-for="item in StoreList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Code }}</Option>
                </Select>
              </FormItem>
            </Col>

            <Col span="23">
              <FormItem label="订单状态" prop="OrderStatusDesc">
                <Input v-model="formValidate.OrderStatusDesc" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="支付状态" prop="PaymentStatusDesc">
                <Input v-model="formValidate.PaymentStatusDesc" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="已付金额" prop="ChargeAmt">
                <Input v-model="formValidate.ChargeAmt" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="剩余金额 " prop="BalanceAmt">
                <Input v-model="formValidate.BalanceAmt" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="已用课时" prop="UsedPeriod">
                <Input v-model="formValidate.UsedPeriod" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="剩余课时" prop="RemainPeriod">
                <Input v-model="formValidate.RemainPeriod" placeholder="请输入" disabled></Input>
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
        <Button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="delete1 = true;"
          v-if="del"
        >
          <span>删除</span>
        </Button>
        <button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="PaymentOrder = true;"
          v-if="del"
        >
          <span>支付</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="Retirefromclass = true;"
          v-if="del"
        >
          <span>申请退课</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="handleSubmit('formValidate');"
        >
          <span>确定</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="handleReset('formValidate');AddDepartment = false;"
        >
          <span>取消</span>
        </button>
      </div>
    </Modal>
    <!-- 删除信息弹出框 -->
    <Modal v-model="delete1" title="提示" @on-ok="ok">
      <h3>确定删除此数据？</h3>
    </Modal>

    <!-- 退课申请 弹出框-->
    <Modal v-model="Retirefromclass" scrollable title="退课申请" :mask-closable="false">
      <Form
        ref="Retirefromclass"
        :model="formRetirefromclass"
        :rules="ruleRetirefromclass"
        label-position="right"
        :label-width="90"
      >
        <Row>
          <Col span="24">
            <Col span="23">
              <FormItem label="退课原因代码" prop="CancellationCode">
                <Select v-model="formRetirefromclass.CancellationCode">
                  <Option
                    v-for="item in CancellationCodeList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="退课原因" prop="CancellationReason">
                <Input v-model="formRetirefromclass.CancellationReason" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="取消课时" prop="CancellationPeriod">
                <Input v-model="formRetirefromclass.CancellationPeriod" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="取消金额" prop="CancellationAmt">
                <Input v-model="formRetirefromclass.CancellationAmt" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="取消日期" prop="CancellationDate">
                <Input v-model="formRetirefromclass.CancellationDate" placeholder="请输入" disabled></Input>
              </FormItem>
            </Col>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="handleReset('formRetirefromclass');Retirefromclass = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="RetirefromclassSubmit('formRetirefromclass');"
        >
          <span>确定</span>
        </button>
      </div>
    </Modal>
    <!-- 支付 弹出框-->
    <Modal v-model="PaymentOrder" scrollable title="支付订单" :mask-closable="false">
      <Form
        ref="formValidate"
        :model="formPaymentOrder"
        :rules="rulePaymentOrder"
        label-position="right"
        :label-width="80"
      >
        <Row>
          <Col span="24">
            <Col span="23">
              <FormItem label="支付方式" prop="PaymentCode">
                <Select v-model="formPaymentOrder.PaymentCode">
                  <Option
                    v-for="item in PaymentCodeList"
                    :value="item.Code"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="支付账号" prop="PaymentAccount">
                <Input v-model="formPaymentOrder.PaymentAccount" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="23">
              <FormItem label="支付金额" prop="PaymentAmt">
                <Input v-model="formPaymentOrder.PaymentAmt" placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="handleReset('formPaymentOrder');PaymentOrder = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="PaymentOrderSubmit('formPaymentOrder');"
        >
          <span>确定</span>
        </button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Enquiringcustomers from "_c/Enquiringcustomers";
import {
  GetEntities,
  GetEntity,
  Update,
  Copy,
  DataDictionaryGetEntities,
  ValidateUnique,
  DataDictionaryGetDataCatalog,
  CustomerOrderPurchaseOrder,
  CustomerOrderDeleteOrder,
  CustomerOrderBatchDeleteOrder,
  CustomerOrderUpdateOrder,
  CustomerOrderPaymentOrder,
  CustomerOrderCancelOrderRequest
} from "@/api/api";
export default {
  inject: ["reload"],
  components: {
    Enquiringcustomers
  },
  data() {
    return {
      ifTotalPeriod:true,
      ifFixedPeriods:false,
      q:"",
      isdisabledFn:false,
      Interface: "CustomerOrder",
      ifDiscountCode: false,
      del: "",
      add: "",
      see: "",
      RadioOrderStatus: "",
      OrderStatusList: [],

      // 课包信息
      PackageIdList: "",
      columns1: [
        {
          title: "支付方式",
          key: "PaymentCode"
        },
        {
          title: "支付账号",
          key: "PaymentAccount"
        },
        {
          title: "支付金额",
          key: "NetAmt"
        },
        {
          title: "支付时间",
          key: "TrxDate"
        }
      ],
      data1: [],
      PaymentCodeList: [],
      formPaymentOrder: {
        PaymentCode: "",
        PaymentAccount: "",
        PaymentAmt: ""
      },
      PaymentStatusList: [],
      //   加盟商
      SelectFranchiser: "",
      FranchiserList: [],
      //   门店
      SelectStore: "",
      StoreList: [],
      //表格数组
      // 点击全选将所有的数据渲染
      getTableData: {
        Filters: {}
      },
      // 查询
      querySelectList: [
        {
          value: "Name",
          label: "名称"
        },
        {
          value: "OrderNo",
          label: "订单号"
        }
      ],
      querySelect: "",
      queryvalue: "",
      //   开始/结束日期
      StartEndDate: "",
      // 内容表格
      informationTable: [
        { type: "selection", width: 45 },
        { title: "订单号", key: "OrderNo", width: 120, sortable: true },
        { title: "姓", key: "FirstName", width: 110, sortable: true },
        { title: "名", key: "LastName", width: 110, sortable: true },
        { title: "昵称", key: "NickName", width: 120, sortable: true },
        { title: "订单类型", key: "OrderType", width: 110, sortable: true },
        {
          title: "订单状态",
          key: "OrderStatusDesc",
          width: 110,
          sortable: true
        },
        {
          title: "支付状态",
          key: "PaymentStatusDesc",
          width: 110,
          sortable: true
        },
        { title: "来源渠道", key: "ChannelCode", width: 110, sortable: true },
        { title: "市场分类", key: "MarketClass", width: 110, sortable: true },
        { title: "市场代码", width: 110, sortable: true, key: "MarketCode" },
        { title: "加盟商", width: 110, sortable: true, key: "Franchiser" },
        { title: "门店名称", key: "Store", width: 110, sortable: true },
        { title: "课包代码", key: "PackageCode", width: 110, sortable: true },
        { title: "课包名称", key: "PackageName", width: 110, sortable: true },
        {
          title: "课包类型",
          key: "PackageTypeDesc",
          width: 110,
          sortable: true
        },
        { title: "期限", key: "FixedPeriods", width: 110, sortable: true },
        { title: "原始售价", key: "OriginalPrice", width: 110, sortable: true },
        { title: "数量", key: "Quantity", width: 80, sortable: true },
        { title: "售价", key: "SalePrice", width: 120, sortable: true },
        { title: "应收金额", key: "BalanceAmt", width: 120, sortable: true },
        { title: "已经支付金额", key: "ChargeAmt", width: 150, sortable: true },
        { title: "订金金额", width: 110, sortable: true, key: "DepositAmt" },
        {
          title: "订金支付时间",
          width: 150,
          sortable: true,
          key: "DepositDate"
        },
        { title: "开始日期", width: 110, sortable: true, key: "StartDate" },
        { title: "结束日期", width: 110, sortable: true, key: "EndDate" },
        {
          title: "实际开始日期",
          width: 150,
          sortable: true,
          key: "ActualStartDate"
        },
        {
          title: "实际结束日期",
          width: 150,
          sortable: true,
          key: "ActualEndDate"
        },
        { title: "固定期限", width: 110, sortable: true, key: "IsFixedLimit" },
        { title: "总课时", width: 110, sortable: true, key: "TotalPeriod" },
        { title: "已销课时", width: 110, sortable: true, key: "UsedPeriod" },
        { title: "剩余课时", width: 110, sortable: true, key: "RemainPeriod" },
        {
          title: "折扣原因代码",
          width: 150,
          sortable: true,
          key: "DiscountCode"
        },
        {
          title: "折扣原因",
          width: 110,
          sortable: true,
          key: "DiscountReason"
        },
        { title: "折扣金额", width: 110, sortable: true, key: "DiscountAmt" },
        { title: "业务部门", width: 110, sortable: true, key: "BusinessUnit" },
        { title: "负责人", width: 110, sortable: true, key: "Owner" },
        {
          title: "退课原因代码",
          width: 150,
          sortable: true,
          key: "CancellationCode"
        },
        {
          title: "退课原因",
          width: 110,
          sortable: true,
          key: "CancellationReason"
        },
        {
          title: "取消课时",
          width: 110,
          sortable: true,
          key: "CancellationPeriod"
        },
        {
          title: "取消金额",
          width: 110,
          sortable: true,
          key: "CancellationAmt"
        },
        {
          title: "取消日期",
          width: 110,
          sortable: true,
          key: "CancellationDate"
        },
        { title: "开票标识", width: 110, sortable: true, key: "IsOpenInvoice" },
        { title: "发票号", width: 110, sortable: true, key: "InvoiceNo" },
        {
          title: "开票日期",
          width: 110,
          sortable: true,
          key: "OpenInvoiceDate"
        },
        { title: "创建人", key: "CreateByName", width: 100, sortable: true },
        {
          title: "创建时间",
          ellipsis: true,
          width: 110,
          sortable: true,
          key: "CreateOn",
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "left" }
              },
              [
                params.row.CreateOn,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.CreateOn
                )
              ]
            );
          }
        }
      ],
      informationData: [],
      // 添加/修改加盟商基本信息默认隐藏
      AddDepartment: false,
      upDepartment: false,
      Retirefromclass: false,
      PaymentOrder: false,
      // 添加信息表单
      formValidate: {
        OrderId: "",
        StoreId: "",
        // 加盟商的信息
        Franchiser: "",
        ProfileId: "",
        // 客户名称
        LastName: "",
        // 客户昵称
        NickName: "",
        // 客户出生日期
        BrithDate: "",
        PackageId: "",
        // 课包类型
        PackageTypeDesc: "",
        // 课包售价
        SellPrice: "",
        // 课包总课时
        TotalPeriod: "",
        OriginalPrice: "",
        Quantity: 1,
        // 总金额
        BalanceAmt: "",
        StartDate: "",
        // 结束日期
        EndDate: "",
        OwnerId: "",
        BusinessUnit: "",
        DiscountCode: "",
        DiscountReason: "",
        Comments: "",
        OrderType: "",
        ChannelCode: "",
        MarketClass: "",
        MarketCode: "",
        OrderStatusDesc: "",
        PaymentStatusDesc: "",
        ChargeAmt: "0",
        ChargeAmt: "",
        UsedPeriod: "0",
        FixedPeriods:"",
        RemainPeriod: ""
      },
      // 退课申请
      formRetirefromclass: {
        CancellationCode: "",
        CancellationReason: "",
        CancellationAmt: "",
        CancellationDate: ""
      },
      UpdateList: {},
      // 表单验证
      ruleValidate: {},
      ruleRetirefromclass: {},
      rulePaymentOrder: {},
      // 创建人
      Founder: "",
      UpdatePerson: "",
      CreationTime: "",
      UpdateTime: "",
      //   客户的数据
      ProfileIdList: [],
      //   订单类型
      OrderTypeList: [],
      //   折扣原因代码
      DiscountCodeList: [],
      //   负责人
      OwnerList: [],

      // 客户Id   默认隐藏
      ProfileIdHide: false,
      // 选择客户组件  默认隐藏
      Enquiringcustomers1: false,
      // 删除信息弹出框
      delete1: false,
      BatchDeleteList: [],
      delete: [],
      CancellationCodeList: [],
      // 期限时间
      FixedPeriodsnum: ""
    };
  },
  methods: {
 
    // 查询条件
    queryquerychange(value){
      console.log(value)
      GetEntities(this.Interface,{
        Filters: [
          {
            Relational: "And", //And 与 | Or 或
            Conditions: [
              {
                FilterField: "Franchiser", //字段名
                Relational: "Contain",
                FilterValue: value //字段名里面的值
              },
              {
                FilterField: "StoreId", //字段名
                Relational: "Equal",
                FilterValue: value //字段名里面的值
              }
            ]
          }
        ]
      })
        .then(res => {
          this.informationData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消订单
    RetirefromclassSubmit() {
      CustomerOrderCancelOrderRequest({
        OrderId: this.formValidate.Id,
        CancellationCode: this.formRetirefromclass.CancellationCode,
        CancellationReason: this.formRetirefromclass.CancellationReason
      })
        .then(res => {
          this.$Message.success("成功!");
          this.reload();
        })
        .catch(err => {
          this.$Message.success("失败!");
        });
    },
    // 订单支付
    PaymentOrderSubmit() {
      CustomerOrderPaymentOrder({
        OrderId: this.formValidate.Id,
        PaymentCode: this.formPaymentOrder.PaymentCode,
        PaymentAmt: this.formPaymentOrder.PaymentAmt
      })
        .then(res => {
          this.data1 = res.data.Data; 
          console.log(this.data1)
          this.$Message.success("成功!");
          this.reload();
        })
        .catch(err => {
          this.$Message.success("失败!");
        });
    },
    OwnerIdchange(value) {
      GetEntities("BusinessUser", {
        Filters: [
          {
            Relational: "And", //And 与 | Or 或
            Conditions: [
              {
                FilterField: "AccountId", //字段名
                Relational: "Equal",
                FilterValue: value //字段名里面的值
              }
            ]
          }
        ]
      })
        .then(res => {
          this.formValidate.BusinessUnit = res.data[0].BusinessUnit;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择开始日期带出结束日期
    StartDatechange(date) {
      var year = parseInt(date.substring(0, 4));
        var month = parseInt(date.substring(5, 7));
        var day = parseInt(date.substring(8, 10));
        if(this.formValidate.PackageTypeDesc == "固定期限"){
          var monthnum = parseInt(this.FixedPeriodsnum);
          if (month + monthnum > 12) {
            var newyear = year + 1;
            var newmonth = month + monthnum - 12;
            var newday = day;
          } else if (month + monthnum > 12 * 2) {
            var newyear = year + 2;
            var newmonth = month + monthnum - 12 * 2;
            var newday = day;
          } else if (month + monthnum > 12 * 3) {
            var newyear = year + 3;
            var newmonth = month + monthnum - 12 * 3;
            var newday = day;
          } else if (month + monthnum > 12 * 4) {
            var newyear = year + 4;
            var newmonth = month + monthnum - 12 * 4;
            var newday = day;
          } else if (month + monthnum > 12 * 5) {
            var newyear = year + 5;
            var newmonth = month + monthnum - 12 * 5;
            var newday = day;
          } else if (month + monthnum > 12 * 6) {
            var newyear = year + 6;
            var newmonth = month + monthnum - 12 * 6;
            var newday = day;
          } else {
            var newyear = year;
            var newmonth = month + monthnum;
            var newday = day;
          }
          this.formValidate.EndDate = newyear + "-" + newmonth + "-" + newday;
        }else{
          
          var newyear = year + 2;
          this.formValidate.EndDate = newyear + "-" + month + "-" + day;
        }
    },
    // 售价x数量=总金额
    SalePricechange() {
      this.formValidate.BalanceAmt =
        this.formValidate.SalePrice * this.formValidate.Quantity;
     if(this.formValidate.SalePrice !== this.formValidate.OriginalPrice){
         this.ifDiscountCode = true;
     }else{
       this.ifDiscountCode = false;
     }
    },
    SalePriceblur(){
      if(this.formValidate.SalePrice < 100){
       this.$Message.warning('课包最低售价为100');
     }
    },
    // 选择课包带出数据
    PackageIdchange(value) {
      GetEntities("CoursePackage", {
        Filters: [
          {
            Relational: "And", //And 与 | Or 或
            Conditions: [
              {
                FilterField: "Id", //字段名
                Relational: "Equal",
                FilterValue: value.value //字段名里面的值
              }
            ]
          }
        ]
      })
        .then(res => {
          function formatNumber(num, precision, separator) {
              var parts;
              // 判断是否为数字
              if (!isNaN(parseFloat(num)) && isFinite(num)) {
                  // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
                  // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
                  // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
                  // 的值变成了 12312312.123456713
                  num = Number(num);
                  // 处理小数点位数
                  num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
                  // 分离数字的小数部分和整数部分
                  parts = num.split('.');
                  // 整数部分加[separator]分隔, 借用一个著名的正则表达式
                  parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
          
                  return parts.join('.');
              }
              return NaN;
          }
          this.formValidate.StartDate = new Date();
          this.formValidate.PackageTypeDesc = res.data[0].PackageTypeDesc;
          this.formValidate.OriginalPrice = formatNumber(res.data[0].SellPrice);
          this.formValidate.SalePrice  = formatNumber(res.data[0].SellPrice);
          this.formValidate.TotalPeriod = res.data[0].TotalPeriods;
          this.FixedPeriodsnum = res.data[0].FixedPeriods;
          if (this.formValidate.OriginalPrice.indexOf(".")< 0) {
              this.formValidate.OriginalPrice=this.formValidate.OriginalPrice+".00";
              this.formValidate.SalePrice=this.formValidate.SalePrice+".00";
          }
          // 当课包允许折扣售价课更改反之不可更改
          if(res.data[0].AllowDiscount == false){
             this.isdisabledFn = true;
          }else if(res.data[0].AllowDiscount == true){
              this.isdisabledFn = false;
          }
          if(this.formValidate.StartDate == ""){
            this.formValidate.EndDate == ""
          }else if(this.formValidate.StartDate){
            let date = this.formValidate.StartDate.toLocaleDateString();
            var year = parseInt(date.substring(0, 4));
            var month = parseInt(date.substring(5, 7));
            var day = parseInt(date.substring(8, 10));
            if(this.formValidate.PackageTypeDesc == "固定期限"){
              this.ifFixedPeriods = true;
              this.ifTotalPeriod = false;
              var monthnum = parseInt(this.FixedPeriodsnum);
              if (month + monthnum > 12) {
                var newyear = year + 1;
                var newmonth = month + monthnum - 12;
                var newday = day;
              } else if (month + monthnum > 12 * 2) {
                var newyear = year + 2;
                var newmonth = month + monthnum - 12 * 2;
                var newday = day;
              } else if (month + monthnum > 12 * 3) {
                var newyear = year + 3;
                var newmonth = month + monthnum - 12 * 3;
                var newday = day;
              } else if (month + monthnum > 12 * 4) {
                var newyear = year + 4;
                var newmonth = month + monthnum - 12 * 4;
                var newday = day;
              } else if (month + monthnum > 12 * 5) {
                var newyear = year + 5;
                var newmonth = month + monthnum - 12 * 5;
                var newday = day;
              } else if (month + monthnum > 12 * 6) {
                var newyear = year + 6;
                var newmonth = month + monthnum - 12 * 6;
                var newday = day;
              } else {
                var newyear = year;
                var newmonth = month + monthnum;
                var newday = day;
              }
              this.formValidate.EndDate = newyear + "-" + newmonth + "-" + newday;
            }else{
              this.ifFixedPeriods = false;
              this.ifTotalPeriod = true;
              var newyear = year + 2;
              var newday = day + 20;
              this.formValidate.EndDate = newyear + "-" + month + "-" + newday;
            }
              
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    childByValue: function(childByValue) {
      this.formValidate.LastName =
        childByValue[0].FirstName + childByValue[0].LastName;
      this.formValidate.ProfileId = childByValue[0].Id;
      this.formValidate.NickName = childByValue[0].NickName;
      this.formValidate.BrithDate = childByValue[0].BrithDate;
    },
    Enquiringcustomers() {
      this.Enquiringcustomers1 = !this.Enquiringcustomers1;
    },
    // 添加/修改信息
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formValidate.Id == undefined) {
            CustomerOrderPurchaseOrder(this.formValidate)
              .then(res => {
                this.$Message.success("成功!");
                this.AddDepartment = false;
                this.reload();
                this.formValidate = { brand_right: 0 };
              })
              .catch(err => {
                this.$Message.error("失败!");
                console.log(err);
              });
          }
          if (this.formValidate.Id) {
            CustomerOrderUpdateOrder({
              OrderId: this.formValidate.Id,
              OwnerId: this.formValidate.OwnerId,
              StartDate: this.formValidate.StartDate,
              EndDate: this.formValidate.EndDate
            })
              .then(res => {
                this.$Message.success("修改成功!");
                this.reload();
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          this.$Message.error("信息填写有误!");
        }
      });
    },
    AddDepartment1() {
      this.AddDepartment = true;
      this.add = true;
      this.del = false;
      this.see = false;
      let see = JSON.parse(sessionStorage.getItem("userInfo"));
      this.formValidate.CreateByName = see.AccountName;
      this.formValidate.BusinessGroup = see.BusinessUnit;
    },
    //双击表格
    dblclickUpData(index) {
      this.AddDepartment = true;
      this.del = true;
      this.add = false;
      this.see = true;
      this.formValidate = index;
      this.formValidate.TotalPeriod = this.formValidate.RemainPeriod;
    },
    // 删除接口
    deleteList() {
      if (this.delete.length == 0) {
        this.$Message.info("请先选中删除的数据");
      } else {
        this.delete1 = true;
      }
    },
    OneselectionId(selection, row) {
      this.BatchDeleteList = selection;
      for (var i = 0; i < this.BatchDeleteList.length; i++) {
        this.delete.push(this.BatchDeleteList[i].Id);
      }
      function uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
          if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
          }
        }
        return temp;
      }
      this.delete = uniq(this.delete);
    },
    OnecancelselectionId(selection, row) {
      function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      }
      removeByValue(this.delete, row.Id);
    },
    allselectionId(selection) {
      console.log(this.delete);
      for (var i = 0; i < selection.length; i++) {
        this.delete.push(selection[i].Id);
      }
    },
    allcancelselectionId(selection) {
      this.delete = selection;
    },
    ok() {
      if (this.formValidate.Id == undefined) {
        CustomerOrderBatchDeleteOrder(this.delete)
          .then(res => {
            this.$Message.success("删除成功!");
            this.reload();
          })
          .catch(err => {
            this.$Message.error("删除失败!");
          });
      } else {
        if (
          this.formValidate.OrderStatusDesc == "未开始" &&
          this.formValidate.PaymentStatusDesc == "未支付"
        ) {
          CustomerOrderDeleteOrder(this.formValidate.Id)
            .then(res => {
              this.$Message.success("删除成功!");
              this.reload();
            })
            .catch(err => {
              this.$Message.error("删除失败!");
            });
        } else {
          this.$Message.error("订单正在进行中,不能删除");
        }
      }
    },
    // 订单所属门店   获取到id
    SelectStoreId(value) {
      GetEntities("BusinessStore", {
        Filters: [
          {
            Relational: "And", //And 与 | Or 或
            Conditions: [
              {
                FilterField: "Id", //字段名
                Relational: "Equal",
                FilterValue: value //字段名里面的值
              }
            ]
          }
        ]
      })
        .then(res => {
          console.log(res.data);
          this.formValidate.Franchiser = res.data[0].Franchiser;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$Message.info("已取消");
    }
  },
  mounted() {
    this.formValidate.OwnerId = JSON.parse(sessionStorage.userInfo).AccountId;
    this.formValidate.BusinessUnit = JSON.parse(
      sessionStorage.userInfo
    ).BusinessUnit;
    //   订单状态
    this.OrderStatusList = JSON.parse(localStorage.ORDER_STATUS);
    //   订单类型
    this.OrderTypeList = JSON.parse(localStorage.ORDER_TYPE);
    //   折扣原因代码
    this.DiscountCodeList = JSON.parse(localStorage.DISCOUNT_REASON_CODE);
    // 退课原因代码
    this.CancellationCodeList = JSON.parse(localStorage.CANCLE_REASON_CODE);
    // 加盟商
    GetEntities("FranchiserProfile", this.getTableData)
      .then(res => {
        this.FranchiserList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 门店
    GetEntities("BusinessStore", this.getTableData)
      .then(res => {
        this.StoreList = res.data;
      })
      .catch(err => {
        console.log(err);
      });

    //   负责人
    GetEntities("BusinessUser", this.getTableData)
      .then(res => {
        this.OwnerList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 学员
    GetEntities("CustomerProfile", this.getTableData)
      .then(res => {
        this.ProfileIdList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 课包
    GetEntities("CoursePackage", this.getTableData)
      .then(res => {
        this.PackageIdList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //   表格数据
    GetEntities(this.Interface, this.getTableData)
      .then(res => {
        this.informationData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //   支付代码
    GetEntities("PaymentCode", this.getTableData)
      .then(res => {
        this.PaymentCodeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
