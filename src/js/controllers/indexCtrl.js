app.controller('IndexCtrl', function ($rootScope, $scope, $state, eprHttp, Dept, Emblem) {
    var login = JSON.parse(getCookie('UserL'));
    if (!login) {
        location.href = 'login.html';
    }
    $rootScope.companyId = login.companyId;

    // 获取企业信息数据
    $scope.getEprInfo = function () {
        var option = {
            url: host + '/yql-company-console/api/company/getCompany',
            data: {
                companyId: $rootScope.companyId
            },
            tip: '获取企业信息数据'
        };
        var def = eprHttp.eprData(option);
        def.then(function (res) {
            $rootScope.eptrInfo = res;
            $scope.companyName = res.companyName;
            $scope.managerPhone = res.managerPhone;
            if (res.logoUrl) {
                $scope.logoUrl = res.logoUrl;
            } else {
                $scope.logoUrl = 'images/index/user.png';
            }
        });
    };
    $scope.getEprInfo();

    // 二级列表获取（部门）
    $scope.getDeptIdxLink = function () {
        Dept.getDept().then(function (res) {
            $scope.idxDepts = res;
            $scope.idxCdId = $scope.idxDepts[0] ? $scope.idxDepts[0].cdId : '';
            console.log(res);
        });
    };

    // 二级列表获取（客户类型）
    $scope.getEmblemIdxLink = function () {
        Emblem.getEmblem().then(function (res) {
            $scope.idxEmblems = res;
            $scope.idxEmblemId = $scope.idxEmblems[0] ? $scope.idxEmblems[0].emblemId : '';
            console.log(res);
        });
    };
    $scope.getDeptIdxLink();
    $scope.getEmblemIdxLink();

    // 左侧菜单点击事件
    // 一级菜单
    $('.menuItem > a').click(function () {
        var $li = $(this).parent();
        var $dl = $(this).next();
        var isActive = $li.hasClass('active');
        $('.menuItem').removeClass('active');
        $('.menuItem > dl').hide();
        if (!isActive) {
            $li.addClass('active');
            $dl.show();
        }

    });

    // 二级菜单
    $('.menuItem dd > a').click(function () {
        var $dd = $(this).parent();
        $('.menuItem dd').removeClass('active');
        $dd.addClass('active');
    });

    // changeMenuByUrl($('.leftMenu'));

    // 退出登录
    $scope.logout = function (e) {
        if (e) {
            var aBtn = $(e.target);
            aBtn.addClass('etpr-disabled'); // 防止重复点击按钮
        }
        delCookie('UserL');
        location.href = 'login.html';
    };

    // 前往员工管理页面
    $scope.goStaffMng = function (e) {
        if (!$scope.idxCdId) {
            e.preventDefault();
            $state.go('staffMng');
        }
    };

    // 前往客户管理页面
    $scope.goClientMng = function (e) {
        if (!$scope.idxEmblemId) {
            e.preventDefault();
            $state.go('clientMng');
        }
    };

    // 前往员工福利页面
    $scope.goStaffWelf = function (e) {
        if (!$scope.idxCdId) {
            e.preventDefault();
            $state.go('staffWelf');
        }
    };

    // 前往客户福利页面
    $scope.goClientWelf = function (e) {
        if (!$scope.idxEmblemId) {
            e.preventDefault();
            $state.go('clientWelf');
        }
    };

});