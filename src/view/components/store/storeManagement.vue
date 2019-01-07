<template>
  <div id="information">
    <Row>
      <Col span="24" style="height:50px;">
        <h1 class="queryHeader">门店管理</h1>
      </Col>
    </Row>
    <!-- 查询条件 -->
    <Row>
      <Col span="24" class="querycriteria" style="height:160px;">
        <!-- 滚动 -->
        <Col span="24">
          <Row>
            <Col span="10" class="queryquerytop">
                <h3 class="queryquery" style="padding-left:32px;">业务类型：</h3>
                <Button  type="text" class="tableTops">全部</Button>
                <RadioGroup v-model="RadioBusinessType" type="button" >
                  <Radio v-for="item in BusinessTypeList" :key="item.Id" :label="item.Code">{{ item.Description }}</Radio>
                </RadioGroup>
            </Col>
          </Row>
          <Row>
            <Col span="10" class="queryquerytop">
                <h3 class="queryquery" style="padding-left:32px;">门店类型：</h3>
                <Button  type="text" class="tableTops">全部</Button>
                <RadioGroup v-model="RadioStoreType" type="button" >
                  <Radio v-for="item in StoreTypeList" :key="item.Id" :label="item.Code">{{ item.Description }}</Radio>
                </RadioGroup>
            </Col>
          </Row>
          <Row>
            <Col span="10" class="queryquerytop">
                <h3 class="queryquery" style="padding-left:32px;">业务状态：</h3>
                <Button  type="text" class="tableTops">全部</Button>
                <RadioGroup v-model="RadioStatus" type="button" >
                  <Radio v-for="item in StatusList" :key="item.Id" :label="item.Code">{{ item.Description }}</Radio>
                </RadioGroup>
            </Col>
          </Row>
           <Row>
            <Col span="18" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">所在地址：</h3>
              <!-- <Select v-model="queryRegionCode" style="width:200px;margin-right:20px;" placeholder="所在大区">
                <Option
                  v-for="item in RegionCodeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>-->
              <Select
                v-model="queryProviceCode"
                style="width:200px;margin-right:20px;"
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
                style="width:200px;margin-right:20px;"
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
                v-model="queryDistinctCode"
                style="width:200px;margin-right:20px;"
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
        </Col>
      </Col>
    </Row>
  </div>
</template>
<script>
import { getSTORE_BUSINESS_TYPE,getSTORE_TYPE,getSTORE_STATUS,DistrictGetProvince } from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
                     // 查询  
        // 业务类型
        RadioBusinessType:"",
        //  门店类型
        RadioStoreType:"",
        // 业务类型循环数据
        BusinessTypeList:[],
        StoreTypeList:[],
        RadioStatus:"",
        StatusList:"",
        queryProviceCode:"",
        ProviceCodeList:[],
        queryCityCode:"",
        CityCodeList:[],
        queryDistinctCode:"",
        DistinctCodeList:[],
    };
  },
  methods:{
  // 市数据
    SelectProviceCode(value) {
      this.queryDistinctCode = "";
      let ParentId = value.value;
      DistrictGetArea(ParentId)
        .then(res => {
          this.CityCodeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 区县数据
    SelectCityCode(value) {
      let ParentId2 = value.value;
      DistrictGetArea(ParentId2)
        .then(res => {
          this.DistinctCodeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
    mounted(){
        // 业务类型
      getSTORE_BUSINESS_TYPE()
        .then(res => {
          this.BusinessTypeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
        // 门店类型
      getSTORE_TYPE()
        .then(res => {
          this.StoreTypeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
        // 业务状态 
      getSTORE_STATUS()
        .then(res => {
          this.StatusList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      //获取指定大区省份信息
      DistrictGetProvince()
        .then(res => {
          this.ProviceCodeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
  }
};
</script>
