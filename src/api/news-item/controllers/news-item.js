'use strict';

/**
 * A set of functions called "actions" for `news-item`
 */

 const { createCoreController } = require('@strapi/strapi').factories;

 module.exports = createCoreController('api::news-item.news-item', ({ strapi }) =>  ({
   async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: 'en' }
    
    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now()

    return { data, meta };
  },

  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::news-item.news-item').findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}))
