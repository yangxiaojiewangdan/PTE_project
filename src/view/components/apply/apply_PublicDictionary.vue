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
                                <Button @click="AddDepartment = true"  type="success" class="organization_tableTop">添加</Button>
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
	</div>
</template>
<script>
	export default{
		data(){
			return{
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
			}
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
</style>