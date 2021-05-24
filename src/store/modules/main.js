import { cardsData, cardThemes, mockNotifyData } from "../../assets/data"
import _ from "lodash"

const store = {
  namespaced: true,
  state: {
    cardsData: _.cloneDeep(cardsData),
    cardThemes: _.cloneDeep(cardThemes),
    notificationData: _.cloneDeep(mockNotifyData),
    recentSearchCards: []
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
    }
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
    }
  }
};

export default store;
