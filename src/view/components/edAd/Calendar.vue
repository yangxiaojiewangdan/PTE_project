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
              <h3 class="queryquery">开始/结束日期：</h3>
              <DatePicker
                v-model="StartEndDate"
                type="daterange"
                @on-change="ConditionalQuery"
                placeholder="Select date and time(Excluding seconds)"
                style="width: 300px;margin-left:20px;"
              ></DatePicker>
            </Col>
          </Row>
          <Row>
            <Col span="18" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">所在地址：</h3>
              <Select
                v-model="queryProviceCode"
                style="width:200px;margin-left:20px;"
                placeholder="省"
                :label-in-value="true"
                @on-change="SelectProviceCode"
                clearable
              >
                <Option
                  v-for="item in ProviceCodeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Name }}</Option>
              </Select>
              <Select
                v-model="queryCityCode"
                :label-in-value="true"
                @on-change="SelectCityCode"
                style="width:200px;margin-left:20px;"
                placeholder="市"
                clearable
              >
                <Option
                  v-for="item in CityCodeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Name }}</Option>
              </Select>
              <Select
                @on-change="ConditionalQuery"
                v-model="queryDistinctCode"
                style="width:200px;margin-left:20px;"
                placeholder="区县"
                clearable
              >
                <Option
                  v-for="item in DistinctCodeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Name }}</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span="16" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">业务状态：</h3>
              <Button type="text" class="tableTops">全部</Button>
              <RadioGroup v-model="RadioGroupStatus" type="button" @on-change="ConditionalQuery">
                <Radio v-for="item in StatusList" :label="item.Id">
                  <span>{{item.Description}}</span>
                </Radio>
              </RadioGroup>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {};
</script>







