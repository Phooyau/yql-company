/**
 * 根据URL激活左侧菜单栏
 * angular directive menu-active
 *
 * @require jquery
 * @example <div menu-active></div>
 */
export default angular.module('app.directive').directive('menuActive', function ($location) {
    return {
        restrict: 'E, A',
        link: function (scope, iElement, iAttrs, controller) {
            var hashArr = $location.path().split("/");
            if (hashArr[1] !== "" && hashArr[1] !== undefined) {
                if (hashArr[1] === 'consDet') {
                    hashArr[1] = 'etprInfo'
                }
                var currentA = $('.leftMenu').find('li a[ui-sref^="' + hashArr[1] + '"]');
                var parentA = currentA.parent().closest('li').children('a');
                currentA.parent().addClass("active")
                    .siblings().removeClass("active");
                if (!parentA.parent().hasClass('active')) {
                    parentA.click();
                }
            }
        },
        scope: {}
    };
})

/**
 * 自定义支持file类型input的ng-modal
 * angular directive ng-file-modal
 *
 * @require jquery
 * @example <input type="file" name="file-1" ng-file-modal="impFile" multiple="multiple" class="etpr-file">
 */
.directive('ngFileModal', function() {
    return {
        restrict: 'ACE',
        link: function(scope, iElement, iAttrs, controlle) {
            iElement.on('change', function(event) {
                var files = event.target.files;
                var value = this.value;
                scope.iptFile = {
                    files: files,
                    value: value
                };
                scope.$apply();
            });
        },
        scope: {
            iptFile: '=ngFileModal'
        }
    }
})

/**
 * angular directive epr-data-table
 * @require jquery, datatables
 * @example
 * <table id="driverList" class="dgochTb display" cellspacing="0" width="100%" epr-data-table epr-tb-opts="opts" epr-tb-dtapi="dtapi" epr-tb-req="req" epr-tb-adjust="leftFlag">
 *     <thead>
 *         <tr>
 *             <th width="80">姓名</th>
 *             <th width="80">性别</th>
 *         </tr>
 *     </thead>
 *     <tbody>
 *     </tbody>
 * </table>
 */
.directive('eprDataTable', function () {
    return {
        restrict: 'E, A',
        link: function (scope, iElement, iAttrs, controller) {
            scope.$watch('req', function (newVal) {
                console.log(newVal);
                if (!scope.opts) {
                    return false;
                }
                scope.dtapi = drawListTable(iAttrs['id'], scope.opts, scope.dtapi);
            }, true);
            scope.$watch('adj', function (newVal) {
                if (newVal === undefined || newVal === null) {
                    return false;
                }
                scope.dtapi.columns.adjust();
            });
        },
        scope: {
            opts: "=eprTbOpts",
            dtapi: "=eprTbDtapi",
            req: "=eprTbReq",
            adj: "=eprTbAdjust"
        }
    };
})

/**
 * angular directive epr-data-table
 * @require jquery, jstree
 * @example <div id="staffPost" class="treeList" epr-jstree epr-jt-opts="opts" epr-jtapi="jtapi"></div>
 *
 */
.directive('eprJstree', function () {
    return {
        restrict: 'E, A',
        link: function (scope, iElement, iAttrs, controller) {
            scope.$watch('opts', function (newVal) {
                if (!newVal) {
                    return false;
                }
                drawTreeMenu(iElement, scope.opts, scope.jtapi);
                scope.jtapi = iElement.jstree(true);
                iElement.on('ready.jstree', function () {
                    scope.jtapi.open_all();
                    scope.jtCompile();
                });
            }, true);
        },
        scope: {
            opts: "=eprJtOpts",
            jtapi: "=eprJtapi",
            jtCompile: "&eprCompile"
        }
    };
})

/**
 * angular directive epr-autofocus
 * @require jquery, datatables
 * @example <input type="text" epr-autofocus class="etpr-input">
 *
 */
.directive('eprAutofocus', function () {
    return {
        restrict: 'E, A',
        link: function (scope, iElement, iAttrs, controller) {
            iElement.parents('.modal').on('shown.bs.modal', function () {
                iElement.focus();
            });
        },
        scope: {}
    };
});