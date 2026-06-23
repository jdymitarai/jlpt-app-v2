import { onRequest as __api_data_js_onRequest } from "C:\\ai\\jlpt-app-v2\\functions\\api\\data.js"

export const routes = [
    {
      routePath: "/api/data",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_data_js_onRequest],
    },
  ]