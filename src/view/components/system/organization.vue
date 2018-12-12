<template>
	<div id="PersonnelManagement">
        <Row >
            <Col span="24" style="height:100px;">
                <h1 class="header">部门用户设置</h1>
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
                    <h2 class="content_left">用户列表</h2>
                </Col>
                 <Col span="24">
                    <!-- 表格上面的功能 -->
                        <Col span="24">
                            <div class="organization">
                                <Button  type="success" class="organization_tableTop">添加</Button>
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
    </div>
</template>
<script>
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
                            width: 60,
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
                // 表格 end      
                // 删除信息弹出框
                    delete1: false,
                // 删除信息弹出框 end     
            }
        },
        methods: {
            // 删除信息函数
                ok () {
                    this.$Message.info('已删除');
                },
                cancel () {
                    this.$Message.info('已取消');
                },
            // 删除信息函数 end

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