<template>
   	<div class="content">
   		<input type="text" v-model="aaa" />
    	<input type="text" v-model="bbb"/>
    	<button @click="btn">点击</button>
   	</div>
    
   
</template>
<script>
    export default {
    	data(){
    		return{
    			aaa:'',
    			bbb:'',
    		}
    	},
    	methods :{
    		btn(){
 				axios.post("http://192.168.31.74:8081/api/Authentication/Authentication/Login",qs.stringify({Account:this.aaa,Password:this.bbb}))
        		.then((res)=>{
         			console.log(res)
      				if(res.data.code=="200"){
              			this.$router.push({path:'/'})
              				alert("登录成功")
          			}else{
            	alert("登录错误请检查手机号或密码")
          	}
        })
        .catch((error)=>{
          console.log(error)
        })
    		}
    	}
        
    }
</script>