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
                v-model="StartEndDate"
                type="daterange"
                @on-change="queryData"
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
              <Button @click="allinformationData" type="text" class="tableTops">全部</Button>
              <RadioGroup v-model="RadioGroupStatus" type="button" @on-change="queryData">
                <Radio v-for="item in StatusList" :key="item.Code" :label="item.Id">
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
          height="550"
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
    <!-- 添加信息 弹出框-->
    <Modal
      v-model="AddDepartment"
      scrollable
      width="1100"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <p slot="header" style="text-align:left;line-height: 1;">
        <span v-if="add">添加加盟商信息</span>
        <span v-if="see">查看加盟商信息</span>
      </p>
      <p slot="close" style="margin-right:10px;line-height: 3;" @click="close('formValidate')">
        <Icon type="md-close" size="20" color="gray"/>
      </p>
      <Tabs>
        <TabPane label="加盟商信息" name="name1">
          <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            label-position="right"
            :label-width="120"
          >
            <Row>
              <Col span="24">
                <Col span="24">
                  <Col span="18">
                    <Col span="24">
                      <FormItem label="加盟商代码" prop="Code">
                        <Input v-model="formValidate.Code" placeholder="请输入" style="width:650px"></Input>
                      </FormItem>
                    </Col>
                    <Col span="14">
                      <FormItem label="客户名称" prop="Name">
                        <Input v-model="formValidate.Name" placeholder="请输入" style="width:350px"></Input>
                      </FormItem>
                    </Col>
                    <Col span="10">
                      <FormItem label="客户简称" prop="ShortName">
                        <Input
                          v-model="formValidate.ShortName"
                          placeholder="请输入"
                          style="width:180px"
                        ></Input>
                      </FormItem>
                    </Col>
                    <Col span="11">
                      <FormItem label="所属业务群" prop="BusinessGroup">
                        <Select v-model="formValidate.BusinessGroup">
                          <Option
                            v-for="item in BusinessGroupList"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem label="业务类型" prop="BusinessType">
                        <Select v-model="formValidate.BusinessType">
                          <Option
                            v-for="item in BusinessTypeList"
                            :value="item.Description"
                            :key="item.Code"
                          >{{ item.Description }}</Option>
                        </Select>
                      </FormItem>
                    </Col>

                    <Col span="11">
                      <FormItem label="加盟商类型" prop="FranchiserType">
                        <Select v-model="formValidate.FranchiserType">
                          <Option
                            v-for="item in FranchiserTypeList"
                            :value="item.Description"
                            :key="item.Code"
                          >{{ item.Description }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem label="加盟方式" prop="LeageMode">
                        <Select v-model="formValidate.LeageMode">
                          <Option
                            v-for="item in LeageModeList"
                            :value="item.Description"
                            :key="item.Code"
                          >{{ item.Description }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  </Col>
                  <Col span="6">
                    <div>上传证件</div>
                    <div class="demo-upload-list" v-for="item in uploadList">
                      <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <Upload
                      ref="upload"
                      :show-upload-list="false"
                      :default-file-list="defaultList"
                      :on-success="handleSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="handleBeforeUpload"
                      multiple
                      type="drag"
                      action="//jsonplaceholder.typicode.com/posts/"
                      style="display: inline-block;width:58px;"
                    >
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                      </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                      <img
                        :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                        v-if="visible"
                        style="width: 100%"
                      >
                    </Modal>
                  </Col>
                </Col>
                <Col span="24">
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
                </Col>
                <Col span="11">
                  <FormItem label="开始日期" prop="FromDate">
                    <DatePicker
                      type="date"
                      v-model="formValidate.FromDate"
                      placeholder="Select date"
                      style="width: 368px"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="结束日期" prop="ToDate">
                    <DatePicker
                      type="date"
                      v-model="formValidate.ToDate"
                      placeholder="Select date"
                      style="width: 413px"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="证件类型" prop="CertificateType">
                    <Select v-model="formValidate.CertificateType">
                      <Option
                        v-for="item in CertificateTypeList"
                        :value="item.Description"
                        :key="item.Code"
                      >{{ item.Description }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="证件号" prop="CertificateNo">
                    <Input v-model="formValidate.CertificateNo" placeholder="请输入"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="负责人" prop="LegalOwner">
                    <Input v-model="formValidate.LegalOwner" placeholder="请输入" style="width:192px"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="省" prop="ProviceCode">
                    <Select
                      v-model="formValidate.ProviceCode"
                      :label-in-value="true"
                      @on-change="SelectProviceCode"
                    >
                      <Option
                        v-for="item in ProviceCodeList"
                        :value="item.Name"
                        :key="item.Code"
                      >{{ item.Name }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
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
                <Col span="6">
                  <FormItem label="区县" prop="DistinctCode">
                    <Select v-model="formValidate.DistinctCode" @on-change="SelectDistinctCode">
                      <Option
                        v-for="item in DistinctCodeList"
                        :value="item.Id"
                        :key="item.Code"
                      >{{ item.Name }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
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
                  <FormItem label="联系电话" prop="TelPhone">
                    <Input v-model="formValidate.TelPhone" placeholder="请输入"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="传真" prop="Fax">
                    <Input v-model="formValidate.Fax" placeholder="请输入"></Input>
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
                  <FormItem label="业务状态" prop="Status">
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
        </TabPane>
        <TabPane label="门店信息" name="name2" v-if="TabBusinessStores">
          <Row style="position:absolute;width:1065px; height:750px; overflow:auto">
            <Col
              span="10"
              offset="1"
              v-for="(item, index) in BusinessStoresList"
              :key="index"
              style="margin-bottom:10px;"
            >
              <Card>
                <p slot="title">{{ item.Description }}</p>
                <Button
                  slot="extra"
                  size="small"
                  type="text"
                  @click="say(index,$event)"
                >{{ EditSave }}</Button>
                <Form
                  ref="FormBusinessStores"
                  :model="FormBusinessStores"
                  label-position="right"
                  :label-width="80"
                >
                  <Row>
                    <Col span="24">
                      <Col span="22">
                        <FormItem label="门店类型:" prop="StoreType" class="margin_bottom">
                          <Input v-if="BusinessStoresInput" v-model="FormBusinessStores.StoreType"></Input>
                          <p v-if="BusinessStoresP">{{ item.StoreType }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="业务状态:" prop="Status" class="margin_bottom">
                          <Input v-if="BusinessStoresInput" v-model="FormBusinessStores.Status"></Input>
                          <p v-if="BusinessStoresP">{{ item.Status }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="开业日期:" prop="OpenOn" class="margin_bottom">
                          <Input v-if="BusinessStoresInput" v-model="FormBusinessStores.OpenOn"></Input>
                          <p v-if="BusinessStoresP">{{ item.OpenOn }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="地址:" prop="OpenOn" class="margin_bottom">
                          <Input v-if="BusinessStoresInput" v-model="FormBusinessStores.OpenOn"></Input>
                          <p
                            v-if="BusinessStoresP"
                          >{{ item.ProviceCode +"-"+ item.CityCode +"-"+ item.Address}}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="邮编:" prop="PostalCode" class="margin_bottom">
                          <Input v-if="BusinessStoresInput" v-model="FormBusinessStores.PostalCode"></Input>
                          <p v-if="BusinessStoresP">{{ item.PostalCode }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="经纬度:" prop="Latitude" class="margin_bottom">
                          <Input v-if="BusinessStoresInput" v-model="FormBusinessStores.Latitude"></Input>
                          <p v-if="BusinessStoresP">{{ item.Longitude +"-"+ item.Latitude }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="联系电话:" prop="TelPhone" class="margin_bottom">
                          <Input v-if="BusinessStoresInput" v-model="FormBusinessStores.TelPhone"></Input>
                          <p v-if="BusinessStoresP">{{ item.TelPhone }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="传真:" prop="Fax" class="margin_bottom">
                          <Input v-if="BusinessStoresInput" v-model="FormBusinessStores.Fax"></Input>
                          <p v-if="BusinessStoresP">{{ item.Fax }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="联系人姓名:" prop="ContactName" class="margin_bottom">
                          <Input
                            v-if="BusinessStoresInput"
                            v-model="FormBusinessStores.ContactName"
                          ></Input>
                          <p v-if="BusinessStoresP">{{ item.ContactName }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="联系人电话:" prop="ContactTel" class="margin_bottom">
                          <Input v-if="BusinessStoresInput" v-model="FormBusinessStores.ContactTel"></Input>
                          <p v-if="BusinessStoresP">{{ item.ContactTel }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="联系人手机:" prop="ContactPhone" class="margin_bottom">
                          <Input
                            v-if="BusinessStoresInput"
                            v-model="FormBusinessStores.ContactPhone"
                          ></Input>
                          <p v-if="BusinessStoresP">{{ item.ContactPhone }}</p>
                        </FormItem>
                      </Col>
                      <Col span="22">
                        <FormItem label="联系人邮箱:" prop="ContactEMail" class="margin_bottom">
                          <Input
                            v-if="BusinessStoresInput"
                            v-model="FormBusinessStores.ContactEMail"
                          ></Input>
                          <p v-if="BusinessStoresP">{{ item.ContactEMail }}</p>
                        </FormItem>
                      </Col>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
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
      EditSave: "编辑",
      BusinessStoresInput: false,
      BusinessStoresP: true,
      // 接口
      Interface: "FranchiserProfile",
      // 查看时显示门店 添加时隐藏
      TabBusinessStores: true,
      // 地址
      queryProviceCode: "",
      queryCityCode: "",
      queryDistinctCode: "",
      ProviceCodeList: [],
      CityCodeList: [],
      DistinctCodeList: [],
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
          sortable: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: { placement: "top" }
              },
              [
                params.row.CertificateNo,
                h(
                  "span",
                  {
                    slot: "content",
                    style: { whiteSpace: "normal", wordBreak: "break-all" }
                  },
                  params.row.CertificateNo
                )
              ]
            );
          }
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
          sortable: true,
          render: (h, params) => {
            let texts = "";
            if (params.row.Status == 0) {
              texts = "待开业";
            }
            if (params.row.Status == 1) {
              texts = "正常运营";
            }
            if (params.row.Status == 2) {
              texts = "合约过期";
            }
            if (params.row.Status == 3) {
              texts = "暂停业务";
            }
            return h(
              "div",
              {
                props: {}
              },
              texts
            );
          }
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
      // 弹框标题信息
      add: "",
      see: "",
      del: "",
      // 创建人
      Founder: "",
      UpdatePerson: "",
      CreationTime: "",
      UpdateTime: "",
      //表格数组
      // 点击全选将所有的数据渲染
      getTableData: {
        Filters: {}
      },
      informationData: [],
      // 业务状态
      StatusList: [],
      // 加盟商类型
      FranchiserTypeList: [],
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
      StartEndDate: "",
      queryvalue: "",
      querySelect: "",
      RadioGroupStatus: "",
      // 表单验证
      ruleValidate: {},
      // 添加/修改加盟商基本信息默认隐藏
      AddDepartment: false,
      upDepartment: false,
      // 添加信息表单
      formValidate: {
        BusinessGroup: "",
        Code: "",
        Name: "",
        ShortName: "",
        LongDescription: "",
        FranchiserType: "",
        LegalOwner: "",
        CertificateType: "",
        CertificateNo: "",
        BusinessType: "",
        LeageMode: "",
        FromDate: "",
        ToDate: "",
        ProviceCode: "",
        CityCode: "",
        DistinctCode: "",
        Address: "",
        PostalCode: "",
        Status: "",
        TelPhone: "",
        Fax: "",
        ContactName: "",
        ContactTel: "",
        ContactPhone: "",
        ContactEMail: ""
      },
      // 门店信息
      FormBusinessStores: {
        StoreType: "",
        Status: "",
        OpenOn: "",
        PostalCode: "",
        Latitude: "",
        TelPhone: "",
        Fax: "",
        ContactName: "",
        ContactTel: "",
        ContactPhone: "",
        ContactEMail: ""
      },
      // 所属业务群
      BusinessGroupList: [
        {
          value: "0",
          label: "比特易早教"
        }
      ],
      BusinessStoresList: [],
      // 删除信息弹出框
      delete1: false,
      BatchDeleteList: [],
      delete: [],
      // 证件类型下拉框数据
      CertificateTypeList: [],
      // 业务类型下拉框数据
      BusinessTypeList: [],
      // 加盟方式下拉框数据
      LeageModeList: [],
      // 查询日期
      FromToDate: "",
      // 上传证件
      defaultList: [
        {
          name: "a42bdcc1178e62b4694c830f028db5c0",
          url:
            "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
        },
        {
          name: "bc7521e033abdd1e92222d733590f104",
          url:
            "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
        }
      ],
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
    say(index, e) {
      // e.target 是你当前点击的元素
      // e.currentTarget 是你绑定事件的元素
      console.log(e.target);
      console.log(e.currentTarget);
      console.log(this.BusinessStoresList[index]);
      if (this.BusinessStoresList[index]) {
        if (this.EditSave == "编辑") {
          this.EditSave = "保存";
          this.BusinessStoresInput = true;
          this.BusinessStoresP = false;
        } else if (this.EditSave == "保存") {
          this.EditSave = "编辑";
          this.BusinessStoresInput = false;
          this.BusinessStoresP = true;
        }
      }
    },
    close(name) {
      this.$refs[name].resetFields();
    },
    //选择省获取 市数据
    SelectProviceCode(value) {
      this.queryDistinctCode = "";
      this.queryCityCode = "";
      let ParentId = value.value;
      DistrictGetArea(ParentId)
        .then(res => {
          this.CityCodeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      GetEntities(this.Interface, {
        Filters: [
          {
            Relational: "And",
            Conditions: [
              {
                FilterField: "ProviceCode",
                Relational: "Equal",
                FilterValue: ParentId
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
    //点击市获取 区县数据
    SelectCityCode(value) {
      let ParentId = value.value;
      DistrictGetArea(ParentId)
        .then(res => {
          this.DistinctCodeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      GetEntities(this.Interface, {
        Filters: [
          {
            Relational: "And",
            Conditions: [
              {
                FilterField: "CityCode",
                Relational: "Equal",
                FilterValue: ParentId
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
    SelectDistinctCode(value) {
      let keyId = value;
      DistrictGetEntity(keyId)
        .then(res => {
          // 获取到区县的邮编放到添加的邮编输入框中
          this.formValidate.PostalCode = res.data.PostalCode;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 添加
    AddDepartment1() {
      this.TabBusinessStores = false;
      this.AddDepartment = true;
      let see = JSON.parse(sessionStorage.getItem("userInfo"));
      this.formValidate.CreateByName = see.AccountName;
      this.formValidate.BusinessGroup = see.BusinessUnit;
      this.add = true;
      this.see = false;
      this.del = false;
    },
    // 点击全部查询全部数据
    allinformationData() {
      let FromDate = this.StartEndDate[0];
      let ToDate = this.StartEndDate[1];
      GetEntities(this.Interface, {
        Filters: [
          {
            Relational: "And",
            Conditions: [
              {
                FilterField: "Status",
                Relational: "Equal",
                FilterValue: " "
              }
            ]
          },
          {
            Relational: "And",
            Conditions: [
              {
                FilterField: "FromDate",
                Relational: "GreaterEqualThan",
                FilterValue: FromDate
              },
              {
                FilterField: "ToDate",
                Relational: "LessEqualThan",
                FilterValue: ToDate
              }
            ]
          }
        ]
      })
        .then(res => {
          this.RadioGroupStatus = "";
          this.informationData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 添加/修改加盟商信息
    handleSubmit(name) {
      // 验证表单
      this.$refs[name].validate(valid => {
        // 验证表单成功后调用
        if (valid) {
          // 当进入的是添加弹框就调用添加接口
          if (this.add == true) {
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
          } else if (this.see == true) {
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
    // 删除数据接口
    deleteList() {
      if (this.delete.length == 0) {
        this.$Message.info("请先选中删除的数据");
      } else {
        this.delete1 = true;
      }
    },
    OneselectionId(selection, row) {
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
    OnecancelselectionId(selection, row) {
      function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      }
      removeByValue(this.delete, row.Id);
    },
    allselectionId(selection) {
      console.log(this.delete);
      for (var i = 0; i < selection.length; i++) {
        this.delete.push(selection[i].Id);
      }
    },
    allcancelselectionId(selection) {
      this.delete = selection;
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
      } else if (this.see == true) {
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
    //详情修改页面
    dblclickUpData(index) {
      console.log(index);
      this.TabBusinessStores = true;
      this.AddDepartment = true;
      this.formValidate = index;
      this.add = false;
      this.see = true;
      this.del = true;
    },
    upTabs(name) {
      localStorage.setItem("name", name);
    },

    // 取消
    handleReset(name) {
      this.formValidate = { brand_right: 0 };
      this.$refs[name].resetFields();
      this.$Message.info("已取消");
    },
    // 业务状态查询
    // 日期框查询
    queryData() {
      let FromDate = this.StartEndDate[0];
      let ToDate = this.StartEndDate[1];
      GetEntities(this.Interface, {
        Filters: [
          {
            Relational: "And",
            Conditions: [
              {
                FilterField: "FromDate",
                Relational: "GreaterEqualThan",
                FilterValue: FromDate
              },
              {
                FilterField: "ToDate",
                Relational: "LessEqualThan",
                FilterValue: ToDate
              }
            ]
          },
          {
            Relational: "And",
            Conditions: [
              {
                FilterField: "Status",
                Relational: "Equal",
                FilterValue: this.RadioGroupStatus
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
    // 上传证件
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    // 表格数据
    GetEntities(this.Interface, this.getTableData)
      .then(res => {
        this.informationData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // // 业务状态
    this.StatusList = JSON.parse(localStorage.FRANCHISER_STATUS);
    // 加盟商类型
    this.FranchiserTypeList = JSON.parse(localStorage.FRANCHISER_TYPE);
    // 证件类型
    this.CertificateTypeList = JSON.parse(localStorage.CERTIFICATE_TYPE);
    // 加盟方式
    this.LeageModeList = JSON.parse(localStorage.LEAGE_MODE);
    //获取指定大区省份信息
    DistrictGetProvince()
      .then(res => {
        this.ProviceCodeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //业务类型
    GetEntities("BusinessType", this.getTableData)
      .then(res => {
        this.BusinessTypeList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 所属加盟商的门店信息
    GetEntities("BusinessStore", {
      Filters: [
        {
          Relational: "And", //And 与 | Or 或
          Conditions: [
            {
              FilterField: "FranchiserId", //字段名
              Relational: "Equal",
              FilterValue: this.formValidate.Id //字段名里面的值
            }
          ]
        }
      ]
    })
      .then(res => {
        this.BusinessStoresList = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.margin_bottom {
  margin-bottom: 9px;
}
</style>