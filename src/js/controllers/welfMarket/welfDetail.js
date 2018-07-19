export function WelfDetailCtrl($scope, $rootScope, $stateParams, eprHttp) {

    $scope.btnText = '我要赠送';
    $scope.backShow = false;

    // 判断跳转页面的来源
    var from = $stateParams.from;
    if (from === 'deptStw' || from === 'starsClw') {
        $scope.btnText = '确定选择';
        $scope.backShow = true;
    }

    // 从sessionStorage 获取数据
    var curWelfList = JSON.parse(sessionStorage.getItem('curWelfList'));
    var boon = JSON.parse($stateParams.boon);
    var bIdx = boon.index;
    if (curWelfList) {
        $scope.welfItem = curWelfList[bIdx];
    }
    console.log($scope.welfItem);

    // 获取福利详情
    var option = {
        url: host + '/yql-company-console/api/boon/getBoon',
        data: {
            companyId: $rootScope.companyId,
            boonId: boon.boonId
        },
        tip: '福利市场福利列表'
    };
    eprHttp.eprData(option).then(function (res) {
        $scope.welfItem = res;
    });

    // 初始化
    $scope.downloadUrl = host + '/yql-company-console/resource/template/赠送福利模板.xlsx';

    /**提示框**/
    var modMsg = $('#etprMod_msg');

    /**导入框**/
    var modImp = $('#etprMod_imp');
    var formImp = $('.etprModForm', modImp);

    // 保存按钮事件
    $('.etprBtn-md-blue', modImp).click(function () {
        formImp.submit();
    });

    modImp.on('hide.bs.modal', function () {
        validatorImp.resetForm();
    });

    var validatorImp = formImp.validate({
        rules: {
            "file": {
                required: true
            },
            "phones": {
                required: true,
                phones: true
            }
        },
        messages: {
            "file": {
                required: '未选择文件或未输入的手机号'
            },
            "phones": {
                required: '未选择文件或未输入的手机号'
            }
        },
        success: "valid",
        submitHandler: function (form) {
            var saveBtn = $('.etprBtn-md-blue', modImp);
            saveBtn.prop('disabled', true)
                .addClass('etpr-disabled');

            if (!$scope.impMode) {
                var subData = {
                    companyId: $rootScope.companyId,
                    boonId: $scope.boonId,
                    phones: $scope.phonesI,
                    count: $scope.numI
                };
                console.log(subData);

                var option = {
                    url: host + '/yql-company-console/api/boon/donateBoon',
                    data: subData,
                    tip: '赠送个人福利',
                    btn: saveBtn
                };

                eprHttp.eprData(option).then(function (res) {
                    console.log(res);
                    modImp.modal('hide');
                });

            } else if ($scope.impMode) {
                var oData = new FormData(form);
                oData.append('companyId', $rootScope.companyId);
                oData.append('boonId', $scope.boonId);
                console.log(oData);
                var config = {
                    method: 'POST',
                    url: host + '/yql-company-console/api/upload/uploadDonateBoon',
                    data: oData,
                    tip: '赠送个人福利（上传phone）',
                    btn: saveBtn
                };
                pyReq(config).done(function (res) {
                    console.log(res);
                    modImp.modal('hide');
                });
            }
        }
    });

    // 点击赠送按钮
    $scope.giveWelf = function (e, item) {
        // console.log(e);
        e.stopPropagation();
        if (from === 'deptStw' || from === 'starsClw') { // 添加福利
            $scope.boonId = boon.boonId;
            modMsg.modal('show');
        } else { // 赠送福利
            $scope.numI = 1;
            $scope.boonId = boon.boonId;
            $scope.phonesI = '';
            $scope.impFile = '';
            $scope.impMode = false;
            $scope.modeText = '切换导入模式';

            modImp.modal('show');
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
        history.go(-2);
    });

    // 点击切换手机号模式按钮
    $scope.toggleMode = function (e) {
        validatorImp.resetForm();
        if ($scope.impMode) {
            $scope.impFile = '';
            $scope.impMode = false;
            $scope.modeText = '切换导入模式';
        } else {
            $scope.phonesI = '';
            $scope.impMode = true;
            $scope.modeText = '切换输入模式';
        }
    };

    // 减1
    $scope.numMinus = function (e) {
        $scope.numI--;
        if ($scope.numI <= 1) {
            $(e.target).prop('disabled', true)
                .addClass('etpr-disabled');
        }
    };

    // 加1
    $scope.numPlus = function (e) {
        $scope.numI++;
        if ($scope.numI >= 1) {
            $(e.target).prevAll('button').prop('disabled', false)
                .removeClass('etpr-disabled');
        }
    };

    // 返回
    $scope.goBack = function (e) {
        history.back();
    }


};