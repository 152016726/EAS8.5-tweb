<template class="templ">
  <div>
    <div class="abread bt-line"> 
      <el-row>
          <el-col :span="19">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
              </el-breadcrumb>
          </el-col>
      </el-row>
    </div>
  <el-row class="martop">
  <el-col :span="19">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
  <el-form-item label="标题" prop="title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="副标题" prop="sub_title">
    <el-input v-model="form.sub_title"></el-input>
  </el-form-item>

  <el-form-item label="商品货号" prop="goods_no">
    <el-input v-model="form.goods_no"></el-input>
  </el-form-item>

  <el-form-item label="类别">
    <el-select v-model="form.category_id" placeholder="请选择类别">
      <el-option v-for="(item,index) in neumlist" :label="item.title" :key="index" :value="item.category_id">
          <!--el-option 下动洗会覆盖:labei 中的值  -->
          <span v-for="(list,index) in (item.class_layer-1)">&nbsp;</span>
        <span v-if="item.class_layer>1?true:false">-|</span>
        <span v-text="item.title"></span>
      </el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="是否发布">
    <el-switch on-text="发布" off-text="不发布" v-model="form.status" :width="80"></el-switch>
  </el-form-item> 

   <el-form-item label="推荐类型">
    <el-switch on-text="轮播" off-text="不轮播" v-model="form.is_slide" :width="80"></el-switch>
    <el-switch on-text="置顶" off-text="" v-model="form.is_top"></el-switch>
    <el-switch on-text="热门" off-text="" v-model="form.is_hot"></el-switch>
  </el-form-item>

      <el-form-item label="库存数量" prop="stock_quantity">
    <el-input :width="100" v-model="form.stock_quantity"></el-input>
  </el-form-item>

  <el-form-item label="市场价格" prop="market_price">
    <el-input v-model="form.market_price"></el-input>
  </el-form-item>

  <el-form-item label="销售价格" prop="sell_price">
    <el-input v-model="form.sell_price"></el-input>
  </el-form-item>

  <el-form-item label="摘要" prop="zhaiyao">
    <el-input v-model="form.zhaiyao"></el-input>
  </el-form-item>

 <el-form-item label="上传封面">
   <el-upload
  class="avatar-uploader"
  action="http://157.122.54.189:9095/admin/article/uploadimg"
  :show-file-list="false"
  :on-success="uploadimg">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>

  <el-form-item label="图片相册">
    <el-upload
  class="upload-demo"
  action="http://157.122.54.189:9095/admin/article/uploadimg"
  :on-success="uploadfile"
  :file-list="form.fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
</el-upload>
  </el-form-item>
 

  <el-form-item label="详细内容" prop="content">
     <quill-editor v-model="form.content" ref="form" >
  </quill-editor>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
    <el-button @click="resetForm('form')">重置</el-button>
  </el-form-item>
</el-form>
  </el-col>
  </el-row>
  </div>
</template>
<script>
    import {
        quillEditor
    } from 'vue-quill-editor';
    export default {
        components: {
            quillEditor
        },
        data() {
            var checkNumber = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('数值不能为空'));
                }
                setTimeout(() => {
                    if (isNaN(value)) {
                        return callback(new Error('请输入数字值'));

                    } else {
                        return callback();
                    }
                }, 300);
            }
            return {
                neumlist: '',
                imageUrl: '',
                form: {
                    title: '',
                    sub_title: '',
                    goods_no: '',
                    stock_quantity: 0,
                    market_price: 0,
                    sell_price: 0,
                    status: true,
                    is_slide: true,
                    is_top: false,
                    is_hot: false,
                    zhaiyao: '',
                    content: '',
                    category_id: '',
                    imgList: [],
                    fileList: [],
                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        message: '长度在 3 个字符以上',
                        trigger: 'blur'
                    }],
                    sub_title: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        message: '长度在 3 个字符以上',
                        trigger: 'blur'
                    }],
                    goods_no: [{
                        required: true,
                        message: '请输入商品编号',
                        trigger: 'blur'
                    }],
                    category_id: [{
                        required: true,
                        message: '请选择分类',
                        trigger: 'blur'
                    }],
                    stock_quantity: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    market_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    sell_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            onSubmit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        var url = "/admin/goods/add/goods";
                        this.$http.post(url, this.form).then(res => {
                            if (res.data.status == 1) {
                                this.$message.error(res.data.message);
                                return;
                            }
                            //数据新增成功以后跳转上皮列表页面
                            //利用vue-rouer的编程式导航实现页面的跳转
                            this.$router.push({
                                name: 'goodslist'
                            });
                        })
                    }
                })
            },
            resetForm(form) {
                //重置表单
                this.$refs[form].resetFields();
            },
            getNeum() {
                var url = "/admin/category/getlist/goods";
                this.$http.get(url).then(res => {
                    console.log(res.data.message);
                    this.neumlist = res.data.message;
                })
            },
            uploadimg(response, file, fileList) {
                console.log(response);
                this.form.imgList = [response];
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            uploadfile(response, file, fileList) {
                console.log(response);
                this.form.fileList.push(response);
            }
        },
        created() {
            this.getNeum();
        }

    }
</script>
<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>