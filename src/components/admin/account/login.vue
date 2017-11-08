<template>
<div class="temp martop">
  <el-row>
      <el-form :model="form" :rules="rules" ref="form1" label-width="100px" class="demo-ruleForm">
        <el-col :span="6" :offset="9">
          <el-form-item label="用户名" prop="uname">
            <el-input  v-model="form.uname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="9">
          <el-form-item label="确认密码" prop="upwd">
            <el-input type="password" v-model="form.upwd" :width="100"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="9">
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
          </el-form-item>
        </el-col>
      </el-form>
  </el-row>
</div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    uname: '',
                    upwd: ''
                },
                rules: {
                    uname: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    upwd: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        //元素生成了
        mounted() {
            document.getElementsByTagName('body')[0].style.backgroundColor = "#0094ff";
        },
        beforeDestroy() {
            document.getElementsByTagName('body')[0].style.backgroundColor = "#fff";
        },
        methods: {
            submitForm() {
                this.$refs.form1.validate(valid => {
                    if (valid) {
                        this.$http.post('/admin/account/login', this.form).then(res => {
                            if (res.data.status == 1) {
                                this.$message.error(res.data.message);
                                return;
                            }
                            this.$router.push({
                                name: 'layout'
                            });
                        })
                    } else {
                        return false;
                    }
                })
            }
        }


    }
</script>

<style scoped>
    .martop {
        margin-top: 50px;
    }
</style>