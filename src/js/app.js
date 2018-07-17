import '../css/reset.css';
import '../css/etpr-validate.css';
import '../css/epr-wms-table.css';
import '../css/index.css';

import angular from 'angular';
import config from './base/config';
import directive from './base/directive';
import filter from './base/filter';
import service from './base/service';
import controllers from './controllers';

console.log('打印angular');
console.log(angular);

console.log(config);
console.log(directive);
console.log(filter);
console.log(service);
console.log(controllers);

var app = angular.module('app', [
    config,
    directive,
    filter,
    service,
    controllers
]);
console.log(app);