<template>
  <q-page class="flex">
    <div class="filtering custom-scroll-bar">
      <div v-for="(item, index) in filterData" :key="index" :class="filterItemClass(index)" @click="handleFilter(index)">
        <p>{{item.name}}</p>
      </div>
    </div>

    <div class="home-header">
      <div>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <p>@username</p>
        <p style="color:#8E8E93">2m</p>
      </div>
      <div @click="openFooterMenu('bottom')">
        <img src="../assets/img/three-dots.png" />
      </div>
    </div>

    <card-swipe v-if="!showCardDialog && !showCreateCard">
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
          <card-summary :data="item" :theme="makeTheme(item.themeIndex)" />
        </div>
      </card-swipe-item>
    </card-swipe>

    <q-dialog v-model="cardsData.length && showCardDialog">
      <card-details
        @close="closeCardDetails"
        :data="showCardData"
        :theme="makeTheme(showCardData.themeIndex)"
        :dataIndex="cardDetailsIndex"
      />
    </q-dialog>

    <q-dialog v-model="showCreateCard">
      <card-create
        @close="closeCreateCard"
        @create="CreateNewCard"
        @formatThemeIndex="formatThemeIndex"
        @dataSaved="handleShoutStatus"
        :theme="makeTheme(this.themeIndex)"
        :themeIndex="themeIndex"
        :cardsData="cardsData"
        ref="form"
      />
    </q-dialog>

    <div v-if="$store.state.main.themeSelector" class="select-card-theme">
      <p>Select shout theme</p>
      <div>
        <div class="theme-lists custom-scroll-bar">
          <div
            v-for="(item, index) in cardThemes"
            :key="index"
            :style="`${makeTheme(index)}${selectedTheme(index)}`"
            @click="setCardTheme(index)"
          ></div>
        </div>
        <q-btn
          label="Shout"
          @click="shoutTheme"
          no-caps
          :style="shoutBg"
        />
      </div>
    </div>

    <q-dialog v-model="dialog" :position="position">
      <q-card class="bottom-menu">
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
import { filterData } from "../assets/data"

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
      shoutStatus: false,
      shoutBg: 'background: #8E8E93',
      filterData: _.cloneDeep(filterData),
      selectFilter: 0,
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
      this.showCardData = this.cardsData.length
        ? _.cloneDeep(this.cardsData[index])
        : {};
      this.showCardDialog = true;
    },
    closeCardDetails() {
      this.showCardDialog = false;
    },
    setCardTheme(index) {
      this.themeIndex = index;
    },
    closeCreateCard() {
      this.$emit("closeCreateCard");
      this.shoutBg = 'background: #8E8E93';
      this.shoutStatus = false;
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
    shoutTheme() {
      this.$refs.form.CreateCard();
    },
    CreateNewCard() {
      this.cardDetailsIndex = this.cardsData.length - 1;
      this.closeCreateCard();
    },
    formatThemeIndex() {
      this.themeIndex = 0
    },
    handleShoutStatus() {
      this.shoutStatus = true
      this.shoutBg = 'background: #0A84FF'
    },
    handleFilter(index) {
      this.selectFilter = index
    },
    filterItemClass(index) {
      if (index === this.selectFilter) {
        return 'selected'
      } else {
        return ''
      }
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
}
.filtering {
  display: inline-flex;
  overflow-y: hidden;
  overflow-x: scroll;
  height: 55px;
  width: 100%;
  & > div {
    height: 32px;
    margin-top: 5px;
    width: 98px;
    border-radius: 7px;
    background: #2C2C2E;
    margin-right: 8px;
    flex: 0 0 98px;
    p {
      margin: 0;
      padding: 0;
      font-family: "soleil";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: white;
      padding: 4px;
    }
  }
  .selected {
    background: white;
    p {
      color: #0C0C0C;
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
.card-swipe__indicators {
  display: none;
}
.select-card-theme {
  height: 90px !important;
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
    color: rgba(255, 255, 255, 0.65);
    font-family: "soleil";
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
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
    color: white;
    font-family: "soleil";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
  }
}
.bottom-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  background: rgba(30, 30, 30, 0.75);
  -webkit-backdrop-filter: blur(81.5485px);
  backdrop-filter: blur(81.5485px);
  border-radius: 14px 14px 0 0 !important;
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
</style>
