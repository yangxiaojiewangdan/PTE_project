<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      ruleValidate: {
        Description: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
      }
    };
  },
    methods:{
        aaa(){
            this.$emit("ruleValidate",this.ruleValidate)
        }
    },
  mounted() {
      this.aaa();
  }
};
</script>



