/**
 *  去掉字段末尾“福利”
 *
 */
export default angular.module('app.filter').filter('sliceLast2', function () {
    return function (text) {
        return text.substr(0, text.length - 2);
    }
})

/**
 *  去掉字段末尾“福利”
 *
 */
    .filter('getWelfCla', function () {
        return function (dictId) {
            switch (dictId) {
                case 701:
                    return 'birthday';
                case 702:
                    return 'festival';
                case 703:
                    return 'flow';
                case 704:
                    return 'healthExam';
                case 705:
                    return 'welfare';
                default:
                    return 'welfare';
            }
        }
    })

/**
 *  将福利类型id转化为福利名name
 *
 */
    .filter('getTypeName', function () {
        return function (id, welfTypes) {
            return getNameById(welfTypes, id, 'dictName', 'dictId');
            // return '';
        }
    })

/**
 *  多余文字省略
 *
 */
    .filter('ellipsis', function() {
        return function(text) {
            var end = 25;
            var patt = /\W/;
            if (patt.test(text.charAt(end - 1))) {
                end--;
            }
            return text.substr(0, end) + '...';
        }
    })

/**
 *  金额 分转化成元显示
 *
 */
    .filter('moneyShow', function() {
        return function(text) {
            return (text / 100).toFixed(2);
        }
    });