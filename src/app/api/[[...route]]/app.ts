import createApp from "../lib/create-app";
import configureOpenApi from "../lib/configure-open-api";
import index from "../../api/mvc/index.route";

const app = createApp();

const routes = [
    index,
] as const;

configureOpenApi(app);

routes.forEach((route) => {
    app.route("api/", route);
});

export type AppType = typeof routes[number];

export default app;