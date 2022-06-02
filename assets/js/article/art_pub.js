$(function () {
  // 初始化富文本编辑器
  initEditor();
  const form = layui.form;
  const initCate = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        if (res.status !== 0) return layer.msg("失败");
        layer.msg("成功");
        const htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        form.render("select");
      },
    });
  };
  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  $("#btnChooseImage").on("click", function () {
    $("#coverFile").click();
  });
  $("#coverFile").change((e) => {
    const fileArr = e.target.files;
    if (fileArr.length <= 0) return;
    const imgUrl = URL.createObjectURL(fileArr[0]);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  let art_status = "已发布";
  $("#btn_save").click(() => {
    art_status = "草稿";
  });
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    let fd = new FormData($(this)[0]);
    fd.append("state", art_status);
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append("cover_img", blob);
        // 6. 发起 ajax 数据请求
        getAjax(fd);
      });
  });
  const getAjax = (data) => {
    $.ajax({
      type: "POST",
      url: "/my/article/add",
      data,
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg("发布文章失败！");
        }
        layer.msg("发布文章成功！");
        // 发布文章成功后，跳转到文章列表页面
        location.href = "/article/art_list.html";
        window.parent.chengeClass();
      },
    });
  };
  initCate();
});
