<template>
  <q-page class="flex">
    <div class="user-header" v-touch:swipe.bottom="swipeBottomHandler">
      <div>
        <q-avatar v-if="!viewProfile && !viewSetting && !viewInvite">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <p v-if="!viewProfile && !viewSetting && !viewInvite">@username</p>
        <div
          class="img-container"
          style="margin-left: 0"
          v-if="(!viewMain && inviteEmail) || (viewProfile && following)"
          @click="backInvite"
        >
          <img src="../assets/img/back.png" />
        </div>
      </div>
      <div class="flex">
        <div
          class="img-container"
          style="position: relative"
          v-if="viewMain"
          @click="openInvitePage"
        >
          <img src="../assets/img/mail.png" />
          <q-badge color="primary" rounded floating text-color="black"
            >3</q-badge
          >
        </div>
        <div class="img-container" v-if="viewMain" @click="openSetting">
          <img src="../assets/img/setting.png" />
        </div>
        <div class="img-container" v-if="!viewMain" @click="close">
          <img src="../assets/img/cancel.png" />
        </div>
      </div>
    </div>

    <div v-if="viewMain">
      <div
        class="profile"
        v-if="viewProfile"
        v-touch:swipe.top="swipeTopHandler"
      >
        <q-avatar>
          <img :src="userData.avatar" />
        </q-avatar>
        <p class="username">{{ userData.username }}</p>
        <div v-if="following" class="follow-container">
          <button class="button">Follow</button>
          <div class="img-container">
            <img src="../assets/img/alarm.png" />
          </div>
        </div>
        <div class="profile-data">
          <div v-for="(item, index) in userData.data" :key="index">
            <p class="total">{{ item.total }}</p>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="white"
        active-bg-color="primary"
        indicator-color="transparent"
        align="justify"
        narrow-indicator
        v-touch:swipe.top="swipeTopHandler"
        v-touch:swipe.bottom="swipeBottomHandler"
        style="margin-bottom: 10px"
      >
        <q-tab name="shouts" label="Shouts" no-caps />
        <q-tab name="interests" label="Interests" no-caps />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        class="bg-transparent custom-q-panel"
      >
        <q-tab-panel name="shouts">
          <div
            class="q-panel-shout-header"
            v-touch:swipe.top="swipeTopHandler"
            v-touch:swipe.bottom="swipeBottomHandler"
          >
            <div>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
              <p>@username</p>
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
        </q-tab-panel>

        <q-tab-panel name="interests">
          <p>Common Interests</p>
          <div class="interests-card">
            <div
              v-for="(item, index) in cardsData"
              v-if="item.control.commonInterest"
              @click="$router.push('interest')"
              :style="borderStyle(index)"
            >
              <q-avatar>
                <img :src="item.control.avatar" />
              </q-avatar>
              <div>
                <p class="header-title">{{ item.control.title.discover }}</p>
                <p class="type">{{ item.control.type }}</p>
              </div>
            </div>
          </div>
          <p>All Interests</p>
          <div class="interests-card">
            <div
              v-for="(item, index) in cardsData"
              @click="$router.push('interest')"
              :style="borderStyle(index)"
            >
              <q-avatar>
                <img :src="item.control.avatar" />
              </q-avatar>
              <div>
                <p class="header-title">{{ item.control.title.discover }}</p>
                <p class="type">{{ item.control.type }}</p>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>

      <q-dialog v-model="cardsData.length && showCardDialog">
        <card-details
          @close="closeCardDetails"
          :data="showCardData"
          :theme="makeTheme(showCardData.themeIndex)"
          :dataIndex="cardDetailsIndex"
        />
      </q-dialog>
    </div>

    <div v-if="!viewMain && viewSetting">
      <setting-page />
    </div>
    <div v-if="!viewMain && viewInvite">
      <invite-page
        :inviteEmail="inviteEmail"
        :inviteSent="inviteSent"
        @invite="onClickInvite"
        @sentInvite="onInviteSent"
        @backToProfile="close"
      />
    </div>
  </q-page>
</template>

