import angular from 'angular';

// $http请求拦截器，设置请求头
export default angular.module('app.service', []).factory('authInterceptor', function () {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (getCookie('UserL')) {
                config.headers.token = JSON.parse(getCookie('UserL')) ? JSON.parse(getCookie('UserL')).token : '';
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            }
            return config;
        },
        responseError: function (response) {
            // ...
        }
    };
})

    // 自定义表格ajax请求
    .factory('tableService', function ($http) {
        return {
            customTbAjax: function (option) {
                $http({
                    method: 'POST',
                    url: option.url,
                    data: $.param(option.data)
                }).then(function (response) {
                    console.log(response);
                    if (!response) {
                        console.log('请求超时...');
                        return false;
                    }
                    var res = response.data;
                    if (res.resultCode === RES_OK) {
                        var result = res.resultData;
                        if (!result || result.length === 0 || JSON.stringify(result) === "{}") {
                            result = {
                                data: [],
                                recordsFiltered: 0,
                                recordsTotal: 0
                            };
                        } else if (result instanceof Array) {
                            result = {
                                data: result
                            }
                        }
                        option.callback(result);
                    } else if (res.resultCode === HAS_NOT_TOKEN) {
                        console.log(res.resultDesc);
                        location.href = 'login.html';
                    } else {
                        console.log(res.resultDesc);
                    }
                }, function (err) {
                    console.log('id：' + option.id + ' 表格数据获取失败：' + err.data);
                })
                    .finally(function () {
                        if (option.searchBtn && option.searchBtn.prop('disabled')) {
                            option.searchBtn.prop('disabled', false)
                                .removeClass('etpr-disabled');
                        }
                    });
            }
        }
    })

    // $http封装
    .factory('eprHttp', function ($http, $q) {
        return {
            eprData: function (option) {
                var deferred = $q.defer();
                var data;
                if (!option.data) {
                    data = '';
                // } else if (FormData && option.data instanceof FormData) {
                //     data = option.data;
                } else {
                    data = $.param(option.data);
                }
                $http({
                    method: 'POST',
                    url: option.url,
                    data: data
                }).then(function (response) {
                    var res = response.data;
                    if (res.resultCode === RES_OK) {
                        console.log(option.tip + '：' + res.resultDesc);
                        deferred.resolve(res.resultData);
                    } else if (res.resultCode === HAS_NOT_TOKEN) {
                        console.log(res.resultDesc);
                        location.href = 'login.html';
                    } else {
                        console.log(res.resultDesc);
                        alert(res.resultDesc);
                    }
                }, function (err) {
                    deferred.resolve(err);
                    console.log(option.tip + '失败');
                    console.log(err.data);
                })
                    .finally(function () {
                        if (option.btn && option.btn.get(0).nodeName.toLowerCase() === 'button') {
                            option.btn.prop('disabled', false)
                                .removeClass('etpr-disabled');
                        } else if (option.btn) {
                            option.btn.removeClass('etpr-disabled');
                        }
                    });
                return deferred.promise;
            }
        }
    })

    // 获取部门列表
    .factory('Dept', function ($rootScope, $http, $q, eprHttp) {
        return {
            getDept: function () {
                var deferred = $q.defer();
                var option = {
                    url: host + '/yql-company-console/api/companyDept/listCompanyDept',
                    data: {
                        companyId: $rootScope.companyId
                    },
                    tip: '获取部门列表信息'
                };
                var def = eprHttp.eprData(option);
                def.then(function (res) {
                    deferred.resolve(res);
                }, function (err) {
                    deferred.resolve(err);
                });
                return deferred.promise;
            }
        }
    })

    // 获取客户分类
    .factory('Emblem', function ($rootScope, $http, $q, eprHttp) {
        return {
            getEmblem: function () {
                var deferred = $q.defer();
                var option = {
                    url: host + '/yql-company-console/api/vipEmblem/listVipEmblem',
                    data: {
                        companyId: $rootScope.companyId
                    },
                    tip: '获取徽章列表'
                };
                var def = eprHttp.eprData(option);
                def.then(function (res) {
                    deferred.resolve(res);
                }, function (err) {
                    deferred.resolve(err);
                });
                return deferred.promise;
            }
        }
    }).name;

