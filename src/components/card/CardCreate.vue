<template>
  <q-card class="q-card-create" :style="theme">
    <q-card-section class="card-header-username" style="margin-top: 10px">
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
    <q-btn
      rounded
      color="white"
      text-color="black"
      no-caps
      class="round-select-card-type-btn"
      @click="openSelectTypeModal"
    >
      {{title || "What do you want to shout about?"}}
    </q-btn>
    <q-card-section class="text custom-scroll-bar">
      <textarea v-model="text" placeholder="Tap to start typing..." />
    </q-card-section>

    <q-dialog v-model="showSelectTypeModal" style="z-index: 8000">
      <card-type-select :title="title" @close="closeSelectTypeModal" @title="setTitle" />
    </q-dialog>

  </q-card>
</template>

<script>
import CardTypeSelect from "./CardTypeSelect";

export default {
  name: "CardCreate",
  props: ["theme", "themeIndex", "cardsData"],
  data() {
    return {
      text: "",
      title: "",
      dense: false,
      showSelectTypeModal: false
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
        themeIndex: this.themeIndex,
        discussion: []
      };
      this.cardsData.push(newCard);
      this.$store.dispatch("main/setCardsDataAction", this.cardsData);
      this.$emit("create");
      this.$emit("formatThemeIndex");
    },
    openSelectTypeModal() {
      this.$store.dispatch("main/setThemeSelector", false)
      this.showSelectTypeModal = true;
    },
    closeSelectTypeModal() {
      this.$store.dispatch("main/setThemeSelector", true)
      this.showSelectTypeModal = false;
    },
    setTitle(t) {
      this.title = t;
    },
  },
  components: {
    "card-type-select": CardTypeSelect
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
    color: white;
    font-size: 17px;
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
.round-select-card-type-btn {
  max-width: calc(100% - 50px);
  margin: auto;
}
// .q-dialog__inner--minimized {
//   padding: 10px;
//   align-items: flex-start;
// }
</style>
