<template>
  <q-card class="q-card-details" :style="theme">
    <q-card-section class="card-header-username">
      <div>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <p>@username</p>
      </div>
      <div>
        <!-- <div @click="openFooterMenu('bottom')" style="margin-right: 10px">
          <img src="../../assets/img/three-dots.png" />
        </div> -->
        <div @click="$emit('close')">
          <img src="../../assets/img/close.png" />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="card-details-header">
      <q-avatar>
        <img :src="data.control.avatar" />
      </q-avatar>
      <p class="header-title">{{ data.control.title.shout }}</p>
    </q-card-section>
    <q-card-section class="text custom-scroll-bar">
      <div v-for="(item, index) in data.details" :key="index">
        <p>{{item.content}}</p>
        <img v-if="item.img" :src="item.img" :alt="`${index}-shout-media`" />
      </div>
    </q-card-section>
    <q-card-section class="card-details-footer">
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
  name: "CardDetails",
  props: ["data", "theme"]
};
</script>

<style lang="scss">
.q-card-details {
  max-width: 500px;
  max-height: 100vh !important;
  width: 100%;
  border-radius: 23px !important;
  position: relative !important;
  height: calc(100% - 75px) !important;
  margin: 0 auto !important;
  min-height: 300px !important;
  display: flex !important;
  flex-direction: column !important;
  padding-top: 15px;
  .text {
    font-size: 18px !important;
    line-height: 26px !important;
    text-align: center !important;
    font-family: "soleil";
    font-weight: 400;
    height: calc(100% - 180px) !important;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
    margin-bottom: 20px !important;
    border: none !important;
    p {
      margin: 0;
      padding: 5px 10px;
    }
  }
  img {
    max-width: 100%;
  }
}
.card-header-username {
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100% !important;
  padding: 0 20px !important;
  & > div {
    display: flex;
    align-content: center;
    box-sizing: border-box;
    margin: auto 0 auto 0;
    .q-avatar {
      width: 32px;
      height: 32px;
    }
    p {
      margin: auto 5px;
      padding: 0;
    }
  }
}
.card-details-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 12px 3px 8px !important;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  border-radius: 100px !important;
  height: fit-content !important;
  margin: 10px 30px !important;
  width: calc(100% - 60px) !important;
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
.card-details-footer {
  position: absolute;
  bottom: 0;
  width: 100% !important;
  height: 56px !important;
  padding: 0 10px !important;
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
.q-dialog__inner--minimized  {
  padding: 10px;
  align-items: flex-start;
}
</style>
