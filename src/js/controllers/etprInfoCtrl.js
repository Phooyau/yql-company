app.controller('EtprInfoCtrl', function ($scope, $rootScope, $compile, $state, eprHttp, tableService) {
    // 数据表列配置
    var colCdT = [
        {
            "data": "goodsName",
            "name": "goodsName"
        },
        {
            "data": "payName",
            "name": "payName"
        },
        {
            "data": "goodsCount",
            "name": "goodsCount"
        },
        {
            "data": "orderTime",
            "name": "orderTime"
        },
        {
            "data": "payAmt",
            "name": "payAmt",
            "render": function (data, type, row, meta) {
                return '￥' + (data / 100).toFixed(2);
            }
        },
        {
            "data": "goodsType",
            "name": "goodsType"
        }
    ];

    var colBrT = [
        {
            "data": "name",
            "name": "name"
        },
        {
            "data": "birthday",
            "name": "birthday"
        },
        {
            "data": "state",
            "name": "state",
            "render": function (data, type, row, meta) {
                if (data === 1) {
                    return '<span style="color: #25BD6B">有礼物</span>';
                } else if (data === 0) {
                    return '<span style="color: #F5A623">无礼物</span>';
                } else {
                    return '';
                }
            }
        }
    ];

    // init
    $scope.$watch('eptrInfo', function (newVal) {
        if (!newVal) {
            return false;
        }
        console.log(newVal);
        $scope.companyNum = $rootScope.eptrInfo.employeeCount;
        $scope.bill = ($rootScope.eptrInfo.yesterdayOrderMoney / 100).toFixed(2);
        $scope.balance = ($rootScope.eptrInfo.balance / 100).toFixed(2);
    });

    $scope.moneys = [500, 800, 1000, 1500, 2000, 3000, 5000];
    // $scope.accountP = '北京多么科技对公账号';

    // 模态框可拖拽
    dragModal();

    // 消费明细表
    var elIdCdT = 'consDetTb';
    $scope.reqCdT = {
        companyId: $rootScope.companyId,
        length: 10
    };
    var urlCdT = host + '/yql-company-console/api/order/listCompanyOrderByPage';
    $scope.optsCdT = {
        "info": false,
        "paging": false,
        "searching": false,
        "ajax": function (data, callback, settings) {
            var subData = $.extend(data, $scope.reqCdT);
            var option = {
                id: elIdCdT,
                url: urlCdT,
                data: subData,
                callback: callback,
                settings: settings
            };
            tableService.customTbAjax(option);
        },
        "columns": colCdT,
        "drawCallback": function () {
            $compile(this.api().table().body())($scope);
            console.log('重绘');
        }
    };

    // 生日提醒
    var elIdBrT = 'btdRedTd';
    $scope.reqBrT = {
        companyId: $rootScope.companyId
    };
    var urlBrT = host + '/yql-company-console/api/companyEmployee/listEmployeeBirthdayState';
    $scope.optsBrT = {
        "info": false,
        "paging": false,
        "searching": false,
        "serverSide": false,
        "ajax": function (data, callback, settings) {
            var subData = $.extend(data, $scope.reqBrT);
            var option = {
                id: elIdBrT,
                url: urlBrT,
                data: subData,
                callback: callback,
                settings: settings
            };
            tableService.customTbAjax(option);
        },
        "columns": colBrT,
        "drawCallback": function () {
            $compile(this.api().table().body())($scope);
            console.log('重绘');
        }
    };

    /**充值模态框**/
    var modPay = $('#etprMod_pay');
    var modPayS = $('#etprMod_payS');
    var formEdit = $('.etprModForm', modPay);

    // 保存按钮事件
    $('.etprBtn-md-blue', modPay).click(function () {
        formEdit.submit();
    });

    $('.etprBtn-md-blue', modPayS).click(function () {
        modPayS.modal('hide');
    });

    modPay.on('hide.bs.modal', function () {
        validatorEdit.resetForm();
    });

    var validatorEdit = formEdit.validate({
        rules: {
            paySum: {
                required: true
            }
        },
        messages: {
            paySum: {
                required: "充值金额不能为空",
            }
        },
        success: "valid",
        submitHandler: function (form) {
            var saveBtn = $('.etprBtn-md-blue', modPay);
            saveBtn.prop('disabled', true)
                .addClass('etpr-disabled');
            var subData = {
                companyId: $rootScope.companyId,
                money: $scope.paySum * 100
            };
            console.log(subData);

            var option = {
                url: host + '/yql-company-console/api/company/balanceRecharge',
                data: subData,
                tip: '充值金额',
                btn: saveBtn
            };

            var def = eprHttp.eprData(option);
            def.then(function (res) {
                console.log(res);
                // $scope.getEprInfo(); // 重新填充账户金额
                modPay.modal('hide');
                modPayS.modal('show');
            });

        }
    });

    // 充值
    $scope.recharge = function (e) {
        $scope.paySum = '';
        modPay.modal('show');
    };

    $scope.liActive = function (e, item) {
        var $self = $(e.target);
        $self.addClass('active')
            .siblings().removeClass('active');
        if (item) {
            $scope.paySum = item;
            $scope.ifCustom = false;
        } else {
            // 选择自定义
            $scope.ifCustom = true;
        }
    };

    // 跳转详情页面
    $scope.goDetail = function (e) {
        $state.go('consDet');
    };

    // 跳转员工管理页面
    $scope.goEprDetail = function (e) {
        $state.go('staffMng.deptStm', {cdId: $scope.idxCdId});
    };

});