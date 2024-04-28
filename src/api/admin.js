import request from "@/api/request";
/**
 * @description:管理员登录
 */
export function adminLogin(data) {
    return request({
        method: "post",
        url: "/administrator/login",
        data
    })
}
/**
 * @description:管理员修改密码
 */
export function modifyPassword(data) {
    return request({
        method: "patch",
        url: "/administrator/password/retrieve",
        data
    })
}