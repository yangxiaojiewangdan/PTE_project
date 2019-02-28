<template>
	<div class="RowCourse">
		<Modal width="1300" v-model="modal1" title="排课" :mask-closable="false" :styles="{top: '20px'}">
			<Row>
				<Col span="8" style="border-right: 1px solid #DCDCDC;">
				<Col span="22">
				<Form ref="formValidate" :model="formValidate" :label-width="90">
					<Col span="24">
					<Col span="12">
					<!--<FormItem label="门店名称" prop="Store">
						<Input v-model="formValidate.Store" placeholder="请输入" disabled></Input>
					</FormItem>-->
					<FormItem label="门店名称" prop="Store">
						<Select v-model="formValidate.Store">
							<Option v-for="item in storeList" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="排课方式" prop="ClassMode">
						<Select v-model="formValidate.ClassMode" @on-change="timetablingMethod">
							<Option v-for="item in workMode" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
					</Col>
					<Col span="24">
					<div class="line">
						上课时间
					</div>
					<!--单节排课-->
					<Col v-if="singleCourse">
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
					<!--批量排课-->
					<Col v-if="batchCourse">
					<Col span="24">
					<FormItem label="上课起止日期" prop="FromDateTime">
						<DatePicker type="daterange" v-model="formValidate.FromDateTime" placeholder="请选择" @on-change="queryData"></DatePicker>
					</FormItem>
					<FormItem label="上课开始日期" prop="FromDate " v-if="false">
						<DatePicker type="date" v-model="formValidate.FromDate " placeholder="请选择"></DatePicker>
					</FormItem>
					<FormItem label="上课结束日期" prop="ToDate " v-if="false">
						<DatePicker type="date" v-model="formValidate.ToDate " placeholder="请选择"></DatePicker>
					</FormItem>
					</Col>
					<Col span="24">
					<Col span="12">
					<FormItem label="上课开始时间" prop="FromTime">
						<TimePicker type="time" v-model="formValidate.FromTime" placeholder="请选择"></TimePicker>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="上课结束时间" prop="ToTime">
						<TimePicker type="time" v-model="formValidate.ToTime" placeholder="请选择"></TimePicker>
					</FormItem>
					</Col>
					</Col>
					<Col span="24" class="check">
					<Checkbox v-model="formValidate.AllowMon">周一</Checkbox>
					<Checkbox v-model="formValidate.AllowTue">周二</Checkbox>
					<Checkbox v-model="formValidate.AllowWed">周三</Checkbox>
					<Checkbox v-model="formValidate.AllowThu">周四</Checkbox>
					<Checkbox v-model="formValidate.AllowFri">周五</Checkbox>
					<Checkbox v-model="formValidate.AllowSat">周六</Checkbox>
					<Checkbox v-model="formValidate.AllowSun">周日</Checkbox>
					</Col>
					</Col>
					</Col>
					<Col span="24">
					<div class="line">
						课程班级
					</div>
					<Col span="12">
					<FormItem label="班级" prop="ClassesId">
						<Select v-model="formValidate.ClassesId" @on-change="selsctClasses">
							<Option v-for="item in classesList" :value="item.Id" :key="item.value">{{ item.ClassesName }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="教室" prop="ClassRoom " v-if="StageClasses">
						<Select v-model="formValidate.ClassRoom">
							<Option v-for="item in classesRoomLIst" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课程主题" prop="Topic" v-if="StageClasses">
						<Input v-model="formValidate.Topic " placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课程名称" prop="CourseId">
						<Select v-model="formValidate.CourseId" @on-change="selectCourse">
							<Option v-for="item in CoursePackageList" :value="item.Id" :key="item.value">{{ item.CourseName }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课程阶段" prop="PhaseId">
						<Select v-model="formValidate.PhaseId">
							<Option v-for="item in CoursePackagestageList" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="应销课时" prop="ExpectPeriod " v-if="StageClasses">
						<Input v-model="formValidate.ExpectPeriod " placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<!--<FormItem label="最大人数" prop="Store">
						<Input v-model="formValidate" placeholder="请输入"></Input>
					</FormItem>-->
					</Col>
					</Col>
					<Col span="24">
					<div class="line">
						授课老师
					</div>
					<Col span="12">
					<FormItem label="授课老师" prop="TeacherId  ">
						<Select v-model="formValidate.TeacherId">
							<Option v-for="item in peopleUserList" :value="item.Id" :key="item.value">{{ item.LastName }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课时" prop="TeacherWT">
						<Input v-model="formValidate.TeacherWT " placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="助教老师" prop="AssistantId">
						<Select v-model="formValidate.AssistantId">
							<Option v-for="item in peopleUserList" :value="item.Id" :key="item.value">{{ item.LastName }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="课时" prop="AssistantWT">
						<Input v-model="formValidate.AssistantWT" placeholder="请输入"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="外教老师" prop="ForeignTeacherId">
						<Select v-model="formValidate.ForeignTeacherId">
							<Option v-for="item in peopleUserList" :value="item.Id" :key="item.value">{{ item.LastName }}</Option>
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
				<Col span="2" push="20">
				<Button class="tableTops" @click="SearchModal" style="margin-bottom: 10px;">添加上课学员</Button>
				</Col>
				<Col span="23" push="1">
				<tables disabled-hover search-place="top" ref="tables" size="small" editable v-model="formValidate.MemberCollection" :columns="StudentDataHeader" @on-delete="handleDeleteDetail" height="400" border stripe @on-row-dblclick="dblclickUpDetail" />
				</Col>
				</Col>
			</Row>
			<div slot="footer">
				<button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="handleReset('formValidate'); modal1= false;">
                        <span>取消</span>
                    </button>
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit1('formValidate');">
                        <span>确定</span>
                   </button>
			</div>
		</Modal>
		<SearchStuden v-on:childStudenList = "childStudenList" v-if="aaa" :inputName="classesId"></SearchStuden>
	</div>
</template>

<script>
	import Tables from "_c/tables";
	import SearchStuden from "_c/SearchStuden";
	import { AddOrUpdateCourse, AddOrUpdatePrice, RemoveCourse, RemovePrice } from '@/api/data'
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities, SingleArrangement, BatchArrangement, DistrictGetEntity,RemoveMember} from '@/api/api'
	export default {
		name: 'RowCourse',
		inject: ["reload"],
		components: {
			Tables,
			SearchStuden,
		},
		data() {
			return {
				modal1: true,
				aaa:false,
				singleCourse: true,
				batchCourse: false,
				stageCourse: false,
				StageClasses:true,
				getTableData: {
					Filters: {}
				},
				formValidate: {
					Topic: '',
					AttendDate: '',
					FromTime: '',
					ToTime: '',
					ClassRoom: '',
					ExpectPeriod: '',
					ClassesId: '',
					AutoAddClassesMember: '',
					CourseId: '',
					PhaseId: '',
					TeacherId: '',
					Teacher: '',
					TeacherWT: '',
					AssistantId: '',
					Assistant: '',
					AssistantWT: '',
					ForeignTeacherId: '',
					ForeignTeacher: '',
					ForeignTeacher: '',
					Comments: '',
					ClassesName: "",
					Phase: "",
					FromDateTime: '',
					FromDate: '',
					ToDate: '',
					//带出来的学员列表
					MemberCollection: [],
					Id: '',
					ClassMode: '',
					AllowMon: '',
					AllowTue: '',
					AllowWed: '',
					AllowThu: '',
					AllowFri: '',
					AllowSat: "",
					AllowSun: '',
					FromTime1: '',
				},
				StudentDataHeader: [{
						type: "selection",
						width: 45
					},
					{
						title: "订单号",
						key: "OrderNo",
					},
					{
						title: "姓名",
						key: "LastName",
						width: 80

					},
					{
						title: "昵称",
						key: "NickName",
						width: 80

					},
					{
						title: "订单类型",
						key: "OrderType",
					},
					{
						title: "总课时",
						key: "TotalPeriod",
						width: 100
					},
					{
						title: "已销课时",
						key: "UsedPeriod",
						width: 110,

					},
					{
						title: "剩课时",
						key: "RemainPeriod",
						width: 100

					},
					{
						title: "操作",
						key: "handle",
						width: 70,
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
				//排课方式
				workMode: [{
						value: 1,
						label: '单节排课'
					},
					{
						value: 2,
						label: '批量排课'
					},
				],
				//周
				weekList: [{
						value: 1,
						label: '周一'
					},
					{
						value: 2,
						label: '周二'
					},
					{
						value: 3,
						label: '周三'
					},
					{
						value: 4,
						label: '周四'
					},
					{
						value: 5,
						label: '周五'
					},
					{
						value: 6,
						label: '周六'
					},
					{
						value: 7,
						label: '周日'
					},
				],
				//阶段排课要发送的字段（周 时间 教室

				storeList: [],
				classesRoomLIst: [],
				peopleUserList: [],
				classesList: [],
				CoursePackageList: [],
				themeList: [],
				CoursePackagestageList: [],
				arrangingCourses: "",
				GetclassesId: '',
				classesId:'',
			}
		},
		methods: {
			//移除班级学员
			handleDeleteDetail(params) {
				RemoveMember({ClassesId:this.classesId,ClassesMemberId :[params.row.Id]}).then(res=>{
					console.log(res.data)
					this.$Message.success('移除成功!')
				}).catch(err=>{
					console.log(err)
				})
			},
			dblclickUpDetail() {

			},
			//SearchStuden传来的学员订单
			childStudenList(childValue){
				console.log(childValue.Data.ClassesMemberCollection)
			},
			//排课方式
			timetablingMethod(value) {
				this.arrangingCourses = value
				console.log(this.arrangingCourses)
				if(this.arrangingCourses === 2) {
					this.singleCourse = false;
					this.stageCourse = false;
					this.batchCourse = true;
					this.StageClasses = true;
				} else if(this.arrangingCourses === 3) {
					this.singleCourse = false;
					this.batchCourse = false;
					this.stageCourse = true;
					this.StageClasses = false;
				} else if(this.arrangingCourses === 1 || this.arrangingCourses == "") {
					this.stageCourse = false;
					this.batchCourse = false;
					this.singleCourse = true;
					this.StageClasses = true;
				}
			},
			//取消添加
			handleReset(name) {
				this.$refs[name].resetFields();
				this.$Message.info('已取消');
			},
			//确认添加
			handleSubmit1(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.arrangingCourses === 1) {
							SingleArrangement(this.formValidate).then(res => {
								console.log(res.data)
							}).catch(err => {
								console.log(err)
							})
						} else if(this.arrangingCourses === 2) {
							BatchArrangement(this.formValidate).then(res => {
								console.log(res.data)
							}).catch(err => {
								console.log(err)
							})
						}

					}
				})
			},
			queryData(data) {
				console.log(data)
				this.formValidate.FromDate = data[0]
				this.formValidate.ToDate = data[1]
			},
			//根据班级Id查班级数据
			selsctClasses(value) {
				console.log(value)
				this.classesId = value;
				this.GetclassesId = value;
				DistrictGetEntity("Classes", this.GetclassesId).then(res => {
					console.log(res.data.ClassesMemberCollection)
					//班级学生
					this.formValidate.MemberCollection = res.data.ClassesMemberCollection
				}).catch(err => {
					console.log(err)
				})
			},
			//根据课程名称选阶段
			selectCourse(value){
				console.log(value)
				DistrictGetEntity("Course", value).then(res => {
					this.CoursePackagestageList = res.data.CoursePhaseCollection
					console.log(this.CoursePackagestageList)
				}).catch(err => {
					console.log(err)
				})
			},
			SearchModal(){
//				this.name1 = true;
//				console.log(this.name1)
				this.aaa = !this.aaa
			},
		},
		mounted() {
			//门店
			GetEntities("BusinessStore", this.getTableData).then(res => {
				this.storeList = res.data
				console.log(this.storeList)
			}).catch(err => {
				console.log(err)
			})
			//获取教室
			GetEntities("ClassRoom", this.getTableData).then(res => {
				this.classesRoomLIst = res.data;
			}).catch(err => {
				console.log(err)
			})
			//人员实体
			GetEntities("BusinessUser", this.getTableData).then(res => {
				this.peopleUserList = res.data;
			}).catch(err => {
				console.log(err)
			})
			//获取班级
			GetEntities("Classes", this.getTableData).then(res => {
				this.classesList = res.data;
			}).catch(err => {
				console.log(err)
			})
			//获取课程
			GetEntities("Course", this.getTableData).then(res => {
				this.CoursePackageList = res.data;
				console.log(res.data)
			}).catch(err => {
				console.log(err)
			})
			//登陆者信息
			let userInfo = sessionStorage.getItem('userInfo');
			let userData = JSON.parse(userInfo);
			this.formValidate.BusinessGroup = userData.BusinessGroup

		}
	}
</script>

<style lang="less">
	.line {
		font-size: 14px;
		font-weight: 600;
		color: #000;
		width: 100%;
		border-bottom: 2px solid #999;
		margin-bottom: 10px;
	}
	
	.check {
		padding-bottom: 14px;
	}
	.Classes{
		display: inline-block;
		margin-right: 16px;
		padding-bottom: 10px;
	}
	.selectClasses{
		display: inline-block;
		width: 80%;
	}
</style>