
export function StaffMngCtrl($scope, $rootScope, Dept) {

    // 员工管理二级列表获取
    Dept.getDept().then(function (res) {
        $scope.depts = res;
        console.log(res);
    });

    // 子路由菜单
    $scope.toglActive = function (e) {
        var $li = $(e.target).parent();
        $li.addClass('active')
            .siblings().removeClass('active');
    };

};