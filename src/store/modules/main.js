import { cardsData, cardThemes } from "../../assets/data"
import _ from "lodash"

const store = {
  namespaced: true,
  state: {
    cardsData: _.cloneDeep(cardsData),
    cardThemes: _.cloneDeep(cardThemes)
  },
  getters: {
    getCardsData(state) {
      return state.cardsData
    },
    getCardThemes(state) {
      return state.cardThemes
    }
  },
  actions: {
    setCardsDataAction(context, payload) {
      context.commit("mutateCardsDataAction", payload);
    }
  },
  mutations: {
    mutateCardsDataAction(state, payload) {
      state.cardsData = payload;
    }
  }
};

export default store;
