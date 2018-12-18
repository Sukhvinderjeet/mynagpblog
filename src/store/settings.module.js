import { ArticlesService } from "../service/ArticlesService";
import { CommentsService } from "../service/CommentsService";
import * as constants from "../common/constants";

export const state = {
  article: {},
  comments: []
};

export const actions = {
  [constants.FETCH_ARTICLE](context, articleSlug) {
    return ArticlesService.get(articleSlug)
      .then(({ data }) => {
        context.commit(constants.SET_ARTICLE, data.article);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [constants.FETCH_COMMENTS](context, articleSlug) {
    return CommentsService.get(articleSlug)
      .then(({ data }) => {
        context.commit(constants.SET_COMMENTS, data.comments);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [constants.SET_ARTICLE](state, article) {
    state.article = article;
  },
  [constants.SET_COMMENTS](state, comments) {
    state.comments = comments;
  }
};

export default {
  state,
  actions,
  mutations
};
