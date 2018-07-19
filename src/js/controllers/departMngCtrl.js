export function DepartMngCtrl($scope, $rootScope, $compile, eprHttp) {
    function drawPostTree() {
        var option1 = {
            url: host + '/yql-company-console/api/companyPost/listCompanyPostHierarchy',
            data: {
                companyId: $rootScope.companyId
            },
            tip: '获取职位列表'
        };
        var def1 = eprHttp.eprData(option1);
        def1.then(function (res) {
            var postList = dealPostTree(res);
            console.log(res);
            console.log(postList);
            $scope.optsStp = {
                "core": {
                    "data": postList
                }
            };
        });
    }

    function drawDeptTree() {
        var option2 = {
            url: host + '/yql-company-console/api/companyDept/listCompanyDeptHierarchy',
            data: {
                companyId: $rootScope.companyId
            },
            tip: '获取部门列表'
        };
        var def2 = eprHttp.eprData(option2);
        def2.then(function (res) {
            var deptList = dealDeptTree(res);
            console.log(res);
            console.log(deptList);
            $scope.optsDep = {
                "core": {
                    "data": deptList
                }
            };
        });
    }

    drawPostTree();
    drawDeptTree();

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
                required: true,
                minlength: 2
            }
        },
        messages: {
            nameA: {
                required: "请输入字段名称",
                minlength: "字段名称至少2位字符"
            }
        },
        success: "valid",
        submitHandler: function (form) {
            var saveBtn = $('.etprBtn-md-blue', modAdd);
            saveBtn.prop('disabled', true)
                .addClass('etpr-disabled');
            if ($scope.modAddTitleA.indexOf('职位') !== -1) { // 员工职位
                var subData = {
                    companyId: $rootScope.companyId,
                    postName: $scope.nameA,
                    parentCpId: $scope.parentCpIdA,
                    priority: $scope.priorityA
                };
                console.log(subData);
                var option1 = {
                    url: host + '/yql-company-console/api/companyPost/saveCompanyPost',
                    data: subData,
                    tip: '添加职位',
                    btn: saveBtn
                };

                var def1 = eprHttp.eprData(option1);
                def1.then(function (res) {
                    console.log(res);
                    drawPostTree(); // 重新画树
                    modAdd.modal('hide');
                });
            } else if ($scope.modAddTitleA.indexOf('部门') !== -1) { // 公司部门
                var subData = {
                    companyId: $rootScope.companyId,
                    deptName: $scope.nameA,
                    parentCdId: $scope.parentCdIdA,
                    priority: $scope.priorityA
                };
                console.log(subData);
                var option2 = {
                    url: host + '/yql-company-console/api/companyDept/saveCompanyDept',
                    data: subData,
                    tip: '添加部门',
                    btn: saveBtn
                };

                var def2 = eprHttp.eprData(option2);
                def2.then(function (res) {
                    console.log(res);
                    drawDeptTree(); // 重新画树
                    $scope.getDeptIdxLink(); // 重新生成首页部门相关路由
                    modAdd.modal('hide');
                });

            }

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
                required: true,
                minlength: 2
            }
        },
        messages: {
            nameE: {
                required: "请输入字段名称",
                minlength: "字段名称至少2位字符"
            }
        },
        success: "valid",
        submitHandler: function (form) {
            var saveBtn = $('.etprBtn-md-blue', modEdit);
            saveBtn.prop('disabled', true)
                .addClass('etpr-disabled');
            if ($scope.modEditTitleE.indexOf('职位') !== -1) { // 员工职位
                var subData = {
                    companyId: $rootScope.companyId,
                    postName: $scope.nameE,
                    cpId: $scope.cpIdE
                };
                console.log(subData);
                var option1 = {
                    url: host + '/yql-company-console/api/companyPost/updateCompanyPost',
                    data: subData,
                    tip: '编辑职位',
                    btn: saveBtn
                };

                var def1 = eprHttp.eprData(option1);
                def1.then(function (res) {
                    console.log(res);
                    drawPostTree(); // 重新画树
                    modEdit.modal('hide');
                });
            } else if ($scope.modEditTitleE.indexOf('部门') !== -1) { // 公司部门
                var subData = {
                    companyId: $rootScope.companyId,
                    deptName: $scope.nameE,
                    cdId: $scope.cdIdE,
                };
                console.log(subData);
                var option2 = {
                    url: host + '/yql-company-console/api/companyDept/updateCompanyDept',
                    data: subData,
                    tip: '编辑部门',
                    btn: saveBtn
                };

                var def2 = eprHttp.eprData(option2);
                def2.then(function (res) {
                    console.log(res);
                    drawDeptTree(); // 重新画树
                    modEdit.modal('hide');
                });

            }

        }
    });

    $scope.jtCompileStp = function () {
        $compile($('#staffPost').children())($scope);
    };

    $scope.jtCompileDep = function () {
        $compile($('#depart').children())($scope);
    };

    // 添加职位
    $scope.addPost = function (e) {
        $scope.nameA = '';
        $scope.modAddTitleA = '添加职位';
        $scope.parTreeNameA = '上级职位';
        $scope.treeNameA = '职位名称';
        $scope.parNameA = '无';
        $scope.parentCpIdA = 0;
        $scope.priorityA = 1;
        modAdd.modal('show');
    };

    // 添加部门
    $scope.addDept = function (e) {
        $scope.nameA = '';
        $scope.modAddTitleA = '添加部门';
        $scope.parTreeNameA = '上级部门';
        $scope.treeNameA = '部门名称';
        $scope.parNameA = '无';
        $scope.parentCdIdA = 0;
        $scope.priorityA = 1;
        modAdd.modal('show');
    };


    // 添加下级
    $scope.addJunior = function (e) {
        var $self = $(e.target);
        var tree = $self.closest('.jstree');
        var par = $self.closest('li');
        var parData;
        $scope.nameA = '';
        if (tree.attr('id') === 'staffPost') {
            parData = $scope.jtapi_sp.get_json(par);
            console.log(parData);
            $scope.modAddTitleA = '添加下级职位';
            $scope.parTreeNameA = '上级职位';
            $scope.treeNameA = '职位名称';
            $scope.parNameA = parData.data.postName;
            $scope.parentCpIdA = parData.data.cpId;
            $scope.priorityA = parData.data.priority + 1;
        } else if (tree.attr('id') === 'depart') {
            parData = $scope.jtapi_dp.get_json(par);
            $scope.modAddTitleA = '添加下级部门';
            $scope.parTreeNameA = '上级部门';
            $scope.treeNameA = '部门名称';
            $scope.parNameA = parData.data.deptName;
            $scope.parentCdIdA = parData.data.cdId;
            $scope.priorityA = parData.data.priority + 1;
        }
        modAdd.modal('show');

    };

    // 编辑当前
    $scope.editCur = function (e) {
        var $self = $(e.target);
        var tree = $self.closest('.jstree');
        var par = $self.closest('li');
        var parData;
        $scope.nameE = '';
        if (tree.attr('id') === 'staffPost') {
            parData = $scope.jtapi_sp.get_json(par);
            console.log(parData);
            $scope.modEditTitleE = '编辑职位';
            $scope.treeNameE = '职位名称';
            $scope.nameE = parData.data.postName;
            $scope.cpIdE = parData.data.cpId;
        } else if (tree.attr('id') === 'depart') {
            parData = $scope.jtapi_dp.get_json(par);
            $scope.modEditTitleE = '编辑部门';
            $scope.treeNameE = '部门名称';
            $scope.nameE = parData.data.deptName;
            $scope.cdIdE = parData.data.cdId;
        }
        modEdit.modal('show');

    };


    // 删除级别
    $scope.deleteCur = function (e) {
        // event.stopPropagation();
        var $self = $(e.target);
        var tree = $self.closest('.jstree');
        var cur = $self.closest('li');
        var curData;
        $self.prop('disabled', true)
            .addClass('etpr-disabled');
        if (tree.attr('id') === 'staffPost') {
            curData = $scope.jtapi_sp.get_json(cur);
            console.log(curData);
            var subData = {
                companyId: $rootScope.companyId,
                cpId: curData.data.cpId
            };
            console.log(subData);
            var option1 = {
                url: host + '/yql-company-console/api/companyPost/deleteCompanyPost',
                data: subData,
                tip: '删除职位',
                btn: $self
            };

            var def1 = eprHttp.eprData(option1);
            def1.then(function (res) {
                console.log(res);
                drawPostTree(); // 重新画树
            });
        } else if (tree.attr('id') === 'depart') {
            curData = $scope.jtapi_dp.get_json(cur);
            console.log(curData);
            var subData = {
                companyId: $rootScope.companyId,
                cdId: curData.data.cdId
            };
            console.log(subData);
            var option2 = {
                url: host + '/yql-company-console/api/companyDept/deleteCompanyDept',
                data: subData,
                tip: '删除部门',
                btn: $self
            };

            var def2 = eprHttp.eprData(option2);
            def2.then(function (res) {
                console.log(res);
                drawDeptTree(); // 重新画树
                $scope.getDeptIdxLink(); // 重新生成首页部门相关路由
            });
        }
    };
};