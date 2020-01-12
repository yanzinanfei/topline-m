// 用户请求相关模块
import request from '@/utils/request'
// 用户登录
export const login = data => {
  // 具体请求代码
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    // headers: {}, // 请求头参数
    // params: {}, // Query 查询参数
    data// body 请求体参数
  })
}
// 获取验证码
export const getSmsCode = mobile => {
  // 具体请求代码
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取当前登录用户信息
export const getUserInfo = mobile => {
  // 具体请求代码
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
