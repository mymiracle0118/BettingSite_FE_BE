<template>
  <div v-if="isVisible" class="loader-overlay">
    <i class="fas fa-spinner fa-spin"></i>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    isVisible: { type: Boolean, required: true }
  }
};
</script>

<style>
.loader-overlay {
    position: fixed;
    z-index: 11111;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.5);
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
}
.loader-overlay i{
    font-size: 50px;
}
</style>