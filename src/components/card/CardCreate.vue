<template>
  <q-card class="q-card-create" :style="theme">
    <q-card-section class="card-header-username" style="margin-top: 10px">
      <div></div>
      <div>
        <div @click="$emit('close')">
          <!-- <img src="../../assets/img/close.png" /> -->
          <div class="close-icon">
            <img src="../../assets/svg/icon-close.svg" />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-btn
      rounded
      color="white"
      text-color="#636366"
      no-caps
      class="round-select-card-type-btn"
      @click="openSelectTypeModal"
    >
      <span :style="cardHeadTitle(this.title)">{{ title || "What do you want to shout about?" }}</span>
    </q-btn>

    <q-card-section class="tap-typing">
      <p v-if="tapBtn" @click="openCardInput">Tap to start typing ...</p>
      <div v-if="!tapBtn" class="card-input-details">
        <div v-for="(item, index) in details" :key="index">
          <p class="input-text">{{ item.content }}</p>
          <img class="input-img" :src="item.img" style="width: 100%;" />
        </div>
      </div>
    </q-card-section>

    <q-dialog v-model="showSelectTypeModal" style="z-index: 8000">
      <card-type-select
        :title="title"
        @close="closeSelectTypeModal"
        @title="setTitle"
      />
    </q-dialog>

    <q-dialog v-model="showCardInput" style="z-index: 8000">
      <card-input @close="closeCardInput" @saveInputValue="handleInputValue" />
    </q-dialog>
  </q-card>
</template>

<script>
import CardTypeSelect from "./CardTypeSelect";
import CardInput from "./CardInput";
import _ from "lodash";

export default {
  name: "CardCreate",
  props: ["theme", "themeIndex", "cardsData"],
  data() {
    return {
      details: [],
      title: "",
      dense: false,
      showSelectTypeModal: false,
      showCardInput: false,
      tapBtn: true
    };
  },
  methods: {
    CreateCard() {
      if (!this.details.length || !this.title) {
        alert("Can't create empty card!");
        return;
      }
      const newCard = {
        control: {
          avatar: "https://cdn.quasar.dev/img/avatar.png",
          title: {
            discover: this.title,
            shout: "What do you want to shout about?"
          },
          commonInterest: false
        },
        text: this.details[0].content,
        details: this.details,
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
      this.$store.dispatch("main/setThemeSelector", false);
      this.showSelectTypeModal = true;
    },
    closeSelectTypeModal() {
      this.$store.dispatch("main/setThemeSelector", true);
      this.showSelectTypeModal = false;
    },
    setTitle(t) {
      this.title = t;
    },
    openCardInput() {
      this.$store.dispatch("main/setThemeSelector", false);
      this.showCardInput = true;
    },
    closeCardInput() {
      this.$store.dispatch("main/setThemeSelector", true);
      this.showCardInput = false;
    },
    handleInputValue(data) {
      this.details = _.cloneDeep(data);
      this.tapBtn = false;
      this.$emit("dataSaved")
    },
    cardHeadTitle(txt) {
      if(txt) {
        return "color: #0C0C0C;"
      } else {
        return "color: #636366;"
      }
    }
  },
  components: {
    "card-type-select": CardTypeSelect,
    "card-input": CardInput
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
  .tap-typing {
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
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      color: rgba(255, 255, 255, 0.65);
      font-family: "soleil";
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 26px;
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
  .close-icon {
    width: 28px;
    height: 28px;
    background: rgba(48, 52, 64, 0.65);
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    border-radius: 56px;
    text-align: center;
    img {
      margin-top: 9px;
    }
  }
}
.round-select-card-type-btn {
  max-width: calc(100% - 100px);
  margin: -20px auto 0;
}
.card-input-details {
  & > div {
    margin-bottom: 20px !important;
    .input-text {
      font-size: 18px !important;
      line-height: 26px !important;
      font-family: "soleil";
      font-weight: 400 !important;
      color: white !important;
    }
    .input-img {
      width: 100% !important;
    }
  }
}
</style>
