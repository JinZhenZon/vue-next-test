<template>
  <div class="test">
    <h1>ref && reactive</h1>
    <h2>
      ref:{{ count }}
    </h2>
    <h2>
      reactive:{{ reactiveField }}
    </h2>
    <h2>
      reactive:{{ a[0].a }}
    </h2>
    <h2>
      doubleCount: {{ doubleCount }}
    </h2>
    <button @click="addRef">
      addRef
    </button>
    <button @click="addReactive">
      addReactive
    </button>
    <button @click="addA">
      addA
    </button>
  </div>
</template>

<script>
  import { ref, reactive, toRefs, computed,watch } from 'vue'
  export default {
    setup () {
      const count = ref(0)
      const state = reactive({
        reactiveField: 0,
        a: [
          {
            a:1
          }
        ],
        doubleCount: computed(() => {
          return state.reactiveField * 2
        })
      })
      watch(() => {
        console.log('count变了', state.reactiveField)
      })
      setTimeout(()=>{
        console.log(count)
        count.value++
      },1000)

      const addRef = () => {
        count.value++
      }
      const addReactive = () =>{
        state.reactiveField++
      }
      const addA = () => {
        state.a[0].a++
      }
      return {
        count,
        // 将代理对象转换为纯对象。并对其每个key做包装，包装为ref
        ...toRefs(state),
        addA,
        addRef,
        addReactive
      }
    }
  }
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>