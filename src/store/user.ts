import { defineStore } from 'pinia';
import { login, userLogout } from '@/api/user';
import {
    getToken,
   // setToken,
    removeToken,
  //  setUserInfo,
    getUserInfo,
    removeUserInfo
} from '@/utils/cookies';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: getToken() || '',
        name: '',
        avatar: '',
        introduction: '',
        userInfo: {},
        roles: [] as string[],
        username: Cookies.get('username') || ''
    }),
    actions: {
        async login(userInfo: { username: string; password: string }) {
            let { username, password } = userInfo;
            username = username.trim();
            const { data } = await login({ username, password });
            if (String(data.code) === '1') {
                // 设置状态值
                this.username = username;
                this.token = data.data.token;
                this.userInfo = { ...data.data };

                // 保存到 Cookie 中
                Cookies.set('username', username);
                Cookies.set('user_info', data.data);
                Cookies.set('token', data.data.token);
                return data;
            } else {
                return ElMessage.error(data.msg);
            }
        },
        resetToken() {
            removeToken();
            this.token = '';
            this.roles = [];
        },
        async getUserInfo() {
            if (this.token === '') {
                throw new Error('GetUserInfo: token is undefined!');
            }

            const data = JSON.parse(<string>getUserInfo());
            if (!data) {
                throw new Error('Verification failed, please Login again.');
            }

            const { roles, name, avatar, introduction } = data;
            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
                throw new Error('GetUserInfo: roles must be a non-null array!');
            }

            this.roles = roles;
            this.userInfo = data;
            this.name = name;
            this.avatar = avatar;
            this.introduction = introduction;
        },
        async logOut() {
            const { data } = await userLogout({});
            removeToken();
            this.token = '';
            this.roles = [];
            Cookies.remove('username');
            Cookies.remove('user_info');
            removeUserInfo();
        }
    }
});