import { defineStore } from 'pinia'
import { login, register } from '@/api/user' // You need to create/dashboard API call
import { getToken, removeToken, getUserInfo } from '@/utils/cookies'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: getToken() || '',
        name: '',
        avatar: '',
        introduction: '',
        userInfo: {},
        roles: [] as string[],
        username: Cookies.get('username') || '',
        isLoggedIn: false,  // 默认未登录
    }),
    actions: {
        async login(userInfo: { username: string; password: string }) {
            ElMessage.info('Login');
            let { username, password } = userInfo
            username = username.trim()
            const { data } = await login({ username, password })
            if (String(data.code) === '1') {
                this.username = username
                this.token = data.data.token
                this.userInfo = { ...data.data }
                this.isLoggedIn = true
                Cookies.set('username', username)
                Cookies.set('user_info', data.data)
                Cookies.set('token', data.data.token)
                return data
            } else {
                return ElMessage.error(data.msg)
            }
        },

        async register(userInfo: { username: string; password: string }) {
            let { username, password } = userInfo
            username = username.trim()
            const { data } = await register({ username, password }) // Your dashboard API call
            if (String(data.code) === '1') {
                // Registration successful, auto-login or prompt user to login
                ElMessage.success('注册成功')
                return data
            } else {
                ElMessage.error(data.msg)
                return data
            }
        },

        resetToken() {
            removeToken()
            this.token = ''
            this.roles = []
        },

        async getUserInfo() {
            if (this.token === '') {
                throw new Error('GetUserInfo: token is undefined!')
            }

            const data = JSON.parse(<string>getUserInfo())
            if (!data) {
                throw new Error('Verification failed, please Login again.')
            }

            const { roles, name, avatar, introduction } = data
            if (!roles || roles.length <= 0) {
                throw new Error('GetUserInfo: roles must be a non-null array!')
            }

            this.roles = roles
            this.userInfo = data
            this.name = name
            this.avatar = avatar
            this.introduction = introduction
        },
        // checkLogin() {
        //     // 检查登录状态，可以通过 localStorage 或 sessionStorage
        //     const loginStatus = localStorage.getItem('isLoggedIn');
        //     this.isLoggedIn = loginStatus === 'true'; // 读取登录状态
        //
        // }
    }
})
