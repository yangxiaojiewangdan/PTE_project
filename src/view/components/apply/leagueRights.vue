<template>
  <div id="leagueRights">
    <!-- 头部 -->
    <Row>
      <Col span="24" style="height:100px;">
        <h1 class="setHeader">权益金规则</h1>
      </Col>
      <!-- 内容 -->
      <Col span="24" style="h    eight:780px;">
        <div class="querycriteria" style="height:100px;">
          <div class="querycriteriadiv" style="margin-left:24px;">
            <label>权益金方式：</label>
            <Select v-model="queryRoyaltyType" style="width:200px">
              <Option
                v-for="item in RoyaltyTypeList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="querycriteriadiv">
            <label>权益金规则描述：</label>
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
              <Button @click="delete1 = true" type="error" class="tableTops">删除</Button>
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
    <!-- 添加信息 弹出框-->
    <Modal
      v-model="AddDepartment"
      scrollable
      width="600"
      title="添加加盟商权益金规则"
      :mask-closable="false"
      :styles="{top: '20px'}"
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
                v-model="formValidate.LongDescription"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
                style="width:300px"
              ></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="权益金方式" prop="RoyaltyType">
              <Select
                v-model="formValidate.RoyaltyType"
                :label-in-value="true"
                @on-change="v=>{setOption(v,'type')}"
                style="width:300px"
              >
                <Option
                  v-for="item in RoyaltyTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="权益金固定值类型" prop="FlatType">
              <Select v-model="formValidate.FlatType" style="width:300px">
                <Option
                  v-for="item in FlatTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="天数不足月或年折算方式" prop="ObversionType">
              <Select v-model="formValidate.ObversionType" style="width:300px">
                <Option
                  v-for="item in ObversionTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="权益金计算基准" prop="RoyaltyBenchMark">
              <Select v-model="formValidate.RoyaltyBenchMark" style="width:300px">
                <Option
                  v-for="item in RoyaltyBenchMarkList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="固定值或比例" prop="FlatOrPecent">
              <Input v-model="formValidate.FlatOrPecent" placeholder="请输入" style="width:300px"></Input>
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
          <!-- 阶梯表格 -->
          <Col span="24" v-if="RoyaltyCodeDetail">
            <Card>
              <tables
                search-place="top"
                ref="tables"
                size="small"
                editable
                v-model="dataRoyaltyCodeDetail"
                :columns="columnsRoyaltyCodeDetail"
                @on-delete="handleDelete"
              />
            </Card>
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
import Tables from "_c/tables";
import { RoyaltyCodeGetEntities, RoyaltyCodeCreate } from "@/api/api";
export default {
  components: {
    Tables
  },
  inject: ["reload"],
  data() {
    return {
      // 查询
      queryRoyaltyType: "",
      queryDescription: "",
      querySelectList: [
        {
          value: "权益金规则代码",
          label: "权益金规则代码"
        }
      ],
      queryvalue: "",
      querySelect: "",
      // 内容表格
      SettlementCodeTable: [
        { type: "selection", width: 50, align: "center", fixed: "left" },
        {
          title: "所属业务群",
          key: "BusinessGroup",
          width: 175,
          sortable: true
        },
        { title: "权益金规则代码", key: "Code", width: 200, sortable: true },
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
        { title: "启用", key: "Enabled", width: 200, sortable: true },
        { title: "创建人 ", key: "CreateBy", width: 175, sortable: true },
        { title: "创建时间", key: "CreateOn", width: 175, sortable: true }
      ],
      //表格数组
      getTableData: {
        Filters: {}
      },
      SettlementCodeData: [],
      // 添加信息 弹出框
      // 所属业务群
      BusinessGroupList: [
        {
          value: "用户",
          label: "用户"
        }
      ],
      // 权益金方式下拉框循环数据
      RoyaltyTypeList: [
        {
          value: "固定金额",
          label: "固定金额"
        },
        {
          value: "固定比例",
          label: "固定比例"
        },
        {
          value: "阶梯",
          label: "阶梯"
        }
      ],
      // 权益金固定值类型下拉框循环数据
      FlatTypeList: [
        {
          value: "按交易笔数",
          label: "按交易笔数"
        },
        {
          value: "按天",
          label: "按天"
        },
        {
          value: "按月",
          label: "按月"
        },
        {
          value: "按年",
          label: "按年"
        }
      ],
      // 天数不足月或年折算方式下拉框循环数据
      ObversionTypeList: [
        {
          value: "按自然天折算",
          label: "按自然天折算"
        },
        {
          value: "全额",
          label: "全额"
        }
      ],
      // 权益金计算基准下拉框循环数据
      RoyaltyBenchMarkList: [
        {
          value: "按收入",
          label: "按收入"
        },
        {
          value: "按利润",
          label: "按利润"
        }
      ],
      // 添加权益金规则默认隐藏
      AddDepartment: false,
      // 当RoyaltyType为【阶梯】时显示，现在默认隐藏
      RoyaltyCodeDetail: false,
      // 添加信息表单
      formValidate: {
        BusinessGroup: "",
        Code: "",
        Description: "",
        RoyaltyType: "",
        FlatType: "",
        RoyaltyBenchMark: "",
        FlatOrPecent: "",
        SortKey: "",
        Enabled: true
      },
      // 添加信息表单验证
      ruleValidate: {},
      // 阶梯表格信息
      columnsRoyaltyCodeDetail: [
        { title: "下限金额（含）", key: "LowerValue", editable: true },
        { title: "上限金额（不含）", key: "UpperValue", editable: true },
        { title: "固定值或比例", key: "FlatOrPecent", editable: true },
        { title: "操作", key: "handle", options: ["delete"] }
      ],
      // 阶梯表格数组
      dataRoyaltyCodeDetail: []
    };
  },
  methods: {
    // 权益金下拉框选择事件  当选择的是阶梯是出现阶梯明细
    setOption(value, type) {
      console.log(value.label);
      if (value.label == "阶梯") {
        this.RoyaltyCodeDetail = true;
      }
    },
    handleDelete(params) {
      console.log(params);
    },
    // 添加加盟商结算规则信息
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //如果正则正确就调用接口发送数据
          RoyaltyCodeCreate(this.formValidate)
            .then(res => {
              this.$Message.success("成功!");
              this.AddDepartment = false;
              this.reload();
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
    // 人员表格
    RoyaltyCodeGetEntities(this.getTableData)
      .then(res => {
        this.SettlementCodeData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>