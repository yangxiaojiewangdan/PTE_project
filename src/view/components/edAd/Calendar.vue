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
        <Table :columns="ClassHeader" border :data="data1"></Table>
      </Col>
    </Row>
  </div>
</template>
<script>
import { EducationalGetTimeTableByDate, GetEntities } from "@/api/api";
export default {
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
          key: "TimeClass"
        }
      ],
      data1: [],
      TabularData: [],
      DailySchedule: []
    };
  },
  methods: {
    // 将教室/时间循环到表格头
    addPerson() {
      for (var i = 0; i < this.TabularData.length; i++) {
        let newitems = {
          title: this.TabularData[i].Description,
          key: "class" + i
        };
        this.ClassHeader.push(newitems);
      }
      for (var i = 0; i <= 10; i++) {
        let a = 9;
        let name = { TimeClass: a + i + ":15:00" };
        this.data1.push(name);
      }
      this.data1[2].age=20;
      console.log(this.data1)
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
    // 获取日课表信息
    EducationalGetTimeTableByDate({
      StoreId: 14142291989024768,
      DateInQuery: "2019-02-25"
    })
      .then(res => {
        // this.DailySchedule = res.data;
        // console.log(res.data[0].FromTime.substr(11));
        console.log(res.data);

      })
      .catch(err => {
        console.log(err);
      });
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
        // 查到教室将教室循环出来
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
</style>







