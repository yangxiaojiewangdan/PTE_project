
<template>
  <div id="PersonnelManagement">
    <Row>
      <Col span="24" style="height:100px;">
        <h1 class="setHeader">人员管理设置</h1>
      </Col>
    </Row>
    <Row class="content">
      <Col span="6" style="height:750px;">
        <Col span="24" style="height:40px;">
          <h2 class="content_left">公司组织结构</h2>
        </Col>
        <!-- 树状图 -->
        <Col span="24">
          <Tree :data="treeList" class="tree" :render="renderContent" children-key="ChildNodes"></Tree>
        </Col>
        <!-- 树状图 end-->
      </Col>
      <Col span="18" style="height:750px;">
        <Col span="24" style="height:40px;">
          <h2 class="content_left">人员列表</h2>
        </Col>
        <Col span="24">
          <!-- 表格上面的功能 -->
          <Col span="24">
            <div class="organization">
              <Button @click="AddDepartment = true" type="success" class="organization_tableTop">添加</Button>
              <Button @click="deleteList" type="error" class="organization_tableTop">删除</Button>
              <Select v-model="model1" style="width:100px" class="organization_tableTop">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Input
                v-model="value"
                placeholder="Enter something..."
                style="width: 150px"
                class="organization_tableTop"
              />
              <Button type="primary" class="organization_tableTop">查询</Button>
            </div>
          </Col>
          <!-- 表格上面的功能 end-->
        </Col>
        <Col span="24">
          <!-- 表格 -->
          <Table
            height="560"
            size="small"
            @on-row-dblclick="onEditMoney"
            highlight-row
            stripe
            border
            ref="selection"
            :columns="columns4"
            :data="data1"
            @on-select="delBusinessUnitData"
          ></Table>
          <!-- 表格 end-->
        </Col>
        <Col span="24">
          <!-- 分页 -->
          <Page :total="100" class="page"/>
          <!-- 分页 end-->
        </Col>
      </Col>
    </Row>
    <!-- 删除信息弹出框 -->
    <Modal v-model="delete1" title="提示" @on-ok="ok" @on-cancel="cancel">
      <h2>确定删除此数据？</h2>
    </Modal>
    <!-- 删除信息弹出框 end-->
    <!-- 添加信息 弹出框-->
    <Modal v-model="AddDepartment" width="1300" title="添加用户信息" :mask-closable="false">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="24">
            <Col span="24">
              <FormItem label="部门名称" prop="BusinessUnit">
                <Input
                  v-model="formValidate.BusinessUnit"
                  placeholder="Enter something..."
                  style="width:200px"
                />
              </FormItem>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="姓" prop="FirstName">
                  <Input
                    v-model="formValidate.FirstName"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="名" prop="LastName">
                  <Input
                    v-model="formValidate.LastName"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="性别" prop="Gender">
                  <RadioGroup v-model="formValidate.Gender">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="出生日期" prop="BrithDate">
                  <DatePicker
                    v-model="formValidate.BrithDate"
                    type="date"
                    placeholder="Select date"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="入职日期" prop="JoinDate">
                  <DatePicker
                    v-model="formValidate.JoinDate"
                    type="date"
                    placeholder="Select date"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="离职日期" prop="LeaveDate">
                  <DatePicker
                    v-model="formValidate.LeaveDate"
                    type="date"
                    placeholder="Select date"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="职位" prop="Title">
                  <Input v-model="formValidate.Title" placeholder="请输入......" style="width:200px"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="固定电话" prop="TelPhone">
                  <Input
                    v-model="formValidate.TelPhone"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="手机" prop="MobilePhone">
                  <Input
                    v-model="formValidate.MobilePhone"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="主管姓名" prop="Supervisor">
                  <Select v-model="formValidate.Supervisor" style="width:200px" placeholder="请选择">
                    <OptionGroup label="Hot Cities">
                      <Option
                        v-for="item in cityList1"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </OptionGroup>
                    <OptionGroup label="Other Cities">
                      <Option
                        v-for="item in cityList2"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </OptionGroup>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="微信号" prop="WeChat">
                  <Input v-model="formValidate.WeChat" placeholder="请输入......" style="width:200px"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="QQ号" prop="QQ">
                  <Input v-model="formValidate.QQ" placeholder="请输入......" style="width:200px"/>
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="邮箱" prop="Email">
                  <Input v-model="formValidate.Email" placeholder="请输入......" style="width:200px"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="邮编" prop="PostalCode">
                  <Input
                    v-model="formValidate.PostalCode"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="地址" prop="Address">
                  <Input
                    v-model="formValidate.Address"
                    placeholder="请输入......"
                    style="width:305px"
                  />
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="登录账号" prop="Account">
                  <Input
                    v-model="formValidate.Account"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="登录密码" prop="AccountPwd">
                  <Input
                    type="Password"
                    v-model="formValidate.AccountPwd"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="角色名称" prop="RoleName">
                  <Input
                    v-model="formValidate.RoleName"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="6">
                <FormItem label="允许登录" prop="AllowLogin">
                  <i-switch v-model="formValidate.AllowLogin" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                  </i-switch>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="主管标识" prop="IsSupervisor">
                  <i-switch v-model="formValidate.IsSupervisor" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                  </i-switch>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="管理员标识" prop="IsAdministrtor">
                  <i-switch v-model="formValidate.IsAdministrtor" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                  </i-switch>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="启用" prop="Enabled">
                  <i-switch v-model="formValidate.Enabled" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                  </i-switch>
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <FormItem label="备注" prop="Comments">
                <Input
                  v-model="formValidate.Comments"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="请输入"
                  style="width:1000px;"
                ></Input>
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
    <!-- 添加信息 弹出框 end-->
    <!-- 查看信息 修改信息 弹出框-->
    <Modal v-model="UpDepartment" width="1300" title="查看用户信息" :mask-closable="false">
      <Form ref="SeeDepartment" :model="SeeDepartment" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="24">
            <Col span="24">
              <FormItem label="部门名称" prop="BusinessUnit">
                <Input
                  v-model="SeeDepartment.BusinessUnit"
                  placeholder="Enter something..."
                  style="width:200px"
                />
              </FormItem>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="姓" prop="FirstName">
                  <Input
                    v-model="SeeDepartment.FirstName"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="名" prop="LastName">
                  <Input
                    v-model="SeeDepartment.LastName"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="性别" prop="Gender">
                  <RadioGroup v-model="SeeDepartment.Gender">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="出生日期" prop="BrithDate">
                  <DatePicker
                    v-model="SeeDepartment.BrithDate"
                    type="date"
                    placeholder="Select date"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="入职日期" prop="JoinDate">
                  <DatePicker
                    v-model="SeeDepartment.JoinDate"
                    type="date"
                    placeholder="Select date"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="离职日期" prop="LeaveDate">
                  <DatePicker
                    v-model="SeeDepartment.LeaveDate"
                    type="date"
                    placeholder="Select date"
                    style="width: 200px"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="职位" prop="Title">
                  <Input v-model="SeeDepartment.Title" placeholder="请输入......" style="width:200px"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="固定电话" prop="TelPhone">
                  <Input
                    v-model="SeeDepartment.TelPhone"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="手机" prop="MobilePhone">
                  <Input
                    v-model="SeeDepartment.MobilePhone"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="主管姓名" prop="Supervisor">
                  <Select v-model="SeeDepartment.Supervisor" style="width:200px" placeholder="请选择">
                    <OptionGroup label="Hot Cities">
                      <Option
                        v-for="item in cityList1"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </OptionGroup>
                    <OptionGroup label="Other Cities">
                      <Option
                        v-for="item in cityList2"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </OptionGroup>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="微信号" prop="WeChat">
                  <Input
                    v-model="SeeDepartment.WeChat"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="QQ号" prop="QQ">
                  <Input v-model="SeeDepartment.QQ" placeholder="请输入......" style="width:200px"/>
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="邮箱" prop="Email">
                  <Input v-model="SeeDepartment.Email" placeholder="请输入......" style="width:200px"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="邮编" prop="PostalCode">
                  <Input
                    v-model="SeeDepartment.PostalCode"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="地址" prop="Address">
                  <Input
                    v-model="SeeDepartment.Address"
                    placeholder="请输入......"
                    style="width:305px"
                  />
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="8">
                <FormItem label="登录账号" prop="Account">
                  <Input
                    v-model="SeeDepartment.Account"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="登录密码" prop="AccountPwd">
                  <Input
                    type="Password"
                    v-model="SeeDepartment.AccountPwd"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="角色名称" prop="RoleName">
                  <Input
                    v-model="SeeDepartment.RoleName"
                    placeholder="请输入......"
                    style="width:200px"
                  />
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <Col span="6">
                <FormItem label="允许登录" prop="AllowLogin">
                  <i-switch v-model="SeeDepartment.AllowLogin" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                  </i-switch>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="主管标识" prop="IsSupervisor">
                  <i-switch v-model="SeeDepartment.IsSupervisor" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                  </i-switch>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="管理员标识" prop="IsAdministrtor">
                  <i-switch v-model="SeeDepartment.IsAdministrtor" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                  </i-switch>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="启用" prop="Enabled">
                  <i-switch v-model="SeeDepartment.Enabled" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                  </i-switch>
                </FormItem>
              </Col>
            </Col>
            <Col span="24">
              <FormItem label="备注" prop="Comments">
                <Input
                  v-model="SeeDepartment.Comments"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="请输入"
                  style="width:1000px;"
                ></Input>
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
          @click="SeehandleReset('SeeDepartment');UpDepartment = false;"
        >
          <span>取消</span>
        </button>
        <button
          type="button"
          class="ivu-btn ivu-btn-primary ivu-btn-large"
          @click="handleSubmit('SeeDepartment');"
        >
          <span>修改</span>
        </button>
      </div>
    </Modal>
    <!-- 查看信息 修改信息 弹出框 end-->
  </div>
