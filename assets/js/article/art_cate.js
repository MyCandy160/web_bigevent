$(function () {
  const initFormData = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        const htmlStr = template("tpl-table", res);
        $("tbody").empty().html(htmlStr);
      },
    });
  };
  initFormData();
  let indexAdd = null;
  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg("添加失败！");
        }
        layer.msg("添加成功！");
        initFormData();
        layer.close(indexAdd);
      },
    });
  });

  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function (e) {
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    const id = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/my/article/cates/" + id,
      success: (res) => {
        console.log(res);
        layui.form.val("form-edit", res.data);
      },
    });
  });
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("修改失败");
        layer.msg("修改成功");
        layer.close(indexEdit);
        initFormData();
      },
    });
  });
  $("tbody").on("click", ".btn-del", function (e) {
    const id = $(this).attr("data-id");
    layer.confirm(
      "确认删除吗？",
      { icon: 3, title: "删除数据" },
      function (index) {
        $.ajax({
          type: "GET",
          url: "/my/article/deletecate/" + id,
          success: (res) => {
            if (res.status !== 0) {
              return layer.msg("更新分类数据失败！");
            }
            layer.msg("更新分类数据成功！");
            layer.close(index);
            initFormData();
          },
        });
      }
    );
  });
});
