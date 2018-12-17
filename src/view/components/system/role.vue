<template>
    <div class="role">
    	<Row >
            <Col span="24" style="height:100px;">
                <h1 class="setHeader">系统角色设置</h1>
            </Col> 
        </Row>
        <Row>
        	<Col span="7" push="14">
		        <div class="organization">
		        	<Button type="success" class="organization_tableTop" @click="AddDepartment = true">添加</Button>
		        	<Button type="error" class="organization_tableTop">删除</Button>
		        	<Select v-model="model1" style="width:100px" class="organization_tableTop">
		                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
		            </Select>
		            <Input v-model="value" placeholder="Enter something..." style="width: 150px" class="organization_tableTop"/>
		            <Button type="primary" class="organization_tableTop">查询</Button>
		        </div>
        	</Col>
        </Row>
        
        <Row>
        	<Col span="20" push="1">
        		<Table height="520" ref="selection" :columns="columns4" :data="data1" @on-row-dblclick="aaa()" stripe size="small" highlight-row></Table>
        	</Col>
        	<Col span="10"push="10">
        		<Page :total="100" class="page"/>
        	</Col>
        </Row>
        
        
        
        <!-- 添加信息 弹出框-->
            <Modal v-model="AddDepartment" width="600" title="添加系统角色" :mask-closable="false">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row>
                        <Col span="24">
                            <FormItem label="角色代码" prop>
                                <Input v-model="formValidate.Code" placeholder="请输入" style="width:460px" ></Input>
                            </FormItem>
                        </Col>
                        <Col span="24">
                            <FormItem label="角色名称" prop>
                                <Input v-model="formValidate.Description" placeholder="请输入" style="width:460px"></Input>
                            </FormItem>
                        </Col>
                            <Col span="24">
                                <FormItem label="排序码" prop>
                                    <Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:200px"></Input>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="角色级别" prop>
                                	<RadioGroup v-model="animal">
        								<Radio label="无"></Radio>
        								<Radio label="个人"></Radio>
        								<Radio label="本部门"></Radio>
        								<Radio label="本部门及下属部门"></Radio>
        								<Radio label="全组织"></Radio>
    								</RadioGroup>
                                </FormItem>
                            </Col>
                    
                   	</Row>
                   	<Row>
                            <Col span="12">
                                <FormItem label="总部可用" prop>
                                    <i-switch v-model="formValidate.Enabled" size="large" >
                                        <span slot="open">On</span>
                                        <span slot="close">Off</span>
                                    </i-switch>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="门店可用" prop>
                                    <i-switch v-model="formValidate.Enabled" size="large" >
                                        <span slot="open">On</span>
                                        <span slot="close">Off</span>
                                    </i-switch>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="内置角色" prop>
                                    <i-switch v-model="formValidate.Enabled" size="large" >
                                        <span slot="open">On</span>
                                        <span slot="close">Off</span>
                                    </i-switch>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="启用" prop>
                                    <i-switch v-model="formValidate.Enabled" size="large" >
                                        <span slot="open">On</span>
                                        <span slot="close">Off</span>
                                    </i-switch>
                                </FormItem>
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
        
                <!-- 分配权限 弹出框-->
            <Modal v-model="businessRoles" width="800" title="分配业务角色信息":mask-closable="false">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row>
                        <Col span="12">
                            <FormItem label="角色代码" prop>
                                <Input v-model="formValidate.Code" placeholder="请输入" style="width:250px" ></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="角色名称" prop>
                                <Input v-model="formValidate.Description" placeholder="请输入" style="width:250px"></Input>
                            </FormItem>
                        </Col>
                        <Col span="24" push="1">
                        	 <Transfer
						        :data="data3"
						        :target-keys="targetKeys3"
						        :list-style="listStyle"
						        :render-format="render3"
						        :operations="['删减权限','添加权限']"
						        :titles="['可分配权限','已分配权限']"
						        @on-change="handleChange3">
						    </Transfer>
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
        <!-- 分配权限 弹出框 end-->
    </div>
</template>
<script>
    export default {
        data(){
        	return {
        		model1: '',
        		value:'',
        		animal:'全组织',
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
        		      // 表格
                    columns4: [
                        {
                            type: 'selection',
                            width: 50,
                            fixed: 'left'
                           
                           	
                        },
                        {
                            title: '角色代码',
                            key: 'Code',
                            width:200,
                            sortable: true,
                            
                        },
                        {
                            title: '角色名称',
                            key: 'Description',
                            width:200,
                            sortable: true,
                            
                        },
                        {
                            title: '启用',
                            key: 'Supervisor',
                            width:160,
                            sortable: true,
                            
                        },
                        {
                            title: '排序码',
                            key: 'Enabled',
                            width:150,
                            sortable: true,
                            
                        },
                        {
                            title: '创建人',
                            key: 'SortKey',
                            width:200,
                            sortable: true,
                            
                        },
                        {
                            title: '创建时间',
                            key: 'CreateBy',
                            width:400,
                            sortable: true,
                            
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
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                           
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                            
                        },
                        {
                            Code: 'A001',
                            Description: '信息技术部',
                            Supervisor: '吴总',
                            Enabled:'是',
                            SortKey:'001',
                            CreateBy:'闫子健',
                        },
                    ],
                // 表格 end  
                //添加人员信息弹框
                AddDepartment: false,
                //权限分配弹框
                businessRoles:false,
                    formValidate: {
                        Enabled: true,
                        Code: '',
                        Description: '',
                        Supervisor: '',
                    },
                ruleValidate: {
//                      Code: [
//                          { required: true, message: '部门代码不能为空', trigger: 'blur' },
//                          { min: 8, max: 8, message: "长度必须是8位字符", trigger: "blur" },
//                          { pattern:/^[0-9a-zA-Z]*$/g,message: "必须是字母加数值", trigger: "blur" }
//                      ],
//                      Description: [
//                          { required: true, message: '部门名称部能为空!', trigger: 'blur' },
//                      ],
//                      Supervisor: [
//                          { required: true, message: '请选择主管姓名', trigger: 'change' }
//                      ],
                    },
               	//分配权限弹框里的数据
               	data3:this.getMockData(),
               	targetKeys3: this.getTargetKeys(),
               	 listStyle: {
                    width: '300px',
                    height: '500px',
                    marginTop:'30px',
                    fontWeight: 'bold',
                },
                
        	}
        },
        methods: {
        	aaa(){
        		this.businessRoles = true;
        		
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
                            this.$Message.success('成功!');
                            this.AddDepartment = false;
                        } else {
                            this.$Message.error('请输入正确的格式!');
                        }
                    })
                },
                handleReset (name) {
                    
                    this.$refs[name].resetFields();
                    this.$Message.info('已取消');
                    this.businessRoles=false
                },
            // 添加信息 弹出框函数 end
            
            //权限弹框函数
            getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'The desc of content  ' + i,
                        disabled: Math.random() * 3 < 1
                    });
                }
                return mockData;
            },
             getTargetKeys () {
                return this.getMockData().filter(() => Math.random() * 2 > 1).map(item => item.key);            
            },
            
            handleChange3 (newTargetKeys) {
                this.targetKeys3 = newTargetKeys;
            },
            render3 (item) {
                return item.label + ' - ' + item.description;
            },
            
        },
        mounted(){
        	console.log(this.data3)
        }
    }
</script>
<style lang="less">
		.page{
                margin: 20px 30px 0 0;
            }
.organization{
				margin: 0 0 30px 0;		
		}
        .organization_tableTop{
                margin: 0 5px;
               
            }

</style>