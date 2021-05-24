<template>
  <q-card class="q-card-create" :style="theme">
    <q-card-section class="card-header-username">
      <div></div>
      <div>
        <div style="margin-right: 10px;" @click="CreateCard">
          Done
        </div>
        <div @click="$emit('close')">
          <img src="../../assets/img/close.png" />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="card-create-header">
      <input class="header-title" placeholder="What do you want to shout about?" v-model="title" />
    </q-card-section>
    <q-card-section class="text custom-scroll-bar">
      <textarea v-model="text" placeholder="Tap to start typing..." />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardCreate",
  props: ["theme", "themeIndex", "cardsData"],
  data() {
    return {
      text: "",
      title: "",
      dense: false
    };
  },
  methods: {
    CreateCard() {
      if (!this.text || !this.title) {
        alert("Can't create empty card!");
        return;
      }
      const newCard = {
        control: {
          avatar: "https://cdn.quasar.dev/img/avatar.png",
          title: {
            discover: this.title,
            shout: "What do you want to shout about?"
          }
        },
        text: this.text,
        details: [
          {
            content: this.text,
            img: ""
          }
        ],
        other: {
          heart: 0,
          msg: 0
        },
        themeIndex: this.themeIndex
      };
      this.cardsData.push(newCard);
      this.$store.dispatch('main/setCardsDataAction', this.cardsData)
      this.$emit('create');
    }
  }
};
</script>

<style lang="scss">
.q-card-create {
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
  .text {
    font-size: 18px !important;
    line-height: 26px !important;
    text-align: center !important;
    font-family: "soleil";
    font-weight: 400;
    height: 100% !important;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
    margin-bottom: 20px !important;
    border: none !important;
    textarea {
      margin: 0;
      padding: 5px 10px;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      color: white;
      text-align: center;
    }
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
.card-create-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 20px !important;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  border-radius: 100px !important;
  height: fit-content !important;
  margin: 10px auto !important;
  width: 300px !important;
  max-width: calc(100% - 50px);
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
    outline: none;
    border: none;
    width: 100%;
    max-width: 250px;
  }
}
.q-dialog__inner--minimized {
  padding: 10px;
  align-items: flex-start;
}
</style>
