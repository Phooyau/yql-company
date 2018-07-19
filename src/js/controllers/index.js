import angular from 'angular';
import { IndexCtrl } from './indexCtrl'; // 首页
import { EtprInfoCtrl } from './etprInfoCtrl'; // 企业信息
import { ConsDetCtrl } from './consDetCtrl';
import { DepartMngCtrl } from './departMngCtrl'; // 员工管理
import { StaffMngCtrl } from './staffMngCtrl';
import { DeptStmCtrl } from './staffMng/deptStmCtrl';
import { TypeMngCtrl } from './typeMngCtrl'; // 客户管理
import { ClientMngCtrl } from './clientMngCtrl';
import { StarsClmCtrl } from './clientMng/starsClmCtrl';
import { StaffWelfCtrl } from './staffWelfCtrl'; // 福利管理
import { DeptStwCtrl } from './staffWelf/deptStwCtrl';
import { ClientWelfCtrl } from './clientWelfCtrl';
import { StarsClwCtrl } from './clientWelf/starsClwCtrl';
import { WelfMarketCtrl } from './welfMarketCtrl';
import { WelfareCtrl } from './welfMarket/welfareCtrl';
import { WelfDetailCtrl } from './welfMarket/welfDetail';


export default angular.module('app.controller', [])
    .controller(IndexCtrl.name, IndexCtrl)
    .controller(EtprInfoCtrl.name, EtprInfoCtrl)
    .controller(ConsDetCtrl.name, ConsDetCtrl)
    .controller(DepartMngCtrl.name, DepartMngCtrl)
    .controller(StaffMngCtrl.name, StaffMngCtrl)
    .controller(DeptStmCtrl.name, DeptStmCtrl)
    .controller(TypeMngCtrl.name, TypeMngCtrl)
    .controller(ClientMngCtrl.name, ClientMngCtrl)
    .controller(StarsClmCtrl.name, StarsClmCtrl)
    .controller(StaffWelfCtrl.name, StaffWelfCtrl)
    .controller(DeptStwCtrl.name, DeptStwCtrl)
    .controller(ClientWelfCtrl.name, ClientWelfCtrl)
    .controller(StarsClwCtrl.name, StarsClwCtrl)
    .controller(WelfMarketCtrl.name, WelfMarketCtrl)
    .controller(WelfareCtrl.name, WelfareCtrl)
    .controller(WelfDetailCtrl.name, WelfDetailCtrl)
    .name;

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