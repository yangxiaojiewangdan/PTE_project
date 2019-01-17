function jsonStr() {
	var jsonStrs = '{"FirstName":[{"required":true,"message":"必填","trigger":"blur"}],"mail":[{"required":true,"message":"Mailbox cannot be empty","trigger":"blur"},{"type":"email","message":"Incorrect email format","trigger":"blur"}],"city":[{"required":true,"message":"Please select the city","trigger":"change"}],"gender":[{"required":true,"message":"Please select gender","trigger":"change"}],"interest":[{"required":true,"type":"array","min":1,"message":"Choose at least one hobby","trigger":"change"},{"type":"array","max":2,"message":"Choose two hobbies at best","trigger":"change"}],"date":[{"required":true,"type":"date","message":"Please select the date","trigger":"change"}],"time":[{"required":true,"type":"string","message":"Please select time","trigger":"change"}],"desc":[{"required":true,"message":"Please enter a personal introduction","trigger":"blur"},{"type":"string","min":20,"message":"Introduce no less than 20 words","trigger":"blur"}],"Account":[{"pattern":"/^\d{5,10}$/","message":"请输入正确账号或密码","trigger":"blur"}]}'
	console.log(jsonStrs)

}
export {
	jsonStr
}