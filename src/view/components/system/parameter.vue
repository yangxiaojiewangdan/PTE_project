<template>
    <div>
        <Button @click="value3 = true" type="primary">添加</Button>
        <Drawer
            title="添加部门明细"
            v-model="value3"
            :mask-closable="false"
            :styles="styles"
            placement="center"
            scrollable="true"
            class='drawer'
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="24">
                        <FormItem label="部门代码" label-position="top">
                            <Input v-model="formData.name" placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="部门名称" label-position="top">
                            <Input v-model="formData.name" placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="部门描述" label-position="top">
                            <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="主管姓名" label-position="top">
                            <Select v-model="model7" style="width:99%">
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
                        <FormItem label="排序码" label-position="top">
                            <Input v-model="formData.name" placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="启用" label-position="top">
                            <i-switch v-model="switch1" @on-change="change" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
                <Button type="primary" @click="value3 = false">Submit</Button>
            </div>
        </Drawer>    
    </div>
</template>
<script>
    export default {
        data () {
            return {
                switch1: false,
                value3: false,
                styles: { 
                    position: 'relative',
                    background: '#fff'

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
                model7: ''
            }
        },
        methods: {
            change (status) {
                this.$Message.info('开关状态：' + status);
            }
        }
    }
</script>
<style >
    .demo-drawer-footer{
        width: 100%;
        position: relative;
        bottom: 0;
        right: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
        margin-top: 20px;
    }
    .ivu-drawer {
        width: 40%!important;
        height: 650px;
        position: relative;
        top: 5%;
        left: 30%;
    }
</style>

