<template>
  <div>
    <children></children>
    只读数据 ： {{ readonlyMsg }}
    <button @click="changeTest">
      修改透传数据
    </button>
    <button @click="getDounce">
      获取数据类型判断
    </button>
  </div>
</template>
<script>
import { 
  provide,
  ref,
  reactive, 
  toRef,
  toRefs,
  getCurrentInstance,
  readonly,
  isProxy,
  isRef,
  isReactive,
  isReadonly,
} from 'vue'
import Children from './ordinaryChild'
export default {
  components: {
    Children
  },
  setup() {
    const instance = getCurrentInstance()
    console.log(instance)
    const { ctx } = getCurrentInstance()
    console.log(ctx)
    const msg = ref(0)
    const state = reactive({
      testMsg: '测试往下透传一个数据',
      testMsg2: '透传一个静态'
    })
    const readonlyMsg = readonly(msg)
    
    const changeTest = () => {
      state.testMsg = '修改了数据'
      msg.value++
      // 会发出警告 failed: target is readonly.
      readonlyMsg.value++
    }
    const getDounce = () => {
      console.log('isRef可以检测ref、readonly的ref数据、toRef的reactive\r\n', isRef(msg), isRef(readonlyMsg), isRef(state), isRef(state.testMsg), isRef(toRef(state, 'testMsg')))
      console.log('isProxy可以检测readonly的数据、reactive声明的对象\r\n', isProxy(msg), isProxy(readonlyMsg), isProxy(state), isProxy(state.testMsg), isProxy(toRef(state, 'testMsg')))
      console.log('isReactive可以检测reactive声明的对象\r\n', isReactive(msg), isReactive(readonlyMsg), isReactive(state), isReactive(state.testMsg), isReactive(toRef(state, 'testMsg')))
      console.log('isReadonly可以检测readonly的数据\r\n', isReadonly(msg), isReadonly(readonlyMsg), isReadonly(state), isReadonly(state.testMsg), isReadonly(toRef(state, 'testMsg')))
    }
    provide("testMsg", toRef(state, 'testMsg'))
    provide("testMsg2", state.testMsg2)
    provide("msg", msg)
    return {
      ...toRefs(state),
      changeTest,
      msg,
      readonlyMsg,
      getDounce
    }
  }

}
</script>
<style scoped>
  
</style>
