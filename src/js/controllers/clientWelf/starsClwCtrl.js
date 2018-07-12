app.controller('StarsClwCtrl', function ($scope, $rootScope, $state, $stateParams, eprHttp) {

    $rootScope.emblemIdClw = $stateParams.emblemId;

    // 获取企业福利类型
    var option1 = {
        url: host + '/yql-company-console/api/company/listCompanyBootType',
        data: {
            companyId: $rootScope.companyId,
        },
        tip: '获取企业福利类型'
    };
    var def1 = eprHttp.eprData(option1);
    def1.then(function (res) {
        $scope.etprWelfTs = res;
        console.log(res);
        getClientWelf(); // 为了filter指令正常运行，等etprWelfTs有值后再获取福利列表
    });

    // 获取客户福利列表
    function getClientWelf() {
        var option2 = {
            url: host + '/yql-company-console/api/companyCustomerBoon/listCompanyCustomerBoon',
            data: {
                companyId: $rootScope.companyId,
                emblemId: $stateParams.emblemId
            },
            tip: '获取客户福利列表'
        };
        var def2 = eprHttp.eprData(option2);
        def2.then(function (res) {
            $scope.welfLists = res;
            console.log(res);
        });
    }


    // 添加员工福利
    $scope.addWelfare = function (e, item) {
        if (item.status === 0) {
            alert(item.dictName + '暂时不能添加');
            return false;
        }
        var addInfo = {
            emblemId: $stateParams.emblemId,
            companyBoonType: item.dictId
        };
        sessionStorage.setItem('addInfo_c', JSON.stringify(addInfo));
        $state.go('welfMarket.welfare', {from: 'starsClw', dictId: ''});
    };

    // 删除员工福利
    $scope.delWelfare = function (e, item) {
        if (e) {
            var btn = $(e.target);
            btn.addClass('etpr-disabled');
        }
        var option = {
            url: host + '/yql-company-console/api/companyCustomerBoon/deleteCompanyCustomerBoon',
            data: {
                companyId: $rootScope.companyId,
                customerBoonId: item.customerBoonId
            },
            tip: '删除客户福利'
        };
        var def = eprHttp.eprData(option);
        def.then(function (res) {
            console.log(res);
            getClientWelf(); // 刷新客户福利列表
        });

    };

});