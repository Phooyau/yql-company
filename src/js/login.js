$(function () {

    // 请码按钮
    $('#getAuthCode').click(function () {
        var $self = $(this);
        var subData = {};
        subData.phone = $('#username').val();
        if (subData.phone === '') {
            layer.msg('手机号不能为空', {icon: 5});
            return false;
        }
        $self.addClass('etpr-disabled');
        layer.msg('获取验证码请求发送中...');
        reqPost({
            url: host + '/yql-company-console/api/sms/sendCode',
            data: subData
        }).done(function (res) {
            console.log(subData);
            console.log(res);
            if (res.resultCode === RES_OK) {
                console.log('获取验证码请求发送成功：' + res.resultDesc);
                layer.msg('获取验证码请求发送成功：' + res.resultDesc, {icon: 6});
            } else {
                console.log(res.resultDesc);
                layer.msg(res.resultDesc, {icon: 5});
            }
        })
            .fail(function (err) {
                console.log('获取验证码请求发送失败：');
                console.log(err);
                layer.msg('获取验证码请求发送失败：' + err, {icon: 5});
            })
            .always(function () {
                $self.removeClass('etpr-disabled');
            });
    });

    var formLg = $('#loginForm');
    var subBtn = $('.login');
    var validLg = formLg.validate({
        rules: {
            username: {
                required: true,
                phone: true
            },
            authCode: {
                required: true
            }
        },
        message: {
            username: {
                required: '手机号不能为空'
            },
            authCode: {
                required: '验证码不能为空'
            }
        },
        success: "valid",
        submitHandler: function (form) {
            subBtn.prop('disabled', true)
                .addClass('etpr-disabled');
            var subData = {};

            subData.phone = $('#username').val();
            subData.code = $('#authCode').val();
            console.log(subData);

            reqPost({
                url: host + '/yql-company-console/api/user/login',
                data: subData
            }).done(function (res) {
                if (res.resultCode === RES_OK) {
                    console.log('登录成功：' + res.resultDesc);
                    // 存token
                    var loginInfo = res.resultData;
                    setCookie('UserL', JSON.stringify(loginInfo));
                    location.href = 'index.html';
                } else {
                    console.log(res.resultDesc);
                    layer.msg(res.resultDesc, {icon: 5});
                }
            })
                .fail(function (err) {
                    console.log('登录失败：');
                    console.log(err);
                    layer.msg('登录失败：' + err, {icon: 5});
                })
                .always(function () {
                    subBtn.prop('disabled', false)
                        .removeClass('etpr-disabled');
                });
        }
    });
});