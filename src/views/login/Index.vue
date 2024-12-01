<script lang="ts" setup>
import { sendCode, validateCode } from "@/api";
import AvatarSelector from "@/render/components/app/AppAvatarSelector.vue";
import CustomHeader from "@/render/components/window/WindowHeader.vue";
import { useWindowStore, useUserStore } from "@/store";

import { computed, ref } from "vue";

const windowStore = useWindowStore();
const userStore = useUserStore();

const currentStep = ref(1);
const currentStatus = ref("process");
const resendTimer = ref(-1);

const loading = ref(false);
const loadingText = ref("下一步");

const registerFormRef1 = ref();
const registerFormRef2 = ref();
const registerFormRef3 = ref();
const registerFormModel1 = ref({
  email: "",
  code: "",
});
const registerFormModel2 = ref({
  email: "",
  uuid: "",
  username: "",
  password: "",
  confirmPassword: "",
});
const registerFormModel3 = ref({
  nickname: "",
  avatar: "",
});

const disabledCode = computed(() => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (
    registerFormModel1.value.email === "" ||
    !emailRegex.test(registerFormModel1.value.email)
  );
});

const toHome = () => {
  windowStore.actions.closeWindow();
  windowStore.actions.addWindow({
    title: "Main Window",
    maximizable: false,
    minSize: {
      height: 800,
      width: 1200,
    },
    header: {
      show: false,
    },
    maxSize: {
      height: 800,
      width: 1200,
    },
    router: "/home?name=abb",
    size: {
      height: 800,
      width: 1200,
    },
    zIndex: 0,
  });
};

const onValidateCode = async () => {
  registerFormModel2.value.uuid = (await validateCode(
    registerFormModel1.value,
  )) as any;
  registerFormModel2.value.email = registerFormModel1.value.email;
};

const nextStep = async () => {
  try {
    switch (currentStep.value) {
      case 1:
        await registerFormRef1.value?.validate();
        await onValidateCode();
        break;
      case 2:
        await registerFormRef2.value?.validate();
        await userStore.actions.registerAction(registerFormModel2.value);
        break;
      case 3:
        await registerFormRef3.value?.validate();
        break;
    }
    currentStep.value += 1;
  } catch (e: any) {}
};

