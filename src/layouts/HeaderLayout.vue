<template>
  <nav class="border-gray-200 dark:bg-gray-100">
    <div class="flex justify-between items-center h-[50px]">
      <div class="p-4 cursor-pointer hover:bg-gray-50" @click="clickHambuger">
        <i class="fa-solid fa-bars"></i>
      </div>
      <div class="flex items-center space-x-4 pr-5">
        <img class="w-6 h-6 rounded-full" src="../assets/user-img-web.png" alt="">
        <div class="font-medium text-sm dark:text-gray">
          <div>{{ username }}</div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    dataOpenSideBar: Boolean,
    clickHambuger: Function,
    username: String
  },
  data() {
    return {
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-refresh',
          command: () => {
            this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
          }
        },
        {
          label: 'Change Password',
          icon: 'pi pi-times',
          command: () => {
            this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
          }
        },
      ]
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  }

}
</script>

<style lang="scss"></style>