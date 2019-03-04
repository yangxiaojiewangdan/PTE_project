
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
    <p slot="header" style="text-align:left;line-height: 1;">
      <span v-if="add">添加结算规则</span>
      <span v-if="see">查看结算规则</span>
    </p>
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
              <Input
                v-model="formValidate.BusinessGroup"
                placeholder="请输入"
                style="width:300px"
                disabled
              ></Input>
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
            <FormItem label="" prop="Enabled">
              <i-switch v-model="formValidate.Enabled" size="large">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
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
                @on-row-click="rowclick"
                @on-delete="handleDelete"
              />
               <!--<Button type="text" @click="AddRoyalty = true" style="margin-left:48%;" size="small">
                 <Icon type="md-add" size="25"  />
               </Button>-->
            </Card>
            
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
  </div>
</template>
<script>
import Tables from "_c/tables";
import { GetEntities,GetEntity,Create,Update,Delete,BatchDelete,RoyaltyCodeBatchRemoveLadder,RoyaltyCodeRemoveLadder,Copy,ValidateUnique,RoyaltyCodeAddOrUpdateLadder} from "@/api/api";
export default {
  components: {
    Tables
  },
  inject: ["reload"],
  data() {
    return {
      Interface:"RoyaltyCode",
      add: "",
      see: "",
      del: "",
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
      // 添加阶梯明细表单信息
      FormAddRoyalty: {
        LowerValue: "",
        UpperValue: "",
        FlatOrPecent: ""
      },
      // 添加信息表单验证
      ruleValidate: {},
      // 阶梯表格信息
      columnsRoyaltyCodeDetail: [
        { title: "下限金额（含）", key: "LowerValue",  },
        { title: "上限金额（不含）", key: "UpperValue",  },
        { title: "固定值或比例", key: "FlatOrPecent", },
        { title: "操作", key: "handle", options: ["delete"] }
      ],
      // 阶梯表格数组
      dataRoyaltyCodeDetail: [],
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
    AddList() {
      this.AddDepartment = true;
      this.formValidate = { brand_right: 0 };
      let see = JSON.parse(sessionStorage.getItem("userInfo"));
      this.formValidate.CreateByName = see.AccountName;
      this.formValidate.BusinessGroup = see.BusinessUnit;
      this.add = true;
      this.del = false;
      this.see = false;
    },
    handleDelete(params) {
      let detailId = localStorage.row;
      let index = localStorage.index;
      this.dataRoyaltyCodeDetail.splice(index, 0);
      let royaltyId = localStorage.BId;
      RoyaltyCodeRemoveLadder(royaltyId, detailId)
        .then(res => {
          this.$Message.success("删除成功!");
          localStorage.removeItem("row");
          localStorage.removeItem("index");
        })
        .catch(err => {
          console.log(err);
        });
      // console.log(params);
    },   
    rowclick(index){
       localStorage.setItem("row",JSON.stringify(index.Id));
       localStorage.setItem("index",JSON.stringify(index));
    },
    // 添加加盟商权益金规则信息
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        localStorage.setItem(
          "dataRoyaltyCodeDetail",
          JSON.stringify(this.dataRoyaltyCodeDetail)
        );
        if (valid) {
          if (this.add == true) {
            let Code = this.formValidate.Code;
            let BusinessGroup = this.formValidate.BusinessGroup;
            ValidateUnique(this.Interface, Code, BusinessGroup).then(res => {
              if (res.data == true) {
                Create(this.Interface, this.formValidate)
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
                          this.FormAddRoyalty = { brand_right: 0 };
                        })
                        .catch(err => {
                          this.$Message.error("失败!");
                        });
                    } else {
                      this.$Message.success("成功!");
                      this.AddDepartment = false;
                      this.reload();
                    }
                  })
                  .catch(err => {
                    this.$Message.success("添加失败");
                  });
              } else {
                this.$Message.success("Code重复,请更改Code");
              }
            });
          } else if (this.see == true) {
             //点击修改按钮
            Update(this.Interface, this.formValidate)
              .then(res => {
                this.$Message.success("修改成功!");
                this.AddDepartment = false;
                this.$refs[name].resetFields();
                this.reload();
              })
              .catch(err => {
                this.$Message.error("修改失败!");
              });
          }
        }else {
          this.$Message.error("信息填写有误!");
          }
      });
    },
    // 添加阶梯规则信息
    AddRoyaltySubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.AddRoyalty = false;
          if(this.add == true){
            this.dataRoyaltyCodeDetail.push(this.FormAddRoyalty);
            this.FormAddRoyalty = { brand_right: 0 };
          }else if(this.see == true){
            let royaltyId = JSON.parse(localStorage.BId);
            this.dataRoyaltyCodeDetail.push(this.FormAddRoyalty);
            RoyaltyCodeAddOrUpdateLadder({
            RoyaltyId: royaltyId,
            DetailCollection: [this.FormAddRoyalty]
          })
            .then(res => {
              this.$Message.success("成功!");
              this.FormAddRoyalty = { brand_right: 0 };  
            })
            .catch(err => {
              this.$Message.error("失败!");
            });
          }
        }
      });
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
      console.log("勾选")
      console.log(this.delete)
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
      console.log("取消")
      console.log(this.delete)
    },
    // allselectionId(selection) {
    //   console.log(this.delete);
    //    for (var i = 0; i < selection.length; i++) {/8*
    //     this.delete.push(selection[i].Id);
    //   }
    // },
    // allcancelselectionId(selection) {
    //      this.delete = selection
    // },
    ok() {
      console.log("接口"+this.delete)
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
    // 取消
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$Message.info("已取消");
    },

    //详情修改页面
    dblclickUpData(index) {
      this.AddDepartment = true;
      this.add = false;
      this.see = true;  
      this.formValidate = index;
      this.del = true;
      localStorage.setItem("BId", index.Id);
      if (index.RoyaltyType == "2") {
        this.RoyaltyCodeDetail = true;
        this.dataRoyaltyCodeDetail = index.CustomCollection;
      } else {
        this.RoyaltyCodeDetail = false;
        // this.dataRoyaltyCodeDetail = { brand_right: 0 };  
      }
    },
    // 点击查询按钮查询信息
    querytable() {
      GetEntities(this.Interface,{
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
    GetEntities(this.Interface,this.getTableData)
      .then(res => {
        this.SettlementCodeData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 权益金方式
    this.RoyaltyTypeList = JSON.parse(localStorage.ROYALTY_TYPE);
    // 权益金固定值类型
    this.FlatTypeList = JSON.parse(localStorage.ROYALTY_FLAT_TYPE);
    // 天数不足月或年折算方式
    this.ObversionTypeList = JSON.parse(localStorage.OBVERSION_TYPE);
    // 权益金计算基准
    this.RoyaltyBenchMarkList = JSON.parse(localStorage.ROYALTY_BENCH_MARK);
  }
};
</script>
