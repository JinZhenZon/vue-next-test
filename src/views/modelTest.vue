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
  import { ref, reactive, toRefs} from 'vue'
  export default {
    setup () {
      const count = ref(0)
      const state = reactive({
        reactiveField: 0,
        a: [
          {
            a:1
          }
        ]
      })
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