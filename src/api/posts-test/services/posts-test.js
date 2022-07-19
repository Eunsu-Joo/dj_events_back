'use strict';

/**
 * posts-test service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::posts-test.posts-test');