const onSendCode = async () => {
  loading.value = true;
  try {
    await sendCode(registerFormModel1.value);
    window.$message.success("发送成功");
    resendTimer.value = 60;
    const timer = setInterval(() => {
      resendTimer.value -= 1;
      if (resendTimer.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  {{ userStore.state }}
  <div class="h-100vh bg-[#e3ebf6] overflow-hidden">
    <CustomHeader :show-maximize="false" />
    <n-space align="center" class="w-full" justify="center" vertical>
      <div class="flex items-center">
        <img
          alt="logo"
          class="w-32px h-32px mr-2"
          src="../../assets/logo_planet.png"
        />
        <n-text class="font-bold text-2xl">Planet</n-text>
      </div>
      <n-steps
        :current="currentStep"
        :status="currentStatus"
        class="w-100 my-5"
      >
        <n-step />
        <n-step />
        <n-step class="max-w-28px hide-content" />
      </n-steps>
      <div
        v-if="currentStep <= 3"
        class="text-2xl font-bold animate__animated animate__bounceInLeft"
      >
        嗨, 欢迎使用 Planet ！👋
      </div>
      <div
        v-if="currentStep > 3"
        class="text-2xl font-bold mt-20 mb-10 animate__animated animate__pulse"
      >
        恭喜，您已完成注册！🎉🎉
      </div>
      <n-button
        v-if="currentStep > 3"
        class="w-300px"
        type="info"
        @click="toHome"
      >
        进入
      </n-button>
      <div
        v-if="currentStep === 1"
        class="text-gray-500 animate__animated animate__bounceInRight"
      >
        让我们先确认您的身份，请填写电子邮箱和验证码。
      </div>
      <div
        v-if="currentStep === 2"
        class="text-gray-500 animate__animated animate__fadeInUp"
      >
        接下来，请设置您的用户名和密码，以便日后登录使用。
      </div>
      <div
        v-if="currentStep === 3"
        class="text-gray-500 animate__animated animate__fadeInUp"
      >
        最后，完善您的个人资料吧。这些信息可以稍后修改哦！
      </div>

      <!--------------------------------------------第一步:邮箱验证------------------------------------------------->
      <n-form
        v-if="currentStep === 1"
        ref="registerFormRef1"
        v-model:model="registerFormModel1"
        class="mt-5"
        require-mark-placement="left"
      >
        <n-form-item
          :rule="[
            {
              trigger: ['input', 'blur'],
              required: true,
              message: '请输入电子邮箱',
            },
            {
              trigger: ['input', 'blur'],
              type: 'email',
              message: '请输入正确的电子邮箱',
            },
          ]"
          label="电子邮箱"
          path="email"
        >
          <n-input
            v-model:value="registerFormModel1.email"
            placeholder="zhangsan@gmail.com"
          />
        </n-form-item>
        <n-form-item
          :rule="{
            trigger: ['input', 'blur'],
            required: true,
            message: '请输入验证码',
          }"
          label="验证码"
          path="code"
        >
          <n-space align="center">
            <n-input
              v-model:value="registerFormModel1.code"
              placeholder="请输入验证码"
            />
            <n-button
              :disabled="resendTimer > 0 || disabledCode || loading"
              :loading="loading"
              class="ml-4px min-w-100px"
              type="info"
              @click="onSendCode"
            >
              <span v-if="resendTimer === -1">发送验证码</span>
              <span v-else-if="resendTimer === 0">重新发送</span>
              <span v-else>{{ resendTimer }}s</span>
            </n-button>
          </n-space>
        </n-form-item>
        <n-button class="w-100% !primary" type="info" @click="nextStep">
          下一步
        </n-button>
      </n-form>
      <!--------------------------------------------第二步:填写用户名和密码------------------------------------------------->
      <n-form
        v-if="currentStep === 2"
        ref="registerFormRef2"
        v-model:model="registerFormModel2"
        class="mt-5 min-w-304px"
        require-mark-placement="left"
      >
        <n-form-item
          :rule="{
            trigger: ['input', 'blur'],
            required: true,
            message: '请输入你的用户名',
          }"
          label="用户名"
          path="username"
        >
          <n-input
            v-model:value="registerFormModel2.username"
            placeholder="zhangsan"
          />
        </n-form-item>
        <n-form-item
          :rule="{
            trigger: ['input', 'blur'],
            required: true,
            message: '请输入密码',
          }"
          label="密码"
          path="password"
        >
          <n-input
            v-model:value="registerFormModel2.password"
            placeholder="请输入密码"
            type="password"
          />
        </n-form-item>
        <n-form-item
          :rule="{
            trigger: ['input', 'blur'],
            required: true,
            message: '请输入密码',
          }"
          :feedback="
            registerFormModel2.password !== registerFormModel2.confirmPassword
              ? '两次密码不一致'
              : ''
          "
          :validation-status="
            registerFormModel2.password !== registerFormModel2.confirmPassword
              ? 'error'
              : ''
          "
          label="确认密码"
          path="confirmPassword"
        >
          <n-input
            v-model:value="registerFormModel2.confirmPassword"
            placeholder="请确认你的密码"
            type="password"
          />
        </n-form-item>
        <n-button class="w-100% !primary" type="info" @click="nextStep">
          下一步
        </n-button>
      </n-form>
      <!--------------------------------------------第三步:填写个人资料------------------------------------------------->
      <n-form
        v-if="currentStep === 3"
        ref="registerFormRef3"
        v-model:model="registerFormModel3"
        class="mt-5 min-w-304px"
        require-mark-placement="left"
      >
        <n-space justify="center" vertical>
          <AvatarSelector />
          <div class="text-center text-blue-400">
            <span class="cursor-pointer">点击上传</span>
          </div>
        </n-space>
        <n-form-item label="昵称">
          <n-input
            v-model:value="registerFormModel3.nickname"
            placeholder="Big Big Wolf"
          />
        </n-form-item>
        <div class="grid cols-2 min-w-304px gap-2">
          <n-button class="w-100%" secondary type="info" @click="nextStep">
            跳过
          </n-button>
          <n-button class="w-100%" type="info" @click="nextStep">
            完成
          </n-button>
        </div>
      </n-form>
    </n-space>
  </div>
</template>

<style scoped>
.hide-content:deep(.n-step-content) {
  display: none !important;
  width: 0 !important;
  max-width: 0 !important;
}
</style>
