'use strict';
import etprInfo from './etprInfo/etprInfo.html'; // 企业信息
import consDet from './etprInfo/consDet.html';
import departMng from './staffMng/departMng.html'; // 员工管理
import staffMng from './staffMng/staffMng.html';
import deptStm from './staffMng/staffMng/dept-stm.html';
import typeMng from './clientMng/typeMng.html'; // 客户管理
import clientMng from './clientMng/clientMng.html';
import starsClm from './clientMng/clientMng/stars-clm.html';
import staffWelf from './welfMng/staffWelf.html'; // 福利管理
import deptStw from './welfMng/staffWelf/dept-stw.html';
import clientWelf from './welfMng/clientWelf.html';
import starsClw from './welfMng/clientWelf/stars-clw.html';
import welfMarket from './welfMng/welfMarket.html';
import welfare from './welfMng/welfMarket/welfare.html';
import welfDetail from './welfMng/welfMarket/welfDetail.html';

function dealUrl(origin) {
    var path = origin.split('"');
    return path[1];
}

var etprInfoUrl = dealUrl(etprInfo);
var consDetUrl = dealUrl(consDet);
var departMngUrl = dealUrl(departMng);
var staffMngUrl = dealUrl(staffMng);
var deptStmUrl = dealUrl(deptStm);
var typeMngUrl = dealUrl(typeMng);
var clientMngUrl = dealUrl(clientMng);
var starsClmUrl = dealUrl(starsClm);
var staffWelfUrl = dealUrl(staffWelf);
var deptStwUrl = dealUrl(deptStw);
var clientWelfUrl = dealUrl(clientWelf);
var starsClwUrl = dealUrl(starsClw);
var welfMarketUrl = dealUrl(welfMarket);
var welfareUrl = dealUrl(welfare);
var welfDetailUrl = dealUrl(welfDetail);

export default {
    etprInfo: etprInfoUrl,
    consDet: consDetUrl,
    departMng: departMngUrl,
    staffMng: staffMngUrl,
    deptStm: deptStmUrl,
    typeMng: typeMngUrl,
    clientMng: clientMngUrl,
    starsClm: starsClmUrl,
    staffWelf: staffWelfUrl,
    deptStw: deptStwUrl,
    clientWelf: clientWelfUrl,
    starsClw: starsClwUrl,
    welfMarket: welfMarketUrl,
    welfare: welfareUrl,
    welfDetail: welfDetailUrl
}