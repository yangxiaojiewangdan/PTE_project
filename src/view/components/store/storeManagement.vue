<template>
  <div id="information">
    <Row>
      <Col span="24" style="height:50px;">
        <h1 class="queryHeader">门店管理</h1>
      </Col>
    </Row>
    <!-- 查询条件 -->
    <Row>
      <Col span="24" class="querycriteria" style="height:200px;">
        <!-- 滚动 -->
        <Col span="24">
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
            </Col>
          </Row>
          <Row>
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">业务类型：</h3>
              <Button type="text" class="tableTops">全部</Button>
              <RadioGroup v-model="RadioBusinessType" type="button">
                <Radio
                  v-for="item in BusinessTypeList"
                  :key="item.Code"
                  :label="item.Description"
                >{{ item.Description }}</Radio>
              </RadioGroup>
            </Col>
          </Row>
          <Row>
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">门店类型：</h3>
              <Button type="text" class="tableTops">全部</Button>
              <RadioGroup v-model="RadioStoreType" type="button">
                <Radio
                  v-for="item in StoreTypeList"
                  :key="item.Code"
                  :label="item.Description"
                >{{ item.Description }}</Radio>
              </RadioGroup>
            </Col>
          </Row>
          <Row>
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">业务状态：</h3>
              <Button type="text" class="tableTops">全部</Button>
              <RadioGroup v-model="RadioStatus" type="button">
                <Radio
                  v-for="item in StatusList"
                  :key="item.Code"
                  :label="item.Description"
                >{{ item.Description }}</Radio>
              </RadioGroup>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
    <!-- 查询结果 -->
    <Row>
      <Col span="15" class="queryEnd">
        <h2>查询结果</h2>
      </Col>
      <!-- 表格上面的功能 -->
      <Col span="8">
        <div class="tableTop">
          <Button @click="AddDepartment1" type="success" class="tableTops">添加</Button>
          <Button @click="delete1 = true" type="error" class="tableTops">删除</Button>
          <Select v-model="querySelect" :label-in-value="true" style="width:120px">
            <Option
              v-for="item in querySelectList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <Input
            v-model="queryvalue"
            placeholder="Enter something..."
            style="width: 150px"
            class="tableTops"
          />
          <Button type="primary" class="tableTops" @click="querytable">查询</Button>
        </div>
      </Col>
      <!-- 表格上面的功能 end-->
      <Col span="24">
        <!-- 表格 -->
        <Table
          height="530"
          size="small"
          highlight-row
          stripe
          border
          ref="selection"
          :columns="informationTable"
          :data="informationData"
          @on-select="BatchDelete"
          @on-row-dblclick="dblclickUpData"
          @on-select-all="BatchDelete"
        ></Table>
        <!-- 表格 end-->
      </Col>
      <Col span="24">
        <!-- 分页 -->
        <Page :total="100" class="page"/>
        <!-- 分页 end-->
      </Col>
    </Row>
    <!-- 添加信息 弹出框-->
    <Modal v-model="AddDepartment" scrollable width="1100" title="添加门店信息" :mask-closable="false">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="120"
      >
        <Row>
          <Col span="23">
            <FormItem label="门店代码" prop="Code">
              <Input v-model="formValidate.Code" placeholder="请输入" style="width:200px"></Input>
            </FormItem>
          </Col>
          <Col span="23">
            <FormItem label="门店名称" prop="Description">
              <Input v-model="formValidate.Description" placeholder="请输入" style="width:400px"></Input>
            </FormItem>
          </Col>
          <Col span="23">
            <FormItem label="描述" prop="LongDescription">
              <Input
                v-model="formValidate.LongDescription"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入"
              ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="门店类型" prop="StoreType">
              <Select v-model="formValidate.StoreType">
                <Option
                  v-for="item in StoreTypeList"
                  :value="item.Description"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="所属加盟商" prop="Franchiser">
              <Select v-model="formValidate.Franchiser">
                <Option
                  v-for="item in StoreTypeList"
                  :value="item.Description"
                  :key="item.Code"
                >{{ item.Description }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="开业日期" prop="OpenOn">
              <DatePicker type="date" v-model="formValidate.OpenOn" placeholder="Select date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="省" prop="ProviceCode">
              <Select
                v-model="formValidate.ProviceCode"
                :label-in-value="true"
                @on-change="SelectProviceCode"
              >
                <Option
                  v-for="item in ProviceCodeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="市" prop="CityCode">
              <Select
                v-model="formValidate.CityCode"
                :label-in-value="true"
                @on-change="SelectCityCode"
              >
                <Option
                  v-for="item in CityCodeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="邮编" prop="PostalCode">
              <Input v-model="formValidate.PostalCode" placeholder="请输入"></Input>
            </FormItem>
          </Col>

          <Col span="23">
            <FormItem label="地址" prop="Address">
              <Input v-model="formValidate.Address" placeholder="请输入"></Input>
            </FormItem>
          </Col>

          <Col span="11">
            <FormItem label="传真" prop="Fax">
              <Input v-model="formValidate.Fax" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系电话" prop="TelPhone">
              <Input v-model="formValidate.TelPhone" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="联系人姓名" prop="ContactName">
              <Input v-model="formValidate.ContactName" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系人电话" prop="ContactTel">
              <Input v-model="formValidate.ContactTel" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="联系人手机" prop="ContactPhone">
              <Input v-model="formValidate.ContactPhone" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系人邮箱" prop="ContactEMail">
              <Input v-model="formValidate.ContactEMail" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="业务类型" prop="BusinessType">
              <RadioGroup v-model="formValidate.BusinessType">
                <Radio v-for="item in BusinessTypeList" :label="item.Description">
                  <span>{{item.Description}}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="业务状态" prop="Status">
              <RadioGroup v-model="formValidate.Status">
                <Radio v-for="item in StatusList" :label="item.Code">
                  <span>{{item.Description}}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <div class="footer_left">
          <div class="footer_left1">
            <div>
              <span>创建人:</span>
              <span>{{ Founder }}</span>
            </div>
            <div>
              <span>更新人:</span>
            </div>
          </div>
          <div class="footer_left2">
            <div>
              <span>创建时间:</span>
            </div>
            <div>
              <span>更新时间:</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="handleReset('formValidate');AddDepartment = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="handleSubmit('formValidate');"
        >
          <span>确定</span>
        </button>
      </div>
    </Modal>
    <!-- 查看信息 弹出框-->
    <Modal
      v-model="upDepartment"
      scrollable
      width="1100"
      title="查看门店信息"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <Tabs value="name1">
        <TabPane label="门店信息" name="name1">
          <Form
            ref="UpdateList"
            :model="UpdateList"
            :rules="ruleValidate"
            label-position="right"
            :label-width="120"
          >
            <Row>
              <Col span="23">
                <FormItem label="门店代码" prop="Code">
                  <Input v-model="UpdateList.Code" placeholder="请输入" style="width:200px"></Input>
                </FormItem>
              </Col>
              <Col span="23">
                <FormItem label="门店名称" prop="Description">
                  <Input v-model="UpdateList.Description" placeholder="请输入" style="width:400px"></Input>
                </FormItem>
              </Col>
              <Col span="23">
                <FormItem label="描述" prop="LongDescription">
                  <Input
                    v-model="UpdateList.LongDescription"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    placeholder="请输入"
                  ></Input>
                </FormItem>
              </Col>

              <Col span="8">
                <FormItem label="门店类型" prop="StoreType">
                  <Select v-model="UpdateList.StoreType">
                    <Option
                      v-for="item in StoreTypeList"
                      :value="item.Description"
                      :key="item.Code"
                    >{{ item.Description }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="所属加盟商" prop="Franchiser">
                  <Select v-model="UpdateList.Franchiser">
                    <Option
                      v-for="item in StoreTypeList"
                      :value="item.Description"
                      :key="item.Code"
                    >{{ item.Description }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="开业日期" prop="OpenOn">
                  <DatePicker type="date" v-model="UpdateList.OpenOn" placeholder="Select date"></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="省" prop="ProviceCode">
                  <Select
                    v-model="UpdateList.ProviceCode"
                    :label-in-value="true"
                    @on-change="SelectProviceCode"
                  >
                    <Option
                      v-for="item in ProviceCodeList"
                      :value="item.Id"
                      :key="item.Code"
                    >{{ item.Name }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="市" prop="CityCode">
                  <Select
                    v-model="UpdateList.CityCode"
                    :label-in-value="true"
                    @on-change="SelectCityCode"
                  >
                    <Option
                      v-for="item in CityCodeList"
                      :value="item.Id"
                      :key="item.Code"
                    >{{ item.Name }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="7">
                <FormItem label="邮编" prop="PostalCode">
                  <Input v-model="UpdateList.PostalCode" placeholder="请输入"></Input>
                </FormItem>
              </Col>

              <Col span="23">
                <FormItem label="地址" prop="Address">
                  <Input v-model="UpdateList.Address" placeholder="请输入"></Input>
                </FormItem>
              </Col>

              <Col span="11">
                <FormItem label="传真" prop="Fax">
                  <Input v-model="UpdateList.Fax" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="联系电话" prop="TelPhone">
                  <Input v-model="UpdateList.TelPhone" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="联系人姓名" prop="ContactName">
                  <Input v-model="UpdateList.ContactName" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="联系人电话" prop="ContactTel">
                  <Input v-model="UpdateList.ContactTel" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="联系人手机" prop="ContactPhone">
                  <Input v-model="UpdateList.ContactPhone" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="联系人邮箱" prop="ContactEMail">
                  <Input v-model="UpdateList.ContactEMail" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col span="24">
                <FormItem label="业务类型" prop="BusinessType">
                  <RadioGroup v-model="UpdateList.BusinessType">
                    <Radio v-for="item in BusinessTypeList" :label="item.Description">
                      <span>{{item.Description}}</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="24">
                <FormItem label="业务状态" prop="Status">
                  <RadioGroup v-model="UpdateList.Status">
                    <Radio v-for="item in StatusList" :label="item.Code">
                      <span>{{item.Description}}</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane label="所属加盟商信息" name="name2">标签二的内容</TabPane>
      </Tabs>

      <div slot="footer">
        <div class="footer_left">
          <div class="footer_left1">
            <div>
              <span>创建人:</span>
              <span>{{ UpdateList.CreateByName }}</span>
            </div>
            <div>
              <span>更新人:</span>
              <span>{{ UpdateList.UpdateByName }}</span>
            </div>
          </div>
          <div class="footer_left2">
            <div>
              <span>创建时间:</span>
              <span>{{ UpdateList.CreateOn }}</span>
            </div>
            <div>
              <span>更新时间:</span>
              <span>{{ UpdateList.UpdateOn }}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="handleReset('UpdateList');upDepartment = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="UpdateSubmit('UpdateList');"
        >
          <span>修改</span>
        </button>
      </div>
    </Modal>
    <!-- 删除信息弹出框 -->
    <Modal v-model="delete1" title="提示" @on-ok="deleteList">
      <h3>确定删除此数据？</h3>
    </Modal>
  </div>
</template>
<script>
import {
  getSTORE_BUSINESS_TYPE,
  getSTORE_TYPE,
  getSTORE_STATUS,
  DistrictGetProvince,
  DistrictGetArea,
  BusinessStoreGetEntities,
  BusinessStoreCreate,
  BusinessStoreBatchDelete,
  BusinessStoreUpdate
} from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      // 所在地址
      queryProviceCode: "",
      queryCityCode: "",
      ProviceCodeList: [],
      CityCodeList: [],
      // 业务类型
      RadioBusinessType: "",
      BusinessTypeList: [],
      // 门店类型
      RadioStoreType: "",
      StoreTypeList: [],
      // 业务状态
      RadioStatus: "",
      StatusList: [],
      // 查询下拉框
      querySelect: "",
      querySelectList: [
        {
          value: "Code",
          label: "门店代码"
        },
        {
          value: "Description",
          label: "门店名称"
        }
      ],
      // 查询输入框
      queryvalue: "",
      // 内容表格
      informationTable: [
        { type: "selection", width: 45 },
        {
          title: "门店代码",
          key: "Code",
          width: 110,
          sortable: true
        },
        {
          title: "门店名称",
          key: "Description",
          width: 110,
          sortable: true
        },
        {
          title: "业务类型",
          key: "BusinessType",
          width: 110,
          sortable: true
        },
        {
          title: "门店类型",
          key: "StoreType",
          width: 110,
          sortable: true
        },
        {
          title: "业务状态 ",
          key: "Status",
          width: 110,
          sortable: true,
           render: (h, params) => {
                let texts = "";
                if(params.row.Status == 0) {
                    texts = "装修中";
                }
                if(params.row.Status == 1) {
                    texts = "试营业";
                }
                if(params.row.Status == 2) {
                    texts = "正式营业";
                }
                if(params.row.Status == 3) {
                    texts = "暂停营业";
                }
                if(params.row.Status == 4) {
                    texts = "终止营业";
                }

                return h(
                    "div", {
                        props: {}
                    },
                    texts
                );s
            }
        },
        {
          title: "所属加盟商",
          key: "Franchiser",
          width: 120,
          sortable: true
        },
        {
          title: "省",
          key: "ProviceCode",
          width: 80,
          sortable: true
        },
        {
          title: "市",
          key: "CityCode",
          width: 80,
          sortable: true
        },
        {
          title: "邮编",
          key: "PostalCode",
          width: 110,
          sortable: true
        },
        {
          title: "联系电话",
          width: 110,
          sortable: true,
          key: "TelPhone"
        },
        {
          title: "传真",
          width: 80,
          sortable: true,
          key: "Fax"
        },
        {
          title: "联系人姓名",
          key: "ContactName",
          width: 120,
          sortable: true
        },
        {
          title: "联系人手机",
          key: "ContactPhone",
          width: 120,
          sortable: true
        },
        {
          title: "创建人",
          key: "CreateByName",
          width: 120,

          sortable: true
        },
        {
          title: "创建时间",
          ellipsis: true,
          sortable: true,
          width: 120,
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
      //表格数组
      getTableData: {
        Filters: {}
      },
      informationData: [],
      // 表单验证
      ruleValidate: {},
      // 添加/修改加盟商基本信息默认隐藏
      AddDepartment: false,
      upDepartment: false,
      // 添加信息表单
      formValidate: {
        Code: "",
        Description: "",
        LongDescription: "",
        BusinessType: "",
        StoreType: "",
        Status: "",
        Franchiser: "",
        OpenOn: "",
        ProviceCode: "",
        CityCode: "",
        Address: "",
        PostalCode: "",
        TelPhone: "",
        Fax: "",
        ContactName: "",
        ContactTel: "",
        ContactPhone: "",
        ContactEMail: ""
      },
      // 修改信息表单
      UpdateList: {},
      // 创建人
      Founder: "",
      UpdatePerson: "",
      CreationTime: "",
      UpdateTime: "",
      // 删除信息弹出框
      delete1: false,
      BatchDeleteList: [],
      delete: []
    };
  },
  methods: {
    //选择省获取 市数据  查询省
    SelectProviceCode(value) {
      this.queryCityCode = "";
      let ParentId = value.value;
      console.log(ParentId);
      DistrictGetArea(ParentId)
        .then(res => {
          this.CityCodeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击市查询
    SelectCityCode(value) {
      let ParentId = value.value;
      DistrictGetArea(ParentId)
        .then(res => {
          this.DistinctCodeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 创建人
    AddDepartment1() {
      this.AddDepartment = true;
      let see = JSON.parse(sessionStorage.getItem("userInfo"));
      this.Founder = see.AccountName;
    },
    // 添加加盟商信息
    handleSubmit() {
      BusinessStoreCreate(this.formValidate)
        .then(res => {
          this.$Message.success("成功!");
          this.AddDepartment = false;
          this.reload();
          this.formValidate = { brand_right: 0 };
        })
        .catch(err => {
          this.$Message.error("失败!");
          console.log(err);
        });
    },
    // 取消
    handleReset(name) {
      this.formValidate = { brand_right: 0 };
      this.$refs[name].resetFields();
      this.$Message.info("已取消");
    },
    //详情修改页面
    dblclickUpData(index) {
      this.upDepartment = true;
      this.UpdateList = index;
      console.log(index);
    },
    //点击修改按钮
    UpdateSubmit() {
      // let name = localStorage.name;s
      // if(name == "0"){
      BusinessStoreUpdate(this.UpdateList)
        .then(res => {
          this.$Message.success("修改成功!");
          this.reload();
        })
        .catch(err => {
          console.log(err);
        });
      // }
      // if(name == "name2"){
      //   FranchiserProfileUpdate(this.UpdateList)
      //   .then(res => {
      //     this.$Message.success("修改成功!");
      //     this.reload();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // }
    },
    // upTabs(name){
    //   localStorage.setItem("name",name);
    // },
    // 删除数据接口
    deleteList() {
      if (this.BatchDeleteList.length == 0) {
        this.$Message.info("请先选中删除的数据");
      } else {
        BusinessStoreBatchDelete(this.delete)
          .then(res => {
            this.$Message.success("删除成功!");
            this.reload();
          })
          .catch(err => {
            this.$Message.error("删除失败!");
            console.log(err);
          });
      }
    },
    BatchDelete(selection) {
      this.BatchDeleteList = selection;
      for (var i = 0; i < this.BatchDeleteList.length; i++) {
        this.delete.push(this.BatchDeleteList[i].Id);
        console.log(this.BatchDeleteList[i].Id);
      }
    },
        // 点击查询按钮查询信息
    querytable() {
      BusinessStoreGetEntities({
        Filters: [
          {
            Relational: "And", //And 与 | Or 或
            Conditions: [
              {
                FilterField: this.querySelect, //字段名
                Relational: "Contain",
                FilterValue: this.queryvalue //字段名里面的值
              }
            ]
          }
        ]
      })
        .then(res => {
          this.informationData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    // 表格数据
    BusinessStoreGetEntities(this.getTableData)
      .then(res => {
        this.informationData = res.data;
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
    // 业务类型
    getSTORE_BUSINESS_TYPE()
      .then(res => {
        this.BusinessTypeList = res.data;
        console.log(res.data);
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
  }
};
</script>
