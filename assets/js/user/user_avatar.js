$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);
  $("#btn").click(() => {
    $("#iptfile").click();
  });
  $("#iptfile").change((e) => {
    const fileLength = e.target.files.length;
    if (fileLength === 0) {
      return;
    }
    let fileArr = e.target.files[0];
    // console.log(fileArr);
    let fileUrl = URL.createObjectURL(fileArr);
    $image.cropper("destroy").attr("src", fileUrl).cropper(options);
  });
  $("#btnUpload").click(() => {
    const dataUrl = $image
      .cropper("getCroppedCanvas", {
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataUrl,
      },
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg("上传失败");
        }
        layer.msg("上传成功");
        window.parent.getUserInfo();
      },
    });
  });
});
