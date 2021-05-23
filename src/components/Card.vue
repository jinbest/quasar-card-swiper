<template>
  <q-card>
    <q-card-section class="card-header">
      <q-avatar>
        <img :src="data.control.avatar" />
      </q-avatar>
      <p class="header-title">{{ data.control.text }}</p>
    </q-card-section>
    <q-card-section class="text custom-scroll-bar">
      {{ data.text }}
    </q-card-section>
    <q-card-section class="card-footer">
      <div>
        <div class="item">
          <img src="../assets/img/heart.png" />
          <p>{{ data.other.heart }}</p>
        </div>
        <div class="item">
          <img src="../assets/img/message.png" />
          <p>{{ data.other.msg }}</p>
        </div>
      </div>
      <div>
        <div class="item">
          <img src="../assets/img/share.png" />
          <p>Share</p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Card",
  props: ["data"]
};
</script>

<style lang="scss">
.q-card {
  max-width: 400px;
  width: 100%;
  background: linear-gradient(
    192.04deg,
    #0fb8ff 0%,
    #df47fd 44.87%,
    #ffb72b 100%
  );
  border-radius: 23px;
  position: relative;
  margin: 20px auto 0;
  height: calc(100vh - 150px);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  .text {
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    font-family: "soleil";
    font-weight: 400;
    max-height: calc(100% - 120px);
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 20px;
  }
}
</style>
