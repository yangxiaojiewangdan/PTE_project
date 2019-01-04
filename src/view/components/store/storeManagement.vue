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
                <Button v-for="item in BusinessTypeList" :key="item.Code">{{ item.Description }}</Button>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  </div>
</template>
<script>
import { getSTORE_BUSINESS_TYPE } from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
                     // 查询  
        // 业务类型
        RadioBusinessType:"",
        // 业务类型循环数据
        BusinessTypeList:[],
    };
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
  }
};
</script>
