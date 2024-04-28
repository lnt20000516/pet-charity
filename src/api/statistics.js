import request from "@/api/request";
/**
 * @description:获取众筹金额最近10天数据统计
 */
export function donateAmountStatistics() {
    return request({
        method: "get",
        url: "/statistics/admin/donateAmountStatistics/",
    })
}
/**
 * @description:获取众筹名单Top10数据统计
 */
export function donateAmountTop() {
    return request({
        method: "get",
        url: "/statistics/admin/donateAmountTop/",
    })
}
/**
 * @description:获取用户数、众筹项目数和众筹总金额
 */
export function statistics() {
    return request({
        method: "get",
        url: "/statistics/",
    })
}
/**
 * @description:获取用户性别比例
 */
export function userSexStatistics() {
    return request({
        method: "get",
        url: "/statistics/admin/userStatistics/",
    })
}

