<template>
  <div id="information">
    <Row>
      <Col span="24" style="height:50px;">
        <h1 class="queryHeader">教室管理</h1>
      </Col>
    </Row>
    <!-- 查询条件 -->
    <Row>
      <Col span="24" class="querycriteria" style="height:245px;">
        <!-- 滚动 -->
        <Col span="24">
          <Row>
            <Col span="18" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">所属门店：</h3>
              <Select
                v-model="queryProviceCode"
                style="width:200px;margin-left:20px;"
                placeholder="请选择 "
                clearable
              >
                <Option
                  v-for="item in StoreList"
                  :value="item.value"
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
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery" style="margin-left:12px;">每天开始/结束时间：</h3>
              <TimePicker
                v-model="StartEndDate"
                format="HH’mm’ss"
                type="timerange"
                placeholder="Select time"
                style="width: 300px;margin-left:20px;"
              ></TimePicker>
            </Col>
          </Row>
          <Row>
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">教室类型：</h3>
              <Button type="text" class="tableTops">全部</Button>
              <RadioGroup v-model="RadioClassRoomType" type="button">
                <Radio
                  v-for="item in ClassRoomTypeList"
                  :key="item.Code"
                  :value="item.Id"
                >{{ item.label }}</Radio>
              </RadioGroup>
            </Col>
          </Row>
          <Row>
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:4px;">教室当前状态：</h3>
              <Button type="text" class="tableTops">全部</Button>
              <RadioGroup v-model="RadioStatus" type="button">
                <Radio
                  v-for="item in StatusList"
                  :key="item.Code"
                  :label="item.Description"
                >{{ item.Description }}</Radio>
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
          <Button type="primary" class="tableTops" @click="querytable">查询</Button>
        </div>
      </Col>
      <!-- 表格上面的功能 end-->
      <Col span="24">
        <!-- 表格 -->
        <Table
          height="490"
          size="small"
          highlight-row
          stripe
          border
          ref="selection"
          :columns="informationTable"
          :data="informationData"
          @on-select="BatchDelete"
          @on-row-dblclick="dblclickUpData"
          @on-select-all="BatchDelete"
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
    <Modal v-model="AddDepartment" scrollable width="1000" title="添加门店信息" :mask-closable="false">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="120"
      >
        <Row>
          <Col span="23">
            <FormItem label="所属门店" prop="Store">
              <Input v-model="formValidate.Store" placeholder="请输入" style="width:200px" ></Input>
              <!-- <Select v-model="formValidate.Store">
                <Option
                  v-for="item in StoreList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>-->
            </FormItem>
          </Col>
          <Col span="10" >
            <FormItem label="代码" prop="Code">
              <Input v-model="formValidate.Code" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="10" offset="2">
            <FormItem label="名称" prop="Description">
              <Input v-model="formValidate.Description" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="教室类型" prop="ClassRoomType">
              <Select v-model="formValidate.ClassRoomType">
                <Option
                  v-for="item in StatusList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10" offset="2">
            <FormItem label="教室当前状态" prop="Status">
              <Select v-model="formValidate.Status">
                <Option
                  v-for="item in StatusList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="启用日期" prop="FromDate">
              <DatePicker type="date" v-model="formValidate.FromDate" placeholder="Select date" ></DatePicker>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="停用日期" prop="ToDate">
              <DatePicker type="date" v-model="formValidate.ToDate" placeholder="Select date" ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="每天开始时间" prop="FromTime">
              <TimePicker
                v-model="formValidate.FromTime"
                placeholder="Select time"
              ></TimePicker>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="每天结束时间" prop="ToTime">
              <TimePicker
                v-model="formValidate.ToTime"
                placeholder="Select time"
              ></TimePicker>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="长" prop="Length">
              <Input v-model="formValidate.Length" placeholder="(单位：m)"  style="width:150px"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="宽" prop="Width">
              <Input v-model="formValidate.Width" placeholder="(单位：m)" style="width:150px"></Input>
            </FormItem>
          </Col>
          <Col span="5" >
            <FormItem label="高" prop="Height">
              <Input v-model="formValidate.Height" placeholder="(单位：m)" style="width:150px"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="面积" prop="AreaSize">
              <Input v-model="formValidate.AreaSize" placeholder="(单位：m2)" style="width:150px"></Input>
            </FormItem>
          </Col>
         
          <Col span="22">
            <FormItem label="特征" prop="Features">
              <Input
                v-model="formValidate.Features"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
              ></Input>
            </FormItem>
          </Col>
           <Col span="11">
            <FormItem label="禁用日期" prop="InvalidDate">
              <DatePicker type="date" v-model="formValidate.InvalidDate" placeholder="Select date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="禁用原因" prop="Comments">
              <Input
                v-model="formValidate.Comments"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
              ></Input>
            </FormItem>
          </Col>
           <Col span="7">
            <FormItem label="排序码" prop="SortKey">
              <Input v-model="formValidate.SortKey" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="7">
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
    <!-- 删除信息弹出框 -->
    <Modal v-model="delete1" title="提示" @on-ok="deleteList">
      <h3>确定删除此数据？</h3>
    </Modal>

        <!-- 修改信息 弹出框-->
    <Modal v-model="upDepartment" scrollable width="1100" title="查看加盟商信息" :mask-closable="false" >
          <Form
            ref="UpdateList"
            :model="UpdateList"
            :rules="ruleValidate"
            label-position="right"
            :label-width="120"
          >
                   <Row>
          <Col span="23">
            <FormItem label="所属门店" prop="Store">
              <Input v-model="UpdateList.Store" placeholder="请输入" style="width:200px" ></Input>
              <!-- <Select v-model="UpdateList.Store">
                <Option
                  v-for="item in StoreList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>-->
            </FormItem>
          </Col>
          <Col span="10" >
            <FormItem label="代码" prop="Code">
              <Input v-model="UpdateList.Code" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="10" offset="2">
            <FormItem label="名称" prop="Description">
              <Input v-model="UpdateList.Description" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="教室类型" prop="ClassRoomType">
              <Select v-model="UpdateList.ClassRoomType">
                <Option
                  v-for="item in StatusList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10" offset="2">
            <FormItem label="教室当前状态" prop="Status">
              <Select v-model="UpdateList.Status">
                <Option
                  v-for="item in StatusList"
                  :value="item.Description  "
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="启用日期" prop="FromDate">
              <DatePicker type="date" v-model="UpdateList.FromDate" placeholder="Select date" ></DatePicker>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="停用日期" prop="ToDate">
              <DatePicker type="date" v-model="UpdateList.ToDate" placeholder="Select date" ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="每天开始时间" prop="FromTime">
              <TimePicker
                v-model="UpdateList.FromTime"
                placeholder="Select time"
              ></TimePicker>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="每天结束时间" prop="ToTime">
              <TimePicker
                v-model="UpdateList.ToTime"
                placeholder="Select time"
              ></TimePicker>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="长" prop="Length">
              <Input v-model="UpdateList.Length" placeholder="(单位：m)"  style="width:150px"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="宽" prop="Width">
              <Input v-model="UpdateList.Width" placeholder="(单位：m)" style="width:150px"></Input>
            </FormItem>
          </Col>
          <Col span="5" >
            <FormItem label="高" prop="Height">
              <Input v-model="UpdateList.Height" placeholder="(单位：m)" style="width:150px"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="面积" prop="AreaSize">
              <Input v-model="UpdateList.AreaSize" placeholder="(单位：m2)" style="width:150px"></Input>
            </FormItem>
          </Col>
         
          <Col span="22">
            <FormItem label="特征" prop="Features">
              <Input
                v-model="UpdateList.Features"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
              ></Input>
            </FormItem>
          </Col>
           <Col span="11">
            <FormItem label="禁用日期" prop="InvalidDate">
              <DatePicker type="date" v-model="UpdateList.InvalidDate" placeholder="Select date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="禁用原因" prop="Comments">
              <Input
                v-model="UpdateList.Comments"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
              ></Input>
            </FormItem>
          </Col>
           <Col span="7">
            <FormItem label="排序码" prop="SortKey">
              <Input v-model="UpdateList.SortKey" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="启用" prop="Enabled">
              <i-switch v-model="UpdateList.Enabled" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
          </Col>
          
         
        </Row>
          </Form>
        </TabPane>
        
      
      <div slot="footer">
        <div class="footer_left">
          <div class="footer_left1">
            <div>
              <span>创建人:</span>
              <span>{{ UpdateList.CreateByName }}</span>
            </div>
            <div>
              <span>更新人:</span>
              <span>{{ UpdateList.UpdateByName }}</span>
            </div>
          </div>
          <div class="footer_left2">
            <div>
              <span>创建时间:</span>
              <span>{{ UpdateList.CreateOn }}</span>
            </div>
            <div>
              <span>更新时间:</span>
              <span>{{ UpdateList.UpdateOn }}</span>
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
  </div>
