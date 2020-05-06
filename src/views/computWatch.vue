<template>
  <div class="test">
    <h1>计算属性以及watch使用</h1>
    <h2>
      reactive:{{ count }}
    </h2>
    <h2>
      doubleCount: {{ doubleCount }}
    </h2>
    <button @click="addRef">
      addRef
    </button>
    <button @click="addA">
      addA
    </button>
  </div>
</template>

<script>
  import { reactive, watch, toRefs, computed,watchEffect } from 'vue'
  export default {
    setup () {
      const state = reactive({
        count: 0,
        doubleCount: computed(() => {
          return state.count * 2
        }),
        a: 1,
        watchCount: 0,
        watchCount1: 1
      })
      watchEffect(() => {
        console.log('watchEffect', state.count, state.a)
      }, {
        onTrack() {
          console.log('onTrack调用')   // 当反应性属性或ref作为依赖项被跟踪时
        },
        onTrigger() {
          console.log('ontrigger调用') // 当观察程序回调由依赖项的变异触发时
        }
      })
      watch(() => {
        return [state.watchCount, state.watchCount1]
      }, (val, prev) => {
        console.log(val, prev)
      })
      setTimeout(() => {
        state.watchCount++
      }, 1000)
      const addRef = () => {
        state.count++
      }
      return {
        // 将代理对象转换为纯对象。并对其每个key做包装，包装为ref
        ...toRefs(state),
        addRef,
      }
    }
  }
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>