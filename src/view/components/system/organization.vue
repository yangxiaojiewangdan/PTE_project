<!-- 组织结构 -->
<template>
    <div>
        <h1 style="color:#55a;margin:30px">部门用户设置</h1>
        <!-- 分割面板 -->
            <div class="demo-split">
                <Split v-model="split1">
                    <div slot="left" class="demo-split-pane">
                        <div style="height:40px;border-bottom:1px solid #dcdee2;line-height:40px;margin:10px;">
                            <h2>公司组织结构</h2>
                        </div>
                        <!-- 树形控件 -->
                            <Tree :data="data2"></Tree>
                        <!-- 树形控件 end-->
                    </div>
                    <div slot="right" class="demo-split-pane">
                        <div style="height:40px;border-bottom:1px solid #dcdee2;line-height:40px;margin:10px;">
                            <h2>用户列表</h2>
                        </div>
                        <!-- 表格上面的功能 -->
                            <div style="height:50px;">
                                <div class="organization">
                                    <Button @click="value3 = true" type="success" class="organization_tableTop">添加</Button>
                                    <Button @click="modal1 = true" type="error" class="organization_tableTop">删除</Button>
                                    <Select v-model="model1" style="width:100px" >
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
                                    <Button type="primary" class="organization_tableTop">查询</Button>
                                </div>
                            </div>
                        <!-- 表格上面的功能 end-->
                        <!-- 表格 -->
                            <div>
                                <Table height="600"  border ref="selection" :columns="columns4" :data="data1"></Table>
                                <!-- 分页 -->
                                    <Page :total="100" style="margin:10px 10px;float:right;"/>
                                <!-- 分页 end-->
                            </div>
                        <!-- 表格 end-->
                    </div>
                </Split>
            </div>   
        <!-- 分割面板 end-->
        <!-- 添加信息弹出框 -->
            <Drawer title="Create"  v-model="value3"  width="720" :mask-closable="false" :styles="styles">
                <Form :model="formData">
                    <Row :gutter="32">
                        <Col span="12">
                            <FormItem label="Name" label-position="top">
                                <Input v-model="formData.name" placeholder="please enter user name" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="Url" label-position="top">
                                <Input v-model="formData.url" placeholder="please enter url">
                                    <span slot="prepend">http://</span>
                                    <span slot="append">.com</span>
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="32">
                        <Col span="12">
                            <FormItem label="Owner" label-position="top">
                                <Select v-model="formData.owner" placeholder="please select an owner">
                                    <Option value="jobs">Steven Paul Jobs</Option>
                                    <Option value="ive">Sir Jonathan Paul Ive</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="Type" label-position="top">
                                <Select v-model="formData.type" placeholder="please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="32">
                        <Col span="12">
                            <FormItem label="Approver" label-position="top">
                                <Select v-model="formData.approver" placeholder="please choose the approver">
                                    <Option value="jobs">Steven Paul Jobs</Option>
                                    <Option value="ive">Sir Jonathan Paul Ive</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="DateTime" label-position="top">
                                <DatePicker v-model="formData.date" type="daterange" placeholder="please select the date" style="display: block" placement="bottom-end"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="Description" label-position="top">
                        <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
                    </FormItem>
                </Form>
                <div class="demo-drawer-footer">
                    <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
                    <Button type="primary" @click="value3 = false">Submit</Button>
                </div>
            </Drawer>    
        <!-- 添加信息弹出框 end-->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                // 表格
                    columns4: [
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center',
                            fixed: 'left'
                        },
                        {
                            title: 'Name',
                            key: 'name',
                            width:300,
                            sortable: true
                        },
                        {
                            title: 'Age',
                            key: 'age',
                            width:300,
                            filters: [
                                {
                                    label: 'Greater than 25',
                                    value: 1
                                },
                                {
                                    label: 'Less than 25',
                                    value: 2
                                }
                            ],
                            filterMultiple: false,
                            filterMethod (value, row) {
                                if (value === 1) {
                                    return row.age > 25;
                                } else if (value === 2) {
                                    return row.age < 25;
                                }
                            }
                        },
                        {
                            title: 'Address',
                            key: 'address',
                            width:300
                        },
                        {
                            title: 'Name',
                            key: 'name',
                            width:300
                        },
                        {
                            title: 'Age',
                            key: 'age',
                            width:300
                        },
                        {
                            title: 'Address',
                            key: 'address',
                            width:300
                        }
                        
                    ],
                    data1: [
                        {
                            name: 'John Brown',
                            age: 18,
                            address: 'New York No. 1 Lake Park',
                            date: '2016-10-03'
                        },
                        {
                            name: 'Jim Green',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            date: '2016-10-01'
                        },
                        {
                            name: 'Joe Black',
                            age: 30,
                            address: 'Sydney No. 1 Lake Park',
                            date: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            address: 'Ottawa No. 2 Lake Park',
                            date: '2016-10-04'
                        },
                        {
                            name: 'Jim Green',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            date: '2016-10-01'
                        },
                        {
                            name: 'Joe Black',
                            age: 30,
                            address: 'Sydney No. 1 Lake Park',
                            date: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            address: 'Ottawa No. 2 Lake Park',
                            date: '2016-10-04'
                        },
                        {
                            name: 'Jim Green',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            date: '2016-10-01'
                        },
                        {
                            name: 'Joe Black',
                            age: 30,
                            address: 'Sydney No. 1 Lake Park',
                            date: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            address: 'Ottawa No. 2 Lake Park',
                            date: '2016-10-04'
                        },
                        {
                            name: 'Jim Green',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            date: '2016-10-01'
                        },
                        {
                            name: 'Joe Black',
                            age: 30,
                            address: 'Sydney No. 1 Lake Park',
                            date: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            address: 'Ottawa No. 2 Lake Park',
                            date: '2016-10-04'
                        },
                        {
                            name: 'Jim Green',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            date: '2016-10-01'
                        },
                        {
                            name: 'Joe Black',
                            age: 30,
                            address: 'Sydney No. 1 Lake Park',
                            date: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            address: 'Ottawa No. 2 Lake Park',
                            date: '2016-10-04'
                        },
                        {
                            name: 'Jim Green',
                            age: 24,
                            address: 'London No. 1 Lake Park',
                            date: '2016-10-01'
                        },
                        {
                            name: 'Joe Black',
                            age: 30,
                            address: 'Sydney No. 1 Lake Park',
                            date: '2016-10-02'
                        },
                        {
                            name: 'Jon Snow',
                            age: 26,
                            address: 'Ottawa No. 2 Lake Park',
                            date: '2016-10-04'
                        }
                    ],
                // 表格 end
                // input框中的值
                    value: '',
                // input框中的值 end
                // 面板分割
                    split1: 0.3,
                // 面板分割 end
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
                // 添加信息弹出框 
                    value3: false,
                    styles: {
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: '53px',
                        position: 'static'
                    },
                    formData: {
                        name: '',
                        url: '',
                        owner: '',
                        type: '',
                        approver: '',
                        date: '',
                        desc: ''
                    },
                // 添加信息弹出框 end
            }
        },
        methods: {

        }
    }
</script>
<style>
     .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
    .demo-split{
        height: 790px;
        border: 1px solid #dcdee2;
        margin-top:10px;
    }
    .demo-split-pane{
        padding: 10px;
    }
    .organization{
        float: right;
    }
    .organization_tableTop{
        margin: 0 8px;
    }

</style>