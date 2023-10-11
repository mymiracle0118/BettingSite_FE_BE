<template>
  <div v-if="isVisible" class="inside-loader-overlay">
    <i class="fas fa-spinner fa-spin"></i>
  </div>
</template>

<script>
export default {
  name: "InsideLoader",
  props: {
    isVisible: { type: Boolean, required: true }
  }
};
</script>

<style>
.inside-loader-overlay {
    position: absolute;
    z-index: 11111;
    width: calc(100%);
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
}
.inside-loader-overlay i{
    font-size: 25px;
}
</style>