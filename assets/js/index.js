function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: (res) => {
      // console.log(res);
      const { data, status, message } = res;
      if (status !== 0) return layer.msg("用户登录失败");
      layer.msg("成功登录");
      renderAvatar(data);
    },
  });
}
const renderAvatar = (uers) => {
  // console.log(uers);
  let uname = uers.nickname || uers.username;
  $("#welcome").html(`欢迎${uname}`);
  if (uers.user_pic !== null) {
    $(".layui-nav-img").attr("src", uers.user_pic);
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    $(".text-avatar").html(uname[0].toUpperCase());
  }
};
$("#deleteBtnOut").click(() => {
  layer.confirm("真的要退出吗？", { icon: 3, title: "提示" }, (index) => {
    localStorage.removeItem("token");
    location.href = "/login.html";
    // layer.close(index);
  });
});
getUserInfo();
