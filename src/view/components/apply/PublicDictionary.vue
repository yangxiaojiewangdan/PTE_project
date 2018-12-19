<template>
	<div class="publicDictionary">
		<Row >
            <Col span="24" style="height:100px;">
                <h1 class="setHeader">公共字典查询</h1>
            </Col> 
        </Row>
        <Row class="content">
        	<Col span="6" style="height:750px;">
                <Col span="24" style="height:40px;">
                    <h2 class="content_left">公共字典结构</h2>
                </Col>
                <!-- 树状图 -->
                <Col span="24"push="2">
                	<Input search enter-button="搜索" placeholder="请输入搜索内容" size="default" class="inpSearch"/>
                    <Tree :data="data1" class="tree"></Tree>
                </Col>
                <!-- 树状图 end-->
            </Col>
            <Col span="18" style="height:750px;">
                <Col span="24" style="height:40px;">
                    <h2 class="content_left">公共字典列表</h2>
                </Col>
                 <Col span="24">
                    <!-- 表格上面的功能 -->
                        <Col span="24">
                            <div class="organization">
                                <Button @click="AddDepartment=true"  type="success" class="organization_tableTop">添加</Button>
                                <Button @click="delete1 = true"  type="error" class="organization_tableTop">删除</Button>
                            </div>
                        </Col>
                    <!-- 表格上面的功能 end-->
                </Col>
                <Col span="24">
                   <!-- 表格 -->
                    <Table height="560"  border ref="selection" :columns="columns4" :data="data2"></Table>
                    <!-- 表格 end-->
                </Col>
            </Col>
        </Row>
        <!-- 添加信息 弹出框-->
            <Modal v-model="AddDepartment" width="1300" title="添加用户信息"  :mask-closable="false">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row>
                        <Col span="24">
                            <Col span="24">
                                <FormItem label="部门名称" prop="BusinessUnit" >
                                    <Input v-model="formValidate.BusinessUnit" disabled placeholder="Enter something..." style="width:200px"/>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <Col span="8">
                                    <FormItem label="姓" prop="FirstName" >
                                        <Input v-model="formValidate.FirstName"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="名" prop="LastName" >
                                        <Input v-model="formValidate.LastName"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="性别" prop="Gender" >
                                        <RadioGroup v-model="formValidate.Gender">
                                            <Radio label="男"></Radio>
                                            <Radio label="女"></Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span="24">
                                <Col span="8">
                                    <FormItem label="出生日期" prop="BrithDate" >
                                        <DatePicker v-model="formValidate.BrithDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="入职日期" prop="JoinDate" >
                                        <DatePicker v-model="formValidate.JoinDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="离职日期" prop="LeaveDate" >
                                        <DatePicker v-model="formValidate.LeaveDate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span="24">
                                <Col span="8">
                                    <FormItem label="职位" prop="Title" >
                                        <Input v-model="formValidate.Title"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="固定电话" prop="TelPhone" >
                                        <Input v-model="formValidate.TelPhone"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="手机" prop="MobilePhone" >
                                        <Input v-model="formValidate.MobilePhone"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span="24">
                                <Col span="8">
                                    <FormItem label="主管姓名" prop="Supervisor" >
                                        <Select v-model="formValidate.Supervisor" style="width:200px" placeholder="请选择">
                                            <OptionGroup label="Hot Cities">
                                                <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </OptionGroup>
                                            <OptionGroup label="Other Cities">
                                                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </OptionGroup>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="微信号" prop="WeChat" >
                                        <Input v-model="formValidate.WeChat"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="QQ号" prop="QQ" >
                                        <Input v-model="formValidate.QQ"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span="24">
                                <Col span="8">
                                    <FormItem label="邮箱" prop="Email" >
                                        <Input v-model="formValidate.Email"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="邮编" prop="PostalCode" >
                                        <Input v-model="formValidate.PostalCode"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="地址" prop="Address" >
                                        <Input v-model="formValidate.Address"  placeholder="请输入......" style="width:305px"/>
                                    </FormItem>
                                </Col>
                            </Col>
                             <Col span="24">
                                <Col span="8">
                                    <FormItem label="登录账号" prop="Account" >
                                        <Input v-model="formValidate.Account"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="登录密码" prop="AccountPwd" >
                                        <Input  type="password" v-model="formValidate.AccountPwd"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="角色名称" prop="RoleName" >
                                        <Input  v-model="formValidate.RoleName"  placeholder="请输入......" style="width:200px"/>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span="24">
                                <Col span="6">
                                    <FormItem label="允许登录" prop="AllowLogin" >
                                        <i-switch v-model="formValidate.AllowLogin" size="large" >
                                            <span slot="open">On</span>
                                            <span slot="close">Off</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="主管标识" prop="IsSupervisor" >
                                        <i-switch v-model="formValidate.IsSupervisor" size="large" >
                                            <span slot="open">On</span>
                                            <span slot="close">Off</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="管理员标识" prop="IsAdministrtor" >
                                        <i-switch v-model="formValidate.IsAdministrtor" size="large" >
                                            <span slot="open">On</span>
                                            <span slot="close">Off</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="启用" prop="Enabled" >
                                        <i-switch v-model="formValidate.Enabled" size="large" >
                                            <span slot="open">On</span>
                                            <span slot="close">Off</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span="24">
                                <FormItem label="备注" prop="Comments">
                                    <Input v-model="formValidate.Comments" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width:1000px;"></Input>
                                </FormItem>
                            </Col>

                        </Col>
                    </Row>
                </Form>
                <div  slot="footer">
                    <div class="footer_left">
                        <div class="footer_left1">
                            <div><span>创建人:闫子健</span></div>
                            <div><span>更新人:闫子健</span></div>
                        </div>
                        <div class="footer_left2">
                            <div><span>创建时间:2018/12/13/ 13:00:00</span></div>
                            <div><span>更新时间:2018/12/13/ 13:00:00</span></div>
                        </div>
                    </div>
                    <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset('formValidate');AddDepartment = false;">
                        <span>取消</span>
                    </button>
                    <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit('formValidate');">
                        <span>确定</span>
                    </button> 
                </div>
            </Modal>
        <!-- 添加信息 弹出框 end-->
        
	</div>
