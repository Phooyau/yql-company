export function WelfareCtrl($scope, $rootScope, $state, $stateParams, eprHttp) {
    // 判断页面跳转来源
    console.log($stateParams);
    $rootScope.dictIdWmk = $stateParams.dictId;

    $scope.btnText = '我要赠送';
    // 判断跳转页面的来源
    var from = $stateParams.from;
    if (from === 'deptStw' || from === 'starsClw') {
        $scope.btnText = '确定选择';
    }

    // 获取福利市场福利列表
    function getWelfList(btn, sortType, start, length) {
        var option = {
            url: host + '/yql-company-console/api/boon/listBoonByPage',
            data: {
                companyId: $rootScope.companyId,
                dictId: $stateParams.dictId,
                sortType: sortType,
                start: start,
                length: length
            },
            btn: btn,
            tip: '福利市场福利列表'
        };
        console.log(option.data);
        eprHttp.eprData(option).then(function (res) {
            $scope.curWelfList = res.data;
            sessionStorage.setItem('curWelfList', JSON.stringify($scope.curWelfList)); // 将数据存储到浏览器
            $scope.total = res.recordsTotal;
            console.log(res);
        });
    }

    $scope.start = 0;
    $scope.length = 10; // 每个分页页面福利个数

    getWelfList('', 1, $scope.start, $scope.length);

    // 初始化分页
    var welfPage = new Pagination($('#pagingEpr'), {
        length: 0,
        every: $scope.length,
        onClick: function (page, num) {
            console.log(page);
            $scope.start = (num - 1) * $scope.length;
            getWelfList('', 1, $scope.start, $scope.length);
        }
    });

    $scope.$watch('total', function (newVal) {
        if (!newVal) {
            return false;
        }
        welfPage.num.length = newVal;  // 更新分页长度
        welfPage.show();
    });

    /**提示框**/
    var modMsg = $('#etprMod_msg');


    // 分类
    $scope.sortActive = function (e) {
        var aBtn = $(e.target);
        var $li = aBtn.parent();
        aBtn.addClass('etpr-disabled');
        $li.addClass('active')
            .siblings().removeClass('active');
        if (aBtn.text() === '价格排序') {
            getWelfList(aBtn, 1, 0, $scope.length);
        } else if (aBtn.text() === '销量排序') {
            getWelfList(aBtn, 2, 0, $scope.length);
        }
    };

    // 点击赠送按钮
    $scope.giveWelf = function (e, item) {
        // console.log(e);
        if (from === 'deptStw' || from === 'starsClw') { // 添加福利
            e.stopPropagation();
            $scope.boonId = item.boonId;
            modMsg.modal('show');
        } else { // 赠送福利
            // 暂时啥也不干
        }

    };

    // 确认添加福利
    $scope.confirmAdd = function (e) {
        if (e) {
            var saveBtn = $(e.target);
            saveBtn.prop('disabled', true)
                .addClass('etpr-disabled');
        }
        var addInfo;
        var option;
        if (from === 'deptStw') {
            addInfo = JSON.parse(sessionStorage.getItem('addInfo_s'));
            option = {
                url: host + '/yql-company-console/api/companyEmployeeBoon/saveCompanyEmployeeBoon',
                data: {
                    companyId: $rootScope.companyId,
                    cdId: addInfo.cdId,
                    cpId: addInfo.cpId,
                    companyBoonType: addInfo.companyBoonType,
                    boonId: $scope.boonId
                },
                btn: saveBtn,
                tip: '添加员工福利'
            };
            console.log(option.data);
            eprHttp.eprData(option).then(function (res) {
                console.log(res);
                modMsg.modal('hide');
            });
        } else if (from === 'starsClw') {
            addInfo = JSON.parse(sessionStorage.getItem('addInfo_c'));
            option = {
                url: host + '/yql-company-console/api/companyCustomerBoon/saveCompanyCustomerBoon',
                data: {
                    companyId: $rootScope.companyId,
                    emblemId: addInfo.emblemId,
                    companyBoonType: addInfo.companyBoonType,
                    boonId: $scope.boonId
                },
                btn: saveBtn,
                tip: '添加客户福利'
            };
            console.log(option.data);
            eprHttp.eprData(option).then(function (res) {
                console.log(res);
                modMsg.modal('hide');
            });
        }
    };

    modMsg.on('hidden.bs.modal', function () {
        history.back();
    });

    // 进入福利详情页
    $scope.enterDetail = function (e, idx, item) {
        $state.go('welfDetail', {from: from, boon: JSON.stringify({index: idx, boonId: item.boonId})});
    }
};