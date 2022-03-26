<template>
  <div class="loading">
    小二正在努力中..
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading {
  width: 200px;
  height: 100px;
  background-color: rgba(80, 80, 80, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  line-height: 100px;
  color: #666;
}
</style>
