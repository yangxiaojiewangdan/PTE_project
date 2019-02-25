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
      <Col span="2" offset="1">
        <Button>
          <Icon type="ios-arrow-back" size="20"/>
        </Button>
      </Col>
      <Col span="4">
        <h1>2019年2月21日</h1>
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
          <Button class="tableTops" >单节排课</Button>
          <Button class="tableTops">批量排课</Button>
          <Button class="tableTops">阶段排课</Button>
          <Button class="tableTops">打印课表</Button>
        </div>
      </Col>
      <!-- 课表 -->
      <Col span="22">
        <Table :columns="columns1" border :data="data1" @on-row-click="ClassInformation"></Table>
      </Col>
    </Row>
    <Modal v-model="modal1" title="课程信息" width="1300" @on-ok="ok" @on-cancel="cancel">
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
    </Modal>
  </div>
</template>
<script>
import Tables from "_c/tables";
export default {
  components: {
    Tables
  },
  data() {
    return {
       columns1: [
        {
          title: "时间/周",
          key: "name",
          width: 110,
        },
        {
          title: "周日",
          key: "age"
        },
        {
          title: "周一",
          key: "address"
        },
        {
          title: "周二",
          key: "age"
        },
        {
          title: "周三",
          key: "address"
        },
        {
          title: "周四",
          key: "age"
        },
        {
          title: "周五",
          key: "address"
        },
        {
          title: "周六",
          key: "age"
        }
      ],
      data1: [
        {
          name: "9:15",
        },
        {
          name: "10:15",
        },
        {
          name: "11:15",
        },
        {
          name: "12:15",
        },
        {
          name: "13:15",
        },
        {
          name: "14:15",
        },
        {
          name: "15:15",
        },
        {
          name: "16:15",
        },
        {
          name: "17:15",
        },
         {
          name: "18:15",
        },
         {
          name: "19:15",
        },
      ],
      modal1: false,
      Code: "",
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
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    ClassInformation(){
      this.modal1 = true;
    }
  }
};
</script>
<style scoped>
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
.tableTop {
  margin-top: 0px;
}
</style>
