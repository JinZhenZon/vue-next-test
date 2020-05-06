<template>
  <div class="test">
    生命周期常用
  </div>
</template>

<script>
  import { onMounted } from 'vue'
  export default {
    mounted(){
      console.log('外部的mounted')
    },
    /*
      * beforeCreate -> 使用setup()
      * created -> 使用 setup()
      * beforeMount -> onBeforeMount
      * mounted -> onMounted
      * beforeUpdate -> onBeforeUpdate
      * updated -> onUpdated
      * beforeDestroy -> onBeforeUnmount
      * destroyed -> onUnmounted
      * errorCaptured -> onErrorCaptured
       */
    setup () {
      console.log('内部的created')
      onMounted(() => {
        console.log('内部mounted')
      })
      
    }
  }
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>