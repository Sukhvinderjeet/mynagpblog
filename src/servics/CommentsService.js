import ServiceBase from "./ServiceBase";

export const CommentsService = {
    get(slug) {
      if (typeof slug !== "string") {
        throw new Error(
          "[RWV] CommentsService.get() article slug required to fetch comments"
        );
      }
      return ServiceBase.get("articles", `${slug}/comments`);
    },
  
    post(slug, payload) {
      return ServiceBase.post(`articles/${slug}/comments`, {
        comment: { body: payload }
      });
    },
  
    destroy(slug, commentId) {
      return ServiceBase.delete(`articles/${slug}/comments/${commentId}`);
    }
  };