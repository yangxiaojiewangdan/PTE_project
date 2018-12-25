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
                v-for="item in RoyaltyTypeList"
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
              :columns="columns4"
              :data="data1"
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
      width="600"
      height="600"
      title="添加加盟商结算规则"
      :mask-closable="false"
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
            <FormItem label="结算方式" prop="Description">
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
            <FormItem label="可结算起始天" prop="RoyaltyType">
              <Select v-model="formValidate.RoyaltyType" style="width:300px">
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
              <Input v-model="formValidate.FlatOrPecent" placeholder="请输入" style="width:300px"></Input>
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
      columns4: [
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
      data1: [],
      // 添加信息 弹出框
      // 所属业务群
      BusinessGroupList: [],
      // 结算方式下拉框循环数据
      RoyaltyTypeList: [
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
      // RoyaltyCodeDetail:false,
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
      ruleValidate: {
        BusinessGroup: [
          { required: true, message: "请选择用户群", trigger: "change" }
        ],
        Code: [
          {
            required: true,
            message: "请输入权益金规则代码",
            trigger: "change"
          },
          {
            pattern: /[\u4e00-\u9fa5]/gm,
            message: "请输入正确的权益金规则代码",
            trigger: "blur"
          }
        ],
        Description: [
          { required: true, message: "请输入权益金规则描述", trigger: "blur" }
        ],
        RoyaltyType: [
          { required: true, message: "请选择权益金方式", trigger: "change" }
        ],
        FlatType: [
          {
            required: true,
            message: "请选择权益金固定值类型",
            trigger: "change"
          }
        ],
        ObversionType: [
          {
            required: true,
            message: "请选择天数不足月或年折算方式",
            trigger: "change"
          }
        ],
        RoyaltyBenchMark: [
          { required: true, message: "请选择权益金计算基准", trigger: "change" }
        ],
        FlatOrPecent: [
          { required: true, message: "请选择固定值或比例", trigger: "change" }
        ],
        SortKey: [{ required: true, message: "排序码", trigger: "change" }],
        Enabled: [{ required: true, message: "启用", trigger: "change" }]
      }
    };
  }
};
</script>