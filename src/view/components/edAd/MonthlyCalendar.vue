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
import { FullCalendar } from "vue-fullcalendar";
export default {
  data() {
    return {
      monthData: [
        {
          title: "eeeeeeeee", // 事件内容
          start: "2019-2-24", // 事件开始时间
          end: "2019-2-28", // 事件结束时间
          cssClass: "red" // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        }
      ]
    };
  },
  methods: {
    // 选择月份                                                                                                                                                                                                                                                                                                                                               
    changeMonth(start, end, current) {
     console.log(start);
      console.log(end);
      console.log(current);
    },
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
</style>

