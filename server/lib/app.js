"use strict";

import fs from "fs";
import http from "http";
// https?
import path from "path";

import bodyParser from "body-parser";
import busBoy from "express-busboy";
import express from "express";
import hbs from "hbs";

import Config from "./config";
import Router from "./router";
import SiteController from "./site/controller";

const siteController = new SiteController();

class App {
  constructor(options) {
    options = options || {};
    this.options = options;
    this.app = express();
    this.app.set("port", process.env.PORT || options.port || 3000);
    this.version = "v1";
    this.apiBase = `/api/${this.version}`;
    this._server = http.createServer(this.app);

    this.app.use(bodyParser.json());

    // load middlewares
    this._initializeRoutes();
  }

  boot(done) {
    Config.load(path.resolve(__dirname, "../../config.js")).then(config => {
      // take this out
      this.app.set("activeTheme", "cinder");
      this._server.listen(this.app.get("port"), function (err) {
        if (err) {
          if (done) { done(err); }
          throw err;
        }

        if (done) {
          done();
          return;
        }
      });
    });
  }

  getApp() {
    return this.app;
  }

  _initializeRoutes() {
    /**
     * init routes:
     *   - adminRouter: router for the admin area (Ember application)
     *   - apiRouter: REST api (/users, /posts, etc)
     *   - blogRouter: router for the user's site
     */
    this.apiRouter = Router.map(function () {
      this.resource("posts");
    });

    // take this out
    this.blogRouter = express();

    this.blogRouter.get("/", siteController.index.bind(siteController));
    this.app.use(this.apiBase, this.apiRouter.getRouter());
    this.app.use("/", this.blogRouter);
  }
}

module.exports = App;