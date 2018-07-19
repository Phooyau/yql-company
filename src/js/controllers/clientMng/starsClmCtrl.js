
export function StarsClmCtrl($scope, $rootScope, $http, $compile, $stateParams, tableService, eprHttp, Emblem) {
    $scope.genders = [
        {
            text: '男',
            value: '1'
        }, {
            text: '女',
            value: '2'
        }
    ];

    $scope.emblems = [];

    // 数据表列配置
    var col = [
        {
            "data": "name",
            "name": "name"
        },
        {
            "data": "gender",
            "name": "gender",
            "render": function (data, type, row, meta) {
                return getTextByVal($scope.genders, data);
            }
        },
        {
            "data": "phone",
            "name": "phone"
        },
        {
            "data": "idNumber",
            "name": "idNumber"
        },
        {
            "data": "emblemId",
            "name": "emblemId",
            "render": function (data, type, row, meta) {
                return getNameById($scope.emblems, data, 'emblemName', 'emblemId');
            }
        },
        {
            "data": "operate",
            "name": "operate",
            "render": function (data, type, row, meta) {
                return '<a href="javascript:;" class="etprBtn-dt edit-dt" ng-click="editRow($event)"></a><a href="javascript:;" class="etprBtn-dt delete-dt" ng-click="deleteRow($event)"></a>'
            }
        }
    ];


    // 获取客户所有类型
    Emblem.getEmblem().then(function (res) {
        $scope.emblems = res;
        console.log(res);

        // 员工列表
        var elId = 'staffList';
        $scope.req = {
            companyId: $rootScope.companyId,
            emblemId: $stateParams.emblemId
        };
        var url = host + '/yql-company-console/api/companyCustomer/listCompanyCustomer';
        $scope.opts = {
            "searching": false,
            "ajax": function (data, callback, settings) {
                var subData = $.extend(data, $scope.req);
                var option = {
                    id: elId,
                    url: url,
                    data: subData,
                    callback: callback,
                    settings: settings,
                    searchBtn: $('.searchBtn')
                };
                tableService.customTbAjax(option);
            },
            "columns": col,
            "drawCallback": function () {
                $compile(this.api().table().body())($scope);
                console.log('重绘');
            }
        };
    });

    // 模态框可拖拽
    dragModal();

    // 初始化
    $rootScope.emblemIdClm = $stateParams.emblemId;
    $scope.downloadUrl = host + '/yql-company-console/resource/template/客户模板.xlsx';

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
            nameA: {
                required: true
            },
            genderA: {
                required: true
            },
            idCardA: {
                required: true,
                idCard: true
            },
            emblemA: {
                required: true
            },
            phoneA: {
                required: true,
                phone: true
            }
        },
        messages: {
            nameA: {
                required: "请输入姓名",
            },
            genderA: {
                required: "请选择性别"
            },
            idCardA: {
                required: "请输入身份证号"
            },
            emblemA: {
                required: "请选择类型"
            },
            phoneA: {
                required: "请输入手机号"
            }
        },
        success: "valid",
        submitHandler: function (form) {
            var saveBtn = $('.etprBtn-md-blue', modAdd);
            saveBtn.prop('disabled', true)
                .addClass('etpr-disabled');
            var subData = {
                companyId: $rootScope.companyId,
                emblemId: $stateParams.emblemId,
                name: $scope.nameA,
                gender: $scope.genderA,
                idNumber: $scope.idCardA,
                phone: $scope.phoneA
            };

            console.log(subData);

            var option = {
                url: host + '/yql-company-console/api/companyCustomer/saveCompanyCustomer',
                data: subData,
                tip: '添加客户员工',
                btn: saveBtn
            };

            var def = eprHttp.eprData(option);
            def.then(function (res) {
                console.log(res);
                $scope.dtapi.draw('page'); // 以现有的搜索条件重新画表
                modAdd.modal('hide');
            });
        }
    });

    /**编辑模态框**/
    var modEdit = $('#etprMod_edit');
    var formEdit = $('.etprModForm', modEdit);

    // 保存按钮事件
    $('.etprBtn-md-blue', modEdit).click(function () {
        formEdit.submit();
    });

    modEdit.on('hide.bs.modal', function () {
        validatorEdit.resetForm();
    });

    var validatorEdit = formEdit.validate({
        rules: {
            nameE: {
                required: true
            },
            genderE: {
                required: true
            },
            idCardE: {
                required: true,
                idCard: true
            },
            emblemE: {
                required: true
            },
            phoneE: {
                required: true,
                phone: true
            }
        },
        messages: {
            nameE: {
                required: "请输入姓名",
            },
            genderE: {
                required: "请选择性别"
            },
            idCardE: {
                required: "请输入身份证号"
            },
            emblemE: {
                required: "请选择类型"
            },
            phoneE: {
                required: "请输入手机号"
            }
        },
        success: "valid",
        submitHandler: function (form) {
            var saveBtn = $('.etprBtn-md-blue', modEdit);
            saveBtn.prop('disabled', true)
                .addClass('etpr-disabled');
            var subData = {
                companyId: $rootScope.companyId,
                ccId:$scope.ccId,
                // emblem: $scope.emblemE,
                name: $scope.nameE,
                gender: $scope.genderE,
                idNumber: $scope.idCardE,
                phone: $scope.phoneE
            };
            console.log(subData);

            var option = {
                url: host + '/yql-company-console/api/companyCustomer/updateCompanyCustomer',
                data: subData,
                tip: '修改客户员工',
                btn: saveBtn
            };

            var def = eprHttp.eprData(option);
            def.then(function (res) {
                console.log(res);
                $scope.dtapi.draw('page'); // 以现有的搜索条件重新画表
                modEdit.modal('hide');
            });

        }
    });

    /**导入模态框**/
    var modImp = $('#etprMod_imp');
    var formImp = $('.etprModForm', modImp);

    // 保存按钮事件
    $('.etprBtn-md-blue', modImp).click(function () {
        formImp.submit();
    });

    modImp.on('hide.bs.modal', function () {
        formImp[0].reset();
        validatorImp.resetForm();
    });

    var validatorImp = formImp.validate({
        rules: {
            "file": {
                required: true
            }
        },
        messages: {
            "file": {
                required: '未选择文件'
            }
        },
        success: "valid",
        submitHandler: function (form) {
            var saveBtn = $('.etprBtn-md-blue', modImp);
            saveBtn.prop('disabled', true)
                .addClass('etpr-disabled');

            // console.log($scope.impFile.files);

            var oData = new FormData(form);
            oData.append('companyId', $rootScope.companyId);
            oData.append('emblemId', $stateParams.emblemId);
            console.log(oData);
            var config = {
                method: 'POST',
                url: host + '/yql-company-console/api/upload/uploadCompanyCustomer',
                data: oData,
                tip: '导入客户',
                btn: saveBtn
            };
            pyReq(config).done(function (res) {
                console.log(res);
                $scope.dtapi.draw('page'); // 以现有的搜索条件重新画表
                modImp.modal('hide');
            });

        }
    });


    /**
     *  事件方法
     *
     */
    // 搜索事件
    $scope.searchDt = function (e) {
        var subData = {
            companyId: $rootScope.companyId,
            cdId: $stateParams.id,
            keyword: $scope.keyword,
            second: timeFormat('ms')
        };
        console.log(subData);
        $scope.req = subData;
        if (e) {
            $(e.target).prop('disabled', true)
                .addClass('etpr-disabled'); // 防止重复点击搜索按钮
        }
    };

    // 添加模态框弹出
    $scope.addRow = function (e) {
        $scope.nameA = '';
        $scope.genderA = 1;
        $scope.idCardA = '';
        $scope.emblemA = $stateParams.emblemId;
        $scope.phoneA = '';
        modAdd.modal('show');
    };

    // 编辑模态框弹出
    $scope.editRow = function (e) {
        var table = $scope.dtapi;
        var $row = $(e.target).closest('tr');
        var rowData = table.row($row).data();
        var aBtn = $(e.target).closest('a');
        console.log(rowData);
        aBtn.addClass('etpr-disabled');
        var subData = {
            companyId: $rootScope.companyId,
            ccId: rowData.ccId
        };
        var option = {
            url: host + '/yql-company-console/api/companyCustomer/getCompanyCustomer',
            data: subData,
            tip: '获取客户员工详情',
            btn: aBtn
        };

        var def = eprHttp.eprData(option);
        def.then(function (res) {
            console.log(res);
            $scope.ccId = rowData.ccId;
            $scope.nameE = res.name;
            $scope.genderE = res.gender;
            $scope.idCardE = res.idNumber;
            $scope.emblemE = res.emblemId;
            $scope.phoneE = res.phone;

            $scope.dtapi.draw('page'); // 以现有的搜索条件重新画表
            modEdit.modal('show');
        });
    };

    $scope.deleteRow = function (e) {
        var table = $scope.dtapi;
        var $row = $(e.target).closest('tr');
        var rowData = table.row($row).data();
        var aBtn = $(e.target).closest('a');
        console.log(rowData);
        aBtn.addClass('etpr-disabled');
        var subData = {
            companyId: $rootScope.companyId,
            ccId: rowData.ccId
        };
        var option = {
            url: host + '/yql-company-console/api/companyCustomer/deleteCompanyCustomer',
            data: subData,
            tip: '删除客户员工',
            btn: aBtn
        };

        var def = eprHttp.eprData(option);
        def.then(function (res) {
            console.log(res);
            $scope.dtapi.draw('page'); // 以现有的搜索条件重新画表
        });
    };
};
