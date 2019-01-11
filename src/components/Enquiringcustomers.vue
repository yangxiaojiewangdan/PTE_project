<template>
  <div>
    <!-- 选择客户 -->
    <Modal width="600" v-model="modal1" title="查询客户" :styles="{top: '20px'}" >
      <Row>
        <Col span="20" offset="3">
          <Select
            v-model="querySelectassembly"
            :label-in-value="true"
            style="width:150px"
            placeholder="请选择要查询的字段"
          >
            <Option
              v-for="item in querySelectListassembly"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <Input
            v-model="queryvalueassembly"
            placeholder="请输入查询内容"
            style="width: 200px"
            class="tableTops"
          />
          <Button type="primary" class="tableTops" @click="querytableassembly">查询</Button>
        </Col>
        <Col span="24" style="margin-top:20px;" v-if="Table">
          <Table height="300" size="small" ref="selection" @on-select="Choice" :columns="columns1" :data="data2"></Table>
        </Col>
      </Row>
      <div slot="footer">
        <button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="handleReset();modal1 = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="ok"
        >
          <span>确定</span>
        </button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { CustomerData } from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      modal1: true,
      querySelectassembly: "",
      queryvalueassembly: "",
      querySelectListassembly: [
        {
          value: "Name",
          label: "名称"
        },
        {
          value: "ContactPhone",
          label: "父母电话"
        }
      ],
      columns1: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "姓",
          key: "FirstName",
          width: 80
        },
        {
          title: "名",
          key: "LastName",
          width: 80
        },
        {
          title: "家长手机",
          key: "ContactPhone"
        },
        {
          title: "负责人",
          key: "Owner"
        },
        {
          title: "创建时间",
          ellipsis: true,
          key: "CreateOn",
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "left" }
              },
              [
                params.row.CreateOn,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.CreateOn
                )
              ]
            );
          }
        }
      ],
      data2: [],
      Customername: [],
      Customer: [],
      ProfileName: "",
      ProfileId: "",
      Table: false
    };
  },
  methods: {
    ok() {
         this.$emit('childByValue', this.ProfileId)
         this.$emit('childByValue2', this.ProfileName)
        console.log(this.ProfileId)
        console.log(this.ProfileName)
        this.modal1 = false;
    },
    // 点击查询按钮查询信息
    querytableassembly() {
      this.Table = true;
      if (this.querySelectassembly == "Name") {
        CustomerData({
          Filters: [
            {
              Relational: "Or", //And 与 | Or 或
              Conditions: [
                {
                  FilterField: "FirstName", //字段名
                  Relational: "Contain",
                  FilterValue: this.queryvalueassembly //字段名里面的值
                }
              ]
            },
            {
              Relational: "Or", //And 与 | Or 或
              Conditions: [
                {
                  FilterField: "LastName", //字段名
                  Relational: "Contain",
                  FilterValue: this.queryvalueassembly //字段名里面的值
                }
              ]
            }
          ]
        })
          .then(res => {
            this.data2 = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.querySelectassembly == "ContactPhone") {
        CustomerData({
          Filters: [
            {
              Relational: "And", //And 与 | Or 或
              Conditions: [
                {
                  FilterField: "ContactPhone", //字段名
                  Relational: "Contain",
                  FilterValue: this.queryvalueassembly //字段名里面的值
                }
              ]
            }
          ]
        })
          .then(res => {
            this.data2 = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    Choice(selection) {
      this.Customer = selection;
      for (var i = 0; i < this.Customer.length; i++) {
        this.Customername.push(this.Customer[i].Id);
        this.ProfileName =
          this.Customer[i].FirstName + this.Customer[i].LastName;
        this.ProfileId = this.Customer[i].Id;
      }
    }
  },
  mounted() {
    CustomerData({
      Filters: {}
    })
      .then(res => {
        this.data2 = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>



