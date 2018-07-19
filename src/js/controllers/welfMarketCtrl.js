export function WelfMarketCtrl($scope, $rootScope, eprHttp) {

    // 获取福利类型
    var option = {
        url: host + '/yql-company-console/api/dictionary/listDataDictionary',
        data: {
            companyId: $rootScope.companyId,
            type: 3
        },
        tip: '获取福利类型'
    };
    eprHttp.eprData(option).then(function (res) {
        $scope.welfTypes = res;
        console.log(res);
    });


    // 子路由菜单
    $scope.toglActive = function (e) {
        var $li = $(e.target).parent();
        $li.addClass('active')
            .siblings().removeClass('active');
    };
};