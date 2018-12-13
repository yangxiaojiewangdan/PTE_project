<template>
	<div id="PersonnelManagement">
        <Row >
            <Col span="24" style="height:100px;">
                <h1 class="header">人员管理设置</h1>
            </Col>
        </Row>
        <Row class="content">
            <Col span="6" style="height:750px;">
                <Col span="24" style="height:40px;">
                    <h2 class="content_left">公司组织结构</h2>
                </Col>
                <!-- 树状图 -->
                <Col span="24">
                    <Tree :data="data2" class="tree"></Tree>
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
                                <Button @click="AddDepartment = true"  type="success" class="organization_tableTop">添加</Button>
                                <Button @click="delete1 = true"  type="error" class="organization_tableTop">删除</Button>
                                <Select v-model="model1" style="width:100px" class="organization_tableTop">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="value" placeholder="Enter something..." style="width: 150px" class="organization_tableTop"/>
                                <Button type="primary" class="organization_tableTop">查询</Button>
                            </div>
                        </Col>
                    <!-- 表格上面的功能 end-->
                </Col>
                <Col span="24">
                   <!-- 表格 -->
                    <Table height="560"  border ref="selection" :columns="columns4" :data="data1"></Table>
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
            <Modal v-model="delete1" title="提示" @on-ok="ok"  @on-cancel="cancel">
                    <h2>确定删除此数据？</h2>
            </Modal>
        <!-- 删除信息弹出框 end-->
        <!-- 添加信息 弹出框-->
            <Modal v-model="AddDepartment" width="600" title="添加部门信息">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row>
                        <Col span="24">
                            <FormItem label="部门代码" prop="Code" >
                                <Input v-model="formValidate.Code" placeholder="请输入" style="width:460px"></Input>
                            </FormItem>
                        </Col>
                        <Col span="24">
                            <FormItem label="部门名称" prop="Description">
                                <Input v-model="formValidate.Description" placeholder="请输入" style="width:460px"></Input>
                            </FormItem>
                        </Col>
                        <Col span="24">
                            <FormItem label="部门描述" prop="LongDescription">
                                <Input v-model="formValidate.LongDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width:460px"></Input>
                            </FormItem>
                        </Col>
                        <Col span="24">
                            <FormItem label="主管姓名" prop="Supervisor">
                                <Select v-model="formValidate.Supervisor" style="width:460px" placeholder="请选择">
                                    <OptionGroup label="Hot Cities">
                                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </OptionGroup>
                                    <OptionGroup label="Other Cities">
                                        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </OptionGroup>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="24">
                            <Col span="15">
                                <FormItem label="排序码" prop="SortKey">
                                    <Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:200px"></Input>
                                </FormItem>
                            </Col>
                            <Col span="9">
                                <FormItem label="启用" prop="Enabled" >
                                    <i-switch v-model="formValidate.Enabled" size="large" >
                                        <span slot="open">On</span>
                                        <span slot="close">Off</span>
                                    </i-switch>
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
import modalStyle from '../modalStyle/modalStyle.css'
    export default {
        data () {
            return {
                // input框中的值
                    value: '',
                // input框中的值 end
                // 树形图
                    data2: [
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
                        {
                            type: 'selection',
                            width: 50,
                            align: 'center',
                            fixed: 'left'
                        },
                        {
                            title: '所属部门名称',
                            key: 'BusinessUnit',
                            width:150,
                            sortable: true
                        },

                    ],
                    data1: [
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
                // 表格 end      
                // 删除信息弹出框
                    delete1: false,
                // 删除信息弹出框 end   
                // 添加信息 弹出框
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
                    formValidate: {
                        Enabled: true,
                        Code: '',
                        Description: '',
                        Supervisor: '',
                    },
                    ruleValidate: {
                        Code: [
                            { required: true, message: '部门代码不能为空', trigger: 'blur' },
                            { min: 8, max: 8, message: "长度必须是8位字符", trigger: "blur" },
                            { pattern:/^[0-9a-zA-Z]*$/g,message: "必须是字母加数值", trigger: "blur" }
                        ],
                        Description: [
                            { required: true, message: '部门名称部能为空!', trigger: 'blur' },
                        ],
                        Supervisor: [
                            { required: true, message: '请选择主管姓名', trigger: 'change' }
                        ],
                    }
                // 添加信息 弹出框 end  
            }
        },
        methods: {
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
                            this.$Message.success('成功!');
                            this.AddDepartment = false;
                        } else {
                            this.$Message.error('请输入正确的格式!');
                        }
                    })
                },
                handleReset (name) {
                    
                    this.$refs[name].resetFields();
                    this.$Message.info('已取消添加部门');
                }
            // 添加信息 弹出框函数 end
        }
    }
</script>
<style lang="less" scoped>
    #PersonnelManagement{
        .header{
            color:#55a;
            margin:30px;
        }
        .content{
            background: #fff;
            .content_left{
                border-bottom:1px solid #dcdee2;
                line-height:40px;
                margin:10px;
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
</style>