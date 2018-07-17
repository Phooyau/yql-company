setDefaultAjax();
jQuery.validator.addMethod("phone", function(value, element) {
    var tel = /^1[34578]\d{9}$/;
    return this.optional(element) || (tel.test(value));
}, "请输入正确的手机号");

jQuery.validator.addMethod("phones", function(value, element) {
    var tel = /^1[34578]\d{9}(,1[34578]\d{9})?$/;
    return this.optional(element) || (tel.test(value));
}, "请输入正确的多个手机号");

jQuery.validator.addMethod("carId", function(value, element) {
    // var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    var express = /^[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return this.optional(element) || (express.test(value));
}, "请输入正确的车牌号");

jQuery.validator.addMethod("idCardCpx", function(value, element) {
    var express = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    return this.optional(element) || (express.test(value));
}, "请输入合法的身份证号");

jQuery.validator.addMethod("idCard", function(value, element) {
    var express = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return this.optional(element) || (express.test(value));
}, "请输入正确的身份证号");

jQuery.validator.addMethod("password", function(value, element) {
    var express = /^\w{6,18}$/;
    return this.optional(element) || (express.test(value));
}, "请输入6~18位字母、数字、下划线组成的密码");

jQuery.validator.addMethod("money", function(value, element) {
    var express = /^[1-9]*\d(\.\d{1,2})?$/;
    return this.optional(element) || (express.test(value));
}, "请输入正确的金额格式");

jQuery.validator.addMethod("repeat", function(value, element) {
    return this.optional(element) || (jadgeRepeat(value));
}, "已存在的用户名");


function jadgeRepeat(value) {
    var flag;
    reqPost({
        url: host + '/olcar-console/api/admin/checkAdminUserName.do',     //后台处理程序
        type: "post",
        dataType: "json",
        async: false,
        data: {
            userName: value,
            loginUserName: $('#userName').text()
        }
    }).done(function (res) {
        if (res.resultCode === RES_OK) {
            flag = true;
        } else if (res.resultCode === '0001') {
            flag = false;
        } else if (res.resultCode === HAS_NOT_TOKEN) {
            console.log(res.resultDesc);
            location.href = 'login.html';
        } else {
            alert(res.resultDesc);
            console.log(res.resultDesc);
        }
    })
        .fail(function (err) {
            console.log('判断重复失败：');
            console.log(err);
            alert('判断重复失败');
        });
    return flag;
}
