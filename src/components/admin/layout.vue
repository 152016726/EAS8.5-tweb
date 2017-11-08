<template>
  <div class="temp">
    <el-row>
      <el-col :span="leftspan">
          <img src="../../../images/logo.png" alt="">
          <div class="layout menu">
            <!--获取store.state中的menuid设置:default-active  -->
              <el-menu :default-active="this.$store.state.global.menuid" class="el-menu-vertical-demo" theme="dark" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>学员问题汇总</template>
<el-menu-item-group>
    <router-link to="/admin/goodslist">
        <el-menu-item index="1-1">内容管理</el-menu-item>
    </router-link>
    <router-link to="/admin/goodsadd">
        <el-menu-item index="1-2">类别管理</el-menu-item>
    </router-link>
    <el-menu-item index="1-3">评论管理</el-menu-item>
</el-menu-item-group>
</el-submenu>
<el-submenu index="2">
    <template slot="title"><i class="el-icon-message"></i>前端常用功能</template>
    <el-menu-item-group>
        <el-menu-item index="2-1">内容管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="2-2">类别管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="2-3">评论管理</el-menu-item>
    </el-menu-item-group>
</el-submenu>
<el-submenu index="3">
    <template slot="title"><i class="el-icon-message"></i>重难点专区</template>
    <el-menu-item-group>
        <el-menu-item index="3-1">内容管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="3-2">类别管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="3-3">评论管理</el-menu-item>
    </el-menu-item-group>
</el-submenu>
<el-submenu index="4">
    <template slot="title"><i class="el-icon-message"></i>资源下载</template>
    <el-menu-item-group>
        <el-menu-item index="4-1">内容管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="4-2">类别管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="4-3">评论管理</el-menu-item>
    </el-menu-item-group>
</el-submenu>
<el-submenu index="5">
    <template slot="title"><i class="el-icon-message"></i>购物商城</template>
    <el-menu-item-group>
        <el-menu-item index="5-1">内容管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="5-2">类别管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="5-3">评论管理</el-menu-item>
    </el-menu-item-group>
</el-submenu>
<el-submenu index="6">
    <template slot="title"><i class="el-icon-message"></i>订单管理</template>
    <el-menu-item-group>
        <el-menu-item index="6-1">内容管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="6-2">类别管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
        <el-menu-item index="6-3">评论管理</el-menu-item>
    </el-menu-item-group>
</el-submenu>
</el-menu>
</div>
</el-col>
<el-col :span="rightspan">
    <el-row>
        <el-col :span="24">
            <div class="topbg">
                <el-row>
                    <el-col :span="1"><i class="el-icon-menu layout area" @click="showisCollapse"></i></el-col>
                    <el-col :span="23">
                        <span>欢迎XXX登录</span>
                        <el-dropdown split-button type="primary">
                            更多
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>修改密码</el-dropdown-item>
                                <el-dropdown-item>注销登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <router-view></router-view>
    </el-row>
</el-col>
</el-row>
</div>
</template>
<script>
    export default {
        data() {
            return {
                isCollapse: false,
                leftspan: 4,
                rightspan: 20,
            }
        },
        created() {
            //从localstorage中获取到key对应的路由名称
            var rname = localStorage.getItem('mname');
            console.log(rname);
            this.$router.push({
                name: rname
            });
        },
        methods: {
            showisCollapse() {
                this.isCollapse = !this.isCollapse;
                if (this.isCollapse) {
                    this.leftspan = 1;
                    this.rightspan = 23;
                } else {
                    this.leftspan = 4;
                    this.rightspan = 20;
                }

            }
        }
    }
</script>

<style scoped>

</style>