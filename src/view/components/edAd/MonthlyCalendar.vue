<template>
  <div id="divid">
    <Row>
      <Col span="24" style="height:50px;background: #fff;">
        <p class="queryHeader">课程月课表</p>
      </Col>
    </Row>
    <hr>
    <!-- 查询结果 -->
    <Row style="background:#fff;">
      <Col span="23">
        <div class="tableTop">
          <DatePicker
            type="month"
            placeholder="请选择月份"
            style="width: 200px"
            @on-change="changeMonth"
          ></DatePicker>
          <Button class="tableTops">单节排课</Button>
          <Button class="tableTops">批量排课</Button>
          <Button class="tableTops">阶段排课</Button>
          <Button class="tableTops">打印课表</Button>
        </div>
      </Col>
    </Row>
    <full-calendar
      :events="monthData"
      class="test-fc"
      first-day="1"
      locale="fr"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick"
    ></full-calendar>
  </div>
</template>
<script>
import { EducationalGetTimeTableSummaryByMonth } from "@/api/api";
import { FullCalendar } from "vue-fullcalendar";
export default {
  data() {
    return {
      monthData: [],
      TableMonth: []
    };
  },
  methods: {
    addPerson() {
      // 循环月信息
      for (var i = 0; i < this.TableMonth.length; i++) {
        let newitems = {
          title: "完成百分比" + this.TableMonth[i].CompletedPercent,
          start: this.TableMonth[i].BusinessDate
        };
        this.monthData.push(newitems);
      }
    },
    // 选择月份
    changeMonth(start, end, current) {},
    // 点击事件
    eventClick(event, jsEvent, pos) {
      console.log("eventClick", event, jsEvent, pos);
    },
    // 点击当天
    dayClick(day, jsEvent) {
      console.log("dayClick", day, jsEvent);
    },
    // 查看更多
    moreClick(day, events, jsEvent) {
      console.log("moreCLick", day, events, jsEvent);
    }
  },
  mounted() {
    // 查询月课表摘要汇总信息
    let myDate = new Date();
    let DateInQuery =
      myDate.getFullYear() +
      "-" +
      (myDate.getMonth() + 1) +
      "-" +
      myDate.getDate();
    EducationalGetTimeTableSummaryByMonth("14094325341868032", DateInQuery)
      .then(res => {
        this.TableMonth = res.data;
        console.log(res.data);

        this.addPerson();
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    "full-calendar": require("vue-fullcalendar")
  }
};
</script>
<style>
.tableTop {
  float: right;
}
.red {
  background: red;
}
.blue {
  background: blue;
}
.comp-full-calendar {
  padding: 20px;
  background: #fff;
  max-width: 100%;
  margin: 0 auto;
}
.main .content-wrapper {
  padding: 18px;
  overflow: auto;
}
.full-calendar-header .header-center {
  font-size: 22px;
}
.full-calendar-body .weeks .week {
  flex: 1;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  font-size: 20px;
}
.full-calendar-body .dates .dates-events .events-week .events-day {
  min-height: 98px !important;
}
</style>

