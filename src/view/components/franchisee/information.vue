<template>
	<div id="information">
        <Row >
            <Col span="24" style="height:50px;">
                <h1 class="queryHeader">加盟商基本信息</h1>
            </Col>
        </Row>
        <!-- 查询条件 -->
            <Row >
                <Col span="24"  class="query">
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
    </div>
</template>
<script>
    export default {
        data () {
            return {
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
            }
        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
    #information{
        .query{
            height:200px;
            background: #fff;
            margin-bottom: 10px;
            .queryForm{
                margin-top: 20px;
            }
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