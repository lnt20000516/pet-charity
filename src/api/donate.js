import request from "@/api/request";
/**
 * @description:获取宠物帮助众筹列表
 */
export function getDonateList(data) {
    return request({
        method: "get",
        url: "/donate/list",
        params: data
    })
}
/**
 * @description:删除宠物帮助众筹
 */
export function deleteDonate(id) {
    return request({
        method: "delete",
        url: "/donate/delete/" + id,
    })
}
/**
 * @description:修改宠物帮助众筹状态
 */
export function updateDonateState(data, id) {
    return request({
        method: "post",
        url: "/donate/stateUpdate/" + id,
        data
    })
}
/**
 * @description:添加宠物帮助众筹
 */
export function addDonate(data) {
    return request({
        method: "post",
        url: "/donate/create",
        data
    })
}
/**
 * @description:获取宠物帮助众筹详情
 */
export function getDonateInfo(id) {
    return request({
        method: "get",
        url: "/donate/get/" + id,
    })
}
/**
 * @description:捐赠
 */
export function makeDonations(data) {
    return request({
        method: "post",
        url: "/donate/donate/userDonate",
        data
    })
}