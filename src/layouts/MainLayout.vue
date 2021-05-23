<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title to="/">
          Sidharth Rajah
        </q-toolbar-title>

        <q-btn to="/auth" flat label="Login" icon="account_circle" />
      </q-toolbar>
    </q-header> -->

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Routes
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container class="page-container">
      <router-view />
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
        <q-route-tab name="create" icon="add" to="/create" />
        <q-route-tab name="notification" icon="alarm" to="/notification" />
        <q-route-tab name="user" icon="account_circle" to="/user" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Home",
    caption: "Home Screen",
    icon: "home",
    link: "#/"
  },
  {
    title: "Cards",
    caption: "Cards Viewer",
    icon: "menu_book",
    link: "#/card-viewer"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      tab: "home"
    };
  }
};
</script>

<style>
  .page-container {
    background: #1c1c1e;
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
</style>
