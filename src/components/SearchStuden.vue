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
			<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="StudentData2" :columns="StudentDataHeader2" @on-delete="handleDeleteDetail" @on-select="BatchDelete" @on-select-cancel="CancelBatchDelete" @on-select-all="allselectionId" @on-select-all-cancel="allcancelselectionId" height="400" border stripe @on-row-dblclick="dblclickUpDetail" style="margin-top: 30px;" />
			</Col>
			<div slot="footer">
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleResetAdd;AddPrise = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmitAdd">
                        <span>确定</span>
                   </button>
			</div>
			<p v-if="false">{{inputName}}</p>
			<input type="button" value="弹框" @click="childClick" v-if="false">
		</Modal>

	</div>
</template>

<script>
	import Tables from "_c/tables";
	import { AddOrUpdateCourse, AddOrUpdatePrice, RemoveCourse, RemovePrice } from '@/api/data'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities,AddMemberViaOrder} from '@/api/api'
	export default {
		 props: {
      		inputName: Number,
      		required: true
   		 },
		name: 'SearchStuden',
		components: {
			Tables,
		},
		inject: ["reload"],
		data() {
			return {
				ParentClasses:this.inputName,
				AddPrise: true,
				model11: '',
				StudentData2: [],
				toClassesList:{},
				//批量选中
				BatchDeleteList: [],
				StudentDataHeader2: [{
						type: "selection",
						width: 45
					},
					{
						title: "订单号",
						key: "OrderNo",
						sortable: true,

					},
					{
						title: "姓名",
						key: "LastName",
						sortable: true,
						width: 80

					},
					{
						title: "联系方式",
						key: "Status",
						sortable: true,

					},
					{
						title: "订单类型",
						key: "OrderType",
						sortable: true,
						width: 120

					},
					{
						title: "课程主题",
						key: "PackageName",
						sortable: true,

					},
					{
						title: "课程阶段",
						key: "Status",
						sortable: true,
						width: 120

					},
					{
						title: "合约状态",
						key: "OrderStatusDesc",
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
//				console.log(this.BatchDeleteList)
//				console.log(this.ParentClasses)
				AddMemberViaOrder({ClassesId:this.ParentClasses,OrderId:this.BatchDeleteList}).then(res=>{
					console.log(res.data)
					this.toClassesList = res.data;
					this.$emit('childStudenList',this.toClassesList)
					this.AddPrise = false;
					this.$Message.success('添加成功!')
					
				}).catch(err=>{
					console.log(err)
				})
			},
			dblclickUpDetail() {

			},
			handleDeleteDetail() {

			},
			childClick() {
				this.$emit('childByValue', this.AddPrise)
			},
			childMethod(flag) {
				console.log(flag)
			},
			//勾选中触发
			BatchDelete(selection, row) {
				for(var i = 0; i < selection.length; i++) {
					this.BatchDeleteList.push(selection[i].Id);
				};

				function uniq(array) {
					var temp = []; //一个新的临时数组
					for(var i = 0; i < array.length; i++) {
						if(temp.indexOf(array[i]) == -1) {
							temp.push(array[i]);
						}
					}
					return temp;
				};
				this.BatchDeleteList = uniq(this.BatchDeleteList)
			},
			//取消勾选是触发
			CancelBatchDelete(selection, row) {
				function removeByValue(arr, val) {  
					for(var i = 0; i < arr.length; i++) {    
						if(arr[i] == val) {      
							arr.splice(i, 1);      
							break;    
						}  
					}
				}
				removeByValue(this.BatchDeleteList, row.Id);
			},
			//全选
			allselectionId(selection) {
				for(var i = 0; i < selection.length; i++) {
					this.BatchDeleteList.push(selection[i].Id);
				}
			},
			//取消全选
			allcancelselectionId(selection) {
				this.BatchDeleteList = selection
			},

		},
		mounted() {
			this.childClick()
			//订单学员
			GetEntities('CustomerOrder', {Filters: {} })
				.then(res => {
					this.StudentData2 = res.data;
				})
				.catch(err => {
					console.log(err);
				});
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