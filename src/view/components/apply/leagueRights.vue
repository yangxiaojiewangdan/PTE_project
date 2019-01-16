<template>
  <div id="leagueRights">
    <!-- 头部 -->
    <Row>
      <Col span="24" style="height:100px;">
        <h1 class="setHeader">权益金规则</h1>
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
              height="700"
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
      scrollable
      width="1000"
      title="添加加盟商权益金规则"
      :mask-closable="false"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="160"
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
            <FormItem label="权益金规则代码" prop="Code">
              <Input v-model="formValidate.Code" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="权益金规则描述" prop="Description">
              <Input
                v-model="formValidate.Description"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
                style="width:784px;"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="权益金方式" prop="RoyaltyType">
              <Select
                v-model="formValidate.RoyaltyType"
                :label-in-value="true"
                @on-change="v=>{setOption(v,'type')}"
                style="width:300px"
              >
                <Option
                  v-for="item in RoyaltyTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="权益金固定值类型" prop="FlatType">
              <Select v-model="formValidate.FlatType" style="width:300px">
                <Option
                  v-for="item in FlatTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="天数不足月或年折算方式" prop="ObversionType">
              <Select v-model="formValidate.ObversionType" style="width:300px">
                <Option
                  v-for="item in ObversionTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="权益金计算基准" prop="RoyaltyBenchMark">
              <Select v-model="formValidate.RoyaltyBenchMark" style="width:300px">
                <Option
                  v-for="item in RoyaltyBenchMarkList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="固定值或比例" prop="FlatOrPecent">
              <Input v-model="formValidate.FlatOrPecent" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="12">
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
          <!-- 阶梯表格 -->
          <Col span="24" v-if="RoyaltyCodeDetail">
            <Card>
              <tables
                disabled-hover
                search-place="top"
                ref="tables"
                size="small"
                editable
                v-model="dataRoyaltyCodeDetail"
                :columns="columnsRoyaltyCodeDetail"
                @on-delete="handleDelete"
              />
            </Card>
            <Button type="info" @click="AddRoyalty = true">
              <Icon type="md-add"/>添加阶梯
            </Button>
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
    <Modal v-model="upDepartment" scrollable width="1000" title="修改加盟商权益金规则" :mask-closable="false">
      <Form
        ref="UpdateList"
        :model="UpdateList"
        :rules="ruleValidate"
        label-position="right"
        :label-width="160"
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
            <FormItem label="权益金规则代码" prop="Code">
              <Input v-model="UpdateList.Code" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="权益金规则描述" prop="Description">
              <Input
                v-model="UpdateList.Description"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
                style="width:784px"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="权益金方式" prop="RoyaltyType">
              <Select
                v-model="UpdateList.RoyaltyType"
                :label-in-value="true"
                @on-change="v=>{setOption(v,'type')}"
                style="width:300px"
              >
                <Option
                  v-for="item in RoyaltyTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="权益金固定值类型" prop="FlatType">
              <Select v-model="UpdateList.FlatType" style="width:300px">
                <Option
                  v-for="item in FlatTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="天数不足月或年折算方式" prop="ObversionType">
              <Select v-model="UpdateList.ObversionType" style="width:300px">
                <Option
                  v-for="item in ObversionTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="权益金计算基准" prop="RoyaltyBenchMark">
              <Select v-model="UpdateList.RoyaltyBenchMark" style="width:300px">
                <Option
                  v-for="item in RoyaltyBenchMarkList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="固定值或比例" prop="FlatOrPecent">
              <Input v-model="UpdateList.FlatOrPecent" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="12">
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
          <!-- 阶梯表格 -->
          <Col span="24" v-if="RoyaltyCodeDetail">
            <Card>
              <tables
                disabled-hover
                search-place="top"
                ref="tables"
                size="small"
                @on-row-click="dblclickUpDatajt"
                v-model="SeedataRoyaltyCodeDetail"
                :columns="SeecolumnsRoyaltyCodeDetail"
                @on-delete="handleDelete"
              />
            </Card>
            <Button type="info" @click="SeeAddRoyalty = true">
              <Icon type="md-add"/>添加阶梯
            </Button>
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
          <span>修改</span>
        </button>
      </div>
    </Modal>
    <!-- 添加阶梯明细页面 -->
    <Modal v-model="AddRoyalty" scrollable width="600" title="添加自定义明细" :mask-closable="false">
      <Form
        ref="FormAddRoyalty"
        :model="FormAddRoyalty"
        :rules="ruleValidate"
        label-position="right"
        :label-width="160"
      >
        <Row>
          <Col span="24">
            <FormItem label="下限金额(含)" prop="LowerValue">
              <Input v-model="FormAddRoyalty.LowerValue" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="上限金额(不含)" prop="UpperValue">
              <Input v-model="FormAddRoyalty.UpperValue" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="固定值或比例" prop="FlatOrPecent">
              <Input v-model="FormAddRoyalty.FlatOrPecent" placeholder="请输入" style="width:300px"></Input>
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
          @click="handleReset('FormAddRoyalty');AddRoyalty = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="AddRoyaltySubmit('FormAddRoyalty');"
        >
          <span>添加</span>
        </button>
      </div>
    </Modal>
    <!-- 修改信息     添加阶梯明细页面 -->
    <Modal v-model="SeeAddRoyalty" scrollable width="600" title="添加自定义明细" :mask-closable="false">
      <Form
        ref="SeeFormAddRoyalty"
        :model="SeeFormAddRoyalty"
        :rules="ruleValidate"
        label-position="right"
        :label-width="160"
      >
        <Row>
          <Col span="24">
            <FormItem label="下限金额(含)" prop="LowerValue">
              <Input v-model="SeeFormAddRoyalty.LowerValue" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="上限金额(不含)" prop="UpperValue">
              <Input v-model="SeeFormAddRoyalty.UpperValue" placeholder="请输入" style="width:300px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="固定值或比例" prop="FlatOrPecent">
              <Input v-model="SeeFormAddRoyalty.FlatOrPecent" placeholder="请输入" style="width:300px"></Input>
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
          @click="handleReset('SeeFormAddRoyalty');SeeAddRoyalty = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="SeeAddRoyaltySubmit('SeeFormAddRoyalty');"
        >
          <span>添加</span>
        </button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { GetEntities,GetEntity,Create,Update,Delete,BatchDelete1,Copy,DataDictionaryGetEntities,ValidateUnique,DataDictionaryGetDataCatalog} from "@/api/api";
