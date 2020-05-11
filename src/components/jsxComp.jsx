import { h, ref } from 'vue'
export default {
  setup() {
    const msg = ref(1)

    return () =>h('h1', [msg.value])
  }
}