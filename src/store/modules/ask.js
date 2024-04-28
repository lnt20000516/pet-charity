import {
    getQuestionList, getAnswerList, getQuestionInfo, createAnswer,
    deleteAnswer, createQuestion, deleteQuestion
} from "@/api/ask";
export default {
    state: {

    },
    mutations: {
    },
    actions: {
        async getQuestionListAction(_, data) {
            try {
                const res = await getQuestionList(data);
                return res;
            } catch (error) {
                console.log(error);
            }

        },
        async getAnswerListAction(_, data) {
            try {
                const res = await getAnswerList(data);
                return res;
            } catch (error) {
                console.log(error);
            }

        },
        async getQuestionInfoAction(_, id) {
            try {
                const res = await getQuestionInfo(id);
                return res;
            } catch (error) {
                console.log(error);
            }
        },
        async createAnswerAction(_, data) {
            try {
                const res = await createAnswer(data);
                return res;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteAnswerAction(_, id) {
            try {
                await deleteAnswer(id);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async createQuestionAction(_, data) {
            try {
                const res = await createQuestion(data);
                return res;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async deleteQuestionAction(_, id) {
            try {
                await deleteQuestion(id);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}