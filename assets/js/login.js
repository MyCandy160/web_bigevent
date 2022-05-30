$(function () {
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 引入layui的form
  const form = layui.form;
  const layer = layui.layer;
  // 自定义验证规则
  form.verify({
    // 校验密码
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    reqpwd: (value) => {
      const pwd = $("#form_reg [name=password]").val();
      if (pwd !== value) return "两次密码不一致";
    },
  });

  // const baseUrl = `http://www.liulongbin.top:3007`;
  $("#form_reg").submit((e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: `/api/reguser`,
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: (res) => {
        const { status, message } = res;
        if (status !== 0) return layer.msg(message);
        layer.msg(message);
        $("#form_reg [name=username]").val("");
        $("#form_reg [name=password]").val("");
        $("#form_reg [name=repassword]").val("");
        $("#link_login").click();
      },
    });
  });
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: (res) => {
        console.log(res);
        const { status, message, token } = res;
        if (status !== 0) return layer.msg(message);
        layer.msg(message);
        localStorage.setItem("token", token);
        location.href = "/index.html";
      },
    });
  });
});
