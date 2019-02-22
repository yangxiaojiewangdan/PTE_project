<template>
	<div class="SearchStuden">
		<Modal v-model="AddPrise" width="900" title="添加上课学员" :mask-closable="false">
			<Row>
				<Col span="24">
				<Col span="8" class="Col">
				<h3 class="queryStuden">学员姓名:</h3>
				<Select v-model="model11" filterable style="width:200px;margin-left:20px;">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
				<Col span="12" class="Col">
				<h3 class="queryStuden">联系方式:</h3>
				<Select v-model="model11" filterable style="width:200px;margin-left:20px;">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
				<Col span="8" class="Col">
				<h3 class="queryStuden">课程主题:</h3>
				<Select v-model="model11" filterable style="width:200px;margin-left:20px;">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
				<Col span="8" class="Col">
				<h3 class="queryStuden">课程阶段:</h3>
				<Select v-model="model11" filterable style="width:200px;margin-left:20px;">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
				<Col span="8" class="Col">
				<h3 class="queryStuden">合约状态:</h3>
				<Select v-model="model11" filterable style="width:200px;margin-left:20px;">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
				</Col>
			</Row>
			<!--表格-->
			<Col>
			<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="StudentData2" :columns="StudentDataHeader2" @on-delete="handleDeleteDetail" height="400" border stripe @on-row-dblclick="dblclickUpDetail" style="margin-top: 30px;" />
			</Col>
			<div slot="footer">
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleResetAdd;AddPrise = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmitAdd">
                        <span>确定</span>
                   </button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import Tables from "_c/tables";
	import { AddOrUpdateCourse, AddOrUpdatePrice, RemoveCourse, RemovePrice } from '@/api/data'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities } from '@/api/api'
	export default {
		name: 'SearchStuden',
		components: {
			Tables,
		},
		data() {
			return {
				AddPrise: true,
				model11: '',
				StudentData2: [],
				StudentDataHeader2: [{
						type: "selection",
						width: 45
					},
					{
						title: "订单号",
						key: "Status",
						sortable: true,

					},
					{
						title: "姓名",
						key: "Status",
						sortable: true,
						width: 80

					},
					{
						title: "昵称",
						key: "Status",
						sortable: true,
						width: 80

					},
					{
						title: "订单类型",
						key: "Status",
						sortable: true,
						width: 120

					},
					{
						title: "总课时",
						key: "Status",
						sortable: true,
						width: 100

					},
					{
						title: "已销课时",
						key: "Status",
						sortable: true,
						width: 120

					},
					{
						title: "剩余课时",
						key: "Status",
						sortable: true,
						width: 120

					},
				],
				cityList: [{
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
				],
			}
		},
		methods: {
			handleResetAdd() {
				this.$Message.info('已取消');
			},
			handleSubmitAdd() {
				alert(123)
			},
			dblclickUpDetail() {

			},
			handleDeleteDetail() {

			},
		},
		mounted() {

		},
	}
</script>

<style>
	.queryStuden {
		display: inline;
	}
	.Col {
		margin-top: 16px;
	}
</style>