<template>
  <q-page class="flex">

    <div class="home-header">
      <div>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <p>@username</p>
      </div>
      <div @click="open('bottom')">
        <img src="../assets/img/three-dots.png" />
      </div>
    </div>

    <div v-for="item in cardsData">
      <Card :data="item" />
    </div>

    <q-dialog v-model="dialog" :position="position">
      <q-card>
        <q-card-section class="row items-center no-wrap">
          <p>Shout Options</p>
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <p class="col-blue">Not Interested in this</p>
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <p class="col-blue">Report Shout</p>
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <p class="col-blue">Block User</p>
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <p class="col-blue">Report User</p>
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <p>Cancel</p>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { cardsData } from "../assets/data"

export default {
  name: "PageHome",
  data() {
    return {
      dialog: false,
      position: "bottom",
      cardsData: cardsData,
    };
  },
  methods: {
    open(position) {
      this.position = position;
      this.dialog = true;
    }
  },
  components: {
    "Card": require("components/Card.vue").default
  }
};
</script>

<style lang="scss">
.q-page {
  width: 100%;
  padding: 20px;
  display: block;
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
  height: 40px;
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
.home-header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  & > div {
    display: flex;
    align-content: center;
    box-sizing: border-box;
    margin: auto 10px auto 0;
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
.q-dialog {
  .q-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    background: rgba(30, 30, 30, 0.75);
    border-radius: 14px 14px 0 0;
    height: fit-content;
    & > div {
      color: white;
      text-align: center;
      font-size: 17px;
      width: 100%;
      height: 50px;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      & > p {
        margin: 0 auto;
      }
      .col-blue {
        color: #0A84FF;
      }
    }
  }
}
</style>
