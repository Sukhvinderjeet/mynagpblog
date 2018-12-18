import ServiceBase from "./ServiceBase";

export const ArticlesService = {
    query(type, params) {
      return ServiceBase.query("articles" + (type === "feed" ? "/feed" : ""), {
        params: params
      });
    },
    get(slug) {
      return ServiceBase.get("articles", slug);
    },
    create(params) {
      return ServiceBase.post("articles", { article: params });
    },
    update(slug, params) {
      return ServiceBase.update("articles", slug, { article: params });
    },
    destroy(slug) {
      return ServiceBase.delete(`articles/${slug}`);
    }
  };