<template>
  <q-card :style="theme">
    <q-card-section class="card-header">
      <q-avatar>
        <img :src="data.control.avatar" />
      </q-avatar>
      <p class="header-title">{{ data.control.title.discover }}</p>
    </q-card-section>
    <q-card-section class="text custom-scroll-bar">
      {{ data.text }}
    </q-card-section>
    <q-card-section class="read-more">
      <div>Read more</div>
    </q-card-section>
    <q-card-section class="card-footer">
      <div>
        <div class="item">
          <img src="../../assets/img/heart.png" />
          <p>{{ data.other.heart }}</p>
        </div>
        <div class="item">
          <img src="../../assets/img/message.png" />
          <p>{{ data.other.msg }}</p>
        </div>
      </div>
      <div>
        <div class="item">
          <img src="../../assets/img/share.png" />
          <p>Share</p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Card",
  props: ["data", "theme"]
};
</script>

<style lang="scss">
.q-card {
  max-width: 343px;
  max-height: 566px;
  width: 100%;
  cursor: pointer;
  border-radius: 23px;
  position: relative;
  margin: 15px auto 0;
  height: calc(100vh - 190px);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  .text {
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    font-family: "soleil";
    font-weight: 400;
    max-height: calc(100% - 165px);
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 20px;
  }
}
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px 8px 8px;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  border-radius: 100px !important;
  height: fit-content;
  margin: 10px 20px;
  .q-avatar {
    height: 30px;
    width: 30px;
  }
  .header-title {
    color: #0c0c0c;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
    font-family: "soleil";
    text-align: center;
    margin: auto;
  }
}
.read-more {
  position: absolute;
  bottom: 65px;
  left: calc(50% - 44px);
  padding: 0;
  & > div {
    width: 87px;
    height: 26px;
    background: rgba(255, 255, 255, 0.45);
    border: 0.5px solid rgba(0, 0, 0, 0.17);
    box-sizing: border-box;
    -webkit-backdrop-filter: blur(32px);
    backdrop-filter: blur(32px);
    border-radius: 7px;
    color: #1C1C1E;
    font-family: "soleil";
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    margin: auto;
  }
}
.card-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 56px;
  background: rgba(255, 255, 255, 0.1);
  border: 0.5px solid rgba(255, 255, 255, 0.17);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  & > div {
    display: flex;
  }
  .item {
    display: flex;
    align-content: center;
    box-sizing: border-box;
    margin: auto 0 auto 10px;
    img {
      width: 24px;
      height: 24px;
    }
    p {
      margin: auto 5px;
      padding: 0;
    }
  }
}
</style>