</template>
<script>
	export default{
		data(){
			return{
				value: '',
				data1: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                //表格数据
                columns4: [
                        {
                            type: 'selection',
                            width: 50,
                            align: 'center',
                            fixed: 'left'
                        },
                        {
                            title: '部门代码',
                            key: 'Code',
                            width:150,
                            sortable: true
                        },
                        {
                            title: '部门名称',
                            key: 'Description',
                            width:200,
                            sortable: true
                        },
                        {
                            title: '主管姓名',
                            key: 'Supervisor',
                            width:150,
                            sortable: true
                        },
                        {
                            title: '启用',
                            key: 'Enabled',
                            width:100,
                            sortable: true
                        },
                        {
                            title: '排序码',
                            key: 'SortKey',
                            width:100,
                            sortable: true
                        },
                        {
                            title: '创建人',
                            key: 'CreateBy',
                            width:200,
                            sortable: true
                        },
                        {
                            title: '创建时间',
                            key: 'CreateOn',
                            width:240,
                            sortable: true
                        }
                        
                    ],
                    data2: [
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            CreateOn:'2018/12/12 16:49:00'
                        },
                    ],
                    Supervisor: '',
                    AddDepartment: false,
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
                    ruleValidate: {
                        // Code: [
                        //     { required: true, message: '部门代码不能为空', trigger: 'blur' },
                        //     { min: 8, max: 8, message: "长度必须是8位字符", trigger: "blur" },
                        //     { pattern:/^[0-9a-zA-Z]*$/g,message: "必须是字母加数值", trigger: "blur" }
                        // ],
                        FirstName: [
                            { required: true, message: '姓不能为空', trigger: 'blur' },
                        ],
                        LastName: [
                            { required: true, message: '名不能为空', trigger: 'blur' },
                        ],
                        Address: [
                            { required: true, message: '地址不能为空', trigger: 'blur' },
                        ],
                        Gender: [
                            { required: true, message: '请选择性别', trigger: 'change' }
                        ],
                        BrithDate: [
                            { required: true, message: '请选择出生日期', trigger: 'change' },
                        ],
                        JoinDate: [
                            { required: true, message: '请选择入职日期', trigger: 'change' }
                        ],
                        TelPhone: [
                            { pattern:/0\d{2}-\d{7,8}/,message: "请输入正确的座机号码", trigger: "blur" }
                        ],
                        MobilePhone: [
                            { required: true, message: '手机号不能为空', trigger: 'blur' },
                            { pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/,message: "请输入正确的手机号码", trigger: "blur" }
                        ],
                        Supervisor: [
                            { required: true, message: '请选择主管姓名', trigger: 'change' }
                        ],
                        WeChat: [
                           { pattern:/[\u4e00-\u9fa5]/gm,message: "请输入正确的微信号", trigger: "blur" }
                        ],
                        QQ: [
                            { pattern:/^\d{5,10}$/,message: "请输入正确的QQ号", trigger: "blur" }
                        ],
                        Email: [
                             {type: "email",required: true, message:"邮箱格式不正确",trigger: "blur"}
                        ],
                        PostalCode: [
                            {type: "number", min: 8, max: 8,message: '邮编格式不正确', trigger: 'blur' },
                        ],
                        RoleName: [
                            { required: true, message: '名不能为空', trigger: 'blur' },
                        ],
                        AccountPwd: [
                            { pattern:/^\d{5,10}$/,message: "请输入正确的密码", trigger: "blur" }
                        ],
                        Account: [
                            { pattern:/^\d{5,10}$/,message: "请输入正确的账号", trigger: "blur" }
                        ],
                    },
                // 添加信息 弹出框 end
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
			}
		},
		methods:{
			handleSubmit (name) {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            this.$Message.success('成功!');
                            this.AddDepartment = false;
                        } else {
                            this.$Message.error('请输入正确的格式!');
                        }
                    })
                },
		}
	}
</script>
<style  lang="less" scoped>
	 .publicDictionary{  
        .content{
            background: #fff;
            .content_left{
                border-bottom:1px solid #dcdee2;
                line-height:40px;
                margin:10px;
            }
            .inpSearch{
            	width: 250px;
            	margin-top: 70px;
            }
            .tree{
                margin: 30px 0 0 30px;
            }
            .organization{
                margin:30px 20px 10px 0;
                float: right;
                .organization_tableTop{
                    margin: 0 4px;
                }
            }
            .page{
                margin: 20px 30px 0 0;
                float: right;
            }
        }
    }