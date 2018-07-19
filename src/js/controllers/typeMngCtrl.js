export function TypeMngCtrl($scope, $rootScope, eprHttp, Emblem) {
    $scope.emblems = [];

    // 获取客户类型列表
    function getTypeList() {
        Emblem.getEmblem().then(function (res) {
            $scope.emblems = res;
            console.log(res);
        });
    }
    getTypeList();

    // 模态框可拖拽
    dragModal();

    /**添加模态框**/
    var modAdd = $('#etprMod_add');
    var formAdd = $('.etprModForm', modAdd);

    // 保存按钮事件
    $('.etprBtn-md-blue', modAdd).click(function () {
        formAdd.submit();
    });

    modAdd.on('hide.bs.modal', function () {
        validatorAdd.resetForm();
    });

    var validatorAdd = formAdd.validate({
        rules: {
            typeNameA: {
                required: true
            }
        },
        messages: {
            typeNameA: {
                required: "请输入分类名称",
            }
        },
        success: "valid",
        submitHandler: function (form) {
            var saveBtn = $('.etprBtn-md-blue', modAdd);
            saveBtn.prop('disabled', true)
                .addClass('etpr-disabled');
            var subData = {
                companyId: $rootScope.companyId,
                emblemName: $scope.typeNameA
            };

            console.log(subData);

            var option = {
                url: host + '/yql-company-console/api/vipEmblem/saveVipEmblem',
                data: subData,
                tip: '添加企业vip徽章',
                btn: saveBtn
            };

            var def = eprHttp.eprData(option);
            def.then(function (res) {
                console.log(res);
                getTypeList(); // 重新展示类型列
                $scope.getEmblemIdxLink(); // 重新生成首页客户类型相关路由
                modAdd.modal('hide');
            });
        }
    });

    $scope.addType = function (e) {
        $scope.typeNameA = '';
        modAdd.modal('show');
    };

    // 删除事件
    $scope.deleteCur = function (e, item) {
        var btn = $(e.target);
        btn.prop('disabled', true)
            .addClass('etpr-disabled');
        console.log(item);
        var subData = {
            companyId: $rootScope.companyId,
            emblemId: item.emblemId
        };
        var option = {
            url: host + '/yql-company-console/api/vipEmblem/deleteVipEmblem',
            data: subData,
            tip: '删除企业vip徽章',
            btn: btn
        };

        var def = eprHttp.eprData(option);
        def.then(function (res) {
            console.log(res);
            getTypeList(); // 重新展示类型列
            $scope.getEmblemIdxLink(); // 重新生成首页客户类型相关路由
        });
    }
};