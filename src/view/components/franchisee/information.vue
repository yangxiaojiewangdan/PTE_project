<template>
  <div id="information">
    <Row>
      <Col span="24" style="height:50px;">
        <h1 class="queryHeader">加盟商基本信息</h1>
      </Col>
    </Row>
    <!-- 查询条件 -->
    <Row>
      <Col span="24" class="querycriteria" style="height:160px;">
        <!-- 滚动 -->
        <Col span="24">
          <Row>
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery">开始/结束日期：</h3>
              <DatePicker
                type="daterange"
                :options="options2"
                placement="bottom-start"
                placeholder="Select date"
                style="width: 200px"
              ></DatePicker>
            </Col>
          </Row>
          <Row>
            <Col span="18" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">所在大区：</h3>
              <Select v-model="model1" style="width:200px;margin-right:20px;" placeholder="所在大区">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Select v-model="model1" style="width:200px;margin-right:20px;" placeholder="省">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Select v-model="model1" style="width:200px;margin-right:20px;" placeholder="市">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Select v-model="model1" style="width:200px;margin-right:20px;" placeholder="区县">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span="10" class="queryquerytop">
              <h3 class="queryquery" style="padding-left:32px;">业务状态：</h3>
              <RadioGroup v-model="queryStatus" type="button">
                <Radio label="全部"></Radio>
                <Radio v-for="item in StatusList" :label="item.Code">
                  <span>{{item.Description}}</span>
                </Radio>
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
          <Button @click="AddDepartment = true" type="success" class="tableTops">添加</Button>
          <Button @click="delete1 = true" type="error" class="tableTops">删除</Button>
          <Select
            v-model="querySelect"
            :label-in-value="true"
            @on-change="v=>{setOption(v,'type')}"
            style="width:120px"
          >
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
          <Button type="primary" class="tableTops">查询</Button>
        </div>
      </Col>
      <!-- 表格上面的功能 end-->
      <Col span="24">
        <!-- 表格 -->
        <Table
          height="550"
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
    <Modal v-model="AddDepartment" scrollable width="1300" title="添加加盟商信息" :mask-closable="false">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="160"
      >
        <Row>
          <Col span="14">
            <Col span="12">
              <FormItem label="所属业务群" prop="BusinessGroup">
                <Select v-model=" formValidate.BusinessGroup" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="加盟商代码" prop="Code">
                <Input v-model="formValidate.Code" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客户名称" prop="Name">
                <Input v-model="formValidate.Name" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客户简称" prop="ShortName">
                <Input v-model="formValidate.ShortName" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="描述" prop="Description">
                <Input
                  v-model="formValidate.Description"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="请输入"
                  style="width:571px;"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="加盟商类型" prop="FranchiserType">
                <Select v-model=" formValidate.FranchiserType" style="width:200px">
                  <Option
                  v-for="item in FranchiserTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="负责人" prop="LegalOwner">
                <Input v-model="formValidate.LegalOwner" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件类型" prop="CertificateType">
                <Select v-model=" formValidate.CertificateType" style="width:200px">
                 <Option
                  v-for="item in CertificateTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件号" prop="CertificateNo">
                <Input v-model="formValidate.CertificateNo" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="业务类型" prop="BusinessType">
                <Select v-model=" formValidate.BusinessType" style="width:200px" disabled >
                  <Option
                  v-for="item in BusinessTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="加盟方式" prop="LeageMode">
                <Select v-model=" formValidate.LeageMode" style="width:200px">
                  <Option
                  v-for="item in LeageModeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="开始日期" prop="FromDate">
                <DatePicker type="date" v-model=" formValidate.FromDate" placeholder="Select date" style="width: 200px"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结束日期" prop="ToDate">
                 <DatePicker type="date" v-model=" formValidate.ToDate" placeholder="Select date" style="width: 200px"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="所在大区" prop="RegionCode">
                <Select v-model=" formValidate.LeageMode" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="省" prop="ProviceCode">
                <Select v-model=" formValidate.LeageMode" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="市" prop="CityCode">
                <Select v-model=" formValidate.LeageMode" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="区县" prop="DistinctCode">
                <Select v-model=" formValidate.LeageMode" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Col>
          <Col span="10">
            <Col span="24">
              <FormItem label="地址" prop="Address">
                <Input v-model="formValidate.Address" placeholder="请输入" style="width:300px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="邮编" prop="PostalCode">
                <Input v-model="formValidate.PostalCode" placeholder="请输入" style="width:300px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系电话" prop="TelPhone">
                <Input v-model="formValidate.TelPhone" placeholder="请输入" style="width:300px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="传真" prop="Fax">
                <Input v-model="formValidate.Fax" placeholder="请输入" style="width:300px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系人姓名" prop="ContactName">
                <Input v-model="formValidate.ContactName" placeholder="请输入" style="width:300px" disabled ></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系人电话" prop="ContactTel">
                <Input v-model="formValidate.ContactTel" placeholder="请输入" style="width:300px" disabled ></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系人手机" prop="ContactPhone">
                <Input v-model="formValidate.ContactPhone" placeholder="请输入" style="width:300px" disabled ></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系人邮箱" prop="ContactEMail">
                <Input v-model="formValidate.ContactEMail" placeholder="请输入" style="width:300px" disabled ></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="业务状态" prop="ContactEMail">
                <RadioGroup v-model="formValidate.Status">
                  <Radio v-for="item in StatusList" :label="item.Code">
                    <span>{{item.Description}}</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <div class="footer_left">
          <div class="footer_left1">
            <div>
              <span>创建人:闫子健</span>
            </div>
            <div>
              <span>更新人:闫子健</span>
            </div>
          </div>
          <div class="footer_left2">
            <div>
              <span>创建时间:2018/12/13/ 13:00:00</span>
            </div>
            <div>
              <span>更新时间:2018/12/13/ 13:00:00</span>
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
     <!-- 删除信息弹出框 -->
    <Modal v-model="delete1" title="提示" @on-ok="deleteList">
      <h3>确定删除此数据？</h3>
    </Modal>
    <!-- 修改信息 弹出框-->
    <Modal v-model="upDepartment" scrollable width="1300" title="添加加盟商信息" :mask-closable="false">
      <Form
        ref="UpdateList"
        :model="UpdateList"
        :rules="ruleValidate"
        label-position="right"
        :label-width="160"
      >
        <Row>
          <Col span="14">
            <Col span="12">
              <FormItem label="所属业务群" prop="BusinessGroup">
                <Select v-model="UpdateList.BusinessGroup" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="加盟商代码" prop="Code">
                <Input v-model="UpdateList.Code" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客户名称" prop="Name">
                <Input v-model="UpdateList.Name" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客户简称" prop="ShortName">
                <Input v-model="UpdateList.ShortName" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="描述" prop="Description">
                <Input
                  v-model="UpdateList.Description"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="请输入"
                  style="width:571px;"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="加盟商类型" prop="FranchiserType">
                <Select v-model=" UpdateList.FranchiserType" style="width:200px">
                  <Option
                  v-for="item in FranchiserTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="负责人" prop="LegalOwner">
                <Input v-model="UpdateList.LegalOwner" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件类型" prop="CertificateType">
                <Select v-model=" UpdateList.CertificateType" style="width:200px">
                 <Option
                  v-for="item in CertificateTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件号" prop="CertificateNo">
                <Input v-model="UpdateList.CertificateNo" placeholder="请输入" style="width:200px"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="业务类型" prop="BusinessType">
                <Select v-model=" UpdateList.BusinessType" style="width:200px" disabled >
                  <Option
                  v-for="item in BusinessTypeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="加盟方式" prop="LeageMode">
                <Select v-model=" UpdateList.LeageMode" style="width:200px">
                  <Option
                  v-for="item in LeageModeList"
                  :value="item.Id"
                  :key="item.Code"
                >{{ item.Description }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="开始日期" prop="FromDate">
                <DatePicker type="date" v-model=" UpdateList.FromDate" placeholder="Select date" style="width: 200px"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="结束日期" prop="ToDate">
                 <DatePicker type="date" v-model=" UpdateList.ToDate" placeholder="Select date" style="width: 200px"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="所在大区" prop="RegionCode">
                <Select v-model=" UpdateList.LeageMode" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="省" prop="ProviceCode">
                <Select v-model=" UpdateList.LeageMode" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="市" prop="CityCode">
                <Select v-model=" UpdateList.LeageMode" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="区县" prop="DistinctCode">
                <Select v-model=" UpdateList.LeageMode" style="width:200px">
                  <Option
                    v-for="item in BusinessGroupList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Col>
          <Col span="10">
            <Col span="24">
              <FormItem label="地址" prop="Address">
                <Input v-model="UpdateList.Address" placeholder="请输入" style="width:300px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="邮编" prop="PostalCode">
                <Input v-model="UpdateList.PostalCode" placeholder="请输入" style="width:300px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系电话" prop="TelPhone">
                <Input v-model="UpdateList.TelPhone" placeholder="请输入" style="width:300px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="传真" prop="Fax">
                <Input v-model="UpdateList.Fax" placeholder="请输入" style="width:300px"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系人姓名" prop="ContactName">
                <Input v-model="UpdateList.ContactName" placeholder="请输入" style="width:300px" disabled ></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系人电话" prop="ContactTel">
                <Input v-model="UpdateList.ContactTel" placeholder="请输入" style="width:300px" disabled ></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系人手机" prop="ContactPhone">
                <Input v-model="UpdateList.ContactPhone" placeholder="请输入" style="width:300px" disabled ></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="联系人邮箱" prop="ContactEMail">
                <Input v-model="UpdateList.ContactEMail" placeholder="请输入" style="width:300px" disabled ></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="业务状态" prop="ContactEMail">
                <RadioGroup v-model="UpdateList.Status">
                  <Radio v-for="item in StatusList" :label="item.Code">
                    <span>{{item.Description}}</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <div class="footer_left">
          <div class="footer_left1">
            <div>
              <span>创建人:闫子健</span>
            </div>
            <div>
              <span>更新人:闫子健</span>
            </div>
          </div>
          <div class="footer_left2">
            <div>
              <span>创建时间:2018/12/13/ 13:00:00</span>
            </div>
            <div>
              <span>更新时间:2018/12/13/ 13:00:00</span>
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
          <span>确定</span>
        </button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { FranchiserProfileGetEntities,FranchiserProfileBatchDelete,FranchiserProfileCreate, getFRANCHISER_STATUS,getFRANCHISER_TYPE ,getCERTIFICATE_TYPE,getLEAGE_MODE} from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      // 日期框
      options2: {
        shortcuts: [
          {
            text: "1 week",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "1 month",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "3 months",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      // 内容表格
      informationTable: [
        { type: "selection", width: 45 },
        {
          title: "加盟商代码",
          key: "Code",
          width: 120,
          sortable: true
        },
        {
          title: "客户名称",
          key: "Name",
          width: 110,
          sortable: true
        },
        {
          title: "客户简称",
          key: "ShortName",
          width: 110,
          sortable: true
        },
        {
          title: "加盟商类型",
          key: "FranchiserType",
          width: 120,
          sortable: true
        },
        {
          title: "负责人",
          key: "LegalOwner",
          width: 100,
          sortable: true
        },
        {
          title: "证件类型",
          key: "CertificateType",
          width: 110,
          sortable: true
        },
        {
          title: "证件号",
          key: "CertificateNo",
          width: 100,
          sortable: true
        },
        {
          title: "业务类型",
          key: "BusinessType",
          width: 110,
          sortable: true
        },
        {
          title: "加盟方式",
          key: "LeageMode",
          width: 110,
          sortable: true
        },
        {
          title: "开始日期",
          ellipsis: true,
          width: 110,
          sortable: true,
          key: "FromDate",
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.FromDate,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.FromDate
                )
              ]
            );
          }
        },
        {
          title: "结束日期",
          ellipsis: true,
          width: 110,
          sortable: true,
          key: "ToDate",
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.ToDate,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.ToDate
                )
              ]
            );
          }
        },
        {
          title: "所在大区",
          key: "RegionCode",
          width: 110,
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
          title: "区县",
          key: "DistinctCode",
          width: 80,
          sortable: true
        },
        {
          title: "邮编",
          key: "PostalCode",
          width: 100,
          sortable: true
        },
        {
          title: "业务状态 ",
          key: "Status",
          width: 110,
          sortable: true
        },
        {
          title: "联系电话",
          key: "TelPhone",
          width: 110,
          sortable: true
        },
        {
          title: "传真",
          key: "Fax",
          width: 80,
          sortable: true
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
          width: 100,
          sortable: true
        },
        {
          title: "创建时间",
          ellipsis: true,
          width: 110,
          sortable: true,
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
      // 点击全选将所有的数据渲染
      getTableData: {
        Filters: {}
      },
      informationData: [],
      // 业务状态 
      StatusList: [],
      // 加盟商类型
      FranchiserTypeList:[],
      queryStatus: "全部",
      // 查询
      querySelectList: [
        {
          value: "Code",
          label: "加盟商代码"
        },
        {
          value: "Name",
          label: "客户名称"
        },
        {
          value: "ShortName",
          label: "客户简称"
        },
        {
          value: "LegalOwner",
          label: "负责人"
        },
        {
          value: "CertificateNo",
          label: "证件号"
        }
      ],
      queryvalue: "",
      querySelect: "",
      // 添加/修改加盟商基本信息默认隐藏
      AddDepartment: false,
      upDepartment: false,
      // 添加信息表单
      formValidate: {
        BusinessGroup: "",
        Code:"",
        Name:"",
        ShortName:"",
        LongDescription:"",
        FranchiserType:"",
        LegalOwner:"",
        CertificateType:"",
        CertificateNo:"",
        BusinessType:"",
        LeageMode:"",
        FromDate:"",
        ToDate:"",
        RegionCode:"",
        ProviceCode:"",
        CityCode:"",
        DistinctCode:"",
        Address:"",
        PostalCode:"",
        Status:"",
        TelPhone:"",
        Fax:"",
        ContactName:"",
        ContactTel:"",
        ContactPhone:"",
        ContactEMail:"",
      },
      // 修改信息表单
      UpdateList: {
        BusinessGroup: "",
        Code:"",
        Name:"",
        ShortName:"",
        LongDescription:"",
        FranchiserType:"",
        LegalOwner:"",
        CertificateType:"",
        CertificateNo:"",
        BusinessType:"",
        LeageMode:"",
        FromDate:"",
        ToDate:"",
        RegionCode:"",
        ProviceCode:"",
        CityCode:"",
        DistinctCode:"",
        Address:"",
        PostalCode:"",
        Status:"",
        TelPhone:"",
        Fax:"",
        ContactName:"",
        ContactTel:"",
        ContactPhone:"",
        ContactEMail:"",
      },
      // 所属业务群
      BusinessGroupList: [
        {
          value: "0",
          label: "比特易早教"
        }
      ],
      // 删除信息弹出框
      delete1: false,
      BatchDeleteList: [],
      delete: [],
    };
  },
  methods:{
    // 添加加盟商信息
    handleSubmit(){
      FranchiserProfileCreate(this.formValidate)
      .then(res =>{
        this.$Message.success("成功!");
        this.AddDepartment = false;
        this.reload();
        this.formValidate = { brand_right: 0 };
      }).catch(err => {
        this.$Message.error("失败!");
        console.log(err);
      });
    },
    // 删除数据接口
    deleteList() {
      if (this.BatchDeleteList.length == 0) {
        this.$Message.info("请先选中删除的数据");
      } else {
        FranchiserProfileBatchDelete(this.delete)
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
    //详情修改页面
    dblclickUpData(index) {
      this.upDepartment = true;
      this.UpdateList = index;
      console.log(index);
    },
  },
  mounted() {
    // 表格数据
    FranchiserProfileGetEntities(this.getTableData)
      .then(res => {
        this.informationData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 业务状态
    getFRANCHISER_STATUS()
      .then(res => {
        this.StatusList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
     // 加盟商类型
    getFRANCHISER_TYPE()
      .then(res => {
        this.FranchiserTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
     // 证件类型
    getCERTIFICATE_TYPE()
      .then(res => {
        this.CertificateTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
      // 加盟方式
    getLEAGE_MODE()
      .then(res => {
        this.LeageModeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
