import '../css/reset.css';
import '../css/etpr-validate.css';
import '../css/epr-wms-table.css';
import '../css/index.css';

import angular from 'angular';
console.log('打印angular');
console.log(angular);
import config from './config';
import directive from './directive';
import filter from './filter';
import service from './service';
import controllers from './controllers';

console.log(config);
console.log(directive);
console.log(filter);
console.log(service);
console.log(controllers);

var app = angular.module('app', [
    config.name,
    directive.name,
    filter.name,
    service.name,
    controllers.name
]);
console.log(app);