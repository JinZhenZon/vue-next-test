<template>
  <div>
    {{ testMsg }}
  </div>
  <div>
    {{ testMsg2 }}
  </div>
  <div>
    {{ msg }}
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    const testMsg = inject("testMsg")
    const testMsg2 = inject("testMsg2")
    const msg = inject("msg")

    return {
      testMsg,
      testMsg2,
      msg
    }
  }
}
</script>
<style scoped>
  
</style>
