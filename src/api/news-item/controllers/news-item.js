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
  /*async findOne(ctx) {
    const { slug } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::news-item.news-item').findOne(slug, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },*/

  async findOne(ctx) {
    const { id: slug } = ctx.params;
    const { query } = ctx;
    if (!query.filters) query.filters = {}
    query.filters.slug = { '$eq': slug }
    const entity = await strapi.service('api::news-item.news-item').find(query);
    const { results } = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(results[0]);
  }
}))
