$.ajaxPrefilter((option) => {
  option.url = `http://www.liulongbin.top:3007` + option.url;

  if (option.url.includes("/my/")) {
    option.headers = { Authorization: localStorage.getItem("token") };
  }
  option.complete = (res) => {
    // console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      location.href = "/login.html";
    }
  };
});
