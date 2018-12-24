<template>
    <div id="leagueRights" > 
        <!-- 头部 -->
        <Row>
			<Col span="24" style="height:100px;">
			    <h1 class="setHeader">权益金规则</h1>
			</Col>
        <!-- 内容 -->
            <Col span="24"  style="h    eight:780px;">
                <div class="querycriteria" style="height:100px;">
                    <div class="querycriteriadiv" style="margin-left:24px;">
                        <label>权益金方式：  </label> 
                        <Select v-model="queryRoyaltyType" style="width:200px">
                            <Option  v-for="item in RoyaltyTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="querycriteriadiv">
                        <label>权益金规则描述：  </label> 
                        <Input v-model="queryDescription" placeholder="请输入..." style="width: 500px" />
                    </div>
                </div>
                <Row>
                    <Col span="15" class="queryEnd">
			            <h2>查询结果</h2>
			        </Col>
                    <!-- 表格操作按钮 -->
                    <Col span="8" >
                        <div class="tableTop">
                            <Button @click="AddDepartment = true"  type="success" class="tableTops">添加</Button>
                            <Button @click="delete1 = true"  type="error" class="tableTops">删除</Button>
                            <Select v-model="model1" style="width:100px" >
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Input v-model="value" placeholder="Enter something..." style="width: 150px" class="tableTops"/>
                            <Button type="primary" class="tableTops">查询</Button>
                        </div>
                    </Col>
                    <!-- 表格 -->
                    <Col span="24" >
                        <Table height="560" size="small"  highlight-row  stripe border ref="selection" :columns="columns4" :data="data1"></Table>
                    </Col>
                    <!-- 分页 -->
                    <Col span="24">
                        <Page :total="100" class="page"/>
                    </Col>
                </Row>
            </Col>
        </Row>
        <!-- 添加信息 弹出框-->
		<Modal v-model="AddDepartment" width="600" title="添加加盟商权益金规则" :mask-closable="false">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="150">
				<Row>
					<Col span="24">
                        <FormItem label="所属业务群" prop="BusinessGroup">
                            <Select v-model="formValidate.BusinessGroup" style="width:300px">
                                <Option v-for="item in BusinessGroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
					</Col>
					<Col span="24">
                        <FormItem label="权益金规则代码" prop="Code">
                            <Input v-model="formValidate.Description" placeholder="请输入" style="width:300px"></Input>
                        </FormItem>
					</Col>
					<Col span="24">
                        <FormItem label="权益金规则描述" prop="Description">
                            <Input v-model="formValidate.LongDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入" style="width:300px"></Input>
                        </FormItem>
					</Col>
					<Col span="24">
                        <FormItem label="权益金方式" prop="RoyaltyType">
                            <Select v-model="formValidate.Supervisor" style="width:300px" placeholder="请选择">
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
					<Col span="24">
					<FormItem label="权益金固定值类型" prop="FlatType">
						<Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:300px"></Input>
					</FormItem>
					</Col>
                    <Col span="24">
					<FormItem label="天数不足月或年折算方式" prop="ObversionType">
						<Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:300px"></Input>
					</FormItem>
					</Col>
                    <Col span="24">
					<FormItem label="权益金计算基准" prop="RoyaltyBenchMark">
						<Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:300px"></Input>
					</FormItem>
					</Col>
                    <Col span="24">
					<FormItem label="固定值或比例" prop="FlatOrPecent">
						<Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:300px"></Input>
					</FormItem>
					</Col>
                    <Col span="24">
					<FormItem label="排序码" prop="SortKey">
						<Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:300px"></Input>
					</FormItem>
					</Col>
                    <Col span="24">
					<FormItem label="启用" prop="Enabled">
						<Input type="number" v-model="formValidate.SortKey" placeholder="请输入" style="width:300px"></Input>
					</FormItem>
					</Col>
                    

					</Col>
				</Row>
			</Form>
			<div slot="footer">
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
    </div>  
</template>
<script>
    export default {
        data () {
            return {
                // 查询
                queryRoyaltyType: '',
                queryDescription: '',
                RoyaltyTypeList: [
                    {
                        value: '固定金额',
                        label: '固定金额'
                    },
                    {
                        value: '固定比例',
                        label: '固定比例'
                    },
                    {
                        value: '阶梯',
                        label: '阶梯'
                    },
                ],
                // 表格
                columns4: [
                    {type: 'selection',width: 50,align: 'center',fixed: 'left'},
                    {title: '所属业务群',key: 'BusinessGroup',width:175,sortable: true},
                    {title: '权益金规则代码',key: 'Code',width:200,sortable: true},
                    {title: '权益金规则描述',key: 'Description',width:250,sortable: true},
                    {title: '固定值或比例',key: 'FlatOrPecent',width:200,sortable: true},
                    {title: '排序码',key: 'SortKey',width:200,sortable: true},
                    {title: '启用',key: 'Enabled',width:200,sortable: true},
                    {title: '创建人 ',key: 'CreateBy',width:175,sortable: true},
                    {title: '创建时间',key: 'CreateOn',width:175,sortable: true},
                ],
                //表格数组
                data1: [],
                // 添加信息 弹出框
				BusinessGroupList: [],
				cityList1: [{
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
				cityList2: [{
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

				}
                
            }
        }
    }
</script>