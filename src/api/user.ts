import request from '@/utils/request'
/**
 *
 * 用户管理
 *
 **/
// 登录
export const login = (data: any) =>
    request({
        'url': '/user/login',
        'method': 'post',
        'data': data
    })

// 注册
export const register = (data: any) =>
    request({
        'url': '/user/register',
        'method': 'post',
        'data': data
    })

// 退出
export const userLogout = (params: any) =>
    request({
        'url': `/user/logout`,
        'method': 'post',
        'params': params
    })

//发送分页请求
export const getUserList = (params: any) =>
    request({
        'url': `/user/page`,
        'method': 'get',
        'params': params
    })

// 注册
export const register = (data: any) =>
    request({
        url: '/user/register',
        method: 'post',
        data: data,
    });
