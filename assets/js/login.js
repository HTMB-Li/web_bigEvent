$(function () {
    //点击 "去注册账号的"的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击 "去登录"的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    //从 Layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    //通过 form.verify() 函数来自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
         pwd : [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要哦拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则ruturn一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault()
        // 2.发起Ajax的post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser', data, function (res) {
            // console.log(res.status);
            if (res.status !== 0) {
                return layer.msg('用户名被占用，请更换其他用户名！', {icon: 5}); 
            }
            layer.msg('注册成功，请登录！', { icon: 6 });
            //模拟人的点击行为
            $('#link_login').click()
        })

    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res.status)
                if (res.status !== 0) {
                    return layer.msg('登录失败！',{icon: 5})
                }
                layer.msg('登录成功！', { icon: 6 })
                //将登陆成功得到的 token 字符串 ，保存到localStorage 中
                localStorage.setItem('token',res.token)
                console.log(res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
    

})

