import request from "@/api/request";
/**
 * @description:获取问题列表
 */
export function getQuestionList(data) {
    return request({
        method: "get",
        url: "/ask/question/list",
        params: data
    })
}
/**
 * @description:获取答案列表
 */
export function getAnswerList(data) {
    return request({
        method: "get",
        url: "/ask/answer/list",
        params: data
    })
}
/**
 * @description:获取问题详情
 */
export function getQuestionInfo(id) {
    return request({
        method: "get",
        url: "/ask/question/" + id,
    })
}
/**
 * @description:创建问题答案
 */
export function createAnswer(data) {
    return request({
        method: "post",
        url: "/ask/answer/create",
        data
    })
}
/**
 * @description:删除问题答案
 */
export function deleteAnswer(id) {
    return request({
        method: "delete",
        url: "/ask/answer/delete/" + id,
    })
}
/**
 * @description:创建问题
 */
export function createQuestion(data) {
    return request({
        method: "post",
        url: "/ask/question/create",
        data
    })
}
/**
 * @description:删除问题
 */
export function deleteQuestion(id) {
    return request({
        method: "delete",
        url: "/ask/question/delete/" + id,
    })
}