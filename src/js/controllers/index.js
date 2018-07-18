import angular from 'angular';
import { IndexCtrl } from './indexCtrl';
import { EtprInfoCtrl } from './etprInfoCtrl';
import { ConsDetCtrl } from './consDetCtrl';

export default angular.module('app.controller', [])
    .controller(IndexCtrl.name, IndexCtrl)
    .controller(EtprInfoCtrl.name, EtprInfoCtrl)
    .controller(ConsDetCtrl.name, ConsDetCtrl).name;

// var controllersModule = angular.module('wabgApp.controllers', [])
//     .controller(IndexCtrl.name, IndexCtrl)
//     .controller(EtprInfoCtrl.name, EtprInfoCtrl)
//     .controller(ConsDetCtrl.name, ConsDetCtrl);
//
// module.exports = {
//     default: controllersModule.name,
//     indexCtrl: IndexCtrl.name,
//     etprInfoCtrl: EtprInfoCtrl.name,
//     consDetCtrl: ConsDetCtrl.name
// };