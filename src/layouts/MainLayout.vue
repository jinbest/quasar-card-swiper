<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container class="page-container">
      <router-view :showCreateCard="showCreateCard" :closeCreateCard="closeCreateCard" />
    </q-page-container>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey footer-tab"
        v-model="tab"
      >
        <q-route-tab name="home" to="/" exact icon="home" />
        <q-route-tab name="search" icon="search" to="/search" />
        <q-route-tab name="create" icon="add" to="/" @click="openCreateCard" />
        <q-route-tab name="notification" icon="alarm" to="/notification" />
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
      this.showCreateCard = true;
    },
    closeCreateCard() {
      this.showCreateCard = false;
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
    background: rgba(28, 28, 30, 0.83);
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
</style>
