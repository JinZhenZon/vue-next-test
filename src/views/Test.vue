<template>
  <div class="test">
    <h1>test count: {{count}}</h1>
    <button @click="add">
      add
    </button>
  </div>
</template>

<script>
  import { ref,onMounted,onBeforeMount,onErrorCaptured } from 'vue'
  export default {
    mounted () {
      console.log('写在外面的mounted')
    },
    beforeMount(){
      console.log('写在外面的beforeMount')
    },
    created () {
      console.log('写在外面的created')
    },
    setup () {
      console.log('写在setup的created')
      const count = ref(0)
      const add = () => {
        count.value++
      }
      onMounted(() => {
        console.log('onmounted')
      })
      onErrorCaptured(() => {
        console.log('onErrorCaptured')
      })
      onBeforeMount(() => {
        console.log('onBeforeMount')
      })
      return {
        count,
        add,
        onMounted,
        onBeforeMount,
        onErrorCaptured
      }
    }
  }
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>