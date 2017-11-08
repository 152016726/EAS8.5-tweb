// 导入vue这个包
import Vue from 'vue';

//解析和呈现App.vue中的内容，则导入 App.vue组件
import App from './app.vue';

// 路由引入
import vueRouter from 'vue-router';

Vue.use(vueRouter);


import vuex from 'vuex';

Vue.use(vuex);


var state = { menuid: '1-1' };

var actions = {
    //这个方法在组件页面上使用  store.dispatch('action中定义的方法名称',向这个方法中传入的参数值)
    changemenu({ commit }, menuid) {
        commit('changemenu', menuid);
    }
}

//vuex内部的一个对象，供actions来进行调用处理的，所以在组件中不能访问这些方法
var mutations = {
    changemenu(state, menuid) {
        state.menuid = menuid;
    }
}

//对state中的数据进行逻辑封装的方法
var getters = {};

var store = new vuex.Store({
    modules: {
        global: {
            state,
            mutations,
            actions,
            getters
        }
    }
});



//注册路由
//导入login.vue组件对象
import login from './components/admin/account/login.vue';
//导入后台管理系统的整体布局组件
import layout from './components/admin/layout.vue';
//导入goodslist.vue
import goodslist from './components/admin/goods/goodslist.vue';
//导入goodsadd.vue
import goodsadd from './components/admin/goods/goodsadd.vue';
//导入goodsedit.vue
import goodsedit from './components/admin/goods/goodsedit.vue';


//引入axios
import axios from 'axios';

axios.defaults.baseURL = 'http://157.122.54.189:9095';
Vue.prototype.$http = axios;
//设定AXIOS的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;
Vue.use(axios);

//引用elementUI 和elementUI的css样式
import elementUI from 'element-ui';
import '../static/theme_rms/index.css';
import '../static/site.css';
Vue.use(elementUI);

//创建路由
var router = new vueRouter({
    //routes构建路由
    routes: [{ name: 'default', path: '/', redirect: '/admin' }, {
        name: 'login',
        path: '/login',
        component: login
    }, {
        name: 'layout',
        path: '/admin',
        component: layout,
        children: [{
                name: 'goodslist',
                path: 'goodslist',
                component: goodslist,
                meta: { menuno: '1-1', ischangemenu: true },
            },
            {
                name: 'goodsadd',
                path: 'goodsadd',
                component: goodsadd,
                meta: { menuno: '1-2', ischangemenu: true }
            },
            {
                name: 'goodsedit',
                path: 'goodsedit/:id',
                component: goodsedit
            }
        ]
    }]
})


//路由钩子，实现菜单的改变给全局变量赋值
router.beforeEach((to, from, next) => {
    //如果当前进入的路由规则上有meta.menuno的话就将其设置到 localstorage中
    // console.log(to);
    // console.log(to.meta);
    if (to.meta.ischangemenu) {
        localStorage.setItem('mname', to.name);
        console.log(11);
    }
    if (to.meta.menuno) {
        //设置state.menuid 从而改变 layoute中el-menu的 :default-active
        store.dispatch('changemenu', to.meta.menuno);
    }
    if (to.name != 'login') {
        axios.get('/admin/account/islogin').then(res => {
            if (res.data.code == "logined") {
                next();
            } else {
                router.push({ name: 'login' });
            }
        })
    } else {
        next();

    }
})

Vue.filter("datefmt1", function(input, splitchar) {
    var input = new Date(input);
    var y = input.getFullYear();
    var m = input.getMonth() + 1;
    var d = input.getDate();
    var h = input.getHours();
    var mi = input.getMinutes();
    var s = input.getSeconds();
    if (splitchar == "YY-MM-DD hh:mm:ss") {
        return y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
    }
    if (splitchar == "YY-MM-DD") {
        return y + "-" + m + "-" + d;
    }
})
new Vue({
    el: '#app',
    router,
    store,
    //ES5的写法render:function(create){create(App)}
    render: create => create(App)
})