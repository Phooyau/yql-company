app.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    // $httpProvider.defaults.headers.post = {
    //     Token: JSON.parse(getCookie('UserL')).token,
    //     'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    // };
    $httpProvider.interceptors.push('authInterceptor');
    $urlRouterProvider.otherwise('/etprInfo');
    $stateProvider.state('etprInfo', { // 企业信息页面路由
        cache: false,
        url: '/etprInfo',
        templateUrl: 'views/etprInfo/etprInfo.html',
        controller: 'EtprInfoCtrl',
        controllerAs: 'EtprInfo'
    })
        .state('consDet', { // 消费明细页面路由
            cache: false,
            url: '/consDet',
            templateUrl: 'views/etprInfo/consDet.html',
            controller: 'ConsDetCtrl',
            controllerAs: 'ConsDet'
        })
        .state('departMng', { // 部门管理页面路由
            cache: false,
            url: '/departMng',
            templateUrl: 'views/staffMng/departMng.html',
            controller: 'DepartMngCtrl',
            controllerAs: 'DepartMng'
        })
        .state('staffMng', {
            cache: false,
            url: '/staffMng',
            templateUrl: 'views/staffMng/staffMng.html',
            controller: 'StaffMngCtrl',
            controllerAs: 'StaffMng'
        })

        /*----------员工管理子路由-----开始----------*/
        .state('staffMng.deptStm', {
            cache: false,
            url: '/deptStm/:cdId',
            templateUrl: 'views/staffMng/staffMng/dept-stm.html',
            controller: 'DeptStmCtrl',
            controllerAs: 'DeptStm'
        })
        /*----------员工管理子路由-----结束----------*/

        .state('typeMng', { // 客户管理页面路由
            cache: false,
            url: '/typeMng',
            templateUrl: 'views/clientMng/typeMng.html',
            controller: 'TypeMngCtrl',
            controllerAs: 'TypeMng'
        })
        .state('clientMng', {
            cache: false,
            url: '/clientMng',
            templateUrl: 'views/clientMng/clientMng.html',
            controller: 'ClientMngCtrl',
            controllerAs: 'ClientMng'
        })

        /*----------客户管理子路由-----开始----------*/
        .state('clientMng.starsClm', {
            cache: false,
            url: '/starsClm/:emblemId',
            templateUrl: 'views/clientMng/clientMng/stars-clm.html',
            controller: 'StarsClmCtrl',
            controllerAs: 'StarsClm'
        })
        /*----------客户管理子路由-----结束----------*/

        .state('staffWelf', { // 福利管理页面路由
            cache: false,
            url: '/staffWelf',
            templateUrl: 'views/welfMng/staffWelf.html',
            controller: 'StaffWelfCtrl',
            controllerAs: 'StaffWelf'
        })

        /*----------员工福利子路由-----开始----------*/
        .state('staffWelf.deptStw', {
            cache: false,
            url: '/deptStw/:cdId',
            templateUrl: 'views/welfMng/staffWelf/dept-stw.html',
            controller: 'DeptStwCtrl',
            controllerAs: 'DeptStw'
        })
        /*----------员工福利子路由-----结束----------*/

        .state('clientWelf', {
            cache: false,
            url: '/clientWelf',
            templateUrl: 'views/welfMng/clientWelf.html',
            controller: 'ClientWelfCtrl',
            controllerAs: 'ClientWelf'
        })

        /*----------客户福利子路由-----开始----------*/
        .state('clientWelf.starsClw', {
            cache: false,
            url: '/starsClw/:emblemId',
            templateUrl: 'views/welfMng/clientWelf/stars-clw.html',
            controller: 'StarsClwCtrl',
            controllerAs: 'StarsClw'
        })
        /*----------客户福利子路由-----结束----------*/

        .state('welfMarket', {
            cache: false,
            url: '/welfMarket',
            templateUrl: 'views/welfMng/welfMarket.html',
            controller: 'WelfMarketCtrl',
            controllerAs: 'WelfMarket'
        })

        /*----------福利市场子路由-----开始----------*/
        .state('welfMarket.welfare', {
            cache: false,
            url: '/welfare?from&dictId',
            templateUrl: 'views/welfMng/welfMarket/welfare.html',
            controller: 'WelfareCtrl',
            controllerAs: 'Welfare'
        })
    /*----------福利市场子路由-----结束----------*/

        .state('welfDetail', { // 福利详情
            cache: false,
            url: '/welfDetail?from&boon',
            templateUrl: 'views/welfMng/welfMarket/welfDetail.html',
            controller: 'WelfDetailCtrl',
            controllerAs: 'WelfDetail'
        })

});