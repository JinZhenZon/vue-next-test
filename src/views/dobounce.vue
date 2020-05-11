<template>
  <div>
    <input v-model="text" />
    {{ text }}
  </div>
</template>
<script>
import { customRef } from 'vue'
function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

export default {
  setup() {
    return {
      text: useDebouncedRef('hello')
    }
  }
}
</script>
<style scoped>
  
</style>
