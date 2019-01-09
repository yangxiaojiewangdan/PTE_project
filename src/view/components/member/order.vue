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
              <Select v-model="SelectFranchiser" style="width:200px;margin-left:20px;">
                <Option
                  v-for="item in FranchiserList"
                  :value="item.Code"
                  :key="item.Code"
                >{{ item.Code }}</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span="15" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:60px;">门店：</h3>
              <Select v-model="SelectStore" style="width:200px;margin-left:20px;">
                <Option
                  v-for="item in StoreList"
                  :value="item.Code"
                  :key="item.Code"
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
          <Button @click="delete1 = true" type="error" class="tableTops">删除</Button>
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
        ></Table>
        <!-- 表格 end-->
      </Col>
      <Col span="24">
        <!-- 分页 -->
        <Page :total="100" class="page"/>
        <!-- 分页 end-->
      </Col>
    </Row>
    <!-- 添加信息 弹出框-->
    <Modal v-model="AddDepartment" scrollable width="1100" title="添加加盟商信息" :mask-closable="false">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="120"
      >
        <Row>
          <Col span="24">
            <Col span="12">
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
            <Col span="8">
              <FormItem label="客户" prop="StoreId">
                <Input v-model="formValidate.OriginalPrice" placeholder="请输入"></Input>
                <Button type="primary" @click="modal1 = true">选择客户</Button>
              </FormItem>
            </Col>
            <Col span="12">
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
            <Col span="12">
              <FormItem label="订单状态" prop="OrderStatus">
                <Select v-model="formValidate.OrderStatus">
                  <Option
                    v-for="item in OrderStatusList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="支付状态" prop="PaymentStatus">
                <Select v-model="formValidate.PaymentStatus">
                  <Option
                    v-for="item in PaymentStatusList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="来源渠道" prop="ChannelCode">
                <Select v-model="formValidate.ChannelCode">
                  <Option
                    v-for="item in PaymentStatusList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="市场分类" prop="MarketClass">
                <Select v-model="formValidate.MarketClass">
                  <Option
                    v-for="item in PaymentStatusList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="市场代码" prop="MarketCode">
                <Select v-model="formValidate.MarketCode">
                  <Option
                    v-for="item in PaymentStatusList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="课包" prop="ProfileId">
                <Select v-model="formValidate.ProfileId">
                  <Option
                    v-for="item in PaymentStatusList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>.
            <Col span="12">
              <FormItem label="折扣原因代码" prop="DiscountCode">
                <Select v-model="formValidate.DiscountCode">
                  <Option
                    v-for="item in DiscountCodeList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="业务部门" prop="BusinessUnit">
                <Select v-model="formValidate.BusinessUnit">
                  <Option
                    v-for="item in BusinessUnitList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="负责人" prop="Owner">
                <Select v-model="formValidate.Owner">
                  <Option
                    v-for="item in OwnerList"
                    :value="item.Id"
                    :key="item.Code"
                  >{{ item.Account }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="原始售价" prop="OriginalPrice">
                <Input v-model="formValidate.OriginalPrice" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="数量" prop="Quantity">
                <Input v-model="formValidate.Quantity" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="售价" prop="SalePrice">
                <Input v-model="formValidate.SalePrice" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="应收金额" prop="BalanceAmt">
                <Input v-model="formValidate.BalanceAmt" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="订金金额" prop="DepositAmt">
                <Input v-model="formValidate.DepositAmt" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="订金支付时间" prop="DepositDate">
                <Input v-model="formValidate.DepositDate" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="折扣金额" prop="DiscountAmt">
                <Input v-model="formValidate.DiscountAmt" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="开始日期" prop="StartDate">
                <DatePicker type="date" v-model="formValidate.StartDate" placeholder="Select date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结束日期" prop="EndDate">
                <DatePicker type="date" v-model="formValidate.EndDate" placeholder="Select date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="实际开始日期" prop="ActualStartDate">
                <DatePicker
                  type="date"
                  v-model="formValidate.ActualStartDate"
                  placeholder="Select date"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="实际结束日期" prop="ActualEndDate">
                <DatePicker
                  type="date"
                  v-model="formValidate.ActualEndDate"
                  placeholder="Select date"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="固定期限" prop="IsFixedLimit">
                <i-switch v-model="formValidate.IsFixedLimit" size="large">
                  <span slot="open">On</span>
                  <span slot="close">Off</span>
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
              <span>{{ Founder }}</span>
            </div>
            <div>
              <span>更新人:</span>
            </div>
          </div>
          <div class="footer_left2">
            <div>
              <span>创建时间:</span>
            </div>
            <div>
              <span>更新时间:</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="handleReset('formValidate');AddDepartment = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="handleSubmit('formValidate');"
        >
          <span>确定</span>
        </button>
      </div>
    </Modal>
    <!-- 选择客户 -->
    <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
  </div>
</template>
<script>
import {
  getORDER_STATUS,
  getORDER_TYPE,
  getORDER_PAYMENT_STATUS,
  getDISCOUNT_REASON_CODE,
  FranchiserProfileGetEntities,
  BusinessStoreGetEntities,
  CustomerOrderGetEntities,
  CustomerData,
  BusinessUnitGetEntities,
  BusinessUserGetEntities,
  CustomerOrderPurchaseOrder
} from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
        modal1: false,
      // 订单状态
      RadioOrderStatus: "",
      OrderStatusList: [],
      //   支付状态
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
        {
          title: "姓",
          key: "FirstName",
          width: 110,
          sortable: true
        },
        {
          title: "名",
          key: "LastName",
          width: 110,
          sortable: true
        },
        {
          title: "昵称",
          key: "NickName",
          width: 120,
          sortable: true
        },
        {
          title: "订单类型",
          key: "OrderType",
          width: 110,
          sortable: true
        },
        {
          title: "订单状态",
          key: "OrderStatus",
          width: 110,
          sortable: true
        },
        {
          title: "支付状态",
          key: "PaymentStatus",
          width: 110,
          sortable: true
        },
        {
          title: "来源渠道",
          key: "ChannelCode",
          width: 110,
          sortable: true
        },
        {
          title: "市场分类",
          key: "MarketClass",
          width: 110,
          sortable: true
        },
        {
          title: "市场代码",
          width: 110,
          sortable: true,
          key: "MarketCode"
        },
        {
          title: "加盟商",
          width: 110,
          sortable: true,
          key: "Franchiser"
        },
        {
          title: "门店名称",
          key: "Store",
          width: 110,
          sortable: true
        },
        {
          title: "课包代码",
          key: "PackageCode",
          width: 110,
          sortable: true
        },
        {
          title: "课包名称",
          key: "PackageName",
          width: 110,
          sortable: true
        },
        {
          title: "课包类型",
          key: "PackageType",
          width: 110,
          sortable: true
        },
        {
          title: "期限",
          key: "FixedPeriods",
          width: 110,
          sortable: true
        },
        {
          title: "原始售价",
          key: "OriginalPrice",
          width: 110,
          sortable: true
        },
        {
          title: "数量",
          key: "Quantity",
          width: 80,
          sortable: true
        },
        {
          title: "售价",
          key: "SalePrice",
          width: 120,
          sortable: true
        },
        {
          title: "应收金额",
          key: "BalanceAmt",
          width: 120,
          sortable: true
        },
        {
          title: "已经支付金额",
          key: "ChargeAmt",
          width: 150,
          sortable: true
        },
        {
          title: "订金金额",
          width: 110,
          sortable: true,
          key: "DepositAmt"
        },
        {
          title: "订金支付时间",
          width: 150,
          sortable: true,
          key: "DepositDate"
        },
        {
          title: "开始日期",
          width: 110,
          sortable: true,
          key: "StartDate"
        },
        {
          title: "结束日期",
          width: 110,
          sortable: true,
          key: "EndDate"
        },
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
        {
          title: "固定期限",
          width: 110,
          sortable: true,
          key: "IsFixedLimit"
        },
        {
          title: "总课时",
          width: 110,
          sortable: true,
          key: "TotalPeriod"
        },
        {
          title: "已销课时",
          width: 110,
          sortable: true,
          key: "UsedPeriod"
        },
        {
          title: "剩余课时",
          width: 110,
          sortable: true,
          key: "RemainPeriod"
        },
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
        {
          title: "折扣金额",
          width: 110,
          sortable: true,
          key: "DiscountAmt"
        },
        {
          title: "业务部门",
          width: 110,
          sortable: true,
          key: "BusinessUnit"
        },
        {
          title: "负责人",
          width: 110,
          sortable: true,
          key: "Owner"
        },
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
        {
          title: "开票标识",
          width: 110,
          sortable: true,
          key: "IsOpenInvoice"
        },
        {
          title: "发票号",
          width: 110,
          sortable: true,
          key: "InvoiceNo"
        },
        {
          title: "开票日期",
          width: 110,
          sortable: true,
          key: "OpenInvoiceDate"
        },
        {
          title: "创建人",
          key: "CreateByName",
          width: 100,
          sortable: true
        },
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
      // 添加信息表单
      formValidate: {
        ProfileId: "",
        OrderType: "",
        OrderStatus: "",
        PaymentStatus: "",
        ChannelCode: "",
        MarketClass: "",
        MarketCode: "",
        StoreId: "",
        PackageId: "",
        OriginalPrice: "",
        Quantity: "",
        SalePrice: "",
        BalanceAmt: "",
        ChargeAmt: "",
        DepositAmt: "",
        DepositDate: "",
        StartDate: "",
        EndDate: "",
        ActualStartDate: "",
        ActualEndDate: "",
        IsFixedLimit: true,
        DiscountCode: "",
        DiscountReason: "",
        DiscountAmt: "",
        BusinessUnit: "",
        Owner: ""
      },
      // 表单验证
      ruleValidate: {},
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
      //   业务部门
      BusinessUnitList: [],
      //   负责人
      OwnerList: []
    };
  },
  methods: {
       ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
    // 添加加盟商信息
    handleSubmit() {
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
    },
    // 创建人
    AddDepartment1() {
      this.AddDepartment = true;
      let see = JSON.parse(sessionStorage.getItem("userInfo"));
      this.Founder = see.AccountName;
    },
    //详情修改页面
    dblclickUpData(index) {
      this.upDepartment = true;
      this.UpdateList = index;
      console.log(index);
    },
    // 订单所属门店   获取到id
    SelectStoreId(value) {
      console.log(value);
    }
  },
  mounted() {
    //   订单状态
    getORDER_STATUS()
      .then(res => {
        this.OrderStatusList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //   折扣原因代码
    getDISCOUNT_REASON_CODE()
      .then(res => {
        this.DiscountCodeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //   订单类型
    getORDER_TYPE()
      .then(res => {
        this.OrderTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //   订单类型
    getORDER_PAYMENT_STATUS()
      .then(res => {
        this.PaymentStatusList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 加盟商
    FranchiserProfileGetEntities(this.getTableData)
      .then(res => {
        this.FranchiserList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 门店
    BusinessStoreGetEntities(this.getTableData)
      .then(res => {
        this.StoreList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //   组织部门
    BusinessUnitGetEntities(this.getTableData)
      .then(res => {
        this.BusinessUnitList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //   负责人
    BusinessUserGetEntities(this.getTableData)
      .then(res => {
        this.OwnerList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 学员
    // CustomerData(this.getTableData)
    //   .then(res => {
    //     this.ProfileIdList = res.data;
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    //   表格数据
    CustomerOrderGetEntities(this.getTableData)
      .then(res => {
        this.informationData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
