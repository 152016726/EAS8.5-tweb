<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmp">
        <router-view></router-view>
    </div>
</template>

<script>
// es6的export default{ 写法等同于 module.exports={
export default{
    // es6的写法 data() 等同于es5的 data:function()
    data(){
        return{
            name:'heima'
        }
    },methods:{

    }
}

</script>

<style class="scoped">
</style>