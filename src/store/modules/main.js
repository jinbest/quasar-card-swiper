import { cardsData, cardThemes, mockNotifyData, mockUserData, mockType } from "../../assets/data"
import _ from "lodash"

const store = {
  namespaced: true,
  state: {
    cardsData: _.cloneDeep(cardsData),
    cardThemes: _.cloneDeep(cardThemes),
    notificationData: _.cloneDeep(mockNotifyData),
    recentSearchCards: [],
    userData: _.cloneDeep(mockUserData),
    cardType: _.cloneDeep(mockType),
    recentSelectType: [],
    themeSelector: false
  },
  getters: {
    getCardsData(state) {
      return state.cardsData
    },
    getCardThemes(state) {
      return state.cardThemes
    },
    getRecentSearchCards(state) {
      return state.recentSearchCards
    },
    getNotificationData(state) {
      return state.notificationData
    },
    getUserData(state) {
      return state.userData
    },
    getCardType(state) {
      return state.cardType
    },
    getRecentSelectType(state) {
      return state.recentSelectType
    }
  },
  actions: {
    setCardsDataAction(context, payload) {
      context.commit("mutateCardsDataAction", payload);
    },
    setRecentSearchData(context, payload) {
      context.commit("mutateRecentSearchDataAction", payload);
    },
    setNotificationData(context, payload) {
      context.commit("mutateNotificationDataAction", payload);
    },
    setRecentSelectType(context, payload) {
      context.commit("mutateRecentSelectType", payload);
    },
    setThemeSelector(context, payload) {
      context.commit("mutateThemeSelector", payload);
    },
  },
  mutations: {
    mutateCardsDataAction(state, payload) {
      state.cardsData = payload;
    },
    mutateRecentSearchDataAction(state, payload) {
      state.recentSearchCards = payload;
    },
    mutateNotificationDataAction(state, payload) {
      state.notificationData = payload
    },
    mutateRecentSelectType(state, payload) {
      state.recentSelectType = payload;
    },
    mutateThemeSelector(state, payload) {
      state.themeSelector = payload;
    },
  }
};

export default store;
