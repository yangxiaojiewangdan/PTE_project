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
      <Col span="24" class="querycriteria" style="height:160px;">
        <!-- 滚动 -->
        <Col span="24">
          <Row>
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery">上课时间：</h3>
              <TimePicker
                v-model="AttendDate"
                @on-change="ConditionalQuery"
                format="HH’mm’ss"
                type="timerange"
                placement="bottom-start"
                placeholder="Select time"
              ></TimePicker>
            </Col>
          </Row>
          <Row>
            <Col span="6" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:28px;">班级：</h3>
              <Select v-model="model1" style="width:200px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="6" class="queryquerytop">
              <h3 class="queryquery" >教师：</h3>
              <Select v-model="model1" style="width:200px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span="6" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:28px;">学员：</h3>
              <Select v-model="model1" style="width:200px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="6" class="queryquerytop">
              <h3 class="queryquery" >课程：</h3>
              <Select v-model="model1" style="width:200px">
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
    <Row style="background:#fff;">
      <Col span="15" class="queryEnd">
        <h2>查询结果</h2>
      </Col>
      <Col span="8">
        <div class="tableTop">
          <Button  class="tableTops">单节排课</Button>
          <Button  class="tableTops">批量排课</Button>
          <Button  class="tableTops">阶段排课</Button>
          <Button  class="tableTops">打印课表</Button>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model1: ""
    };
  }
};
</script>







