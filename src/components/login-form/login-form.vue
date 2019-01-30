<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="Account">
      <Input v-model="form.Account" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="Password">
      <Input type="Password" v-model="form.Password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { DataDictionaryGetEntities } from "@/api/api";
export default {
  name: 'LoginForm',
  props: {
    AccountRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    PasswordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        Account: '',
        Password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        Account: this.AccountRules,
        Password: this.PasswordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            Account: this.form.Account,
            Password: this.form.Password
          })
           DataDictionaryGetEntities("MEMBERSHIP_TYPE")
      .then(res => {
        localStorage.setItem("MEMBERSHIP_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("CUSTOMER_RELATION_TYPE")
      .then(res => {
        localStorage.setItem(
          "CUSTOMER_RELATION_TYPE",
          JSON.stringify(res.data)
        );
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("ORDER_TYPE")
      .then(res => {
        localStorage.setItem("ORDER_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("DISCOUNT_REASON_CODE")
      .then(res => {
        localStorage.setItem("DISCOUNT_REASON_CODE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("ORDER_STATUS")
      .then(res => {
        localStorage.setItem("ORDER_STATUS", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("CANCLE_REASON_CODE")
      .then(res => {
        localStorage.setItem("CANCLE_REASON_CODE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("ORDER_PAYMENT_STATUS")
      .then(res => {
        localStorage.setItem("ORDER_PAYMENT_STATUS", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("FULFIL_TYPE")
      .then(res => {
        localStorage.setItem("FULFIL_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("CUSTOMER_TYPE")
      .then(res => {
        localStorage.setItem("CUSTOMER_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("FIN_ADJUSTMENT_REASON")
      .then(res => {
        localStorage.setItem("FIN_ADJUSTMENT_REASON", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("COURSE_TYPE")
      .then(res => {
        localStorage.setItem("COURSE_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("COUNT_TYPE")
      .then(res => {
        localStorage.setItem("COUNT_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("CLASS_STATUS")
      .then(res => {
        localStorage.setItem("CLASS_STATUS", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("STORE_ROOM_TYPE")
      .then(res => {
        localStorage.setItem("STORE_ROOM_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("STORE_ROOM_STATUS")
      .then(res => {
        localStorage.setItem("STORE_ROOM_STATUS", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("STORE_BUSINESS_TYPE")
      .then(res => {
        localStorage.setItem("STORE_BUSINESS_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("STORE_TYPE")
      .then(res => {
        localStorage.setItem("STORE_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("AGREEMENT_STATUS")
      .then(res => {
        localStorage.setItem("AGREEMENT_STATUS", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("UMPIRE_TYPE")
      .then(res => {
        localStorage.setItem("UMPIRE_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("FRANCHISER_TYPE")
      .then(res => {
        localStorage.setItem("FRANCHISER_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("LEAGE_MODE")
      .then(res => {
        localStorage.setItem("LEAGE_MODE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("ROYALTY_TYPE")
      .then(res => {
        localStorage.setItem("ROYALTY_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("ROYALTY_FLAT_TYPE")
      .then(res => {
        localStorage.setItem("ROYALTY_FLAT_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("OBVERSION_TYPE")
      .then(res => {
        localStorage.setItem("OBVERSION_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("ROYALTY_BENCH_MARK")
      .then(res => {
        localStorage.setItem("ROYALTY_BENCH_MARK", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("SETTLE_TYPE")
      .then(res => {
        localStorage.setItem("SETTLE_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("DISTRICT_CLASS")
      .then(res => {
        localStorage.setItem("DISTRICT_CLASS", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("CERTIFICATE_TYPE")
      .then(res => {
        localStorage.setItem("CERTIFICATE_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("TRX_GROUP_TYPE")
      .then(res => {
        localStorage.setItem("TRX_GROUP_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("TRX_CLASS")
      .then(res => {
        localStorage.setItem("TRX_CLASS", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("TRX_TYPE")
      .then(res => {
        localStorage.setItem("TRX_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("TRX_FEE_BEAR")
      .then(res => {
        localStorage.setItem("TRX_FEE_BEAR", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("PARAMETER_TYPE")
      .then(res => {
        localStorage.setItem("PARAMETER_TYPE", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("FRANCHISER_STATUS")
      .then(res => {
        localStorage.setItem("FRANCHISER_STATUS", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("STORE_STATUS")
      .then(res => {
        localStorage.setItem("STORE_STATUS", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    DataDictionaryGetEntities("DATA_PERMISSION_LEVEL")
      .then(res => {
        localStorage.setItem("DATA_PERMISSION_LEVEL", JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
        }
      });
    
     
    }
  }
}
</script>
