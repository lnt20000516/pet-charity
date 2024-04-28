import request from "@/api/request";
/**
 * @description:获取所有宠物品种
 */
export function getBreedList(data) {
    return request({
        method: "get",
        url: "/pet/breed/list",
        params: data
    })
}
/**
 * @description:获取自己的宠物列表
 */
export function getOneselfPets(data) {
    return request({
        method: "get",
        url: "/pet/pet/list",
        params: data,
        headers: { TOKEN: localStorage.getItem("userToken") }
    })
}
/**
 * @description:获取他人的宠物列表
 */
export function getOthersPets(data) {
    return request({
        method: "get",
        url: "/pet/pet/list",
        params: data,
    })
}
/**
 * @description:修改宠物信息
 */
export function updatePetInfo(data, id) {
    return request({
        method: "patch",
        url: "/pet/pet/partialUpdate/" + id,
        data,
    })
}
/**
 * @description:添加宠物
 */
export function addPet(data) {
    return request({
        method: "post",
        url: "/pet/pet/create",
        data,
    })
}
/**
 * @description:删除宠物
 */
export function delPet(id) {
    return request({
        method: "delete",
        url: "/pet/pet/delete/" + id,
    })
}