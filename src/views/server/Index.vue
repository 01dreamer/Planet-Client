<script lang="ts" setup>
import MaskPointButton from "@/render/components/base/BaseMaskPointButton.vue";
import BaseInputForm from "@/render/components/base/BaseModalForm.vue";
import { useServerStore } from "@/store/module/server.ts";
import { ServerRequestType } from "@/typing/server";
import ServerCard from "@/views/server/components/ServerCard.vue";
import { onMounted } from "vue";

const serverStore = useServerStore();

const tabs = ["全部", "运行中", "停止", "收藏"];
const addServerFormShow = ref(false);
const addServerFormLoading = ref(false);
const addServerFormRef = ref();
const addServerFormModel = ref<ServerRequestType.AddServer>({
  name: "",
  ip: "",
  autoFullInfo: true,
  remote: {
    user: "",
    password: "",
  },
  os: "",
});

const showAddServerForm = () => {
  addServerFormShow.value = true;
};

const addServer = async () => {
  try {
    addServerFormLoading.value = true;
    await serverStore.actions.addServer(addServerFormModel.value);
    await serverStore.actions.fetchServerList();
    window.$message.success("添加成功");
    addServerFormShow.value = false;
  } finally {
    addServerFormLoading.value = false;
  }
};

const refresh = async () => {
  window.$message.loading("刷新中");
  await serverStore.actions.fetchServerList();
  window.$message.destroyAll();
  window.$message.success("刷新成功");
};

onMounted(() => {
  serverStore.actions.fetchServerList();
});
</script>

<template>
  <n-tabs class="p-24px pb-0">
    <n-tab v-for="tab in tabs" :key="tab" :name="tab" class="!font-bold">
      <!--      <i class="i-gravity-ui:tag text-l bg-gray-700" />-->
      {{ tab }}
    </n-tab>
  </n-tabs>
  <n-space align="center" class="px-24px pt-10px" justify="space-between">
    <n-space align="center" class="!gap-2">
      <n-button
        class="!py-16px !text-gray-100"
        size="small"
        type="primary"
        @click="showAddServerForm"
      >
        <template #icon>
          <i class="i-gravity-ui:plus" />
        </template>
        添加服务器
      </n-button>
    </n-space>
    <n-space align="center" justify="end">
      <MaskPointButton
        icon="i-gravity-ui:arrows-rotate-right"
        text="刷新"
        @click="refresh"
      />
      <MaskPointButton icon="i-gravity-ui:power" text="全部关机" />
      <MaskPointButton icon="i-gravity-ui:shield-keyhole" text="隐私设置" />
      <MaskPointButton icon="i-gravity-ui:list-ul" text="列表显示" />
      <MaskPointButton icon="i-gravity-ui:layout-cells" text="网格显示" />
    </n-space>
  </n-space>
  <div
    class="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-24px pt-0"
    style="max-height: calc(100vh - 155px); overflow-y: auto"
  >
    <server-card
      v-for="server in serverStore.state.servers"
      :key="server.instance!.id"
      :data="server"
    />
  </div>

  <BaseInputForm
    ref="addServerForm"
    v-model:show="addServerFormShow"
    icon="i-gravity-ui:plus"
    title="添加服务器"
  >
    <n-form
      ref="addServerFormRef"
      v-model:model="addServerFormModel"
      require-mark-placement="left"
    >
      <n-form-item label="服务器名称" required>
        <n-input v-model:value="addServerFormModel.name" />
      </n-form-item>
      <n-form-item label="服务器地址" required>
        <n-input v-model:value="addServerFormModel.ip" />
      </n-form-item>
      <n-form-item label="服务器用户名" required>
        <n-input v-model:value="addServerFormModel.remote.user" />
      </n-form-item>
      <n-form-item label="服务器密码" required>
        <n-input v-model:value="addServerFormModel.remote.password" />
      </n-form-item>
      <n-space align="center" justify="end">
        <n-button @click="addServerFormShow = false">取消</n-button>
        <n-button
          :loading="addServerFormLoading"
          type="primary"
          @click="addServer"
          >确定
        </n-button>
      </n-space>
    </n-form>
  </BaseInputForm>
</template>

<style scoped></style>