<script>
import { CardSwipe, CardSwipeItem } from "@eshengsky/vue-card-swipe";
import Card from "../components/card/Card";
import CardDetails from "../components/card/CardDetails";
import _ from "lodash";
import Vue from "vue";
import Vue2TouchEvents from "vue2-touch-events";
import Setting from "../components/profile/Setting";
import Invite from "../components/profile/Invite";

Vue.use(Vue2TouchEvents);

export default {
  name: "PageUser",
  props: ["cardsData", "cardThemes"],
  data() {
    return {
      userData: this.$store.state.main.userData,
      tab: "shouts",
      cardDetailsIndex: 0,
      showCardDialog: false,
      showCardData: this.cardsData.length ? _.cloneDeep(this.cardsData[0]) : {},
      themeIndex: 0,
      viewProfile: true,
      viewMain: true,
      viewSetting: false,
      viewInvite: false,
      inviteEmail: false,
      inviteSent: false,
      following: true
    };
  },
  components: {
    "card-summary": Card,
    "card-swipe": CardSwipe,
    "card-swipe-item": CardSwipeItem,
    "card-details": CardDetails,
    "setting-page": Setting,
    "invite-page": Invite
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
    openSetting() {
      this.viewSetting = true;
      this.viewMain = false;
    },
    openInvitePage() {
      this.viewInvite = true;
      this.viewMain = false;
    },
    close() {
      this.viewSetting = false;
      this.viewInvite = false;
      this.viewMain = true;
      this.viewProfile = true;
      this.backInvite();
    },
    onClickInvite() {
      this.inviteEmail = true;
    },
    onInviteSent() {
      this.inviteSent = true;
      this.inviteEmail = false;
    },
    backInvite() {
      if (this.following) {
        this.following = false
      } else {
        this.inviteEmail = false;
        this.inviteSent = false;
        this.following = true;
      }
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
.q-page {
  width: 100%;
  padding: 15px;
  display: block;
  height: calc(100vh - 60px);
  overflow: hidden;
  .q-tab {
    border-radius: 30px;
    .q-tab__label {
      font-family: "soleil";
      font-style: normal;
      font-weight: 600;
      font-size: 16px !important;
      line-height: 20px;
    }
  }
  .user-header {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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
        height: 15px;
      }
      .q-badge {
        padding: 2px 4px;
        font-size: 12px;
      }
      .q-badge--floating {
        position: absolute;
        bottom: -4px;
        top: inherit;
        right: -3px;
        cursor: inherit;
      }
    }
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .q-avatar {
      width: 80px;
      height: 80px;
    }
    .username {
      padding: 10px 0;
      font-size: 16px;
      font-family: "soleil";
      margin: 0;
    }
    .follow-container {
      display: flex;
      justify-content: space-between; 
      align-items:center;
      width: 100%;
      margin: 10px 0;
      .button {
        background: #0A84FF !important;
        border-radius: 7px;
        align-items: center;
        width: calc(100% - 50px);
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
    .profile-data {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        .total {
          font-size: 18px;
          padding: 5px 0 0;
          margin: 0;
          color: white;
        }
        .name {
          font-size: 12px;
          color: #8e8e93;
          padding: 5px 0;
          margin: 0;
        }
      }
    }
  }
}
.q-panel-shout-header {
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
.card-swipe__indicators {
  display: none;
}
.custom-q-panel {
  .q-tab-panel {
    height: calc(100vh - 160px);
    padding: 16px 0;
  }
  .interests-card {
    background: #292929;
    border-radius: 20px;
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    & > div {
      display: flex;
      padding: 15px 0;
      border-top: 1px solid #3a3a3c;
      margin-top: -1px;
    }
    .q-avatar {
      height: 30px;
      width: 30px;
    }
    .header-title {
      color: white;
      font-size: 16px;
      line-height: 20px;
      font-weight: normal;
      font-family: "soleil";
      text-align: left;
      margin: auto 0 auto 15px;
      padding: 0;
    }
    .type {
      color: #8E8E93;
      font-size: 14px;
      padding: 0;
      margin: 10px 0 0 15px;
    }
  }
}
</style>
