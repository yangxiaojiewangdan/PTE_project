<template>
  <div id="leagueRights">
    <!-- 头部 -->
    <Row>
      <Col span="24" style="height:100px;">
        <h1 class="setHeader">加盟商结算规则</h1>
      </Col>
      <!-- 内容 -->
      <Col span="24" style="height:780px;">
        <div class="querycriteria" style="height:100px;">
          <div class="querycriteriadiv" style="margin-left:24px;">
            <label>结算方式：</label>
            <Select v-model="queryRoyaltyType" style="width:200px">
              <Option
                v-for="item in SettleTypeList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="querycriteriadiv">
            <label>结算规则描述：</label>
            <Input v-model="queryDescription" placeholder="请输入..." style="width: 500px"/>
          </div>
        </div>
        <Row>
          <Col span="15" class="queryEnd">
            <h2>查询结果</h2>
          </Col>
          <!-- 表格操作按钮 -->
          <Col span="8">
            <div class="tableTop">
              <Button @click="AddDepartment = true" type="success" class="tableTops">添加</Button>
              <Button @click="deleteList" type="error" class="tableTops">删除</Button>
              <Select v-model="querySelect" style="width:120px">
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
          <!-- 表格 -->
          <Col span="24">
            <Table
              height="560"
              size="small"
              highlight-row
              stripe
              border
              ref="selection"
              :columns="SettlementCodeTable"
              :data="SettlementCodeData"
            ></Table>
          </Col>
          <!-- 分页 -->
          <Col span="24">
            <Page :total="100" class="page"/>
          </Col>
        </Row>
      </Col>
    </Row>
    <!-- 删除信息弹出框 -->
    <Modal v-model="delete1" title="提示" @on-ok="ok" @on-cancel="cancel">
      <h2>确定删除此数据？</h2>
    </Modal>
    <!-- 添加信息 弹出框-->
    <Modal
      v-model="AddDepartment"
      width="600"
      height="600"
      title="添加加盟商结算规则"
      :mask-closable="false"
      :styles="{top: '40px'}"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="150"
      >
        <Row>
          <Col span="24">
            <FormItem label="所属业务群" prop="BusinessGroup">
              <Select v-model="formValidate.BusinessGroup" style="width:300px">
                <Option
                  v-for="item in BusinessGroupList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="结算规则代码" prop="Code">
              <Input v-model="formValidate.Code" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="结算规则描述" prop="Description">
              <Input
                v-model="formValidate.Description"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
                style="width:300px"
              ></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="结算方式" prop="SettleType">
              <Select
                v-model="formValidate.SettleType"
                :label-in-value="true"
                @on-change="v=>{setOption(v,'type')}"
                style="width:300px"
              >
                <Option
                  v-for="item in SettleTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24" v-if="FromDay">
            <FormItem label="可结算起始天" prop="FromDay">
              <Select v-model="formValidate.FromDay" style="width:300px">
                <Option
                  v-for="item in FromDayList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24" v-if="ToDay">
            <FormItem label="可结算终止天" prop="ToDay">
              <Select v-model="formValidate.ToDay" style="width:300px">
                <Option
                  v-for="item in ToDayList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24" v-if="PeriodOfT">
            <FormItem label="T+" prop="PeriodOfT">
              <Input v-model="formValidate.PeriodOfT" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24" v-if="ExcludeHoliday">
            <FormItem label="节假日(含/不含)" prop="ExcludeHoliday">
              <i-switch v-model="formValidate.ExcludeHoliday" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col span="24" v-if="Allow">
            <FormItem label="允许周几结算" prop="Allow">
              <CheckboxGroup v-model="formValidate.Allow">
                <Checkbox label="周一"></Checkbox>
                <Checkbox label="周二"></Checkbox>
                <Checkbox label="周三"></Checkbox>
                <Checkbox label="周四"></Checkbox>
                <Checkbox label="周五"></Checkbox>
                <Checkbox label="周六"></Checkbox>
                <Checkbox label="周日"></Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="排序码" prop="SortKey">
              <Input v-model="formValidate.SortKey" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="启用" prop="Enabled">
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
  </div>
