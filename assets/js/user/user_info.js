$(function () {
  const form = layui.form;
  form.verify({
    nickname: (value) => {
      if (value.length > 6) {
        return "昵称长度必须在 1 ~ 6 个字符之间！";
      }
    },
  });
  const itinUser = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        // console.log(res);
        const { data, status, message } = res;
        if (status !== 0) return layer.msg("获取信息失败");
        layer.msg("成功");
        form.val("formUserInfo", data);
      },
    });
  };
  $("#resetBtn").click((e) => {
    e.preventDefault();
    itinUser();
  });
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(".layui-form").serialize(),
      success: (res) => {
        const { data, status, message } = res;
        if (status !== 0) return layer.msg("获取信息失败");
        layer.msg("成功");

        window.parent.getUserInfo();
      },
    });
  });
  itinUser();
});
