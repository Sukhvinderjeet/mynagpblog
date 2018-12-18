import ServiceBase from "./ServiceBase";

export const TagsService = {
    get() {
      return ServiceBase.get("tags");
    }
  };
  