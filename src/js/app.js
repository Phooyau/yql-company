import '../css/reset.css';
import '../css/etpr-validate.css';
import '../css/epr-wms-table.css';
import '../css/index.css';

import config from './config';
import directive from './directive';
import filter from './filter';
import service from './service';
import controllers from './controllers';

var app = angular.module('app', [
    config.name,
    directive.name,
    filter.name,
    service.name,
    controllers.name
]);
console.log(app);