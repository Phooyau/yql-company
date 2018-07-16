export function ClientMngCtrl($scope, Emblem) {
    $scope.emblems = [];

    // 获取客户类型列表
    Emblem.getEmblem().then(function (res) {
        $scope.emblems = res;
        console.log(res);
    });

    // 子路由菜单
    $scope.toglActive = function (e) {
        var $li = $(e.target).parent();
        $li.addClass('active')
            .siblings().removeClass('active');
    };

};