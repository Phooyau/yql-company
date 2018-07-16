import { EtprInfoCtrl } from './etprInfoCtrl';
import { ConsDetCtrl } from './consDetCtrl';
import { IndexCtrl } from './indexCtrl';

export default angular.module('app.controller')
    .controller(IndexCtrl.name, IndexCtrl)
    .controller(EtprInfoCtrl.name, EtprInfoCtrl)
    .controller(ConsDetCtrl.name, ConsDetCtrl);