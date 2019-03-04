<template>
  <div id="divid">
    <Row>
      <Col span="24" style="height:50px;background: #fff;">
        <p class="queryHeader">课程日课表</p>
      </Col>
    </Row>
    <hr>
    <!-- 查询条件 -->
    <Row>
      <Col span="24" class="querycriteria" style="height:70px;">
        <!-- 滚动 -->
        <Col span="24">
          <Row>
            <Col span="4" class="queryquerytop">
              <h3 class="queryquery">门店：</h3>
              <Select
                v-model="Store_Id"
                style="width:160px;"
                placeholder="请选择 "
                clearable
                @on-change="changeStoreId"
              >
                <Option v-for="item in StoreList" :value="item.Id" :key="item.Id">{{ item.Code }}</Option>
              </Select>
            </Col>
            <Col span="4" class="queryquerytop">
              <h3 class="queryquery">上课时间：</h3>
              <TimePicker
                style="width:160px"
                v-model="AttendDate"
                format="HH’mm’ss"
                type="timerange"
                placement="bottom-start"
                placeholder="Select time"
              ></TimePicker>
            </Col>
            <Col span="4" class="queryquerytop">
              <h3 class="queryquery">班级：</h3>
              <Select v-model="model1" style="width:160px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4" class="queryquerytop">
              <h3 class="queryquery">教师：</h3>
              <Select v-model="model1" style="width:160px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4" class="queryquerytop">
              <h3 class="queryquery">学员：</h3>
              <Select v-model="model1" style="width:160px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4" class="queryquerytop">
              <h3 class="queryquery">课程：</h3>
              <Select v-model="model1" style="width:160px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
    <!-- 查询结果 -->
    <Row style="background:#fff;" type="flex" justify="center" class="code-row-bg">
      <Col span="23" class="queryEnd">
        <h2>查询结果</h2>
      </Col>
      <Col span="2" offset="1">
        <Button @click="Lastday">
          <Icon type="ios-arrow-back" size="20"/>
        </Button>
      </Col>
      <Col span="4">
        <h1>{{ CurrentTime }}</h1>
      </Col>
      <Col span="2">
        <Button @click="Thenextday">
          <Icon type="ios-arrow-forward" size="20"/>
        </Button>
      </Col>
      <Col span="4">
        <DatePicker
          type="date"
          @on-change="DatePicker"
          :options="options1"
          placeholder="Select date"
          style="width: 200px"
        ></DatePicker>
      </Col>
      <Col span="8">
        <div class="tableTop">
          <Button class="tableTops" @click="timeCourse">排课</Button>
          <Button class="tableTops" @click="timeCourse1">自定义排课</Button>
          <Button class="tableTops">打印课表</Button>
          <Button class="tableTops" @click="exportData">
            <Icon type="ios-download-outline"></Icon>打印课表
          </Button>
        </div>
      </Col>
      <!-- 课表 -->
      <Col span="22">
        <Table
          ref="table"
          :columns="ClassHeader"
          disabled-hover
          border
          :data="data1"
          @on-row-click="Royaltyclick"
        >
          <template slot-scope="{ row,column }" slot="class0">
            <div class="pointer" @click="columnindex(column)">{{ row.class0 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class1">
            <div class="pointer" @click="columnindex(column)">{{ row.class1 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class2">
            <div class="pointer" @click="columnindex(column)">{{ row.class2 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class3">
            <div class="pointer" @click="columnindex(column)">{{ row.class3 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class4">
            <div class="pointer" @click="columnindex(column)">{{ row.class4 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class5">
            <div class="pointer" @click="columnindex(column)">{{ row.class5 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class6">
            <div class="pointer" @click="columnindex(column)">{{ row.class6 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class7">
            <div class="pointer" @click="columnindex(column)">{{ row.class7 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class8">
            <div class="pointer" @click="columnindex(column)">{{ row.class8 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class9">
            <div class="pointer" @click="columnindex(column)">{{ row.class9 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class10">
            <div class="pointer" @click="columnindex(column)">{{ row.class10 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class11">
            <div class="pointer" @click="columnindex(column)">{{ row.class11 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class12">
            <div class="pointer" @click="columnindex(column)">{{ row.class12 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class13">
            <div class="pointer" @click="columnindex(column)">{{ row.class13 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class14">
            <div class="pointer" @click="columnindex(column)">{{ row.class14 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class15">
            <div class="pointer" @click="columnindex(column)">{{ row.class15 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class16">
            <div class="pointer" @click="columnindex(column)">{{ row.class16 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class17">
            <div class="pointer" @click="columnindex(column)">{{ row.class17 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class18">
            <div class="pointer" @click="columnindex(column)">{{ row.class18 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class19">
            <div class="pointer" @click="columnindex(column)">{{ row.class19 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class20">
            <div class="pointer" @click="columnindex(column)">{{ row.class20 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class21">
            <div class="pointer" @click="columnindex(column)">{{ row.class21 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class22">
            <div class="pointer" @click="columnindex(column)">{{ row.class22 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class23">
            <div class="pointer" @click="columnindex(column)">{{ row.class23 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class24">
            <div class="pointer" @click="columnindex(column)">{{ row.class24 }}</div>
          </template>
          <template slot-scope="{ row,column }" slot="class25">
            <div class="pointer" @click="columnindex(column)">{{ row.class25 }}</div>
          </template>
        </Table>
      </Col>
      <Col span="22" class="footButton">
        <Button type="info">开放预约</Button>
        <Button style="background-color: #5f5249;color: #fff;">关闭预约</Button>
        <Button type="success">已开课</Button>
        <Button type="warning">已结课</Button>
        <Button type="error" >取消</Button>
      </Col>
    </Row>
    <Modal v-model="CourseInformation" title="课程信息" width="1300">
      <Row>
        <Col span="8" offset="8">
          <h1>{{ ModalClassesName }}</h1>
          <h1>{{ Topic }}</h1>
        </Col>
        <Col span="8">
          <h2>当前状态为:{{ ModalStatus }}</h2>
        </Col>
      </Row>
      <Form :model="formValidate">
        <Row>
          <Col span="6" style="margin-top:20px;">
            <div class="line">基本信息</div>
            <Col span="21" offset="3" class="marginleft">
              <FormItem label="日期：">
                <Input
                  v-model="formValidate.AttendDate"
                  placeholder="Enter something..."
                  style="width: 200px"
                />
              </FormItem>
            </Col>
            <Col span="21" offset="3">
              <FormItem label="上课时间：">
                <Input
                  v-model="formValidate.FromTime"
                  placeholder="Enter something..."
                  style="width: 200px"
                />
              </FormItem>
            </Col>
            <Col span="21" offset="3" class="marginleft">
              <FormItem label="教室：">
                <Input
                  v-model="formValidate.ClassRoom"
                  placeholder="Enter something..."
                  style="width: 200px"
                />
              </FormItem>
            </Col>
            <Col span="21" offset="3">
              <FormItem label="课程名称：">
                <Input
                  v-model="formValidate.CourseName"
                  placeholder="Enter something..."
                  style="width: 200px"
                />
              </FormItem>
            </Col>
            <Col span="21" offset="3">
              <FormItem label="课程阶段：">
                <Input
                  v-model="formValidate.PhaseName"
                  placeholder="Enter something..."
                  style="width: 200px"
                />
              </FormItem>
            </Col>
            <div class="line">授课老师</div>
            <Col span="11" offset="1">
              <FormItem label="主教：">
                <Input
                  v-model="formValidate.Teacher"
                  placeholder="Enter something..."
                  style="width: 90px;"
                />
              </FormItem>
            </Col>
            <Col span="11" offset="1">
              <FormItem label="工时：">
                <Input
                  v-model="formValidate.TeacherWT"
                  placeholder="Enter something..."
                  style="width: 90px"
                />
              </FormItem>
            </Col>
            <Col span="11" offset="1">
              <FormItem label="助教：">
                <Input
                  v-model="formValidate.Assistant"
                  placeholder="Enter something..."
                  style="width: 90px;"
                />
              </FormItem>
            </Col>
            <Col span="11" offset="1">
              <FormItem label="工时：">
                <Input
                  v-model="formValidate.AssistantWT"
                  placeholder="Enter something..."
                  style="width: 90px"
                />
              </FormItem>
            </Col>
            <Col span="11" offset="1">
              <FormItem label="外教：">
                <Input
                  v-model="formValidate.ForeignTeacher"
                  placeholder="Enter something..."
                  style="width: 90px;"
                />
              </FormItem>
            </Col>
            <Col span="11" offset="1">
              <FormItem label="工时：">
                <Input
                  v-model="formValidate.ForeignTeacherWT"
                  placeholder="Enter something..."
                  style="width: 90px"
                />
              </FormItem>
            </Col>
            <div class="line">上课自带物品说明</div>
            <FormItem>
              <Input
                v-model="formValidate.PerpareComments"
                type="textarea"
                placeholder="Enter something..."
              />
            </FormItem>
          </Col>
          <Col span="17" offset="1" style="border-left:1px solid #aaa;margin-top:20px;">
            <Col span="17" class="queryEnd">
              <h2>最多人数: 6 人</h2>
            </Col>
            <Col span="2" class="queryEnd">
              <Button>添加学员</Button>
            </Col>
            <Col span="22" offset="1">
              <tables
                height="500"
                disabled-hover
                search-place="top"
                ref="tables"
                size="small"
                editable
                @on-row-click="Royaltyclick"
                v-model="dataRoyaltyCodeDetail"
                :columns="columnsRoyaltyCodeDetail"
              />
            </Col>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large">
          <span>取消</span>
        </button>
        <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large">
          <span>确定</span>
        </button>
      </div>
    </Modal>
    <RowCourse v-if="workoutateachingschedule"></RowCourse>
    <stageScheduling v-if="CustomCourseScheduling"></stageScheduling>
  </div>
</template>
<script>
import {
  EducationalGetTimeTableByDate,
  GetEntities,
  GetEntity
} from "@/api/api";
import Tables from "_c/tables";
import RowCourse from "_c/RowCourse";
import StageScheduling from "_c/StageScheduling";
import SearchStuden from "_c/SearchStuden";
export default {
  components: {
    Tables,
    RowCourse,
    SearchStuden,
    StageScheduling
  },
  data() {
    return {
      // 上课信息  弹框
      ModalClassesName: "",
      ModalStatus: "",
      Topic: "",
      formValidate: {
        AttendDate: "",
        FromTime: "",
        ClassRoom: "",
        CourseName: "",
        PhaseName: "",
        Teacher: "",
        TeacherWT: "",
        Assistant: "",
        AssistantWT: "",
        ForeignTeacher: "",
        ForeignTeacherWT: "",
        PerpareComments: ""
      },
      DateInQueryTime: "",
      indexsubscript: "",
      JudgementClassroom: "",
      AddDay: 0,
      model1: "",
      cityList: [],
      CurrentTime: "",
      AttendDate: "",
      ClassHeader: [
        {
          title: "开始时间/教室",
          key: "TimeClass",
          width: 120
        }
      ],
      data1: [],
      TabularData: [],
      DailySchedule: [],
      // 课程弹框信息
      CourseInformation: false,
      value: "",
      value6: "",
      texts: "签到",
      columnsRoyaltyCodeDetail: [
        { title: "订单号", key: "LowerValue" },
        { title: "姓名", key: "UpperValue" },
        { title: "排课方式", key: "FlatOrPecent" },
        {
          title: "签到",
          key: "1",
          width: 80,
          render: (h, params) => {
            let texts = "签到";
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show();
                    }
                  }
                },
                this.texts
              )
            ]);
          }
        },
        { title: "操作", key: "handle", options: ["delete"], width: 80 }
      ],
      dataRoyaltyCodeDetail: [
        {
          LowerValue: "John Brown",
          UpperValue: 18,
          FlatOrPecent: "New York No. 1 Lake Park"
        },
        {
          LowerValue: "John Brown",
          UpperValue: 18,
          FlatOrPecent: "New York No. 1 Lake Park"
        },
        {
          LowerValue: "John Brown",
          UpperValue: 18,
          FlatOrPecent: "New York No. 1 Lake Park"
        }
      ],
      now: "",
      StoreList: [],
      // 日期框
      options1: {
        shortcuts: [
          {
            text: "Today",
            value() {
              return new Date();
            },
            onClick: picker => {
              this.$Message.info("Click today");
            }
          },
          {
            text: "Yesterday",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: picker => {
              this.$Message.info("Click yesterday");
            }
          },
          {
            text: "One week",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              return date;
            },
            onClick: picker => {
              this.$Message.info("Click a week ago");
            }
          }
        ]
      },
      getTableData: {
        Filters: {}
      },
      Store_Id: "",
      workoutateachingschedule: false,
      CustomCourseScheduling: false
    };
  },
  methods: {
    exportData() {
      this.$refs.table.exportCsv({
        filename: "The original data"
      });
    },
    timeCourse() {
      this.workoutateachingschedule = !this.workoutateachingschedule;
    },
    timeCourse1() {
      this.CustomCourseScheduling = !this.CustomCourseScheduling;
    },
    // 选择门店ID
    changeStoreId(value) {
      console.log(value);
      this.Store_Id = value;
      GetEntities("ClassRoom", {
        Filters: [
          {
            Relational: "And",
            Conditions: [
              {
                FilterField: "Store",
                Relational: "Equal",
                FilterValue: this.Store_Id
              }
            ]
          }
        ]
      })
        .then(res => {
          this.TabularData = res.data;
          this.SearchtheDailySchedule();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 日期查询
    DatePicker(data) {
      this.DateInQueryTime = data;
      this.CurrentTime =
        data.substr(0, 4) +
        "年" +
        data.substr(5, 2) +
        "月" +
        data.substr(8, 2) +
        "日";
      this.SearchtheDailySchedule();
      if (data == "") {
        this.CurrentTime1();
        this.SearchtheDailySchedule();
      }
    },
    // 上一天
    Lastday() {
      this.now.setDate(this.now.getDate() - 1);
      let a = (this.now.getMonth() + 1).toString();
      let b = this.now.getDate().toString();
      if (a.length == 1) {
        a = "0" + a;
      }
      if (b.length == 1) {
        b = "0" + b;
      }
      this.CurrentTime = this.now.getFullYear() + "年" + a + "月" + b + "日";
      this.DateInQueryTime = this.now.getFullYear() + "-" + a + "-" + b;
      this.SearchtheDailySchedule();
    },
    // 查询日课表
    SearchtheDailySchedule() {
      EducationalGetTimeTableByDate({
        StoreId: 14094326276526080,
        DateInQuery: this.DateInQueryTime
      })
        .then(res => {
          this.DailySchedule = res.data;
          // 查到教室将教室循环出来
          this.ClassHeader = [
            {
              title: "开始时间/教室",
              key: "TimeClass",
              width: 120
            }
          ];
          this.data1 = [];
          this.addPerson();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 后一天
    Thenextday() {
      this.now.setDate(this.now.getDate() + 1);
      let a = (this.now.getMonth() + 1).toString();
      let b = this.now.getDate().toString();
      if (a.length == 1) {
        a = "0" + a;
      }
      if (b.length == 1) {
        b = "0" + b;
      }
      this.CurrentTime = this.now.getFullYear() + "年" + a + "月" + b + "日";
      this.DateInQueryTime = this.now.getFullYear() + "-" + a + "-" + b;
      this.SearchtheDailySchedule();
    },
    // 获取列下标
    columnindex(column) {
      this.JudgementClassroom = column.slot;
    },
    // 签到
    show() {
      this.$Message.info("签到成功");
    },
    // 点击表格
    Royaltyclick(index) {
      console.log(index);
      var count = Object.keys(index);
      for (var i = 0; i < count.length; i++) {
        if (count[i] == this.JudgementClassroom) {
          this.indexsubscript = i - (count.length - 1) / 2 - 2;
          console.log(this.indexsubscript)
        }
      }
      var arr = [];
      for (let i in index) {
        let o = {};
        o[i] = index[i];
        arr.push(o);
      }

      let keyId = JSON.stringify(arr[this.indexsubscript]);
      let keyid = Number(keyId.substr(5, 17));
      GetEntity("Educational", keyid)
        .then(res => {
          this.formValidate = res.data;
          this.ModalClassesName = res.data.ClassesName;
          this.Topic = res.data.Topic;
          if (res.data.Status == 1) {
            this.ModalStatus = "关闭预约";
          }
          if (res.data.Status == 2) {
            this.ModalStatus = "已开课";
          }
          if (res.data.Status == 3) {
            this.ModalStatus = "已结课";
          }
          if (res.data.Status == 4) {
            this.ModalStatus = "取消";
          }
          this.formValidate.AttendDate = res.data.AttendDate.substr(0, 10);
          this.formValidate.FromTime = res.data.FromTime.substr(11, 10);
        })
        .catch(err => {
          console.log(err);
        });
      this.CourseInformation = true;
    },
    // 将教室/时间循环到表格头  将信息循环到表格
    addPerson() {
      for (var i = 0; i < this.TabularData.length; i++) {
        let classi = "class" + i;
        let newitems = {
          title: this.TabularData[i].Description,
          key: classi,
          tooltip: true
        };
        this.ClassHeader.push(newitems);
      }
      for (var i = 0; i <= 10; i++) {
        let a = 9;
        let name = { TimeClass: a + i + ":15" };
        this.data1.push(name);
      }
      for (var i = 0; i < this.DailySchedule.length; i++) {
        let subscript = this.DailySchedule[i].FromTime.substr(11, 2) - 9;
        for (var a = 0; a < this.ClassHeader.length; a++) {
          if (this.ClassHeader[a].title == this.DailySchedule[i].ClassRoom) {
            let key = this.ClassHeader[a].key;
            this.data1[subscript][key] =
              "班级：" + this.DailySchedule[i].ClassesName;
            this.data1[subscript][i] = this.DailySchedule[i].Id;
            let Already_begun = "";
            // 开放预约
            if(this.DailySchedule[i].Status == 0){
                Already_begun = "demo-table-info-cell-name"
            }
            // 关闭预约
            if(this.DailySchedule[i].Status == 1){
                Already_begun = "demo-table-info-cell-end"
            }
            // 已开课
            if(this.DailySchedule[i].Status == 2){
                Already_begun = "demo-table-info-cell-address"
            }
            // 已结课
            if(this.DailySchedule[i].Status == 3){
                Already_begun = "demo-table-info-cell-age"
            }
            // 取消
            if(this.DailySchedule[i].Status == 4){
                Already_begun = "demo-table-info-cell-fff"
            }
            //   console.log(this.ClassHeader[a].key)
            //   let aa = [];
            //   // aa.push(this.ClassHeader[a].key)
            //   aa[]
            //   console.log(aa)
            // // this.data1[subscript]["cellClassName"] = {
            // //   key:Already_begun
            // // };
          }
        }
      }
    },
    // 时间
    CurrentTime1() {
      this.now = new Date();
      let b = this.now.getDate().toString();
      let a = (this.now.getMonth() + 1).toString();
      if (a.length == 1) {
        a = "0" + a;
      }
      if (b.length == 1) {
        b = "0" + b;
      }
      this.CurrentTime = this.now.getFullYear() + "年" + a + "月" + b + "日";
      this.DateInQueryTime = this.now.getFullYear() + "-" + a + "-" + b;
    }
  },
  mounted() {
    this.CurrentTime1();
    -// 查询所属的教室
    GetEntities("ClassRoom", {
      Filters: [
        {
          Relational: "And",
          Conditions: [
            {
              FilterField: "Store",
              Relational: "Equal",
              FilterValue: 14094325341868032
            }
          ]
        }
      ]
    })
      .then(res => {
        this.TabularData = res.data;
        this.SearchtheDailySchedule();
      })
      .catch(err => {
        console.log(err);
      });
    // 查询门店
    GetEntities("BusinessStore", this.getTableData)
      .then(res => {
        this.StoreList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.pointer:hover {
  cursor: pointer;
}
.tableTop {
  margin-top: 0px;
}
.footButton {
  margin-top: 10px;
}
.footButton button {
  margin-left: 20px;
}
.marginleft {
  margin-left: 62px;
}
.line {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  width: 100%;
  border-bottom: 1px solid #aaa;
  margin-bottom: 10px;
}
/* .ivu-table .Already_begun {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .Missed_classes {
  background-color: #187;
  color: #fff;
}
.ivu-table .Cancelled {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .Has_ended {
  background-color: red;
  color: #fff;
} */
.ivu-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .demo-table-info-cell-end {
  background-color: #5f5249;
  color: #fff;
}
.ivu-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
.ivu-table .demo-table-info-cell-fff {
  background-color: red;
  color: #fff;
}
</style>







