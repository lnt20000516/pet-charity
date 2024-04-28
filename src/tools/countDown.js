import { useStore } from "vuex";
import { isTelOk } from "@/tools/regular";
import { ref, onMounted } from "vue";
export const useSendCode = () => {
    const content = ref("发送验证码");
    const totalTime = ref(60);
    const canClick = ref(true);
    const store = useStore();
    const loadingCode = ref(false);
    let clock;
    const countDown = async (phoneNumber) => {
        if (!canClick.value) return
        if (!phoneNumber) {
            window.$message.error("请填写手机号");
            return;
        }
        if (isTelOk(phoneNumber) != true) {
            window.$message.error("手机号格式错误");
            return;
        }
        const data = {
            "phone": phoneNumber
        }
        try {
            loadingCode.value = true
            const requstData = await store.dispatch("sendCodeAction", data);
            if (requstData) {
                window.$message.success("发送成功");
                canClick.value = false;
                content.value = totalTime.value + "s后重新发送";
                clock = window.setInterval(() => {
                    totalTime.value--;
                    content.value = totalTime.value + "s后重新发送";
                    if (totalTime.value < 0) {
                        window.clearInterval(clock);
                        content.value = "重新发送验证码";
                        totalTime.value = 60;
                        canClick.value = true;
                    }
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        } finally {
            loadingCode.value = false
        }

    }
    onMounted(() => {
        clearInterval(clock);
    })
    return { content, canClick, countDown, loadingCode }
}