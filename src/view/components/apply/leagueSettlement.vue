<template>
  <div id="leagueRights">
    <!-- 头部 -->
    <Row>
      <Col span="24" style="height:100px;">
        <h1 class="setHeader">结算规则</h1>
      </Col>
      <!-- 内容 -->
      <Col span="24" style="height:780px;">
        <Row>
          <Col span="15" class="queryEnd">
            <h2>查询结果</h2>
          </Col>
          <!-- 表格操作按钮 -->
          <Col span="8">
            <div class="tableTop">
              <Button @click="AddDepartment = true" type="success" class="tableTops">添加</Button>
              <Button @click="delete1 = true" type="error" class="tableTops">删除</Button>
              <Select
                v-model="querySelect"
                :label-in-value="true"
                @on-change="v=>{setOption(v,'type')}"
                style="width:120px"
              >
                <Option
                  v-for="item in querySelectList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Input
                v-if="queryvalueif"
                v-model="queryvalue"
                placeholder="Enter something..."
                style="width: 150px"
                class="tableTops"
              />
              <Checkbox :checked.sync="single" v-if="Checkboxif" class="tableTops">无效</Checkbox>
              <Button type="primary" class="tableTops" @click="querytable">查询</Button>
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
              @on-select="BatchDelete"
              @on-row-dblclick="dblclickUpData"
              @on-select-all="BatchDelete"
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
    <Modal v-model="delete1" title="提示" @on-ok="deleteList">
      <h3>确定删除此数据？</h3>
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
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
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
            <FormItem label="T+N" prop="PeriodOfT">
              <Select v-model="formValidate.PeriodOfT" style="width:300px">
                <Option
                  v-for="item in PeriodOfTList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
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
              <Checkbox v-model="formValidate.AllowMon">周一</Checkbox>
              <Checkbox v-model="formValidate.AllowTue">周二</Checkbox>
              <Checkbox v-model="formValidate.AllowWed">周三</Checkbox>
              <Checkbox v-model="formValidate.AllowThu">周四</Checkbox>
              <Checkbox v-model="formValidate.AllowFri">周五</Checkbox>
              <Checkbox v-model="formValidate.AllowSat">周六</Checkbox>
              <Checkbox v-model="formValidate.AllowSun">周日</Checkbox>
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
    <!-- 修改信息 弹出框-->
    <Modal
      v-model="upDepartment"
      width="600"
      height="600"
      title="修改加盟商结算规则"
      :mask-closable="false"
      :styles="{top: '40px'}"
    >
      <Form
        ref="UpdateList"
        :model="UpdateList"
        :rules="ruleValidate"
        label-position="right"
        :label-width="150"
      >
        <Row>
          <Col span="24">
            <FormItem label="所属业务群" prop="BusinessGroup">
              <Select v-model="UpdateList.BusinessGroup" style="width:300px">
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
              <Input v-model="UpdateList.Code" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="结算规则描述" prop="Description">
              <Input
                v-model="UpdateList.Description"
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
                v-model="UpdateList.SettleType"
                :label-in-value="true"
                @on-change="v=>{setOption(v,'type')}"
                style="width:300px"
              >
                <Option
                  v-for="item in SettleTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24" v-if="FromDay">
            <FormItem label="可结算起始天" prop="FromDay">
              <Select
                v-model="UpdateList.FromDay"
                :label-in-value="true"
                @on-change="v=>{setOption(v,'type')}"
                style="width:300px"
              >
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
              <Select v-model="UpdateList.ToDay" style="width:300px">
                <Option
                  v-for="item in ToDayList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24" v-if="PeriodOfT">
            <FormItem label="T+N" prop="PeriodOfT">
              <Select v-model="UpdateList.PeriodOfT" style="width:300px">
                <Option
                  v-for="item in PeriodOfTList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24" v-if="ExcludeHoliday">
            <FormItem label="节假日(含/不含)" prop="ExcludeHoliday">
              <i-switch v-model="UpdateList.ExcludeHoliday" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col span="24" v-if="Allow">
            <FormItem label="允许周几结算" prop="Allow">
              <Checkbox v-model="UpdateList.AllowMon">周一</Checkbox>
              <Checkbox v-model="UpdateList.AllowTue">周二</Checkbox>
              <Checkbox v-model="UpdateList.AllowWed">周三</Checkbox>
              <Checkbox v-model="UpdateList.AllowThu">周四</Checkbox>
              <Checkbox v-model="UpdateList.AllowFri">周五</Checkbox>
              <Checkbox v-model="UpdateList.AllowSat">周六</Checkbox>
              <Checkbox v-model="UpdateList.AllowSun">周日</Checkbox>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="排序码" prop="SortKey">
              <Input v-model="UpdateList.SortKey" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="启用" prop="Enabled">
              <i-switch v-model="UpdateList.Enabled" size="large">
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
          @click="handleReset('UpdateList');upDepartment = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="UpdateSubmit('UpdateList');"
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
  SettlementCodeBatchDelete,
  SettlementCodeUpdate,
  getSettleType,
  SettlementCodeValidateUnique
} from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      // 查询
      querySelectList: [
        {
          value: "Code",
          label: "结算规则代码"
        },
        {
          value: "Description",
          label: "结算规则描述"
        },
        {
          value: "Enabled",
          label: "启用"
        }
      ],
      queryvalue: "",
      querySelect: "",
      Checkboxif: false,
      queryvalueif: true,
      single: false,
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
        {
          title: "启用",
          key: "Enabled",
          width: 200,
          sortable: true,
          // 当Enabled=true时表格显示"是" Enabled=false时表格显示"否"
          render: (h, params) => {
            let texts = "";
            if (params.row.Enabled == true) {
              texts = "是";
            } else if (params.row.Enabled == false) {
              texts = "否";
            }
            return h(
              "div",
              {
                props: {}
              },
              texts
            );
          }
        },
        { title: "创建人 ", key: "CreateByName", width: 200, sortable: true },
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
      BusinessGroupList: [{ value: "0", label: "比特易早教" }],
      // 结算方式下拉框循环数据
      SettleTypeList: [],
      // 可结算起始天下拉框循环数据
      FromDayList: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
        { value: 11, label: 11 },
        { value: 12, label: 12 },
        { value: 13, label: 13 },
        { value: 14, label: 14 },
        { value: 15, label: 15 },
        { value: 16, label: 16 },
        { value: 17, label: 17 },
        { value: 18, label: 18 },
        { value: 19, label: 19 },
        { value: 20, label: 20 },
        { value: 21, label: 21 },
        { value: 22, label: 22 },
        { value: 23, label: 23 },
        { value: 24, label: 24 },
        { value: 25, label: 25 },
        { value: 26, label: 26 },
        { value: 27, label: 27 },
        { value: 28, label: 28 },
        { value: 29, label: 29 },
        { value: 30, label: 30 },
        { value: 31, label: 31 }
      ],
      // 可结算终止天下拉框循环数据
      ToDayList: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
        { value: 11, label: 11 },
        { value: 12, label: 12 },
        { value: 13, label: 13 },
        { value: 14, label: 14 },
        { value: 15, label: 15 },
        { value: 16, label: 16 },
        { value: 17, label: 17 },
        { value: 18, label: 18 },
        { value: 19, label: 19 },
        { value: 20, label: 20 },
        { value: 21, label: 21 },
        { value: 22, label: 22 },
        { value: 23, label: 23 },
        { value: 24, label: 24 },
        { value: 25, label: 25 },
        { value: 26, label: 26 },
        { value: 27, label: 27 },
        { value: 28, label: 28 },
        { value: 29, label: 29 },
        { value: 30, label: 30 },
        { value: 31, label: 31 }
      ],
      PeriodOfTList: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 }
      ],
      // 添加/修改加盟商结算规则默认隐藏
      AddDepartment: false,
      upDepartment: false,
      // 当结算方式选为【Monthly，NextMonth，EndOfYear】时显示，现在默认隐藏
      Allow: false,
      // 当结算方式选为【RealTime】时隐藏，现在默认显示
      ToDay: true,
      FromDay: true,
      ExcludeHoliday: true,
      PeriodOfT: true,
      // 添加结算表单
      formValidate: {
        BusinessGroup: "",
        Code: "",
        Description: "",
        SettleType: "",
        FromDay: "",
        ToDay: "",
        PeriodOfT: "",
        AllowMon: true,
        AllowTue: true,
        AllowWed: true,
        AllowThu: true,
        AllowFri: true,
        AllowSat: true,
        AllowSun: true,
        ExcludeHoliday: true,
        SortKey: "",
        Enabled: true
      },
      // 修改结算方式表单
      UpdateList: {
        BusinessGroup: "",
        Code: "",
        Description: "",
        SettleType: "",
        FromDay: [],
        ToDay: "",
        PeriodOfT: "",
        AllowMon: "",
        AllowTue: "",
        AllowWed: "",
        AllowThu: "",
        AllowFri: "",
        AllowSat: "",
        AllowSun: "",
        ExcludeHoliday: "",
        SortKey: "",
        Enabled: ""
      },
      // 表单验证
      ruleValidate: {
        // BusinessGroup: [
        //   { required: true, message: "请选择所属业务群", trigger: "change" }
        // ],
        // Code: [
        //   { required: true, message: "请输入结算规则代码", trigger: "blur" },
        //   {
        //     pattern: /^[0-9a-zA-Z]*$/g,
        //     message: "结算规则代码必须是字母加数值",
        //     trigger: "blur"
        //   }
        // ],
        // Description: [
        //   { required: true, message: "请输入结算规则描述", trigger: "blur" }
        // ],
        // SettleType: [
        //   { required: true, message: "请选择结算方式", trigger: "blur" }
        // ]
      },
      // 删除信息弹出框
      delete1: false,
      BatchDeleteList: [],
      delete: []
    };
  },
  methods: {
    // 结算方式下拉框选择事件
    setOption(value, type) {
      if (value.value == "0" || value.value == "2") {
        this.ToDay = false;
        this.FromDay = false;
        this.ExcludeHoliday = false;
        this.PeriodOfT = false;
        this.Allow = false;
      }
      if (value.value == "1") {
        this.ToDay = true;
        this.FromDay = true;
        this.ExcludeHoliday = true;
        this.PeriodOfT = true;
        this.Allow = false;
      }
      if (value.value == "3" || value.value == "4" || value.value == "5") {
        this.ToDay = true;
        this.FromDay = true;
        this.ExcludeHoliday = true;
        this.PeriodOfT = true;
        this.Allow = true;
      }
      if (value.value == "Enabled") {
        this.Checkboxif = true;
        this.queryvalueif = false;
      }
      if (value.value == "Code") {
        this.Checkboxif = false;
        this.queryvalueif = true;
      }
      if (value.value == "Description") {
        this.Checkboxif = false;
        this.queryvalueif = true;
      }
    },
    // 添加加盟商结算规则信息
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let Code = this.formValidate.Code;
          let BusinessGroup = this.formValidate.BusinessGroup;
          SettlementCodeValidateUnique(Code, BusinessGroup).then(res => {
            if (res.data == true) {
              SettlementCodeCreate(this.formValidate)
                .then(res => {
                  this.$Message.success("成功!");
                  this.AddDepartment = false;
                  this.reload();
                  this.formValidate = { brand_right: 0 };
                })
                .catch(err => {
                  console.log(err);
                  this.reload();
                  this.formValidate = { brand_right: 0 };
                });
            } else {
              this.$Message.success("Code重复,请更改Code");
            }
          });
        } else {
          this.$Message.error("请输入正确的格式!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$Message.info("已取消添加结算规则");
    },
    // 删除数据接口
    deleteList() {
      if (this.BatchDeleteList.length == 0) {
        this.$Message.info("请先选中删除的数据");
      } else {
        SettlementCodeBatchDelete(this.delete)
          .then(res => {
            this.$Message.success("删除成功!");
            this.reload();
          })
          .catch(err => {
            this.$Message.error("删除失败!");
            console.log(err);
          });
      }
    },
    BatchDelete(selection) {
      console.log(selection);
      this.BatchDeleteList = selection;
      for (var i = 0; i < this.BatchDeleteList.length; i++) {
        this.delete.push(this.BatchDeleteList[i].Id);
      }
    },
    //详情修改页面
    dblclickUpData(index) {
      this.upDepartment = true;
      this.UpdateList = index;
      console.log(index);
      if (index.SettleType == "0" || index.SettleType == "2") {
        this.ToDay = false;
        this.FromDay = false;
        this.ExcludeHoliday = false;
        this.PeriodOfT = false;
        this.Allow = false;
      }
      if (index.SettleType == "1") {
        this.ToDay = true;
        this.FromDay = true;
        this.ExcludeHoliday = true;
        this.PeriodOfT = true;
        this.Allow = false;
      }
      if (
        index.SettleType == "5" ||
        index.SettleType == "3" ||
        index.SettleType == "4"
      ) {
        this.ToDay = true;
        this.FromDay = true;
        this.ExcludeHoliday = true;
        this.PeriodOfT = true;
        this.Allow = true;
      }
    },
    //点击修改按钮
    UpdateSubmit() {
      SettlementCodeUpdate(this.UpdateList)
        .then(res => {
          this.$Message.success("修改成功!");
          this.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // 人员表格
    getSettlementCodeData(this.getTableData)
      .then(res => {
        this.SettlementCodeData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 结算方式
    getSettleType(this.getTableData)
      .then(res => {
        this.SettleTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>