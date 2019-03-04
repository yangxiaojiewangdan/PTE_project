<template>
  <div id="divid">
    <Row>
      <Col span="24" style="height:50px;background: #fff;">
        <p class="queryHeader">课程周课表</p>
      </Col>
    </Row>
    <hr>
    <Row style="background:#fff;" type="flex" justify="center" class="code-row-bg">
      <Col span="23" class="queryEnd">
        <h2></h2>
      </Col>
      <Col span="3" >
        <h1>{{ CurrentTimemd }}</h1><h2>{{ CurrentTimeweek }}</h2>
      </Col>
      <Col span="1" >
        <Button @click="Lastday">
          <Icon type="ios-arrow-back" size="20"/>
        </Button>
      </Col>
      <Col span="3">
        <h1 style="margin-left: 19px;">{{ CurrentTime }}</h1>
      </Col>
      <Col span="1">
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
          <Button class="tableTops">单节排课</Button>
          <Button class="tableTops">批量排课</Button>
          <Button class="tableTops">阶段排课</Button>
          <Button class="tableTops">打印课表</Button>
        </div>
      </Col>
      <!-- 课表 -->
      <Col span="22" class="footButton">
        <Table :columns="WeekHeader" border :data="data1"></Table>
      </Col>
    </Row>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { EducationalGetTimeTableSummaryByWeek } from "@/api/api";
export default {
  components: {
    Tables
  },
  data() {
    return {
      model1: "",
      cityList: [],
      CurrentTime: "",
      CurrentTimemd:"",
      CurrentTimeweek:"",
      TableWeek: [],
      WeekHeader: [
        { title: "时间/周", key: "TimeWeek", width: 110 },
        { title: "周日", key: "Sunday",tooltip: true },
        { title: "周一", key: "Monday" ,tooltip: true},
        { title: "周二", key: "Tuesday",tooltip: true },
        { title: "周三", key: "Wednesday",tooltip: true },
        { title: "周四", key: "Thursday",tooltip: true },
        { title: "周五", key: "Friday",tooltip: true },
        { title: "周六", key: "Saturday" ,tooltip: true}
      ],
      data1: [],
      Code: "",
      now:"",
      DateInQueryTime:"",
      num:1,
      s2:"",
      s3:"",
    };
  },
  methods: {
    Lastday() {
      this.s2--;
      this.CurrentTime =
        this.s3 +
        "年-第" +
        this.s2 +
        "周";
        if(this.s2 <= 1 ){
        this.s2 = 55;
        this.s3--;
      }
      this.now.setDate(this.now.getDate() - 7);
      let a = (this.now.getMonth() + 1).toString();
      let b = this.now.getDate().toString();
      if (a.length == 1) {
        a = "0" + a;
      }
      if (b.length == 1) {
        b = "0" + b;
      }
      this.DateInQueryTime = this.now.getFullYear() + "-" + a + "-" + b;
      this.SearchtheDailySchedule();
    },
    Thenextday() {
       this.s2++;
      this.CurrentTime =
        this.s3 +
        "年-第" +
        this.s2 +
        "周";
        if(this.s2 >= 54 ){
        this.s2 = 0;
        this.s3++;
      }
      this.now.setDate(this.now.getDate() + 7);
      let a = (this.now.getMonth() + 1).toString();
      let b = this.now.getDate().toString();
      if (a.length == 1) {
        a = "0" + a;
      }
      if (b.length == 1) {
        b = "0" + b;
      }
      this.DateInQueryTime = this.now.getFullYear() + "-" + a + "-" + b;
      this.SearchtheDailySchedule();
    },
    addPerson() {
      // 循环时间
      for (var i = 0; i <= 10; i++) {
        let a = 9;
        let name = { TimeWeek: a + i + ":15" };
        this.data1.push(name);
      }
      // 循环周信息
      for (var i = 0; i < this.TableWeek.length; i++) {
        let subscript = this.TableWeek[i].FromTime.substr(0, 2) - 9;
        let a = this.TableWeek[i].DayOfWeek + 1;
        let key = this.WeekHeader[a].key;
        this.data1[subscript][key] = "应销课时: (" + this.TableWeek[i].ExpectCourseTimes
         +") 实销课时: (" + this.TableWeek[i].CompletedCourseTimes
         +") 完成率: (" + this.TableWeek[i].CompletedPercent+"%)"
      }
    },
        // 日期查询
    DatePicker(data) {
      this.DateInQueryTime = data;
      this.SearchtheDailySchedule();
      if (data == "") {
        this.CurrentTime1();
        this.SearchtheDailySchedule();
      }
    },
    // 时间
    CurrentTime1() { 
      this.now = new Date();
      var d1 = new Date();
      var d2 = new Date();
      d2.setMonth(0);
      d2.setDate(1);
      var rq = d1 - d2;
      var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
      this.s2 = Math.ceil(s1 / 7);
      this.s3 = this.now.getFullYear()
      this.CurrentTime =
        this.s3 +
        "年-第" +
        this.s2 +
        "周";
        // 获取当前日期
     
      let b = this.now.getDate().toString();
      let a = (this.now.getMonth() + 1).toString();
      if (a.length == 1) {
        a = "0" + a;
      }
      if (b.length == 1) {
        b = "0" + b;
      }
      var myddy= this.now.getDay();
      var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      this.CurrentTimemd =  a + "月" + b + "日";
      this.CurrentTimeweek = weekday[myddy];
      this.DateInQueryTime = this.now.getFullYear() + "-" + a + "-" + b;
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    SearchtheDailySchedule() {
      EducationalGetTimeTableSummaryByWeek("14094325341868032", this.DateInQueryTime)
        .then(res => {
          this.data1 = [];
          this.TableWeek = res.data;
          this.addPerson();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.CurrentTime1();
    this.SearchtheDailySchedule();
  }
};
</script>
<style scoped>
.tableTop {
  margin-top: 0px;
}
.footButton {
  margin: 30px 0 70px 0;
}
</style>
