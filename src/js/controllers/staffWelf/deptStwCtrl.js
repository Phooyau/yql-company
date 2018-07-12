app.controller('DeptStwCtrl', function ($scope, $rootScope, $state, $stateParams, eprHttp) {

    $rootScope.cdIdStw = $stateParams.cdId;

    // 获取部门名
    $scope.$watch('depts', function (newVal) {
        if (!newVal) {
            return false;
        }
        $scope.deptName = getNameById($scope.depts, $rootScope.cdIdStw, 'deptName', 'cdId');
    });

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
        getStaffWelf(); // 为了filter指令正常运行，等etprWelfTs有值后再获取福利列表
    });

    // 获取员工福利列表
    function getStaffWelf() {
        var option2 = {
            url: host + '/yql-company-console/api/companyEmployeeBoon/listCompanyEmployeeBoon',
            data: {
                companyId: $rootScope.companyId,
                cdId: $stateParams.cdId
            },
            tip: '获取员工福利列表'
        };
        var def2 = eprHttp.eprData(option2);
        def2.then(function (res) {
            $scope.welfListByPost = res;
            console.log(res);
        });
    }

    // 过滤企业福利类型
    $scope.distOther = function (item) {
        return item.dictId !== 705;
    };

    // 过滤企业福利类型2
    $scope.distOther2 = function (item) {
        return item.companyBoonType !== 705;
    };

    // 添加员工福利
    $scope.addWelfare = function (e, item, post) {
        if (item.status === 0) {
            alert(item.dictName + '暂时不能添加');
            return false;
        }
        var addInfo = {
            cdId: $stateParams.cdId,
            cpId: post.cpId,
            companyBoonType: item.dictId
        };
        sessionStorage.setItem('addInfo_s', JSON.stringify(addInfo));
        $state.go('welfMarket.welfare', {from: 'deptStw', dictId: ''});
    };

    // 删除员工福利
    $scope.delWelfare = function (e, item) {
        if (e) {
            var btn = $(e.target);
            btn.addClass('etpr-disabled');
        }
        var option = {
            url: host + '/yql-company-console/api/companyEmployeeBoon/deleteCompanyEmployeeBoon',
            data: {
                companyId: $rootScope.companyId,
                employeeBoonId: item.employeeBoonId
            },
            tip: '删除员工福利'
        };
        var def = eprHttp.eprData(option);
        def.then(function (res) {
            console.log(res);
            getStaffWelf(); // 刷新员工福利列表
        });

    };
});
