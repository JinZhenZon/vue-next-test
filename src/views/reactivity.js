const isObjct = val => val !== null && typeof val === 'object'
const toProxy = new WeakMap() // {obj: observerd}
const toRaw = new WeakMap() // {observerd: obj}

function reactive (obj) {
    if (!isObjct(obj)) {
        return obj
    }

    // 查找缓存
    if (toProxy.has(obj)) {
        return toProxy.get(obj)
    } 
    // 表示key本身就是代理过对象
    if (toRaw.has(obj)) {
        return obj
    }
    // proxy外层拦截
    const observed = new Proxy(obj, {
        // target 代理目标
        get (target, key, receiver) {
            // Reflect是吧object上面的方法移动到这里了
            // 更健壮，避免一些异常 
            const res = Reflect.get(target, key, receiver)
            console.log('获取' + key + ':' + res)
            // 收集依赖
            track(target, key)
            return isObjct(res) ? reactive(res) : res
        },
        set (target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            console.log('设置' + key + ':' + value)
            triggeer(target, key)
            return res
        },
        deleteProperty (target, key) {
            const res = Reflect.deleteProperty(target, key)
            console.log('删除' + key )
            return res
        },
    })
    // 缓存的地方
    toProxy.set(obj, observed)
    toRaw.set(observed, obj)

    return observed
}
// 保存响应函数的回掉
const effectStack = []
function effect(fn){
    const rxEffect = function () {
        try {
            // 入栈
            effectStack.push(rxEffect)
            // 执行函数 出发getter => track
            return fn()
        } catch (error) {

        } finally {
            // 出栈
            effectStack.pop()
        }
    }
    rxEffect()
    return rxEffect
}
// 建立target/key和cb之间的映射关系
let targetMap = new WeakMap()
function track(target, key){
    const effect = effectStack[effectStack.length - 1]
    if (effect) {
        // 获取依赖表
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            // 初始化时不存在，需要创建一个空的Map
            depsMap = new Map()
            targetMap.set(targetMap, depsMap)
        }

        // 获取key对应的函数集合
        let deps = depsMap.get(key)

        if (!deps) {
            deps = new Set()
            depsMap.set(key, deps)
        }

        // 吧当前的effect加入到deps中
        if (!deps.has(effect)) {
            deps.add(effect)
        }
    }
}
function triggeer(target, key){
    // 获取依赖set
    const depsMap = targetMap.get(target)
    if (depsMap) {
        const deps = depsMap.get(key)
        deps && deps.forEach(effect => {
            effect()
        });
    }
}
const state = reactive({
    foo: 'foo',
    arr: [0, 1, 2],
    bar: {
        a: 1
    }
})
effect(()=>{
    console.log('effect:' + state.foo) 
})
// state.foo
state.foo = 'foooooooooo'
// state.domg = 'domg'
// delete state.domg
// state.bar.a = 10
// state.arr[0] = 10
// console.log(reactive(state) === state)



// effect 将回调函数保存起来备用， 立即执行一次回调函数出发它里面的getter
// track getter中调用track，把前面存储的回掉函数和当前的target,key之间建立映射关系
// trigger : setter中调用trigger 吧target,key 对应的响应函数都执行一遍