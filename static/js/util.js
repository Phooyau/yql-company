/**
 *  17600105324 009527
 */


// var host = 'http://localhost:63341';
// var host = 'http://www.arley.xin:8080';
var host = 'http://118.190.98.12:8060';
// var host = 'http://www.zmcz365.com:8070';
var RES_OK = '0000';
var HAS_NOT_TOKEN = '0006';

// 设置默认的ajax
function setDefaultAjax() {
    $.ajaxSetup({
        headers: {
            token: JSON.parse(getCookie('UserL')) ? JSON.parse(getCookie('UserL')).token : ''
        }
    });
}

// 使用ajax配合jq deferred对象的异步请求
function pyReq(config) {
    var deferred = new $.Deferred();
    var xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url, true);
    xhr.setRequestHeader("token", JSON.parse(getCookie('UserL')) ? JSON.parse(getCookie('UserL')).token : '');
    xhr.onload = function (e) {
        if (xhr.status == 200) {
            // console.log(xhr);
            var res = JSON.parse(xhr.responseText);
            if (res.resultCode === RES_OK) {
                console.log(config.tip + '：' + res.resultDesc);
                deferred.resolve(res.resultData);
            } else if (res.resultCode === HAS_NOT_TOKEN) {
                console.log(res.resultDesc);
                location.href = 'login.html';
            } else {
                console.log(res.resultDesc);
                alert(res.resultDesc);
            }
        }
    };
    xhr.onerror = function (err) {
        deferred.reject(err);
        console.log(config.tip + '失败');
        console.log(err);
    };
    xhr.onloadend = function () {
        if (config.btn && config.btn.get(0).nodeName.toLowerCase() === 'button') {
            config.btn.prop('disabled', false)
                .removeClass('etpr-disabled');
        } else if (config.btn) {
            config.btn.removeClass('etpr-disabled');
        }
    };
    xhr.send(config.data);
    return deferred.promise();
}

//  get请求
function reqGet(url, data) {
    var settings;
    if (typeof url === "string") {
        settings = {
            url: url,
            data: data ? data : null,
            headers: headers ? headers : {},
            dataType: 'json',
            success: function (d) {
            }
        }
    } else if (typeof url === "object") {
        var defaults = {
            dataType: 'json'
        };
        settings = $.extend({}, defaults, url);
    }
    return $.get(settings);
}

// post请求
function reqPost(url, data, headers) {
    var settings;
    if (typeof url === "string") {
        settings = {
            url: url,
            data: data ? data : null,
            headers: headers ? headers : {},
            dataType: 'json',
            success: function (d) {
            }
        }
    } else if (typeof url === "object") {
        var defaults = {
            dataType: 'json'
        };
        settings = $.extend({}, defaults, url);
    }
    return $.post(settings);
}

// 设置cookie
function setCookie(name, value, duration) {
    // var Days = 30;
    if (!duration) {
        duration = 240;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + duration * 60 * 1000);
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
}

// 获取cookie
function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
    else
        return null;
}

// 删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// 处理File对象
function FileToDataURL(file) {
    var reader = new FileReader();
    reader.onload = function () {
        console.log(this.result);
    };
    reader.readAsDataURL(file);
}

// 画表格（通用）
function drawListTable(ele, options, dtapi) {
    if (!options || !options.columns) {
        alert('参数options为必选，必须配置options.columns');
        return false;
    }

    if (typeof ele === 'string') {
        ele = $('#' + ele);
    }

    if (dtapi) {
        dtapi.destroy();
        ele.find('tbody').empty();
    }

    var defaults = {
        // "paging": false,
        // "order": [], // 默认第几个排序
        "ordering": false,
        "scrollX": true,
        "serverSide": true,
        "processing": true,
        "columnDefs": [
            {"orderable": false, "targets": [-1]}// 不参与排序的列，-1表示最后一列
        ],
        "language": {
            "emptyTable": "表格数据为空",
            "info": "总共 _TOTAL_ 条数据，显示 _START_ 到 _END_ 条数据",
            "infoEmpty": "总共 0 条数据，显示 0 到 0 条数据",
            "infoFiltered": "(从 _MAX_ 条数里面过滤)",
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "processing": "正在加载数据...",
            "zeroRecords": "没有检索到数据",
            "paginate": {
                "first": "首页",
                "last": "尾页",
                "next":  "下一页",
                "previous": "上一页"
            }
        }
    };
    var settings = $.extend({}, defaults, options);
    return ele.DataTable(settings);
}

