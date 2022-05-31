$(function () {
  const form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    setPwd: (val) => {
      if (val === $(".layui-form  [name=oldPwd]").val())
        return "新旧密码不能一致";
    },
    rePwd: (value) => {
      if (value !== $(".layui-form [name=newPwd]").val())
        return "确认密码与新密码不一致";
    },
  });
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取信息失败");
        // localStorage.removeItem("token");
        // window.parent.location.href = "/login.html";
      },
    });
  });
});
