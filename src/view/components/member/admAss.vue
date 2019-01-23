<style>
    .ivu-table .demo-table-info-row td[disabled]{
        background: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-error-row td{
        background: hsl(24, 100%, 50%);
        color: #fff;
    }
</style>
<template>
<div>
    <Table :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
</div>
    
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                   {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
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
                    }
                ],
            }
        },
        methods: {
            rowClassName (row, index) {
                if (index === 1) {
                  
                    return 'demo-table-info-row';
                } else if (index === 3) {
                    return 'demo-table-error-row';
                }
                return '';
            }
        }
    }
</script>
