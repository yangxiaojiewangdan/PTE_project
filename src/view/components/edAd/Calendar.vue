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
              <Select v-model="model1" style="width:160px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
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
        <Button>
          <Icon type="ios-arrow-back" size="20"/>
        </Button>
      </Col>
      <Col span="4">
        <h1>{{ CurrentTime }}</h1>
      </Col>
      <Col span="2">
        <Button>
          <Icon type="ios-arrow-forward" size="20"/>
        </Button>
      </Col>
      <Col span="4">
        <Select v-model="model1" style="width:160px" placeholder="请选择日期">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="8">
        <div class="tableTop">
          <Button class="tableTops">单节排课</Button>
          <Button class="tableTops">批量排课</Button>
          <Button class="tableTops">阶段排课</Button>
          <Button class="tableTops">打印课表</Button>
        </div>
      </Col>
      <!-- 课表 -->
      <Col span="22">
        <Table :columns="ClassHeader" border :data="data1" @on-row-click="Royaltyclick"></Table>
      </Col>
      <Col span="22" class="footButton">
        <Button type="info">以开课</Button>
        <Button type="success">未开课</Button>
        <Button type="warning">已取消</Button>
        <Button type="error">已结束</Button>
      </Col>
    </Row>
    <Modal v-model="CourseInformation" title="课程信息" width="1300">
      <Row>
        <Col span="8" offset="8">
          <h1>A班级</h1>
        </Col>
        <Col span="8">
          <h2>当前状态为:正在预约</h2>
        </Col>
      </Row>
      <Row>
        <Col span="6" style="margin-top:20px;">
          <div class="line">基本信息</div>
          <Col span="21" offset="3" class="marginbottom marginbottom1">日期：
            <Input v-model="value" placeholder="Enter something..." style="width: 200px"/>
          </Col>
          <Col span="21" offset="3" class="marginbottom">上课时间：
            <Input v-model="value" placeholder="Enter something..." style="width: 200px"/>
          </Col>
          <Col span="21" offset="3" class="marginbottom marginbottom1">教室：
            <Input v-model="value" placeholder="Enter something..." style="width: 200px"/>
          </Col>
          <Col span="21" offset="3" class="marginbottom">课程主题：
            <Input v-model="value" placeholder="Enter something..." style="width: 200px"/>
          </Col>
          <Col span="21" offset="3" class="marginbottom borderbottom">课程阶段：
            <Input v-model="value" placeholder="Enter something..." style="width: 200px"/>
          </Col>
          <div class="line">授课老师</div>
          <Col span="23" offset="2" class="marginbottom">主教：
            <Input
              v-model="value"
              placeholder="Enter something..."
              style="width: 100px;margin-right:20px;"
            />工时：
            <Input v-model="value" placeholder="Enter something..." style="width: 100px"/>
          </Col>
          <Col span="23" offset="2" class="marginbottom">助教：
            <Input
              v-model="value"
              placeholder="Enter something..."
              style="width: 100px;margin-right:20px;"
            />工时：
            <Input v-model="value" placeholder="Enter something..." style="width: 100px"/>
          </Col>
          <Col span="23" offset="2" class="marginbottom">外教：
            <Input
              v-model="value"
              placeholder="Enter something..."
              style="width: 100px;margin-right:20px;"
            />工时：
            <Input v-model="value" placeholder="Enter something..." style="width: 100px"/>
          </Col>
          <div class="line">上课自带物品说明</div>
          <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..."/>
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
              v-model="dataRoyaltyCodeDetail"
              :columns="columnsRoyaltyCodeDetail"
            />
          </Col>
        </Col>
      </Row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import { EducationalGetTimeTableByDate, GetEntities } from "@/api/api";
import Tables from "_c/tables";
export default {
  components: {
    Tables
  },
  data() {
    return {
      AddDay: 0,
      model1: "",
      cityList: [],
      CurrentTime: "",
      AttendDate: "",
      ClassHeader: [
        {
          title: "时间/教室",
          key: "TimeClass",
          width: 90
        }
      ],
      data1: [],
      TabularData: [],
      DailySchedule: [],

      // 课程弹框信息
      CourseInformation: false,
      value: "",
      value6: "",
      columnsRoyaltyCodeDetail: [
        { title: "订单号", key: "LowerValue" },
        { title: "姓名", key: "UpperValue" },
        { title: "排课方式", key: "FlatOrPecent" },
        { title: "操作", key: "handle", options: ["delete"] }
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
      ]
    };
  },
  methods: {
    Royaltyclick(index) {
      console.log(index);
      
    },
    // 将教室/时间循环到表格头  将信息循环到表格
    addPerson() {
      for (var i = 0; i < this.TabularData.length; i++) {
        let newitems = {
          title: this.TabularData[i].Description,
          key: "class" + i,
          tooltip: true,
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
              "班级：" +
              this.DailySchedule[i].ClassesName +
              " 课程：" +
              this.DailySchedule[i].CourseName +
              " 授课老师：" +
              this.DailySchedule[i].Teacher;
          }
        }
      }
    },
    // 时间
    CurrentTime1() {
      let myDate = new Date();
      this.CurrentTime =
        myDate.getFullYear() +
        "年" +
        (myDate.getMonth() + 1) +
        "月" +
        myDate.getDate() +
        "日";
    }
  },
  mounted() {
    this.CurrentTime1();
    // 查询所属的教室
    GetEntities("ClassRoom", {
      Filters: [
        {
          Relational: "And",
          Conditions: [
            {
              FilterField: "Store",
              Relational: 0,
              FilterValue: 14142291989024768
            }
          ]
        }
      ]
    })
      .then(res => {
        this.TabularData = res.data;

        // 获取日课表信息
        EducationalGetTimeTableByDate({
          StoreId: 14094325341868032,
          DateInQuery: "2019-02-25"
        })
          .then(res => {
            this.DailySchedule = res.data;
            console.log(res.data);
            // 查到教室将教室循环出来
            this.addPerson();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.tableTop {
  margin-top: 0px;
}
.footButton{
  margin-top: 10px;
}
.footButton button{
  margin-left: 20px;
}
.marginbottom {
  margin-bottom: 20px !important;
}
.marginbottom1 {
  margin-left: 64px;
}
.line {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  width: 100%;
  border-bottom: 1px solid #aaa;
  margin-bottom: 10px;
}
</style>







