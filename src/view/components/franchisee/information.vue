<template>
	<div id="information">
        <Row >
            <Col span="24" style="height:50px;">
                <h1 class="queryHeader">加盟商基本信息</h1>
            </Col>
        </Row>
        <!-- 查询条件 -->
            <Row >
                <Col span="24"  class="querycriteria" style="height:200px;">
                    <Col span="24">
                        <Form :model="formItem" :label-width="100" class="queryForm">
                            <FormItem label="日期：">
                                <Row>
                                    <Col span="3">
                                        <DatePicker type="date" placeholder="开始日期" v-model="formItem.date" style="width:150px;"></DatePicker>
                                    </Col>
                                    <Col span="3">
                                        <DatePicker type="date" placeholder="结束日期" v-model="formItem.date" style="width:150px;"></DatePicker>
                                    </Col>
                                    <Col span="18"></Col>
                                </Row>
                            </FormItem>
                            <FormItem label="地区：">
                                <Row>
                                    <Col span="3">
                                        <Select v-model="formItem.select" style="width:150px;" placeholder="所在大区" >
                                            <Option value="beijing">New York</Option>
                                            <Option value="shanghai">London</Option>
                                            <Option value="shenzhen">Sydney</Option>
                                        </Select>
                                    </Col>
                                    <Col span="3">
                                        <Select v-model="formItem.select" style="width:150px;" placeholder="省">
                                            <Option value="beijing">New York</Option>
                                            <Option value="shanghai">London</Option>
                                            <Option value="shenzhen">Sydney</Option>
                                        </Select>
                                    </Col>
                                    <Col span="3">
                                        <Select v-model="formItem.select" style="width:150px;" placeholder="市">
                                            <Option value="beijing">New York</Option>
                                            <Option value="shanghai">London</Option>
                                            <Option value="shenzhen">Sydney</Option>
                                        </Select>
                                    </Col>
                                    <Col span="3">
                                        <Select v-model="formItem.select" style="width:150px;" placeholder="区县">
                                            <Option value="beijing">New York</Option>
                                            <Option value="shanghai">London</Option>
                                            <Option value="shenzhen">Sydney</Option>
                                        </Select>
                                    </Col>
                                    <Col span="12"></Col>
                                </Row>
                                
                            </FormItem>
                            <FormItem label="业务状态：">
                                <Row>
                                    <Col span="24">
                                        <RadioGroup type="button">
                                            
                                            <Radio label="全部"></Radio>
                                            <Radio label="正常状态"></Radio>
                                            <Radio label="合约过期"></Radio>
                                            <Radio label="暂停运营"></Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </Col>
                </Col>
            </Row>
        <!-- 查询条件 end-->
        <!-- 查询结果 -->
            <Row >
                <!-- 表格上面的功能 -->
                    <Col span="8" offset="16">
                        <div class="tableTop">
                            <Button @click="AddDepartment = true"  type="success" class="tableTops">添加</Button>
                            <Button @click="delete1 = true"  type="error" class="tableTops">删除</Button>
                            <Select v-model="model1" style="width:100px" class="tableTops">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Input v-model="value" placeholder="Enter something..." style="width: 150px" class="tableTops"/>
                            <Button type="primary" class="tableTops">查询</Button>
                        </div>
                    </Col>
                <!-- 表格上面的功能 end-->
                <Col span="24">
                    <!-- 表格 -->
                        <Table height="600" size="small" highlight-row  stripe border ref="selection" :columns="columns4" :data="data1"></Table>
                    <!-- 表格 end-->
                </Col>
                <Col span="24">
                    <!-- 分页 -->
                        <Page :total="100" class="page"/>
                    <!-- 分页 end-->
                </Col>
            </Row>
        <!-- 查询结果 end-->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                // 查询条件
                    formItem: {
                        input: '',
                        select: '',
                        radio: 'male',
                        checkbox: [],
                        switch: true,
                        date: '',
                        time: '',
                        slider: [20, 50],
                        textarea: ''
                    },
                // 查询条件 end
                // 查询结果
                    // input框中的值
                        value: '',
                    // input框中的值 end
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
                        data1: [
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            },
                            {
                                BusinessUnit: '信息技术部',
                                FirstName: '闫',
                                LastName: '子健',
                                Gender: '男',
                                BrithDate:'2018/11/12',
                                Title:'前端',
                                TelPhone:'020202',
                                MobilePhone:'13546704118',
                                Supervisor:'吴总',
                                Email:'1054512549@qq.com',
                                PostalCode:'035400',
                                AllowLogin:'允许',
                                Account:'13546704118',
                                RoleName:'CEO',
                                IsSupervisor:'0',
                                IsAdministrtor:'0',
                                Enabled:'是',
                                CreateBy:'闫子健',
                                CreateOn:'2018/12/13 17:39:00',
                            }
                        ],
                    // 表格 end   
                // 查询结果 end

            }
        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
    #information{
        .content{
            .tableTop{
                margin:30px 20px 10px 0;
                float: right;
                height: 50px;
                .tableTops{
                    margin: 0 4px;
                }
            }
        }
    }
</style>