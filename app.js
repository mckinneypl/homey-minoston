'use strict';

const Homey = require('homey');

module.exports = class MinostonApp extends Homey.App {

  async onInit() {
    this.log('Minoston Z-Wave Remote app initialized');
  }

};
