'use strict';

/**
 *  posts-test controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::posts-test.posts-test');
