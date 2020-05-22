import { Service, PlatformAccessory, CharacteristicValue, CharacteristicSetCallback, CharacteristicGetCallback } from 'homebridge';

export class HttpEntryAccessory {
  log: any;
  config: any;
  api: any;
  informationService: any;
  switchService: any;
  name: any;

  /**
   * REQUIRED - This is the entry point to your plugin
   */
  constructor(log, config, api) {
    this.log = log;
    this.config = config;
    this.api = api;

    this.log.debug('Example Accessory Plugin Loaded');

    // your accessory must have an AccessoryInformation service
    this.informationService = new this.api.hap.Service.AccessoryInformation()
      .setCharacteristic(this.api.hap.Characteristic.Manufacturer, "Custom Manufacturer")
      .setCharacteristic(this.api.hap.Characteristic.Model, "Custom Model");

    // create a new "Switch" service
    this.switchService = new this.api.hap.Service.Switch(this.name);

    // link methods used when getting or setting the state of the service
    this.switchService.getCharacteristic(this.api.hap.Characteristic.On)
      .on('get', this.getOnHandler.bind(this))   // bind to getOnHandler method below
      .on('set', this.setOnHandler.bind(this));  // bind to setOnHandler method below
  }

  /**
   * REQUIRED - This must return an array of the services you want to expose.
   * This method must be named "getServices".
   */
  getServices() {
    return [
      this.informationService,
      this.switchService,
    ];
  }

  getOnHandler(callback) {
    this.log.info('Getting switch state');

    // get the current value of the switch in your own code
    const value = false;

    // the first argument of the callback should be null if there are no errors
    // the second argument contains the current status of the device to return.
    callback(null, value);
  }

  setOnHandler(value, callback) {
    this.log.info('Setting switch state to:', value);

    // the first argument of the callback should be null if there are no errors
    callback(null);
  }
}
