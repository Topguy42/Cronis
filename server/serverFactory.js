import { createServer } from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
;
import { parsedDoc } from "./config.js";
const serverFactory = (handler) => {
    const httpServer = createServer();
    httpServer.on("request", (req, res) => {
        handler(req, res);
    });
    httpServer.on("upgrade", (req, socket, head) => {
        if (parsedDoc.server.server.wisp) {
            if (req.url?.endsWith("/wisp/")) {
                wisp.routeRequest(req, socket, head);
            }
        }
    });
    return httpServer;
};
export { serverFactory };
