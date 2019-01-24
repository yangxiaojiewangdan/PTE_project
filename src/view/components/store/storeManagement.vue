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
          <Button @click="deleteList" type="error" class="tableTops">删除</Button>
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
          @on-row-dblclick="dblclickUpData"
          @on-select="OneselectionId"
          @on-select-all="allselectionId"
          @on-select-all-cancel="allcancelselectionId"
          @on-select-cancel="OnecancelselectionId"
        ></Table>
        <!-- 表格 end-->
      </Col>
      <Col span="24">
        <!-- 分页 -->
        <Page :total="100" class="page"/>
        <!-- 分页 end-->
      </Col>
    </Row>
    <!-- 添加/参看信息 弹出框-->
    <Modal v-model="AddDepartment" scrollable width="900"  :mask-closable="false">
      <p slot="header" style="text-align:left;line-height: 1;">
        <span v-if="add">添加门店信息</span>
        <span v-if="see">查看门店信息</span>
      </p>
       <p slot="close" style="margin-right:10px;line-height: 3;" @click="close('formValidate')">
        <Icon type="md-close"  size="20" color="gray"/>
      </p>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="100"
      >
        <Row>
           <Col span="23">
            <FormItem label="所属加盟商" prop="Franchiser">
              <Select v-model="formValidate.Franchiser" style="width:200px" :disabled="isdisabledFn">
                <Option
                  v-for="item in FranchiserList"
                  :value="item.Name"
                  :key="item.FranchiserType"
                >{{ item.Code }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="门店代码" prop="Code">
              <Input v-model="formValidate.Code" placeholder="请输入" ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="门店名称" prop="Description">
              <Input v-model="formValidate.Description" placeholder="请输入" ></Input>
            </FormItem>
          </Col>
          <Col span="11">
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
          <Col span="12">
            <FormItem label="开业日期" prop="OpenOn">
              <DatePicker type="date" v-model="formValidate.OpenOn" placeholder="Select date" ></DatePicker>
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

          <Col span="11">
            <FormItem label="地址" prop="Address">
              <Input v-model="formValidate.Address" placeholder="请输入"></Input>
            </FormItem>
          </Col>

           <Col span="6">
            <FormItem label="经度" prop="Longitude">
              <Input v-model="formValidate.Longitude" placeholder="请输入"></Input>
            </FormItem>
          </Col>

           <Col span="6">
            <FormItem label="纬度" prop="Latitude">
              <Input v-model="formValidate.Latitude" placeholder="请输入"></Input>
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
              <span>{{ formValidate.CreateByName }}</span>
            </div>
            <div> 
              <span>更新人:</span>
              <span>{{ formValidate.UpdateByName }}</span>
            </div>
          </div>
          <div class="footer_left2">
            <div>
              <span>创建时间:</span>
              <span>{{ formValidate.CreateOn }}</span>
            </div>
            <div>
              <span>更新时间:</span>
              <span>{{ formValidate.UpdateOn }}</span>
            </div>
          </div>
        </div>
        <Button
          type="button"
          class="ivu-btn ivu-btn-text ivu-btn-large"
          @click="delete1 = true;"
          v-if="del"
        >删除</Button>
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
    <!-- 删除信息弹出框 -->
    <Modal v-model="delete1" title="提示" @on-ok="ok">
      <h3>确定删除此数据？</h3>
    </Modal>
  </div>
</template>
<script>
import {
  GetEntities,
  GetEntity,
  Create,
  Update,
  Delete,
  BatchDelete,
  Copy,
  DistrictGetProvince,
  DistrictGetArea,
  DistrictGetEntity
} from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      Interface:"BusinessStore",
      // 弹框标题信息
      add: "",
      see: "",
      del: "",
      // 加盟商禁用
      isdisabledFn:false,
      // 地址
      ProviceCodeList:[],
      CityCodeList:[],
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
      // 所属加盟商
      FranchiserList:[],
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
        ContactEMail: "",
        Longitude:"",
        Latitude:"",
      },
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
     close(name){
            this.$refs[name].resetFields();
        },
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
      this.formValidate.CreateByName = see.AccountName;
      this.formValidate.BusinessGroup = see.BusinessUnit;
      this.add = true;
      this.see = false;
      this.del = false;
      this.isdisabledFn = false;

    },
    // 添加/修改加盟商信息
    handleSubmit(name) {
      // 验证表单
      this.$refs[name].validate(valid => {
        // 验证表单成功后调用
        if(valid){
          // 当进入的是添加弹框就调用添加接口
          if(this.add == true){
            // 添加加盟商信息接口
            Create(this.Interface, this.formValidate)
              .then(res => {
                this.$Message.success("添加成功!");
                this.AddDepartment = false;
                this.$refs[name].resetFields();
                this.reload();
              })
              .catch(err => {
                this.$Message.error("添加失败!");
              });
            // 当进入的是查看弹框就调用修改接口
          }else if(this.see == true){
            this.TabBusinessStores = true;
            //点击修改按钮
            Update(this.Interface, this.formValidate)
            .then(res => {
              this.$Message.success("修改成功!");
              this.AddDepartment = false;
              this.$refs[name].resetFields();
              this.reload();
            })
            .catch(err => {
              this.$Message.error("修改失败!");
            });
          }
        }
      });
    },
    // 取消
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$Message.info("已取消");
    },
    //详情修改页面
    dblclickUpData(index) {
      this.AddDepartment = true;
      this.add = false;
      this.see = true;
      this.del = true;
      this.formValidate = index;
      this.isdisabledFn = true;
    },
       // 删除数据接口
    deleteList() {
      if (this.delete.length == 0) {
        this.$Message.info("请先选中删除的数据");
      } else {
        this.delete1 = true;
      }
    },
    OneselectionId(selection,row) {
      this.BatchDeleteList = selection;
      for (var i = 0; i < this.BatchDeleteList.length; i++) {
        this.delete.push(this.BatchDeleteList[i].Id);
      }
      function uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
          if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
          }
        }
        return temp;
      }
      this.delete = uniq(this.delete);
    },
    OnecancelselectionId(selection,row) {
      function removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
          if(arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      }
      removeByValue(this.delete,row.Id);
    },
    allselectionId(selection) {
      console.log(this.delete);
       for (var i = 0; i < selection.length; i++) {
        this.delete.push(selection[i].Id);
      }
    },
    allcancelselectionId(selection) {
         this.delete = selection
    },
    ok() {
      if (this.see == false && this.add == false) {
        BatchDelete(this.Interface, this.delete)
          .then(res => {
            this.$Message.success("删除成功!");
            this.reload();
          })
          .catch(err => {
            this.$Message.error("删除失败!");
            console.log(err);
          });
      } else if(this.see == true){
        Delete(this.Interface, this.formValidate.Id)
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
        // 点击查询按钮查询信息
    querytable() {
      GetEntities(this.Interface, {
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
    
    // // 表格数据
    GetEntities(this.Interface,this.getTableData)
      .then(res => {
        this.informationData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
      // 获取加盟商的信息Code   循环到门店所属加盟商
    GetEntities("FranchiserProfile",this.getTableData)
      .then(res => {
        this.FranchiserList = res.data;
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
    //业务类型
    this.BusinessTypeList = JSON.parse(localStorage.STORE_BUSINESS_TYPE);
    // 门店类型
    this.StoreTypeList = JSON.parse(localStorage.STORE_TYPE);
    // 业务状态
    this.StatusList = JSON.parse(localStorage.STORE_STATUS);
  }
};
</script>
