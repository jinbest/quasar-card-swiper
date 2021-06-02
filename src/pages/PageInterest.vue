<template>
  <div class="page-interest">
    <div class="interest-header" v-touch:swipe.bottom="swipeBottomHandler">
      <div>
        <div class="img-container" style="margin-left: 0" @click="$router.push('user')">
          <img src="../assets/img/back.png" />
        </div>
      </div>
      <div v-if="!viewProfile" class="control-type">
          <p>Control - Discover a world unknown</p>
          <p style="color:#8E8E93;">🎮 Games</p>
        </div>
      <div class="flex" style="margin-right:0">
        <div class="img-container">
          <img
            style="height:5px;margin-top:12px"
            src="../assets/img/gray-dots.png"
          />
        </div>
      </div>
    </div>

    <div v-if="viewMain">
      <div
        class="user-profile"
        v-if="viewProfile"
        v-touch:swipe.top="swipeTopHandler"
      >
        <img class="profile-img" src="../assets/img/user-profile.png" />
        <div class="game-type">
          <p>Control - Discover a world unknown</p>
          <p style="color:#8E8E93;font-size:14px;">🎮 Games</p>
        </div>
        <div class="go-link-container">
          <div class="img-container" style="margin-left:0;margin-right: 15px">
            <img src="../assets/img/alarm.png" />
          </div>
          <button class="button">Go to Link</button>
          <div class="img-container">
            <img src="../assets/img/share.png" />
          </div>
        </div>
      </div>

      <div>
        <div class="relevant-container" v-touch:swipe.top="swipeTopHandler"
          v-touch:swipe.bottom="swipeBottomHandler">
          <p style="color: #8E8E93">Shouts</p>
          <p class="most-relevant">
            Most Relevant
            <span>
              <q-avatar>
                <img src="../assets/img/most-relevant.svg" />
              </q-avatar>
            </span>
          </p>
        </div>

        <div
          class="q-panel-shout-header"
          v-touch:swipe.top="swipeTopHandler"
          v-touch:swipe.bottom="swipeBottomHandler"
        >
          <div>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <p class="game-type">@username</p>
            <p style="color:#8E8E93">2m</p>
          </div>
          <div>
            <img src="../assets/img/three-dots.png" />
          </div>
        </div>
        <div>
          <card-swipe v-if="!showCardDialog && !viewProfile">
            <card-swipe-item>
              <div @click="openCardDetails(cardDetailsIndex)">
                <card-summary
                  :data="cardsData[cardDetailsIndex]"
                  :theme="makeTheme(cardsData[cardDetailsIndex].themeIndex)"
                />
              </div>
            </card-swipe-item>
            <card-swipe-item
              v-for="(item, index) in cardsData"
              v-if="cardDetailsIndex !== index"
              :key="index"
            >
              <div @click="openCardDetails(index)">
                <card-summary
                  :data="item"
                  :theme="makeTheme(item.themeIndex)"
                />
              </div>
            </card-swipe-item>
          </card-swipe>
          <div
            @click="openCardDetails(cardDetailsIndex)"
            v-if="viewProfile"
            v-touch:swipe.top="swipeTopHandler"
          >
            <card-summary
              :data="cardsData[cardDetailsIndex]"
              :theme="makeTheme(cardsData[cardDetailsIndex].themeIndex)"
            />
          </div>
        </div>
      </div>

      <q-dialog v-model="cardsData.length && showCardDialog">
        <card-details
          @close="closeCardDetails"
          :data="showCardData"
          :theme="makeTheme(showCardData.themeIndex)"
          :dataIndex="cardDetailsIndex"
        />
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { CardSwipe, CardSwipeItem } from "@eshengsky/vue-card-swipe";
import Card from "../components/card/Card";
import CardDetails from "../components/card/CardDetails";
import _ from "lodash";
import Vue from "vue";
import Vue2TouchEvents from "vue2-touch-events";

Vue.use(Vue2TouchEvents);

export default {
  name: "PageUser",
  props: ["cardsData", "cardThemes"],
  data() {
    return {
      userData: this.$store.state.main.userData,
      cardDetailsIndex: 0,
      showCardDialog: false,
      showCardData: this.cardsData.length ? _.cloneDeep(this.cardsData[0]) : {},
      themeIndex: 0,
      viewProfile: true,
      viewMain: true
    };
  },
  components: {
    "card-summary": Card,
    "card-swipe": CardSwipe,
    "card-swipe-item": CardSwipeItem,
    "card-details": CardDetails
  },
  methods: {
    openCardDetails(index) {
      console.log(index);
      this.cardDetailsIndex = index;
      this.showCardData = this.cardsData.length
        ? _.cloneDeep(this.cardsData[index])
        : {};
      this.showCardDialog = true;
    },
    closeCardDetails() {
      this.showCardDialog = false;
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
      return `
        background: linear-gradient(${linearParam}); 
        height: calc(100vh - 240px);
        margin-top: 10px;
      `;
    },
    swipeTopHandler() {
      this.viewProfile = false;
    },
    swipeBottomHandler() {
      this.viewProfile = true;
    },
    borderStyle(index) {
      if (index === 0) {
        return "border-top: none";
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss">
.page-interest {
  width: 100%;
  padding: 10px 0;
  display: block;
  height: calc(100vh - 60px);
  overflow: hidden;
  .interest-header {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 20px;
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
    .control-type {
      margin: 5px 0;
      text-align: center;
      padding: 0 20px;
      display: block;
      p {
        font-family: "soleil";
        padding: 0;
        margin: 0;
        font-size: 12px;
      }
    }
  }
  .img-container {
    border-radius: 100px;
    border: 1px solid #3a3a3c;
    width: 32px;
    height: 32px;
    margin-left: 15px;
    text-align: center;
    img {
      margin-top: 7px;
      width: 15px;
      height: 14px;
    }
  }
  .user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .profile-img {
      width: 100%;
    }
    .game-type {
      padding: 5px 0;
      font-size: 18px;
      font-family: "soleil";
      margin: 0;
      text-align: center;
      padding: 0 20px;
      p {
        padding: 0;
        margin: 0;
      }
    }
    .go-link-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 20px 0 10px;
      padding: 0 15px;
      .button {
        background: #0a84ff !important;
        border-radius: 7px;
        align-items: center;
        width: calc(100% - 120px);
        font-family: "soleil";
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        height: 36px;
        outline: none;
        color: white;
        border: none;
      }
    }
  }
  .relevant-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px;
    p {
      margin: 0;
      padding: 0;
      font-size: 14px;
    }
    .most-relevant {
      color: white;
      background: #2c2c2e;
      border-radius: 7px;
      padding: 4px 8px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      .q-avatar {
        width: 15px;
        height: 15px;
        margin-left: 10px;
      }
    }
  }
}
.q-panel-shout-header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
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
.card-swipe__indicators {
  display: none;
}
</style>
