<template>
    <div class="login">
        <el-container>
            <el-header>登录</el-header>
            <el-main>
                <!-- 表单 -->
                <el-form :rules="rules" :model="formData" ref="formData">
                    <el-form-item label="手机号" prop="mobile">
                        <el-input
                            placeholder="请输入手机号"
                            v-model="formData.mobile"
                            maxlength="11"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            placeholder="请输入密码"
                            type="password"
                            v-model="formData.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('formData')"
                            >登录</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer>
                &copy; 2022 SH-HTML5-2008
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import {userLogin} from '@/api/api'
export default {
    data() {
        return {
            formData: {
                mobile: "",
                password: "",
                user_info: {}
            },
            rules: {
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                    {
                        pattern: /^1[3-9]\d{9}$/,
                        message: "手机号格式不正确",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    // 出来的时候显示底部导航
    beforeDestroy() {
        this.eventBus.$emit("footernav", true);
    },
    methods: {
      updateToken: function(state,_token) {
        state._token = _token
        localStorage.setItem("_token", _token);
    },
    submitForm: function(formName) {
        this.$refs[formName].validate(async (valid) => {
            if (valid) {
                // 获取用户名和密码进行提交（API）
                let ret = await userLogin(this.formData);
                if (ret.data.code == 1000) {
                    // 记录token并跳转
                    this.$store.commit('updateToken',ret.data.data._token)
                    this.$router.push({path:'/center'})
                } else {
                    alert(ret.data.info);
                }
            }
        });
    },
        submit: function(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // eslint-disable-next-line no-unused-vars
                    let ret 
                    ret= userLogin(this.formData);
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.login {
    padding-top: 80px; 
    .el-container {
        width: 80%;
        margin-left: 40px;
        .el-header {
            font-size: 23px;
        }
    }
}
</style>