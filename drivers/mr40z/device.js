'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

module.exports = class MinostonMR40ZDevice extends ZwaveDevice {

  async onNodeInit({ node }) {
    this.log('Minoston MR40Z device initialized');

    this._buttonTrigger =
      this.homey.flow.getDeviceTriggerCard('button_event');

    this._buttonTrigger.registerRunListener(async (args, state) => {
      return (
        String(args.button) === String(state.button)
        && args.action === state.action
      );
    });

    this.registerReportListener(
      'CENTRAL_SCENE',
      'CENTRAL_SCENE_NOTIFICATION',
      report => this.handleCentralScene(report)
    );
   this.registerCapability(
      'measure_battery',
      'BATTERY'
    );
  }

  async handleCentralScene(report) {
    this.log('Central Scene report:', JSON.stringify(report));

    const button = Number(report['Scene Number']);

    const keyAttribute =
      report.Properties1?.['Key Attributes']
      || report['Key Attributes'];

    if (!button || keyAttribute === undefined) {
      this.log('Could not decode Central Scene report');
      return;
    }

    const action = this.translateAction(keyAttribute);

    if (!action) {
      this.log(`Unknown Central Scene action: ${keyAttribute}`);
      return;
    }

    this.log(`MR40Z Button ${button} - ${action}`);

    try {
      await this._buttonTrigger.trigger(
        this,
        {},
        {
          button,
          action
        }
      );
    } catch (error) {
      this.error('Failed to trigger MR40Z Flow card', error);
    }
  }

  translateAction(value) {
    const text = String(value).toLowerCase();

    if (text.includes('pressed 1 time')) return 'single';
    if (text.includes('pressed 2 times')) return 'double';
    if (text.includes('pressed 3 times')) return 'triple';
    if (text.includes('held down')) return 'held';
    if (text.includes('released')) return 'released';

    return null;
  }

};