// 画树菜单（通用）
function drawTreeMenu(ele, options, jtapi) {
    if (jtapi) {
        jtapi.destroy(true);
    }
    var settings;
    var defaults = {
        'plugins': ["wholerow"],
        'core': {
            "check_callback": true,
            "themes": {
                "variant": "large",
                "icons": false
            },
            "data": []
        }
    };
    settings = $.extend(true, {}, defaults, options);

    return ele.jstree(settings);
}

// 生成时间戳函数
function timeFormat(flag) {
    if (!flag || flag === 'day') {
        var date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    } else if (flag === 'second') {
        return parseInt(new Date().getTime() / 1000);
    } else if (flag === 'ms') {
        return parseInt(new Date().getTime());
    } else {
        console.log('timeFormat flag 参数错误');
    }
}

// 根据URL激活左侧菜单栏
function changeMenuByUrl(ele) {
    var hashArr = location.hash.split("/");
    if (hashArr[1] !== "" && hashArr[1] !== undefined) {
        ele.find('li a[ui-sref^="' + hashArr[1] + '"]').parent().addClass("active")
            .siblings().removeClass("active")
            .end().closest('li').children('a').click();
    }
}

function dragModal() {
    // 拖拽事件
    $(".etprModal .modal-content").draggable({
        handle: ".modal-header",
        cursor: "move"
    });
}

function getTextByVal(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == value) {
            return arr[i].text;
        }
    }
    console.log('opts配置错误！');
}

function getNameById(arr, id, propName, propId) { // 根据id值返回name值
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][propId] == id) {
            return arr[i][propName];
        }
    }
    console.log('未匹配到name值！');
    return '';
}

function getObjArr(srcArr) { //复制数组
    var newArr = [];
    for (var i = 0; i < srcArr.length; i++) {
        newArr.push(srcArr[i]);
    }
    return newArr;
}

// 处理职位列表数据
function dealPostTree(originArr) {
    var selfFunc = dealPostTree;
    if (!originArr) {
        alert('原对象数组不能为空！');
        return false;
    }
    var targetArr = [];
    for (var i = 0; i < originArr.length; i++) {
        var obj = {
            "a_attr": {
                "href": "javascript:;"
            }
        };
        obj.data = {};
        obj.data.cpId = originArr[i].cpId;
        obj.data.parentCpId = originArr[i].parentCpId;
        obj.data.priority = originArr[i].priority;
        obj.data.postName = originArr[i].postName;
        obj.text = "<span>" + originArr[i].postName + "</span><div class='itemBtnWrap'><button class='etprBtn-jt add_jt' title='添加下级' type='button' ng-click='addJunior($event)'></button><button class='etprBtn-jt edit_jt' type='button' ng-click='editCur($event)'></button><button class='etprBtn-jt del_jt' type='button' ng-click='deleteCur($event)'></button></div>";
        if (originArr[i].companyPostList) {
            obj.children = selfFunc(originArr[i].companyPostList);
        }
        targetArr.push(obj);
    }
    return targetArr;
}

// 处理部门列表数据
function dealDeptTree(originArr) {
    var selfFunc = dealDeptTree;
    if (!originArr) {
        alert('原对象数组不能为空！');
        return false;
    }
    var targetArr = [];
    for (var i = 0; i < originArr.length; i++) {
        var obj = {
            "a_attr": {
                "href": "javascript:;"
            }
        };
        obj.data = {};
        obj.data.cdId = originArr[i].cdId;
        obj.data.parentCdId = originArr[i].parentCdId;
        obj.data.priority = originArr[i].priority;
        obj.data.deptName = originArr[i].deptName;
        obj.text = "<span>" + originArr[i].deptName + "</span><div class='itemBtnWrap'><button class='etprBtn-jt add_jt' title='添加下级' type='button' ng-click='addJunior($event)'></button><button class='etprBtn-jt edit_jt' type='button' ng-click='editCur($event)'></button><button class='etprBtn-jt del_jt' type='button' ng-click='deleteCur($event)'></button></div>";
        if (originArr[i].companyDeptList) {
            obj.children = selfFunc(originArr[i].companyDeptList);
        }
        targetArr.push(obj);
    }
    return targetArr;
}




