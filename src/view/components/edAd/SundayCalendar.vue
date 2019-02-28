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
      <Col span="1" offset="1">
        <Button>
          <Icon type="ios-arrow-back" size="20"/>
        </Button>
      </Col>
      <Col span="6">
        <h1>{{ CurrentTime }}</h1>
      </Col>
      <Col span="1">
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
      TableWeek: [],
      WeekHeader: [
        { title: "时间/周", key: "TimeWeek", width: 110 },
        { title: "周日", key: "Sunday" },
        { title: "周一", key: "Monday" },
        { title: "周二", key: "Tuesday" },
        { title: "周三", key: "Wednesday" },
        { title: "周四", key: "Thursday" },
        { title: "周五", key: "Friday" },
        { title: "周六", key: "Saturday" },
      ],
      data1: [],
      Code: ""
    };
  },
  methods: {
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
        this.data1[subscript][key] =
          "课程完成百分比:" + this.TableWeek[i].CompletedPercent;
      }
    },
    // 时间
    CurrentTime1() {
      var d1 = new Date();
      var d2 = new Date();
      d2.setMonth(0);
      d2.setDate(1);
      var rq = d1 - d2;
      var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
      var s2 = Math.ceil(s1 / 7);
      //按周日为一周的最后一天计算
      var date = new Date();
      //今天是这周的第几天
      var today = date.getDay();
      //上周日距离今天的天数（负数表示）
      var stepSunDay = -today ;
      // 如果今天是周日
      if (today == 0) {
        stepSunDay = -7;
      }
      // 周一距离今天的天数（负数表示）
      var stepMonday = 6 - today;
      var time = date.getTime();
      var monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
      var sunday = new Date(time + stepMonday * 24 * 3600 * 1000);
      //本周一的日期 （起始日期）
      var m = monday.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = monday.getDate();
      d = d < 10 ? "0" + d : d;
      var start = m + "月" + d + "日";
      //本周日的日期 （结束日期）
      var m1 = sunday.getMonth() + 1;
      m1 = m1 < 10 ? "0" + m1 : m1;
      var d1 = sunday.getDate();
      d1 = d1 < 10 ? "0" + d1 : d1;
      var end = m1 + "月" + d1 + "日";
      let myDate = new Date();
      this.CurrentTime =
        myDate.getFullYear() +
        "年-第" +
        s2 +
        "周" +
        "(" +
        start +
        "-" +
        end +
        ")";
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  },
  mounted() {
    this.CurrentTime1();
    // 查询周课表摘要汇总信息
    let myDate = new Date();
    let DateInQuery =
      myDate.getFullYear() +
      "-" +
      (myDate.getMonth() + 1) +
      "-" +
      myDate.getDate();
    EducationalGetTimeTableSummaryByWeek("14094325341868032", DateInQuery)
      .then(res => {
        this.TableWeek = res.data;
        console.log(res.data);
        this.addPerson();
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
.footButton {
  margin: 30px 0 70px 0;
}
</style>
