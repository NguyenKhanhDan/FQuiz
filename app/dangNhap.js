app.controller("dangNhapCtrl", function ($scope, $rootScope, $http) {
  var check = 0;
  localStorage.setItem("vt", "#dangNhap");
  $scope.login = function () {
    $rootScope.Students.forEach((arr) => {
      if (arr.username == $scope.user && arr.password == $scope.password) {
        $rootScope.Student = arr;
        $rootScope.indexStudent = arr.index;
        check = 1;
        localStorage.setItem("user-name", arr.username);
        localStorage.setItem("user-pass", arr.password);
        return;
      }
    });
    if (check == 0) {
      Swal.fire({
        title: "<h3>Email hoặc mật khẩu không đúng!</h3>",
        icon: "error",
        showConfirmButton: false,
        showCancelButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.href = "#layout";
    }
  };

  $scope.btn_media = function () {
    Swal.fire({
      icon: "error",
      title: "Tình năng chưa được hỗ trợ!",
      text: "FQuiz rất xin lỗi vì sự bất tiện này",
      showConfirmButton: false,
      timer: 3000,
    });
  };
});
