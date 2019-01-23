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
              <Button @click="AddList" type="success" class="tableTops">添加</Button>
              <Button @click="deleteList" type="error" class="tableTops">删除</Button>
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
              @on-row-dblclick="dblclickUpData"
              @on-select="OneselectionId"
              @on-select-all="allselectionId"
              @on-select-all-cancel="allcancelselectionId"
              @on-select-cancel="OnecancelselectionId"
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
    <Modal v-model="delete1" title="提示" @on-ok="ok">
      <h3>确定删除这条数据？</h3>
    </Modal>
    <!-- 添加信息 弹出框-->
    <Modal v-model="AddDepartment" width="600" :mask-closable="false">
      <p slot="header" style="text-align:left;line-height: 1;">
        <span v-if="add">添加结算规则</span>
        <span v-if="see">查看结算规则</span>
      </p>

      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate1" label-position="right" :label-width="150">
        <Row>
          <Col span="24">
            <FormItem label="所属业务群" prop="BusinessGroup">
              <Input
                v-model="formValidate.BusinessGroup"
                placeholder="请输入"
                style="width:300px"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Divider></Divider>
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
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
            </FormItem>
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
        >删除</Button>
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
    <ruleValidate v-on:ruleValidate="ruleValidate"></ruleValidate>
  </div>
</template>
<script>
import ruleValidate from "_c/ruleValidate";
import {
  GetEntities,
  GetEntity,
  Create,
  Update,
  Delete,
  BatchDelete,
  Copy,
  DataDictionaryGetEntities,
  ValidateUnique,
  DataDictionaryGetDataCatalog
} from "@/api/api";
export default {
  components: {
    ruleValidate
  },
  inject: ["reload"],
  data() {
    return {
      ruleValidate1: {},
      // 接口
      Interface: "SettlementCode",
      add: "",
      see: "",
      del: "",
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
        { type: "selection", width: 50, align: "center" },
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
      BusinessGroupList: "",
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
        Enabld: true
      },
      // 删除信息弹出框
      delete1: false,
      BatchDeleteList: [],
      delete: [],
    };
  },
  methods: {
    ruleValidate: function(ruleValidate) {
      this.ruleValidate1 = ruleValidate;
    },
    AddList() {
      this.AddDepartment = true;
      this.formValidate = { brand_right: 0 };
      let see = JSON.parse(sessionStorage.getItem("userInfo"));
      this.formValidate.CreateByName = see.AccountName;
      this.formValidate.BusinessGroup = see.BusinessUnit;
      this.add = true;
      this.del = false;
      this.see = false;
      this.ToDay = true;
      this.FromDay = true;
      this.ExcludeHoliday = true;
      this.PeriodOfT = true;
      this.Allow = false;
    },
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
    // 添加/查看修改加盟商结算规则信息
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formValidate.Id == undefined) {
            let Code = this.formValidate.Code;
            let BusinessGroup = this.formValidate.BusinessGroup;
            ValidateUnique(this.Interface, Code, BusinessGroup).then(res => {
              if (res.data == true) {
                Create(this.Interface, this.formValidate)
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
          }
          if (this.formValidate.Id) {
            Update(this.Interface, this.formValidate)
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
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$Message.info("已取消添加结算规则");
    },
    // 删除数据接口
    deleteList() {
      if (this.delete.length == 0) {
        this.$Message.info("请先选中删除的数据");
      } else {
        this.delete1 = true;
      }
    },
    OneselectionId(selection,row) {
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
    OnecancelselectionId(selection,row) {
      function removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
          if(arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      }
      removeByValue(this.delete,row.Id);
    },
    allselectionId(selection) {
      console.log(this.delete);
       for (var i = 0; i < selection.length; i++) {
        this.delete.push(selection[i].Id);
      }
    },
    allcancelselectionId(selection) {
         this.delete = selection
    },
    ok() {
      if (this.formValidate.Id == undefined) {
        BatchDelete(this.Interface, this.delete)
          .then(res => {
            this.$Message.success("删除成功!");
            this.reload();
          })
          .catch(err => {
            this.$Message.error("删除失败!");
            console.log(err);
          });
      } else {
        Delete(this.Interface, this.formValidate.Id)
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
    //详情修改页面
    dblclickUpData(index) {
      this.AddDepartment = true;
      this.add = false;
      this.see = true;
      this.formValidate = index;
      this.del = true;
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
    }
  },
  mounted() {
    // 结算规则
    this.SettleTypeList = JSON.parse(localStorage.SETTLE_TYPE);
    // 人员表格
    GetEntities(this.Interface, this.getTableData)
      .then(res => {
        this.SettlementCodeData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>