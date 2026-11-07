'use strict';

const Homey = require('homey');

module.exports = class MinostonMR40ZDriver extends Homey.Driver {

  async onInit() {
    this.log('Minoston MR40Z driver initialized');
  }

};
