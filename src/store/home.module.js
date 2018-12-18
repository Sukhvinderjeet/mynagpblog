import { ArticlesService } from "../servics/ArticlesService";
import { TagsService } from "../servics/TagsService";
import * as constants from "../common/constants";
const state = {
  tags: [],
  articles: [],
  isLoading: true,
  articlesCount: 0
};

const getters = {
  articlesCount(state) {
    return state.articlesCount;
  },
  articles(state) {
    return state.articles;
  },
  isLoading(state) {
    return state.isLoading;
  },
  tags(state) {
    return state.tags;
  }
};

const actions = {
  [constants.FETCH_ARTICLES]({ commit }, params) {
  
    commit(constants.FETCH_START);
    return ArticlesService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(constants.FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [constants.FETCH_TAGS]({ commit }) {
    return TagsService.get()
      .then(({ data }) => {
        commit(constants.SET_TAGS, data.tags);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [constants.FETCH_START](state) {
    state.isLoading = true;
  },
  [constants.FETCH_END](state, { articles, articlesCount }) {
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoading = false;
  },
  [constants.SET_TAGS](state, tags) {
    state.tags = tags;
  },
  [constants.UPDATE_ARTICLE_IN_LIST](state, data) {
    state.articles = state.articles.map(article => {
      if (article.slug !== data.slug) {
        return article;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      article.favorited = data.favorited;
      article.favoritesCount = data.favoritesCount;
      return article;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
