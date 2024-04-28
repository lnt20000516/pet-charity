import request from "@/api/request";

/**
 * @description:用户登录
 */
export function userLogin(data) {
    return request({
        method: "post",
        url: "/user/login",
        data
    })
}
/**
 * @description:用户注册
 */
export function userRegister(data) {
    return request({
        method: "post",
        url: "/user/register",
        data
    })
}
/**
 * @description:用户找回密码
 */
export function userRetrieve(data) {
    return request({
        method: "patch",
        url: "/user/password/retrieve",
        data
    })
}
/**
 * @description:用户发送验证码
 */
export function userSendCode(data) {
    return request({
        method: "post",
        url: "/user/sendVCode",
        data
    })
}
/**
 * @description:获取全部用户反馈
 */
export function getFeedback(data) {
    return request({
        method: "get",
        url: "/user/feedback/list",
        params: data
    })
}
/**
 * @description:删除用户反馈
 */
export function deleteFeedback(id) {
    return request({
        method: "delete",
        url: "/user/feedback/" + id,
    })
}
/**
 * @description:获取用户信息
 */
export function getUserInfo() {
    return request({
        method: "post",
        url: "/user/token/information",
    })
}
/**
 * @description:修改用户信息
 */
export function updateUserInfo(data) {
    return request({
        method: "patch",
        url: "/user/token/information",
        data
    })
}
/**
 * @description:修改个人联系方式
 */
export function updateContact(data) {
    return request({
        method: "post",
        url: "/user/contact",
        data
    })
}
/**
 * @description:修改个人联系方式
 */
export function authentication(data) {
    return request({
        method: "post",
        url: "/user/authentication",
        data
    })
}
/**
 * @description:修改支付密码
 */
export function updatePayPassword(data) {
    return request({
        method: "patch",
        url: "/user/password/pay/retrieve",
        data
    })
}
/**
 * @description:添加用户反馈
 */
export function addFeedback(data) {
    return request({
        method: "post",
        url: "/user/feedback",
        data
    })
}
/**
 * @description:通过id获取用户信息
 */
export function getUserInfoId(id) {
    return request({
        method: "get",
        url: "/user/information/get/" + id,
    })
}
/**
 * @description:获取关注/粉丝列表
 */
export function getFriendList(data) {
    return request({
        method: "get",
        url: "/user/followers/list",
        params: data
    })
}
/**
 * @description:关注/取消关注
 */
export function followOrCancel(data) {
    return request({
        method: "post",
        url: "/user/followers/user",
        data
    })
}


