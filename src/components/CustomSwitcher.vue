<template>
  <div
    class="btn"
    :class="{ active: active }"
    @click="active = !active"
  >
    <div class="btn-circle"></div>
  </div>
</template>

<script>
export default {
  name: "CustomSwitcher",
  data() {
    return {
      active: true
    };
  }
};
</script>

<style scoped>
.btn {
  transition: 0.3s;
  background: linear-gradient(to right, #32D74B 50%, #dae1e7 50%);
  background-size: 150%;
  background-position: 100%;
  width: 50px;
  height: 30px;
  border-radius: 100px;
  cursor: pointer;
  position: relative;
}

.btn.active {
  background-position: 0%;
}

.btn-circle {
  transition: 0.3s;
  left: 0;
  position: absolute;
  border-radius: 100px;
  background: white;
  width: 30px;
  height: 30px;
}

.btn.active .btn-circle {
  left: 20px;
}
</style>
