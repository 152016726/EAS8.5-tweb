<template>
<div class="arttmpl">
    <div class="abread bt-line">    
      <el-row>
          <el-col :span="6">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
              </el-breadcrumb>
          </el-col>
      </el-row>
    </div>
    <div class="operation">
      <el-row>
          <el-col :span="5">
                <el-button @click="toggleSelection">全选</el-button>
                <router-link to="/admin/goodsadd">
                <el-button>新增</el-button>
                </router-link>
                <el-button @click="getdel">删除</el-button>      
          </el-col>
          <el-col :span="4" :offset="15">
                <el-input placeholder="请输入搜索条件" icon="search" v-model="searchValue" :on-icon-click="getlist"></el-input>
          </el-col>
      </el-row>
    </div>
      <el-row>
          <el-col :span="24">
           <el-table :data="list" style="width: 100%" ref="multipleTable" :row-class-name="tableRowClassName" @selection-change="getrows">
              <el-table-column prop="date" label="全选" type="selection" width="80"> </el-table-column>
              <el-table-column prop="title" label="标题">
                      <template scope="scope">
                       <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
                            {{scope.row.title}}
                      </router-link>     
                    </template>
</el-table-column>
<el-table-column prop="categoryname" label="类别" width="100"> </el-table-column>
<el-table-column label="发布人/发布时间" width="180">
    <template scope="scope">
                        {{scope.row.user_name}}/{{scope.row.add_time |datefmt1('YY-MM-DD hh:mm:ss') }}
                </template>
</el-table-column>
<el-table-column prop="name" label="属性" width="100">
    <template scope="scope">
      <el-tooltip class="item" effect="dark" v-bind="{content:scope.row.is_slide==1?'轮播':'未轮播'}" placement="bottom">
             <i v-bind="{class:(scope.row.is_slide==1?'el-icon-picture imgactive ls':'el-icon-picture ls')} "></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" v-bind="{content:scope.row.is_top==1?'置顶':'未置顶'}" placement="bottom">
             <i v-bind="{class:(scope.row.is_top==1?'el-icon-upload imgactive ls':'el-icon-upload ls')}" ></i> 
      </el-tooltip>       
      <el-tooltip class="item" effect="dark" v-bind="{content:scope.row.is_hot==1?'热门':'非热门'}" placement="bottom">
            <i v-bind="{class:(scope.row.is_hot==1?'el-icon-star-on imgactive ls':'el-icon-star-on ls')}"></i>
      </el-tooltip>       
   </template>
</el-table-column>
<el-table-column prop="address" label="操作" width="80">
    <template scope="scope">
                        <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
                          <el-button type="success" size="mini">编辑</el-button>
                        </router-link>   
                </template>
</el-table-column>
</el-table>
</el-col>
</el-row>
<el-row>
    <el-col :span="24">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
        </el-pagination>
    </el-col>
</el-row>
</div>
</template>
<script>
    export default {
        data() {
            return {
                ids: '',
                searchValue: '',
                list: [],
                currentPage: 1,
                pageSize: 10,
                totalPage: 0,
            }
        },

        methods: {
            getdel() {
                if (this.ids.length <= 0) {
                    this.$message.error("请勾选你要删除的数据");
                    return;
                }
                this.$confirm("您确认要删除数据吗？", "删除提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get("/admin/goods/del/" + this.ids).then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }
                        this.getlist();
                    });
                }).catch(() => {})

            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.getlist();
            },
            handleCurrentChange(currentSize) {
                this.currentPage = currentSize;
                this.getlist();
            },
            //选择selection时获取所有的id
            getrows(rows) {
                // console.log(rows);
                this.ids = "";
                var splitchar = ",";
                for (var i = 0; i < rows.length; i++) {
                    if (i == rows.length - 1) {
                        splitchar = '';
                    }
                    this.ids += rows[i].id + splitchar;
                }
                console.log(this.ids);
            },
            getlist() {
                var url = '/admin/goods/getlist?pageIndex=' + this.currentPage + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue;
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }

                    this.list = res.data.message;
                    this.totalPage = res.data.totalcount;
                })
            },
            tableRowClassName(row, index) {
                if (index % 2 == 0) {
                    return 'info-row';
                } else {
                    return 'positive-row';
                }
            },
            toggleSelection() {
                this.isSelectAll = !this.isSelectAll;
                if (this.isSelectAll) {
                    this.list.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    })
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            }
        },
        created() {
            this.getlist();
        }
    }
</script>

<style scoped>

</style>