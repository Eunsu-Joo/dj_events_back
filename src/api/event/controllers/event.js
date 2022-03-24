"use strict";
/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async create(ctx) {
    let entity;
    if (!ctx.state.user) {
      return ctx.unauthorized(`You can't update this entry`);
    } else {
      ctx.request.body.data.users_permissions_user = ctx.state.user;
      entity = await super.create(ctx);
    }
    return entity;
  },
  async update(ctx) {
    let entity;
    if (!ctx.params) {
      return ctx.forbidden(`Check you API URL`);
    }
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        users_permissions_user: { id: ctx.state.user.id },
      },
      populate: "*",
    };
    const events = await this.find({ query: query });
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }
    entity = await super.update(ctx);
    return entity;
  },
  async delete(ctx) {
    let entity;
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        users_permissions_user: { id: ctx.state.user.id },
      },
      populate: "*",
    };
    const events = await this.find({ query: query });
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }
    entity = await super.delete(ctx);
    return entity;
  },
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { message: "No authorization header was found" },
      ]);
    }

    const data = await strapi.db.query("api::event.event").findMany({
      where: {
        users_permissions_user: { id: ctx.state.user.id },
      },
      populate: "*",
    });
    if (!data) {
      return ctx.notFound();
    }
    const res = await this.sanitizeOutput(data, ctx);
    return res;
  },
}));
