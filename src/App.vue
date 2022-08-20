<template>
  <main>
    <TheMap />

    <div class="dial">
      <SpeedDial
        :model="items"
        :radius="120"
        direction="up-left"
        type="quarter-circle"
        buttonClass="p-button-success"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheMap from "./components/TheMap.vue";

const items = ref([
  {
    label: "Add",
    icon: "pi pi-pencil",
    command: () => {
      console.log("Add");
    },
  },
  {
    label: "Update",
    icon: "pi pi-refresh",
    command: () => {
      console.log("Update");
    },
  },
  {
    label: "Delete",
    icon: "pi pi-trash",
    command: () => {
      console.log("Delete");
    },
  },
]);
</script>

<style scoped>
.dial {
  position: fixed;
  top: calc(100vh - 6rem);
  left: calc(100vw - 6rem);
}
</style>
