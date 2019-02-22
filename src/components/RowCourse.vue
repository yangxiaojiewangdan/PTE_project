<template>
	<div class="RowCourse">
		<Modal width="1300" v-model="modal1" title="排课" :styles="{top: '20px'}">
			<Row>
				<Col span="8" style="border-right: 1px solid #DCDCDC;">
					<Col span="22">
				<Form ref="formValidate" :model="formValidate" :label-width="90">
					<Col span="24">
					<Col span="12">
					<FormItem label="门店名称" prop="Store">
						<Input v-model="formValidate.Store" placeholder="请输入" disabled></Input>
					</FormItem>
					</Col>
					</Col>
					<Col span="24">
					<div class="line">
						上课时间
					</div>
					<Col span="12">
					<FormItem label="上课日期" prop="AttendDate">
						 <DatePicker type="date" v-model="formValidate.AttendDate" placeholder="请选择"></DatePicker>
					</FormItem>
					</Col>
					<Col span="24">
					<Col span="12">
					<FormItem label="上课开始时间" prop="FromTime">
						<TimePicker type="time" v-model="formValidate.FromTime" placeholder="请选择"></TimePicker>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="上课结束时间" prop="ToTime ">
						<TimePicker type="time" v-model="formValidate.ToTime " placeholder="请选择"></TimePicker>
					</FormItem>
					</Col>
					</Col>
					</Col>
					<Col span="24">
					<div class="line">
						课程班级
					</div>
					<Col span="12">
					<FormItem label="班级" prop="ClassesName">
						<Select v-model="formValidate.ClassesName">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="教室" prop="ClassRoom ">
						<Select v-model="formValidate.ClassRoom">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课程主题" prop="Topic ">
						<Select v-model="formValidate.Topic">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课程阶段" prop="Phase  ">
						<Select v-model="formValidate.Phase">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="应销课时" prop="ExpectPeriod ">
						<Input v-model="formValidate.ExpectPeriod " placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="最大人数" prop="Store">
						<Input v-model="formValidate.Store" placeholder="请输入"></Input>
					</FormItem>
					</Col>
					</Col>
					<Col span="24">
					<div class="line">
						授课老师
					</div>
					<Col span="12">
					<FormItem label="授课老师" prop="Teacher ">
						<Select v-model="formValidate.Teacher">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课时" prop="TeacherWT">
							<Input v-model="formValidate.TeacherWT " placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="助教老师" prop="Assistant ">
						<Select v-model="formValidate.Assistant">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课时" prop="AssistantWT  ">
						<Input v-model="formValidate.AssistantWT  " placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="外教老师" prop="ForeignTeacher ">
						<Select v-model="formValidate.ForeignTeacher">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课时" prop="ForeignTeacherWT ">
						<Input v-model="formValidate.ForeignTeacherWT " placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem label="自备物品说明" prop="Comments">
						<Input type="textarea" v-model="formValidate.Comments" placeholder="请输入"></Input>
					</FormItem>
					</Col>
					</Col>
				</Form>
				</Col>
				</Col>
				<Col span="16">
					<h3 style="margin-bottom:10px;margin-left: 30px;">学员列表</h3>
					<Col span="24" push="20">
					<Button class="tableTops" style="margin-bottom: 10px;">添加上课学员</Button>
					</Col>
					<Col span="23" push="1">
					<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="StudentData" :columns="StudentDataHeader" @on-delete="handleDeleteDetail" height="400"border stripe @on-row-dblclick="dblclickUpDetail"/>
					</Col>
				</Col>
				<div slot="footer">
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset('formValidate');modal1 = false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit('formValidate');">
                        <span>确定</span>
                   </button>
			</div>
			</Row>
		</Modal>
	</div>
</template>

<script>
	import Tables from "_c/tables";
	import { AddOrUpdateCourse, AddOrUpdatePrice, RemoveCourse, RemovePrice } from '@/api/data'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities } from '@/api/api'
	export default {
		name: 'RowCourse',
		inject: ["reload"],
		components: {
			Tables,
		},
		data() {
			return {
				modal1: '',
				formValidate: {
					Topic:'',
					AttendDate:'',
					FromTime:'',
					ToTime:'',
					ClassRoom:'',
					ExpectPeriod:'',
					ClassesId:'',
					AutoAddClassesMember:'',
					CourseId:'',
					PhaseId:'',
					TeacherId:'',
					Teacher:'',
					TeacherWT:'',
					AssistantId:'',
					Assistant:'',
					AssistantWT:'',
					ForeignTeacherId:'',
					ForeignTeacher:'',
					ForeignTeacher:'',
					Comments:'',
					MemberCollection:'',
					ClassesName:"",
					Phase:"",
					Id:'',
					
				},
				StudentData: [
					{
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
				],
				StudentDataHeader: [{
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
						width:80

					},
					{
						title: "昵称",
						key: "Status",
						sortable: true,
						width:80

					},
					{
						title: "订单类型",
						key: "Status",
						sortable: true,
						

					},
					{
						title: "总课时",
						key: "Status",
						sortable: true,
						width:100
					},
					{
						title: "已销课时",
						key: "Status",
						sortable: true,
						width:110,
					

					},
					{
						title: "剩课时",
						key: "Status",
						sortable: true,
						width:100

					},
					{
						title: "操作",
						key: "handle",
						width:70,
						options: ["delete"]
					}

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
			handleDeleteDetail() {

			},
			dblclickUpDetail() {

			},
			//取消添加
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
			},
			//确认添加
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {

					}
				})
			},
		},
		mounted() {

		}
	}
</script>

<style lang="less">
	.line {
		font-size: 16px;
		font-weight: 600;
		color: #000;
		width: 100%;
		border-bottom: 2px solid #999;
		margin-bottom: 10px;
	}
</style>