</template>
<script>
	import { 
        uploadMessage,
        getTableData,
        UpdateUserData,
        getTreeList,
        deleteBusinessUser,
        } from '@/api/data'
    export default {
        inject:['reload'],
        data () {
            return {
                // input框中的值
                    value: '',
                // input框中的值 end
                // 树形图
                    treeList: [],
                    renderContent: (h, {
					root,
					node,
					data
				}) => {
					return(
						<span class="tree-item"> { data.Description } </span>
					)
				},
                // 树形图 end
                // 查询下拉框
                    cityList: [
                        {
                            value: 'New York',
                            label: 'New York'
                        },
                        {
                            value: 'London',
                            label: 'London'
                        },
                        {
                            value: 'Sydney',
                            label: 'Sydney'
                        },
                        {
                            value: 'Ottawa',
                            label: 'Ottawa'
                        },
                        {
                            value: 'Paris',
                            label: 'Paris'
                        },
                        {
                            value: 'Canberra',
                            label: 'Canberra'
                        }
                    ],
                    model1: '',
                // 查询下拉框 end    
                // 表格
                    columns4: [
                        {type: 'selection',width: 50,align: 'center',fixed: 'left'},
                        {title: '所属部门名称',key: 'BusinessUnit',width:130,sortable: true},
                        {title: '姓',key: 'FirstName',width:80,sortable: true},
                        {title: '名',key: 'LastName',width:80,sortable: true},
                        {title: '性别',key: 'Gender',width:80,sortable: true},
                        {title: '出生日期',key: 'BrithDate',width:120,sortable: true},
                        {title: '职位',key: 'Title',width:100,sortable: true},
                        {title: '固定电话',key: 'TelPhone',width:120,sortable: true},
                        {title: '手机',key: 'MobilePhone',width:120,sortable: true},
                        {title: '主管姓名',key: 'Supervisor',width:120,sortable: true},
                        {title: '邮箱',key: 'Email',width:160,sortable: true},
                        {title: '邮编',key: 'PostalCode',width:100,sortable: true},
                        {title: '允许登录系统',key: 'AllowLogin',width:150,sortable: true},
                        {title: '登录账号',key: 'Account',width:120,sortable: true},
                        {title: '角色名称',key: 'RoleName',width:120,sortable: true},
                        {title: '主管标识',key: 'IsSupervisor',width:120,sortable: true},
                        {title: '管理员标识',key: 'IsAdministrtor',width:120,sortable: true},
                        {title: '启用',key: 'Enabled',width:120,sortable: true},
                        {title: '创建人',key: 'CreateBy',width:120,sortable: true},
                        {title: '创建时间',key: 'CreateOn',width:150,sortable: true}
                    ],
                    //表格数组
                    data1: [],
                    //人员信息发送的数据
                    data4:{
                    		"Filters": {},
                    	},
                // 表格 end      
                // 删除信息弹出框
                    delete1: false,
                    delBusinessUnitList: [],
					delBusinessUnitArrs: [],
                // 删除信息弹出框 end   
                // 添加信息 弹出框
                    cityList: [
                        {
                            value: 'New York',
                            label: 'New York'
                        },
                    ],
                    cityList1: [
                        {
                            value: 'New York',
                            label: 'New York'
                        },
                        {
                            value: 'London',
                            label: 'London'
                        },
                        {
                            value: 'Sydney',
                            label: 'Sydney'
                        }
                    ],
                    cityList2: [
                        {
                            value: 'Ottawa',
                            label: 'Ottawa'
                        },
                        {
                            value: 'Paris',
                            label: 'Paris'
                        },
                        {
                            value: 'Canberra',
                            label: 'Canberra'
                        }
                    ],
                    Supervisor: '',
                    AddDepartment: false,
                    UpDepartment: false, 
                    formValidate: {
                        FirstName:'',
                        LastName:'',
                        Gender:'',
                        BrithDate:'',
                        JoinDate:'',
                        LeaveDate:'',
                        Title:'',
                        TelPhone:'',
                        MobilePhone:'',
                        Supervisor:'',
                        WeChat:'',
                        QQ:'',
                        Email:'',
                        PostalCode:'',
                        Address:'',
                        Account:'',
                        AccountPwd:'',
                        RoleName:'',
                        AllowLogin:true,
                        IsSupervisor:true,
                        Enabled:true,
                        IsAdministrtor:true,
                    },
                    SeeDepartment:{
                        FirstName:'',
                        LastName:'',
                        Gender:'',
                        BrithDate:'',
                        JoinDate:'',
                        LeaveDate:'',
                        Title:'',
                        TelPhone:'',
                        MobilePhone:'',
                        Supervisor:'',
                        WeChat:'',
                        QQ:'',
                        Email:'',
                        PostalCode:'',
                        Address:'',
                        Account:'',
                        AccountPwd:'',
                        RoleName:'',
                        AllowLogin:'',
                        IsSupervisor:'',
                        Enabled:'',
                        IsAdministrtor:'',
                    },
                    ruleValidate: {
                        // Code: [
                        //     { required: true, message: '部门代码不能为空', trigger: 'blur' },
                        //     { min: 8, max: 8, message: "长度必须是8位字符", trigger: "blur" },
                        //     { pattern:/^[0-9a-zA-Z]*$/g,message: "必须是字母加数值", trigger: "blur" }
                        // ],
//                      FirstName: [
//                          { required: true, message: '姓不能为空', trigger: 'blur' },
//                      ],
//                      LastName: [
//                          { required: true, message: '名不能为空', trigger: 'blur' },
//                      ],
//                      Address: [
//                          { required: true, message: '地址不能为空', trigger: 'blur' },
//                      ],
//                      Gender: [
//                          { required: true, message: '请选择性别', trigger: 'change' }
//                      ],
//                      BrithDate: [
//                          { required: true, message: '请选择出生日期', trigger: 'change' },
//                      ],
//                      JoinDate: [
//                          { required: true, message: '请选择入职日期', trigger: 'change' }
//                      ],
//                      TelPhone: [
//                          { pattern:/0\d{2}-\d{7,8}/,message: "请输入正确的座机号码", trigger: "blur" }
//                      ],
//                      MobilePhone: [
//                          { required: true, message: '手机号不能为空', trigger: 'blur' },
//                          { pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/,message: "请输入正确的手机号码", trigger: "blur" }
//                      ],
//                      Supervisor: [
//                          { required: true, message: '请选择主管姓名', trigger: 'change' }
//                      ],
//                      WeChat: [
//                         { pattern:/[\u4e00-\u9fa5]/gm,message: "请输入正确的微信号", trigger: "blur" }
//                      ],
//                      QQ: [
//                          { pattern:/^\d{5,10}$/,message: "请输入正确的QQ号", trigger: "blur" }
//                      ],
//                      Email: [
//                           {type: "email",required: true, message:"邮箱格式不正确",trigger: "blur"}
//                      ],
//                      PostalCode: [
//                          {type: "number", min: 8, max: 8,message: '邮编格式不正确', trigger: 'blur' },
//                      ],
//                      RoleName: [
//                          { required: true, message: '名不能为空', trigger: 'blur' },
//                      ],
//                      AccountPwd: [
//                          { pattern:/^\d{5,10}$/,message: "请输入正确的密码", trigger: "blur" }
//                      ],
//                      Account: [
//                          { pattern:/^\d{5,10}$/,message: "请输入正确的账号", trigger: "blur" }
//                      ],
                    }
                // 添加信息 弹出框 end  
            }
        },
        methods: {
        	//删除
        	deleteList() {
				if(this.delBusinessUnitList.length == 0) {
					this.$Message.info('请先选中删除的数据');
				} else {
					deleteBusinessUser(this.delBusinessUnitArrs).then(res => {
						this.$Message.success('删除成功!')
						this.reload();
					}).catch(err => {
						this.$Message.success('删除失败!')
						console.log(err)
					})
				}
			},
			delBusinessUnitData(selection) {
				console.log(selection);
				this.delBusinessUnitList = selection;
				for(var i = 0; i < this.delBusinessUnitList.length; i++) {
					this.delBusinessUnitArrs.push(this.delBusinessUnitList[i].Id)
				};
				console.log(this.delBusinessUnitArrs);
			},
            // 删除信息 弹出框函数
                ok () {
                    this.$Message.info('已删除');
                },
                cancel () {
                    this.$Message.info('已取消');
                },
            // 删除信息 弹出框函数 end
            // 添加信息 弹出框函数
                handleSubmit (name) {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                        	//如果正则正确就调用接口发送数据
                        	uploadMessage(this.formValidate).then(res => {
								  this.$Message.success('成功!');
								  this.AddDepartment = false;
								}).catch(err => {   
								  	console.log(err)
								})
                        } else {
                            this.$Message.error('请输入正确的格式!');
                        }
                    })
                },
                handleReset (name) {
                    this.$refs[name].resetFields();
                    this.$Message.info('已取消添加部门');
                },
            // 添加信息 弹出框函数 end
            // 查看信息 修改信息 弹出框函数
                onEditMoney(index){
                    this.UpDepartment = true;
                    this.SeeDepartment = index;
                    console.log(index)
                },
               SeehandleSubmit() {
                    UpdateUserData(this.SeeDepartment)
                        .then(res => {
                        this.$Message.success("修改成功!");
                        this.reload();
                        })
                        .catch(err => {
                        console.log(err);
                        });
                    }
               
            // 查看信息 修改信息 弹出框函数 end
        },
        mounted(){
        	//人员表格
        	getTableData(this.data4).then(res => {
			  this.data1 = res.data
			}).catch(err => {
			  console.log(err)
			})
			//树形结构
			getTreeList().then(res => {
				this.treeList = res.data
				console.log(this.treeList)
			}).catch(err => {
				console.log(err)
			});
        }
    }
</script>
<style lang="less" scoped>
#PersonnelManagement {
  .content {
    background: #fff;
    .content_left {
      border-bottom: 1px solid #dcdee2;
      line-height: 40px;
      margin: 10px;
    }
    .tree {
      margin: 30px 0 0 30px;
    }
    .organization {
      margin: 30px 20px 10px 0;
      float: right;
      .organization_tableTop {
        margin: 0 4px;
      }
    }
    .page {
      margin: 20px 30px 0 0;
      float: right;
    }
  }
}
</style>