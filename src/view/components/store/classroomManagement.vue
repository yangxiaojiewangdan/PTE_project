<template>
  <div id="information">
    <Row>
      <Col span="24" style="height:50px;background: #fff;">
        <p class="queryHeader">教室管理</p>
      </Col>
    </Row>
    <hr>
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
                <Option v-for="item in StoreList" :value="item.value" :key="item.Id">{{ item.Code }}</Option>
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
                >{{ item.Description }}</Radio>
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
    <Row style="background:#fff;">
      <Col span="15" class="queryEnd">
        <h2>查询结果</h2>
      </Col>
      <!-- 表格上面的功能 -->
      <Col span="8">
        <div class="tableTop">
          <Button @click="AddDepartment1"  class="tableTops">添加</Button>
          <Button @click="deleteList"  class="tableTops">删除</Button>
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
          height="450"
          size="small"
          highlight-row
          stripe
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
        <Page :total="100" class="page" @on-change="pagechange"/>
        <!-- 分页 end-->
      </Col>
    </Row>
    <!-- 添加信息 弹出框-->
    <Modal v-model="AddDepartment" scrollable width="1000" :mask-closable="false">
      <p slot="header" id="Modal_header">
        <span v-if="add">添加教室信息</span>
        <span v-if="see">查看教室信息</span>
      </p>
      <p slot="close" id="Modal_close"  @click="close('formValidate')">
        <Icon type="md-close" size="20" color="#eee"/>
      </p>
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
              <Select
                v-model="formValidate.Store"
                style="width:200px;"
                placeholder="请选择 "
                clearable
              >
                <Option v-for="item in StoreList" :value="item.Id" :key="item.Id">{{ item.Code }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10">
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
                  v-for="item in List"
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
              <DatePicker type="date" v-model="formValidate.FromDate" placeholder="Select date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="可用时间" prop="ToTime">
              <TimePicker type="timerange" @on-change="FromTimeToTime" placeholder="Select time"></TimePicker>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="长" prop="Length">
              <Input v-model="formValidate.Length" placeholder="(单位：m)" style="width:150px"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="宽" prop="Width">
              <Input v-model="formValidate.Width" placeholder="(单位：m)" style="width:150px"></Input>
            </FormItem>
          </Col>
          <Col span="5">
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
          <Col span="7">
            <FormItem label="排序码" prop="SortKey">
              <Input v-model="formValidate.SortKey" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="14">
            <FormItem label prop="Enabled">
              <i-switch v-model="formValidate.Enabled" size="large" @on-change="Enabledchange">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col span="24" v-if="end">
            <FormItem label="禁用日期" prop="InvalidDate">
              <DatePicker type="date" v-model="formValidate.InvalidDate" placeholder="Select date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="22" v-if="end">
            <FormItem label="禁用原因" prop="Comments">
              <Input
                v-model="formValidate.Comments"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
              ></Input>
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
    <!-- 删除信息弹出框 -->
    <Modal v-model="delete1" title="提示" @on-ok="ok">
      <h3>确定删除此数据？</h3>
    </Modal>
  </div>
</template>
<script>
import {
  GetEntities,
  GetEntity,
  Create,
  Update,
  Delete,
  BatchDelete,
  Copy
} from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      end: false,
      // 接口
      Interface: "ClassRoom",
      // 所属门店下拉框数据
      queryProviceCode: "",
      StoreList: [
        {
          value: "测试",
          label: "测试"
        }
      ],
      // 弹框标题信息
      add: "",
      see: "",
      del: "",
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
            if (params.row.Status == 0) {
              texts = "空闲";
            }
            if (params.row.Status == 1) {
              texts = "占用";
            }
            if (params.row.Status == 2) {
              texts = "维修";
            }
            return h(
              "div",
              {
                props: {}
              },
              texts
            );
            s;
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
            s;
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
      //   表单验证
      ruleValidate: {
        Store: [ { required: true, message: '请选择所属门店', trigger: 'change' } ],
        Code: [ { required: true, message: '请输入代码', trigger: 'blur' } ],
        Description: [ { required: true, message: '请输入名称', trigger: 'blur' } ],
        ClassRoomType: [ { required: true, message: '请选择教室类型', trigger: 'change' } ],
        Enabled: [ { required: true, message: '必填', trigger: 'change' } ],
      },
      // 创建人
      Founder: "",
      UpdatePerson: "",
      CreationTime: "",
      UpdateTime: ""
    };
  },
  methods: {
    pagechange(value){
      console.log(value);
       GetEntities(this.Interface, {
        Filters: {}
      },)
      .then(res => {
        this.informationData = res.data.PageData;
      })
      .catch(err => {
        console.log(err);
      });
    },
    FromTimeToTime(value) {
      this.formValidate.FromTime = value[0];
      this.formValidate.ToTime = value[1];
    },
    Enabledchange(value) {
      if (value == true) {
        this.end = false;
      } else if (value == false) {
        this.end = true;
      }
    },
    // 创建人
    AddDepartment1() {
      this.AddDepartment = true;
      let see = JSON.parse(sessionStorage.getItem("userInfo"));
      this.Founder = see.AccountName;
      this.add = true;
      this.see = false;
      this.del = false;
    },
    // 删除数据接口
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
      if (this.see == false && this.add == false) {
        BatchDelete(this.Interface, this.delete)
          .then(res => {
            this.$Message.success("删除成功!");
            this.reload();
          })
          .catch(err => {
            this.$Message.error("删除失败!");
            console.log(err);
          });
      } else if (this.see == true) {
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
      console.log(index);
      this.AddDepartment = true;
      this.formValidate = index;
      this.add = false;
      this.see = true;
      this.del = true;
    },
    // 添加/修改信息
    handleSubmit(name) {
      // 验证表单
      this.$refs[name].validate(valid => {
        // 验证表单成功后调用
        if (valid) {
          // 当进入的是添加弹框就调用添加接口
          if (this.add == true) {
            // 添加加盟商信息接口
            Create(this.Interface, this.formValidate)
              .then(res => {
                this.$Message.success("添加成功!");
                this.AddDepartment = false;
                this.$refs[name].resetFields();
                this.reload();
              })
              .catch(err => {
                this.$Message.error("添加失败!");
              });
            // 当进入的是查看弹框就调用修改接口
          } else if (this.see == true) {
            this.TabBusinessStores = true;
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
        }
      });
    },
    // 取消
    handleReset(name) {
      this.formValidate = { brand_right: 0 };
      this.$refs[name].resetFields();
      this.$Message.info("已取消");
    },
    // 点击查询按钮查询信息
    querytable() {
      GetEntities(this.Interface, {
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
    close(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    //   教室类型
    this.ClassRoomTypeList = JSON.parse(localStorage.STORE_ROOM_TYPE);
    //   教室当前状态
    this.StatusList = JSON.parse(localStorage.STORE_ROOM_STATUS);
    // 表格数据
    GetEntities(this.Interface, this.getTableData)
      .then(res => {
        this.informationData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 查询条件  门店的信息循环到教室
    GetEntities("BusinessStore",this.getTableData)
      .then(res => {
        // console.log(res)
        this.StoreList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
