
<style>
.ivu-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>
<template>
  <div>
    <Table :columns="columns1" :data="data8" @on-row-click="Royaltyclick"></Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "Name",
          key: "qq"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data8: [
        {
          qq: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          cellClassName: {
            age: "demo-table-info-cell-age",
            address: "demo-table-info-cell-address"
          },
          qq: "Jim Green",
          age: 25,
          address: "London No. 1 Lake Park"
        },
        {
          qq: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          qq: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          cellClassName: {
            age: "demo-table-info-cell-name"
          }
        }
      ]
    };
  },
  methods: {
    Royaltyclick(index) {
      console.log(index);
      console.log(index);
    }
  }
};
</script>
