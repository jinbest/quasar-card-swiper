<template>
  <q-page class="flex">
    <div class="home-header">
      <div>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <p>@username</p>
      </div>
      <div @click="openFooterMenu('bottom')">
        <img src="../assets/img/three-dots.png" />
      </div>
    </div>

    <card-swipe v-if="!showCardDialog && !showCreateCard">
      <card-swipe-item>
        <div @click="openCardDetails(cardDetailsIndex)">
          <card-summary :data="cardsData[cardDetailsIndex]" :theme="makeTheme(cardsData[cardDetailsIndex].themeIndex)" />
        </div>
      </card-swipe-item>
      <card-swipe-item v-for="(item, index) in cardsData" v-if="cardDetailsIndex !== index" :key="index">
        <div @click="openCardDetails(index)">
          <card-summary :data="item" :theme="makeTheme(item.themeIndex)" />
        </div>
      </card-swipe-item>
    </card-swipe>

    <q-dialog v-model="cardsData.length && showCardDialog">
      <card-details
        @close="closeCardDetails"
        :data="showCardData"
        :theme="makeTheme(showCardData.themeIndex)"
      />
    </q-dialog>

    <q-dialog v-model="showCreateCard">
      <card-create
        @close="closeCreateCard"
        @create="CreateNewCard"
        :theme="makeTheme(this.themeIndex)"
        :themeIndex="themeIndex"
        :cardsData="cardsData"
      />
    </q-dialog>

    <div v-if="showCardDialog || showCreateCard" class="select-card-theme">
      <p>Select shout theme</p>
      <div>
        <div class="theme-lists custom-scroll-bar">
          <div
            v-for="(item, index) in cardThemes"
            :key="index"
            :style="`${makeTheme(index)}${selectedTheme(index)}`"
            @click="setCardTheme(index, false)"
          ></div>
        </div>
        <q-btn v-if="showCardDialog" label="Shout" @click="shoutTheme(showCardDialog ? false : true)" />
      </div>
    </div>

    <q-dialog v-model="dialog" :position="position">
      <q-card>
        <q-card-section
          @click="closeFooterMenu"
          class="row items-center no-wrap"
        >
          <p>Shout Options</p>
        </q-card-section>
        <q-card-section
          @click="closeFooterMenu"
          class="row items-center no-wrap"
        >
          <p class="col-blue">Not Interested in this</p>
        </q-card-section>
        <q-card-section
          @click="closeFooterMenu"
          class="row items-center no-wrap"
        >
          <p class="col-blue">Report Shout</p>
        </q-card-section>
        <q-card-section
          @click="closeFooterMenu"
          class="row items-center no-wrap"
        >
          <p class="col-blue">Block User</p>
        </q-card-section>
        <q-card-section
          @click="closeFooterMenu"
          class="row items-center no-wrap"
        >
          <p class="col-blue">Report User</p>
        </q-card-section>
        <q-card-section
          @click="closeFooterMenu"
          class="row items-center no-wrap"
        >
          <p>Cancel</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { CardSwipe, CardSwipeItem } from "@eshengsky/vue-card-swipe";
import Card from "../components/card/Card";
import CardDetails from "../components/card/CardDetails";
import CardCreate from "../components/card/CardCreate";
import _ from "lodash";

export default {
  name: "PageHome",
  props: ["showCreateCard", "cardsData", "cardThemes"],
  data() {
    return {
      dialog: false,
      position: "bottom",
      cardDetailsIndex: 0,
      showCardDialog: false,
      showCardData: this.cardsData.length ? _.cloneDeep(this.cardsData[0]) : {},
      themeIndex: 0,
    };
  },
  methods: {
    openFooterMenu(position) {
      this.position = position;
      this.dialog = true;
    },
    closeFooterMenu() {
      this.dialog = false;
    },
    openCardDetails(index) {
      this.cardDetailsIndex = index;
      this.themeIndex = this.cardsData.length ? this.cardsData[index].themeIndex : 0;
      this.showCardData = this.cardsData.length ? _.cloneDeep(this.cardsData[index]) : {};
      this.showCardDialog = true;
    },
    closeCardDetails() {
      this.themeIndex = 0;
      this.showCardDialog = false;
    },
    setCardTheme(index, createMode) {
      this.themeIndex = index;
      if (!createMode) {
        this.showCardData.themeIndex = index;
      }
    },
    closeCreateCard() {
      this.$emit("closeCreateCard")
    },
    selectedTheme(index) {
      if (this.themeIndex === index) {
        return "border: 2px solid white;";
      } else {
        return "border: none;";
      }
    },
    makeTheme(index) {
      const colLen = this.cardThemes[index].colors.length;
      let linearParam = this.cardThemes[index].deg + ", ";
      for (let i = 0; i < colLen - 1; i++) {
        linearParam += `${this.cardThemes[index].colors[i].hex} ${this.cardThemes[index].colors[i].percent}, `;
      }
      linearParam += `${this.cardThemes[index].colors[colLen - 1].hex} ${
        this.cardThemes[index].colors[colLen - 1].percent
      }`;
      return `background: linear-gradient(${linearParam});`;
    },
    shoutTheme(createMode) {
      if (!createMode) {
        this.cardsData[this.cardDetailsIndex] = _.cloneDeep(this.showCardData);
        this.$store.dispatch('main/setCardsDataAction', this.cardsData)
        this.closeCardDetails();
      } else {
        return;
      }
    },
    CreateNewCard() {
      this.cardDetailsIndex = this.cardsData.length - 1;
      this.closeCreateCard()
    }
  },
  components: {
    "card-summary": Card,
    "card-swipe": CardSwipe,
    "card-swipe-item": CardSwipeItem,
    "card-details": CardDetails,
    "card-create": CardCreate
  }
};
</script>

<style lang="scss">
.q-page {
  width: 100%;
  padding: 20px;
  display: block;
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
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      & > p {
        margin: 0 auto;
      }
      .col-blue {
        color: #0a84ff;
      }
    }
  }
}
.card-swipe__indicators {
  display: none;
}
.select-card-theme {
  height: 80px !important;
  position: fixed;
  max-width: 600px;
  margin-left: -20px;
  bottom: 0;
  z-index: 7000;
  color: white;
  background: #1c1c1e;
  width: 100%;
  padding: 0 10px;
  p {
    margin: 5px 0;
    padding: 0;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .theme-lists {
    overflow-y: hidden;
    overflow-x: scroll;
    display: flex;
    width: calc(100% - 110px);
    & > div {
      width: 35px;
      height: 35px;
      border-radius: 7px;
      cursor: pointer;
      margin-right: 5px;
      flex-shrink: 0;
    }
  }
  .q-btn {
    background: #8e8e93;
    padding: 0 10px;
    border-radius: 100px;
    width: 100px;
  }
}
</style>
