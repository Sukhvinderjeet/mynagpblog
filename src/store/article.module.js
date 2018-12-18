import Vue from "vue";
import {
  ArticlesService,

} from "../servics/ArticlesService";
import { 
  CommentsService
} from "../servics/CommentsService";
import {
  FavoriteService
} from "../servics/FavoriteService";
import {
  FETCH_ARTICLE,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_DELETE,
  ARTICLE_RESET_STATE
} from "../common/constants";
import {
  RESET_STATE,
  SET_ARTICLE,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE,
  UPDATE_ARTICLE_IN_LIST
} from "../common/constants";

const initialState = {
  article: {
    author: {},
    title: "",
    description: "",
    body: "",
    tagList: []
  },
  comments: []
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_ARTICLE](context, articleSlug, prevArticle) {
    // avoid extronuous network call if article exists
    if (prevArticle !== undefined) {
      return context.commit(SET_ARTICLE, prevArticle);
    }
    const { data } = await ArticlesService.get(articleSlug);
    context.commit(SET_ARTICLE, data.article);
    return data;
  },
  async [FETCH_COMMENTS](context, articleSlug) {
    const { data } = await CommentsService.get(articleSlug);
    context.commit(SET_COMMENTS, data.comments);
    return data.comments;
  },
  async [COMMENT_CREATE](context, payload) {
    await CommentsService.post(payload.slug, payload.comment);
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [COMMENT_DESTROY](context, payload) {
    await CommentsService.destroy(payload.slug, payload.commentId);
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [FAVORITE_ADD](context, payload) {
    const { data } = await FavoriteService.add(payload);
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  async [FAVORITE_REMOVE](context, payload) {
    const { data } = await FavoriteService.remove(payload);
    // Update list as well. This allows us to favorite an article in the Home view.
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  [ARTICLE_PUBLISH]({ state }) {
    return ArticlesService.create(state.article);
  },
  [ARTICLE_DELETE](context, slug) {
    return ArticlesService.destroy(slug);
  },
  [ARTICLE_EDIT]({ state }) {
    return ArticlesService.update(state.article.slug, state.article);
  },
  [ARTICLE_EDIT_ADD_TAG](context, tag) {
    context.commit(TAG_ADD, tag);
  },
  [ARTICLE_EDIT_REMOVE_TAG](context, tag) {
    context.commit(TAG_REMOVE, tag);
  },
  [ARTICLE_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};
 
export const mutations = {
  [SET_ARTICLE](state, article) {
    state.article = article;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  },
  [TAG_ADD](state, tag) {
    state.article.tagList = state.article.tagList.concat([tag]);
  },
  [TAG_REMOVE](state, tag) {
    state.article.tagList = state.article.tagList.filter(t => t !== tag);
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  article(state) {
    return state.article;
  },
  comments(state) {
    return state.comments;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