</template>
<script>
import {
  getSettlementCodeData,
  SettlementCodeCreate,
  deleteSettlementCode
} from "@/api/api";
export default {
  data() {
    return {
      // 查询
      queryRoyaltyType: "",
      queryDescription: "",
      querySelectList: [
        {
          value: "结算规则代码",
          label: "结算规则代码"
        }
      ],
      queryvalue: "",
      querySelect: "",
      // 表格
      SettlementCodeTable: [
        { type: "selection", width: 50, align: "center", fixed: "left" },
        {
          title: "所属业务群",
          key: "BusinessGroup",
          width: 200,
          sortable: true
        },
        { title: "结算规则代码", key: "Code", width: 225, sortable: true },
        {
          title: "结算规则描述",
          key: "Description",
          width: 350,
          sortable: true
        },
        { title: "排序码", key: "SortKey", width: 200, sortable: true },
        { title: "启用", key: "Enabled", width: 200, sortable: true },
        { title: "创建人 ", key: "CreateBy", width: 200, sortable: true },
        { title: "创建时间", key: "CreateOn", width: 200, sortable: true }
      ],
      //表格数组
      // 渲染表格发送的参数
      getTableData: {
        Filters: {}
      },
      SettlementCodeData: [],
      // 添加信息 弹出框
      // 所属业务群
      BusinessGroupList: [],
      // 结算方式下拉框循环数据
      SettleTypeList: [
        {
          value: "RealTime",
          label: "RealTime"
        },
        {
          value: "T+N",
          label: "T+N"
        },
        {
          value: "Monthly",
          label: "Monthly"
        },
        {
          value: "NextMonth",
          label: "NextMonth"
        },
        {
          value: "EndOfYear",
          label: "EndOfYear"
        }
      ],
      // 可结算起始天下拉框循环数据
      FromDayList: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" },
        { value: "26", label: "26" },
        { value: "27", label: "27" },
        { value: "28", label: "28" },
        { value: "29", label: "29" },
        { value: "30", label: "30" },
        { value: "31", label: "31" }
      ],
      // 可结算终止天下拉框循环数据
      ToDayList: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" },
        { value: "26", label: "26" },
        { value: "27", label: "27" },
        { value: "28", label: "28" },
        { value: "29", label: "29" },
        { value: "30", label: "30" },
        { value: "31", label: "31" }
      ],
      // 添加加盟商结算规则默认隐藏
      AddDepartment: false,
      // 当结算方式选为【Monthly，NextMonth，EndOfYear】时显示，现在默认隐藏
      Allow: false,
      // 当结算方式选为【RealTime】时隐藏，现在默认显示
      ToDay: true,
      FromDay: true,
      ExcludeHoliday: true,
      PeriodOfT: true,
      // 添加结算方式表单
      formValidate: {
        BusinessGroup: "",
        Code: "",
        Description: "",
        SettleType: "",
        FromDay: "",
        ToDay: "",
        PeriodOfT: "",
        Allow: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        ExcludeHoliday: "",
        SortKey: "",
        Enabled: ""
      },
      ruleValidate: {
        BusinessGroup: [
          // { required: true, message: "请选择用户群", trigger: "change" }
        ],
        Code: [
          {
            required: true,
            message: "请输入结算规则代码",
            trigger: "blur"
          }
        ],
        Description: [
          { required: true, message: "请输入结算规则描述", trigger: "blur" }
        ],
        PeriodOfT: [
          {
            pattern: "^[0-9]*[1-9][0-9]*$",
            message: "T+ 必须输入整数",
            trigger: "blur"
          }
        ]
      },
      // 删除信息弹出框
      delete1: false,
      delBusinessUnitList: [],
      delBusinessUnitArrs: []
    };
  },
  methods: {
    // 结算方式下拉框选择事件
    setOption(value, type) {
      console.log(value.label);
      if (value.label == "RealTime") {
        this.ToDay = false;
        this.FromDay = false;
        this.ExcludeHoliday = false;
        this.PeriodOfT = false;
        this.Allow = false;
      }
      if (value.label == "T+N") {
        this.ToDay = true;
        this.FromDay = true;
        this.ExcludeHoliday = true;
        this.PeriodOfT = true;
        this.Allow = false;
      }
      if (value.label == "Monthly") {
        this.ToDay = true;
        this.FromDay = true;
        this.ExcludeHoliday = true;
        this.PeriodOfT = true;
        this.Allow = true;
      }
      if (value.label == "NextMonth") {
        this.ToDay = true;
        this.FromDay = true;
        this.ExcludeHoliday = true;
        this.PeriodOfT = true;
        this.Allow = true;
      }
      if (value.label == "EndOfYear") {
        this.ToDay = true;
        this.FromDay = true;
        this.ExcludeHoliday = true;
        this.PeriodOfT = true;
        this.Allow = true;
      }
    },
    // 添加加盟商结算规则信息
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //如果正则正确就调用接口发送数据
          SettlementCodeCreate(this.formValidate)
            .then(res => {
              this.$Message.success("成功!");
              this.AddDepartment = false;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error("请输入正确的格式!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$Message.info("已取消添加结算规则");
    }
  },
  mounted() {
    //人员表格
    getSettlementCodeData(this.getTableData)
      .then(res => {
        this.SettlementCodeData = res.data;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>