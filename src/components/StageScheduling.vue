<template>
	<div class="StageScheduling">
		<Modal width="1300" v-model="modal1" title="阶段排课" :mask-closable="false" :styles="{top: '20px'}">
			<Row style="height:800px;overflow-y:auto;overflow-x:hidden;">
				<Col span="8" style="border-right: 1px solid #DCDCDC;">
				<Col span="22">
				<Form ref="formValidate" :model="formValidate" :label-width="90">
					<Col span="24">
					<Col span="12">
					<!--<FormItem label="门店名称" prop="Store">
						<Input v-model="formValidate.Store" placeholder="请输入" disabled></Input>
					</FormItem>-->
					<FormItem label="门店名称" prop="Store">
						<Select v-model="formValidate.Store" @on-change="selectStore">
							<Option v-for="item in storeList" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
						</Select>
					</FormItem>
					</Col>
					</Col>
					<Col span="24">
					<!--阶段排课-->
					<Col>
						<div class="line">
						自定义阶段
					</div>
					<Form ref="formDynamic" :model="formValidate.formDynamic">
						<FormItem v-for="(item, index) in formValidate.formDynamic.items" v-if="item.status" :key="index"  :prop="'items.' + index + '.value'" :rules="{message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
							<Row>
								<Col span="24">
								<p class="Classes">课程主题</p>
								<Input v-model="item.Topic" placeholder="请输入" class="selectClasses"></Input>
								</Col>
								<Col span="24">
								<p class="Classes">上课日期</p>
								<DatePicker type="date" v-model="item.AttendDate" placeholder="请选择" class="selectClasses"></DatePicker>
								<p class="Classes">上课时间</p>
								<TimePicker type="time" v-model="item.FromTime" placeholder="请选择" format="HH:mm" class="selectClasses"></TimePicker>
								</Col>
								<Col span="24">
								
								<p class="Classes">结束时间</p>
								<TimePicker type="time" v-model="item.ToTime" placeholder="请选择" format="HH:mm" class="selectClasses"></TimePicker>
								<p class="Classes">选择教室</p>
								<Select v-model="item.ClassRoom" class="selectClasses">
									<Option v-for="item in classesRoomLIst" :value="item.Id" :key="item.value">{{ item.Description }}</Option>
								</Select>
								</Col>
								<Col span="24">
								<p class="Classes">应销课时</p>
								<Input v-model="item.ExpectPeriod " placeholder="请输入" class="selectClasses"></Input>
								<Icon type="md-trash" size="26" @click="handleRemove123(index)"class="selectClasses1" />
								</Col>
							</Row>
							<div class="line1"></div>
								
							
						</FormItem>
						<FormItem>
							<Row>
								<Col span="12">
								<Button type="dashed" long @click="handleAdd123" icon="md-add">添加上课时间段</Button>
								</Col>
							</Row>
						</FormItem>
					</Form>
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
				<Button class="tableTops"  @click="SearchModal" style="margin-bottom: 10px;">添加上课学员</Button>
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
				<button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="handleSubmit('formValidate');">
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
	import { GetEntities, GetEntity, Create, Update, Delete, BatchDelete, Copy, GetBusinessUnit, ValidateUnique, DataDictionaryGetEntities, SingleArrangement, BatchArrangement, DistrictGetEntity,CustomArrangement,RemoveMember } from '@/api/api'
	export default {
		name: ' StageScheduling ',
		inject: ["reload"],
		components: {
			Tables,
			SearchStuden,
		},
		data() {
			return {
				modal1: true,
				aaa:false,
				index: 1,
				getTableData: {
					Filters: {}
				},
				formValidate: {
					ArrangementDetail:[],
					ClassRoom: '',
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
					//带出来的学员列表
					MemberCollection: [],
					Id: '',
					ClassMode: '',
					formDynamic: {
						items: [{
							Topic: '',
							AttendDate:'',
							FromTime:'',
							ToTime:'',
							ClassRoom:'',
							ExpectPeriod:'',
							index: 1,
							status: 1
						}]
					},
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
						//console.log(this.formValidate.formDynamic.items)
						this.formValidate.ArrangementDetail = this.formValidate.formDynamic.items
						//console.log(this.formValidate.ArrangementDetail)
						CustomArrangement(this.formValidate).then(res=>{
							console.log(res.data)
						}).catch(err=>{
							console.log(err)
						})
					}
				})
			},
			handleAdd123() {
				this.index++;
				this.formValidate.formDynamic.items.push({
					Topic: '',
					AttendDate:'',
					FromTime:'',
					ToTime:'',
					ClassRoom:'',
					ExpectPeriod:'',
					index: this.index,
					status: 1
				});
			},
			handleRemove123(index) {
				this.formValidate.formDynamic.items[index].status = 0;
			},
			queryData(data) {
				console.log(data)
				this.formValidate.FromDate = data[0]
				this.formValidate.ToDate = data[1]
			},
			//根据门店Id查门店的教室
			selectStore(value){
				console.log(value)
				DistrictGetEntity('BusinessStore',value).then(res=>{
					console.log(res.data)
				}).catch(err=>{
					console.log(err)
				})
			},
				
			//根据班级Id查班级数据
			selsctClasses(value) {
				console.log(value)
				this.classesId = value;
				this.GetclassesId = value;
				DistrictGetEntity("Classes", this.GetclassesId).then(res => {
					console.log(res.data.ClassesMemberCollection)
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
			chengTime(data){
				this.formValidate.formDynamic.items.FromTime = data[0]
				this.formValidate.formDynamic.items.ToTime = data[1]
			},
			//SearchStuden传来的学员订单
			childStudenList(childValue){
				console.log(childValue.Data.ClassesMemberCollection)
			},
			handleDeleteDetail(params) {
				RemoveMember({ClassesId:this.classesId,ClassesMemberId :[params.row.Id]}).then(res=>{
					console.log(res.data)
					this.$Message.success('移除成功!')
				}).catch(err=>{
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
		border-bottom: 1px solid #999;
		margin-bottom: 10px;
	}
	.line1 {
		border-bottom: 1px dashed  #999;
	}
	
	.check {
		padding-bottom: 14px;
	}
	.Classes{
		display: inline-block;
		margin-right: 10px;
		margin-left: 18px;
		padding-bottom: 10px;
	}
	.selectClasses{
		display: inline-block;
		width: 30%;
	}
	.selectClasses1{
		display: inline-block;
		float: right;
	}
</style>