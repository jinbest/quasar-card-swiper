<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="page-container">
      <router-view
        @closeCreateCard="closeCreateCard"
        :showCreateCard="showCreateCard"
        :cardsData="cardsData"
        :cardThemes="cardThemes"
      />
    </q-page-container>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        active-color="white"
        indicator-color="white"
        class="text-grey footer-tab"
        v-model="tab"
      >
        <q-route-tab name="home" to="/" exact icon="home" />
        <q-route-tab name="search" icon="search" to="/search" />
        <q-route-tab name="create" icon="add" to="/" @click="openCreateCard" class="create-icon" />
        <q-route-tab name="notification" to="/notification">
          <q-icon v-if="tab === 'notification'">
            <img src="../assets/img/active-noti.png" />
          </q-icon>
          <q-icon v-if="tab !== 'notification'">
            <img src="../assets/img/notification.png" />
          </q-icon>
        </q-route-tab>
        <q-route-tab name="user" icon="account_circle" to="/user" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      tab: "home",
      showCreateCard: false
    };
  },
  methods: {
    openCreateCard() {
      this.$store.dispatch("main/setThemeSelector", true)
      this.showCreateCard = true;
    },
    closeCreateCard() {
      this.$store.dispatch("main/setThemeSelector", false)
      this.showCreateCard = false;
    }
  },
  computed: {
    cardsData() {
      return this.$store.getters["main/getCardsData"];
    },
    cardThemes() {
      return this.$store.getters["main/getCardThemes"];
    }
  }
};
</script>

<style lang="scss">
.page-container {
  background: #1c1c1e;
  max-width: 600px;
  margin: auto;
  color: white;
  padding-bottom: 0 !important;
}
.footer-tab {
  background: #1c1c1e;
  height: 60px;
}
.q-footer--bordered {
  border-top: none;
}
.q-footer {
  max-width: 600px;
  margin: auto;
  .q-tab {
    max-width: 100px;
  }
}
.create-icon {
  .q-tab__indicator {
    display: none;
  }
  .q-tab__content {
    background: radial-gradient(103.46% 165.24% at 100% -15.38%, #0FB8FF 0%, #DF47FD 48.64%, #FFED2B 100%);
    width: 40px;
    height: 40px;
    top: 10px;
    border-radius: 100px;
    i {
      color: white;
    }
  }
}
</style>
