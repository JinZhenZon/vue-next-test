<template>
  <div>
    111
    <jsx-comp></jsx-comp>
    <p> 自定义ref : {{ testCustom }} </p>
    <button @click = "getRef">
      获取ref值
    </button>
    <button @click = "setRef">
      设置ref值
    </button>
    {{ a }}
    <button @click = "setFoo">
      设置foo值
    </button>
    <p>
      state2.foo:{{ state2.foo }}
    </p>
    <p>
      state2.nested.bar:{{ state2.nested.bar }}
    </p>
    <p>
      name:{{ name }}
    </p>
    <button @click = "setShallowReactive">修改shallowReactive</button>
  </div>
</template>
<script>
import jsxComp from '../components/jsxComp'
import { customRef, markRaw, isReactive, reactive, toRefs, shallowReactive, shallowRef, ref, toRaw
 } from 'vue'
export default {
  components: {
    jsxComp
  },
  setup () {
    // 显式控制其依赖项跟踪和更新触发
    function customRefTest(value) {
      return customRef((track, trigger) => {
        return {
          get() {
            track()
            return value
          },
          set (newValue) {
            value = newValue + '自定义ref'
            setTimeout(() => {
              trigger()
            }, 10000)
          }
        }
      })
    }
    const testCustom = customRefTest(0)
    const getRef = () => {
      console.log(testCustom.value)
    }
    const setRef = () => {
      testCustom.value = '设置ref值'
    }

    // 标记对象，使其永远不会转换为代理。返回对象本身
    const foo = markRaw({
      a: 10
    })
    const state = reactive(foo)
    console.log(isReactive(state)) // false
    const setFoo = () => {
      state.a++
      console.log(foo)
    }

    // shallowReadonly
    const state2 = shallowReactive({
      foo: 1,
      nested: {
        bar: 2
      }
    })
    const name = shallowRef(0)
    const ref1 = ref(0)
    const fooTest = {
      a: 1
    }
    const toRawTest = reactive(fooTest)
    const setShallowReactive = () => {
      state2.foo++
      state2.nested.bar++
      name.value++
      console.log(state2, ref1)
      console.log(name)
      console.log('toraw测试' + (toRaw(toRawTest) === fooTest))
      console.log('toraw测试2' + (toRaw(state) === foo))
    }
    return {
      state2,
      ...toRefs(state),
      name,
      setFoo,
      setShallowReactive,
      testCustom,
      getRef,
      setRef
    }

  }
}
</script>
<style scoped>
  
</style>
