"use strict";

const url = require("url");

const _ = require("lodash");
const errors = require("restify-errors");
const routeMatch = require("path-match")();

const config = require("../config");
const Post = require("../models").Post;
const Setting = require("../models").Setting;

function keyQuery(key) {
  return { where: { key } };
}

function setContext(type, data) {
  return { data, type }
}

function slugQuery(name) {
  return { where: { name } };
}

const VIEW_CONFIG = {
  blog: {
    name: "blog"
  },
  index: {
    name: "index",
    route: "/",
    frontPage: "home"
  },
  page: {
    name: "page",
    route: "/:pageSlug"
  },
  post: {
    name: "post",
    route: "/:postSlug"
  }
};

function getViewForType(activeTheme, options) {
  const activeThemeViews = config.get("paths.themes")[activeTheme].views;
  const allowedViews = ["index"];
  const viewConfig = VIEW_CONFIG[options.name];

  if (viewConfig.name && viewConfig.name !== "index") {
    allowedViews.unshift(viewConfig.name);
  }

  if (viewConfig.frontPage) {
    allowedViews.unshift(viewConfig.frontPage);
  }

  let template = _.find(allowedViews, view => activeThemeViews.hasOwnProperty(view + ".hbs"));

  if (!template) {
    template = activeThemeViews[_.last(allowedViews) + ".hbs"];
  }

  return template;
}

class SiteController {
  constructor() {
  }

  index(req, res, next) {
    req.params = req.params || {};
    const name = "index";
    const viewOpts = { name };
    const view = getViewForType(req.app.get("activeTheme"), viewOpts);

    Setting.find(keyQuery("frontPageType")).then(type => {
      if (type.value === "posts") {
        return this.setContextForPosts();
      }

      return this.setContextForPage();
    }).then(context => {
      res.render(view, context);
    }).catch(next);
  }

  page(req, res, next) {
    const pathName = url.parse(req.path).pathname;
    const match = routeMatch("*/:slug");
    const slugMatch = match(pathName);

    Post.find(slugQuery(slugMatch.slug)).then(post => {
      return verifyPostRoute(req.path, post);
    }).then(post => {
      return Setting.find(keyQuery("postsPage")).then(postsPage=> {
        if (post) {
          const isBlog = postsPage && parseInt(postsPage.value, 10) === post.id;

          if (isBlog) {
            // pull posts and set context with all
            return Post.findAll({ where: { type: "post" }}).then(posts => {
              return setContext("blog", { post, posts });
            });
          } else {
            // return this slug only for context
            return setContext(post.type, post);
          }
        } else {
          throw new errors.ResourceNotFoundError(`Page '${slugMatch.slug}' does not exist`);
        }
      });
    }).then(context => {
      const name = context.type;
      const viewOpts = { name };

      const view = getViewForType(req.app.get("activeTheme"), viewOpts);
      res.render(view, context.data);
    }).catch(next);
  }

  setContextForPage() {
    return Setting.find(keyQuery("frontPage")).then(frontPage => {
      return Post.findById(frontPage.value);
    }).then(page => {
      return { post: page }
    });
  }

  setContextForPosts() {
    // TODO: move this to a setting
    return Post.findAll({ limit: 10 }).then(posts => {
      return { posts };
    });
  }
}

function verifyPostRoute(route, post) {
  if (!post) {
    throw new errors.NotFoundError();
  }

  if (post.route && post.route !== route) {
    throw new errors.NotFoundError();
  }

  return post;
};

module.exports = SiteController;