export default {
  components: {
    Tables
  },
  inject: ["reload"],
  data() {
    return {
      // 查询
      querySelectList: [
        {
          value: "Code",
          label: "权益金规则代码"
        },
        {
          value: "Description",
          label: "权益金规则描述"
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
      // 内容表格
      SettlementCodeTable: [
        { type: "selection", width: 50, align: "center", fixed: "left" },
        {
          title: "所属业务群",
          key: "BusinessGroup",
          width: 175,
          sortable: true
        },
        {
          title: "权益金规则代码",
          key: "Code",
          width: 200,
          sortable: true
        },
        {
          title: "权益金规则描述",
          key: "Description",
          width: 250,
          sortable: true
        },
        {
          title: "固定值或比例",
          key: "FlatOrPecent",
          width: 200,
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
        { title: "创建人 ", key: "CreateByName", width: 175, sortable: true },
        { title: "创建时间", key: "CreateOn", width: 175, sortable: true }
      ],
      //表格数组
      // 点击全选将所有的数据渲染
      getTableData: {
        Filters: {}
      },
      // 点击启用将启用的数据渲染
      getEnableData: {
        Filters: [
          {
            Relational: "And",
            Conditions: [
              {
                FilterField: "Enabled",
                Relational: "Equal",
                FilterValue: "true"
              }
            ]
          }
        ]
      },
      // 点击禁用将禁用的数据渲染
      getProhibitData: {
        Filters: [
          {
            Relational: "And",
            Conditions: [
              {
                FilterField: "Enabled",
                Relational: "Equal",
                FilterValue: "false"
              }
            ]
          }
        ]
      },
      SettlementCodeData: [],
      // 添加信息 弹出框
      // 所属业务群
      BusinessGroupList: [
        {
          value: "0",
          label: "比特易早教"
        }
      ],
      // 权益金方式下拉框循环数据
      RoyaltyTypeList: [],
      // 权益金固定值类型下拉框循环数据
      FlatTypeList: [],
      // 天数不足月或年折算方式下拉框循环数据
      ObversionTypeList: [],
      // 权益金计算基准下拉框循环数据
      RoyaltyBenchMarkList: [],
      // 添加/修改权益金规则默认隐藏
      AddDepartment: false,
      upDepartment: false,
      // 添加阶梯明细默认隐藏
      AddRoyalty: false,
      SeeAddRoyalty: false,
      // 当RoyaltyType为【阶梯】时显示，现在默认隐藏
      RoyaltyCodeDetail: false,
      // 删除信息弹出框
      delete1: false,
      BatchDeleteList: [],
      delete: [],
      // 添加信息表单
      formValidate: {
        BusinessGroup: "",
        Code: "",
        Description: "",
        RoyaltyType: "",
        FlatType: "",
        ObversionType: "",
        RoyaltyBenchMark: "",
        FlatOrPecent: "",
        SortKey: "",
        Enabled: true
      },
      // 修改信息表单
      UpdateList: {
        BusinessGroup: "",
        Code: "",
        Description: "",
        RoyaltyType: "",
        FlatType: "",
        ObversionType: "",
        RoyaltyBenchMark: "",
        FlatOrPecent: "",
        SortKey: "",
        Enabled: true
      },
      // 添加阶梯明细表单信息
      FormAddRoyalty: {
        LowerValue: "",
        UpperValue: "",
        FlatOrPecent: ""
      },
      SeeFormAddRoyalty: {
        LowerValue: "",
        UpperValue: "",
        FlatOrPecent: ""
      },
      // 添加信息表单验证
      ruleValidate: {
        // BusinessGroup: [
        //   { required: true, message: "请选择所属业务群", trigger: "change" }
        // ],
        // Code: [
        //   { required: true, message: "请输入权益金规则代码", trigger: "blur" },
        //   {
        //     pattern: /^[0-9a-zA-Z]*$/g,
        //     message: "权益金规则代码必须是字母加数值",
        //     trigger: "blur"
        //   }
        // ],
        // Description: [
        //   { required: true, message: "请输入权益金规则描述", trigger: "blur" }
        // ],
        // RoyaltyType: [
        //   { required: true, message: "请选择权益金方式", trigger: "change" }
        // ],
        // FlatType: [
        //   {
        //     required: true,
        //     message: "请选择权益金固定值类型",
        //     trigger: "change"
        //   }
        // ],
        // ObversionType: [
        //   {
        //     required: true,
        //     message: "请选择天数不足月或年折算方式",
        //     trigger: "change"
        //   }
        // ],
        // RoyaltyBenchMark: [
        //   { required: true, message: "请选择权益金计算基准", trigger: "change" }
        // ],
        // FlatOrPecent: [
        //   {
        //     required: true,
        //     message: "请选择权益金计算基准",
        //     trigger: "change"
        //   },
        //   {
        //     pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/,
        //     message: "小数,保留2位",
        //     trigger: "change"
        //   }
        // ]
      },
      // 阶梯表格信息
      columnsRoyaltyCodeDetail: [
        { title: "下限金额（含）", key: "LowerValue", editable: true },
        { title: "上限金额（不含）", key: "UpperValue", editable: true },
        { title: "固定值或比例", key: "FlatOrPecent", editable: true },
        { title: "操作", key: "handle", options: ["delete"] }
      ],
      SeecolumnsRoyaltyCodeDetail: [
        { title: "下限金额（含）", key: "LowerValue", editable: true },
        { title: "上限金额（不含）", key: "UpperValue", editable: true },
        { title: "固定值或比例", key: "FlatOrPecent", editable: true },
        { title: "操作", key: "handle", options: ["delete"] }
      ],
      // 阶梯表格数组
      dataRoyaltyCodeDetail: [],
      SeedataRoyaltyCodeDetail: [],
      // 查询启用的按钮样式
      Allelectionprimary1: true,
      Allelectionsuccess1: false,
      Enableprimary1: true,
      Enablesuccess1: false,
      Prohibitprimary1: true,
      Prohibitsuccess1: false
    };
  },
  methods: {
    // 权益金下拉框选择事件  当选择的是阶梯是出现阶梯明细
    setOption(value, type) {
      if (value.value == "2") {
        this.RoyaltyCodeDetail = true;
      }
      if (value.value == "0" || value.value == "1") {
        this.RoyaltyCodeDetail = false;
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
    handleDelete(params) {
      let index = localStorage.row;
      this.SeedataRoyaltyCodeDetail.splice(index, 1);
      let royaltyId = localStorage.BId;
      let detailId = localStorage.SId;
      console.log(royaltyId, detailId);
      RoyaltyCodeBatchRemoveLadder(royaltyId, detailId)
        .then(res => {
          this.$Message.success("删除成功!");
          localStorage.removeItem("SId");
        })
        .catch(err => {
          console.log(err);
        });
      console.log(params);
    },

    // 添加加盟商权益金规则信息
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        localStorage.setItem(
          "dataRoyaltyCodeDetail",
          JSON.stringify(this.dataRoyaltyCodeDetail)
        );
        if (valid) {
          let Code = this.formValidate.Code;
          let BusinessGroup = this.formValidate.BusinessGroup;
          RoyaltyCodeValidateUnique(Code, BusinessGroup).then(res => {
            if (res.data == true) {
              RoyaltyCodeCreate(this.formValidate)
                .then(res => {
                  if (res.data.Data.RoyaltyType == "2") {
                    let royaltyId = res.data.Data.Id;
                    let DetailCollection = JSON.parse(
                      localStorage.dataRoyaltyCodeDetail
                    );
                    RoyaltyCodeAddOrUpdateLadder({
                      RoyaltyId: royaltyId,
                      DetailCollection: DetailCollection
                    })
                      .then(res => {
                        this.$Message.success("成功!");
                        this.AddDepartment = false;
                        localStorage.removeItem("dataRoyaltyCodeDetail");
                        this.reload();
                        this.formValidate = { brand_right: 0 };
                      })
                      .catch(err => {
                        this.$Message.error("失败!");
                        console.log(err);
                      });
                  } else {
                    this.$Message.success("成功!");
                    this.AddDepartment = false;
                    this.reload();
                  }
                })
                .catch(err => {
                  this.$Message.success("添加失败，请查看添加信息是否完整!");
                  console.log(err);
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
    // 添加阶梯规则信息
    AddRoyaltySubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.dataRoyaltyCodeDetail.push(this.FormAddRoyalty);
          this.FormAddRoyalty = { brand_right: 0 };
          this.AddRoyalty = false;
        }
      });
    },
    SeeAddRoyaltySubmit() {
      this.SeedataRoyaltyCodeDetail.push(this.SeeFormAddRoyalty);
      this.SeeFormAddRoyalty = { brand_right: 0 };
      this.SeeAddRoyalty = false;
      localStorage.setItem(
        "dataRoyaltyCodeDetail",
        JSON.stringify(this.SeedataRoyaltyCodeDetail)
      );
      let royaltyId = localStorage.BId;
      let DetailCollection = JSON.parse(localStorage.dataRoyaltyCodeDetail);
      RoyaltyCodeAddOrUpdateLadder({
        RoyaltyId: royaltyId,
        DetailCollection: DetailCollection
      })
        .then(res => {
          this.$Message.success("成功!");
          this.SeeFormAddRoyalty = { brand_right: 0 };
        })
        .catch(err => {
          this.$Message.error("失败!");
          console.log(err);
        });
    },
    // 取消
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$Message.info("已取消");
    },
    // 删除数据接口
    deleteList() {
      if (this.BatchDeleteList.length == 0) {
        this.$Message.info("请先选中删除的数据");
      } else {
        RoyaltyCodeBatchDelete(this.delete)
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
      this.BatchDeleteList = selection;
      for (var i = 0; i < this.BatchDeleteList.length; i++) {
        this.delete.push(this.BatchDeleteList[i].Id);
        console.log(this.BatchDeleteList[i].Id);
      }
    },
    //详情修改页面
    dblclickUpData(index) {
      this.upDepartment = true;
      this.UpdateList = index;
      localStorage.setItem("BId", index.Id);
      if (index.RoyaltyType == "2") {
        this.RoyaltyCodeDetail = true;
        this.SeedataRoyaltyCodeDetail = index.CustomCollection;
      } else {
        this.RoyaltyCodeDetail = false;
      }
      console.log(index);
    },
    dblclickUpDatajt(index) {
      localStorage.setItem("SId", index.Id);
      localStorage.setItem("row", index);
    },
    //点击修改按钮
    UpdateSubmit() {
      RoyaltyCodeUpdate(this.UpdateList)
        .then(res => {
          this.$Message.success("修改成功!");
          this.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击查询按钮查询信息
    querytable() {
      console.log(this.querySelect)
      RoyaltyCodeGetEntities({
        Filters: [
          {
            Relational: "Or", //And 与 | Or 或
            Conditions: [
              {
                FilterField: this.querySelect, //字段名
                Relational: "Contain",
                FilterValue: this.queryvalue //字段名里面的值
              }
            ]
          },
          {
            Relational: "Or",
            Conditions: [
              {
                FilterField: this.querySelect,
                Relational: "Equal",
                FilterValue: this.single
              }
            ]
          }
        ]
      })
        .then(res => {
          this.SettlementCodeData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // 表格数据
    RoyaltyCodeGetEntities(this.getTableData)
      .then(res => {
        this.SettlementCodeData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 权益金方式
    getROYALTY_TYPE()
      .then(res => {
        this.RoyaltyTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 权益金固定值类型
    getROYALTY_FLAT_TYPE()
      .then(res => {
        this.FlatTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 天数不足月或年折算方式
    getOBVERSION_TYPE()
      .then(res => {
        this.ObversionTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 权益金计算基准
    getROYALTY_BENCH_MARK()
      .then(res => {
        this.RoyaltyBenchMarkList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

