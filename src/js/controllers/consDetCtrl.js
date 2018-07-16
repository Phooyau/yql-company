
export function ConsDetCtrl($scope, $rootScope, $compile, eprHttp, tableService) {
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

    // 消费明细表
    var elIdCdT = 'consDetTb';
    $scope.reqCdT = {
        companyId: $rootScope.companyId,
    };
    var urlCdT = host + '/yql-company-console/api/order/listCompanyOrderByPage';
    $scope.optsCdT = {
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

    $scope.goBack = function () {
        history.back();
    };

};