</template>
<script>
import {
  getSTORE_ROOM_TYPE,
  getSTORE_ROOM_STATUS,
  ClassRoomCreate,
  ClassRoomGetEntities,
  ClassRoomBatchDelete,
  ClassRoomUpdate,
  BusinessStoreGetEntities
} from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      // 所属门店下拉框数据
      queryProviceCode: "",
      StoreList: [
        {
          value: "测试",
          label: "测试"
        }
      ],
      // 教室类型
      RadioClassRoomType: "",
      ClassRoomTypeList: [],
      //   教室当前状态
      RadioStatus: "",
      StatusList: [],
      // 开始日期  结束日期
      StartEndDate: "",
      // 查询下拉框
      querySelect: "",
      querySelectList: [
        {
          value: "Code",
          label: "代码"
        },
        {
          value: "Description",
          label: "名称"
        },
        {
          value: "Features",
          label: "特征"
        },
        {
          value: "Comments",
          label: "禁用原因"
        }
      ],
      // 查询输入框
      queryvalue: "",
      // 内容表格
      informationTable: [
        { type: "selection", width: 45 },
        {
          title: "所属门店",
          key: "Store",
          width: 110,
          sortable: true
        },
        {
          title: "代码",
          key: "Code",
          width: 110,
          sortable: true
        },
        {
          title: "名称",
          key: "Description",
          width: 110,
          sortable: true
        },
        {
          title: "教室类型",
          key: "ClassRoomType",
          width: 110,
          sortable: true
        },
        {
          title: "教室当前状态 ",
          key: "Status",
          width: 150,
          sortable: true,
            render: (h, params) => {
                let texts = "";
                if(params.row.Status == 0) {
                    texts = "空闲";
                }
                if(params.row.Status == 1) {
                    texts = "占用";
                }
                if(params.row.Status == 2) {
                    texts = "维修";
                }
                return h(
                    "div", {
                        props: {}
                    },
                    texts
                );s
            }
        },
        {
          title: "启用日期",
          ellipsis: true,
          key: "FromDate",
          width: 120,
          sortable: true,
           render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.FromDate,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.FromDate
                )
              ]
            );
          }
        },
        {
          title: "停用日期",
          key: "ToDate",
          width: 110,
          sortable: true
        },
        {
          title: "每天开始时间",
          key: "FromTime",
          width: 150,
          sortable: true
        },
        {
          title: "每天结束时间",
          key: "ToTime",
          width: 150,
          sortable: true
        },
        {
          title: "特征",
          width: 110,
          sortable: true,
          key: "Features"
        },
        {
          title: "启用",
          width: 80,
          sortable: true,
          key: "Enabled",
          render: (h, params) => {
                let texts = "";
                if(params.row.Enabled == true) {
                    texts = "是";
                } else if(params.row.Enabled == false) {
                    texts = "否";
                }
                return h(
                    "div", {
                        props: {}
                    },
                    texts
                );s
            }

        },
        {
          title: "禁用原因",
          key: "Comments",
          width: 120,
          sortable: true
        },
        {
          title: "排序码",
          key: "SortKey",
          width: 120,
          sortable: true
        },
        {
          title: "创建人",
          key: "CreateByName",
          width: 120,
          sortable: true
        },
        {
          title: "创建时间",
          ellipsis: true,
          sortable: true,
          width: 120,
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
      //表格数组
      getTableData: {
        Filters: {}
      },
      informationData: [],
      // 删除信息弹出框
      delete1: false,
      BatchDeleteList: [],
      delete: [],
      // 添加/修改加盟商基本信息默认隐藏
      AddDepartment: false,
      upDepartment: false,
      // 添加信息表单
      formValidate: {
        BusinessGroup: "*",
        Store: "",
        Code: "",
        Description: "",
        ClassRoomType: "",
        Status: "",
        FromDate: "",
        ToDate: "",
        FromTime: "",
        ToTime: "",
        Length: "",
        Width: "",
        Height: "",
        AreaSize: "",
        Features: "",
        Enabled: true,
        Comments: "",
        InvalidDate: "",
        SortKey: ""
      },
            // 修改信息表单
      UpdateList: {},
      //   表单验证
      ruleValidate: {  },
      // 创建人
      Founder: "",
      UpdatePerson: "",
      CreationTime: "",
      UpdateTime: ""
    };
  },
  methods: {
    // 创建人
    AddDepartment1() {
      this.AddDepartment = true;
      let see = JSON.parse(sessionStorage.getItem("userInfo"));
      this.Founder = see.AccountName;
    },
    // 删除数据接口
    deleteList() {
      if (this.BatchDeleteList.length == 0) {
        this.$Message.info("请先选中删除的数据");
      } else {
        ClassRoomBatchDelete(this.delete)
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
      console.log(index);
    },
    // 添加加盟商信息
    handleSubmit() {
      ClassRoomCreate(this.formValidate)
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
        // 取消
    handleReset(name) {
      this.formValidate = { brand_right: 0 };
      this.$refs[name].resetFields();
      this.$Message.info("已取消");
    },
        //点击修改按钮
    UpdateSubmit() {
    //   let name = localStorage.name;
    //   if(name == "0"){
        ClassRoomUpdate(this.UpdateList)
        .then(res => {
          this.$Message.success("修改成功!");
          this.reload();
        })
        .catch(err => {
          console.log(err);
        });
    //   }
      // if(name == "name2"){
      //   FranchiserProfileUpdate(this.UpdateList)
      //   .then(res => {
      //     this.$Message.success("修改成功!");
      //     this.reload();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // }
      
    },
    // 点击查询按钮查询信息
    querytable() {
      ClassRoomGetEntities({
        Filters: [
          {
            Relational: "And", //And 与 | Or 或
            Conditions: [
              {
                FilterField: this.querySelect, //字段名
                Relational: "Contain",
                FilterValue: this.queryvalue //字段名里面的值
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
  },
  mounted() {
    //   教室类型
    getSTORE_ROOM_TYPE()
      .then(res => {
        this.ClassRoomTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //   教室当前状态
    getSTORE_ROOM_STATUS()
      .then(res => {
        this.StatusList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 表格数据
    ClassRoomGetEntities(this.getTableData)
      .then(res => {
        this.informationData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
        // 查询条件  门店的信息循环到教室
    BusinessStoreGetEntities(this.getTableData)
      .then(res => {
        this.StoreList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
