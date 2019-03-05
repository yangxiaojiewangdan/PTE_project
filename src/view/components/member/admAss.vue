<<<<<<< HEAD
<template>
  <div>
      <button @click="aa">11111111111</button>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script >
import QRCode from 'qrcode'
  export default{
    data(){
      return {
        codes:''
      }
    },
    components: {
      QRCode: QRCode
    },
    methods:{
        aa(){
            this.useqrcode();
        },
      useqrcode(){
        var canvas = document.getElementById('canvas')
 
        QRCode.toCanvas(canvas, '111111111111111', function (error) {
          if (error) console.error(error)
          console.log('success!');
        })
      }
    },
    mounted(){
      
    }
  }

</script>

=======
>>>>>>> 3c979113829020bf7bfeb356d90c2f7912337828
