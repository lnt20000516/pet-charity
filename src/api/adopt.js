import request from "@/api/request";
/**
 * @description:获取领养列表
 */
export function getAdoptList(data) {
    return request({
        method: "get",
        url: "/adopt/list",
        params: data
    })
}
/**
 * @description:删除宠物领养
 */
export function deleteAdopt(id) {
    return request({
        method: "delete",
        url: "/adopt/delete/" + id,
    })
}
/**
 * @description:添加宠物领养
 */
export function addAdopt(data) {
    return request({
        method: "post",
        url: "/adopt/create",
        data
    })
}