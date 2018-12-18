import ServiceBase from "./ServiceBase";

export const FavoriteService = {
    add(slug) {
      return ServiceBase.post(`articles/${slug}/favorite`);
    },
    remove(slug) {
      return ServiceBase.delete(`articles/${slug}/favorite`);
    }
  };