app.controller("dangKyCtrl", function($scope, $rootScope) {
    var check = 0;
    localStorage.setItem("vt", "#dangKy");
    $scope.register = function() {
        $rootScope.Students.forEach(arr => {
            if (arr.username == $scope.Student.username || arr.email == $scope.Student.email) {
                check = 1;
                return;
            }
        });

        if (check == 1) {
            Swal.fire({
                title: 'Tài khoản đã tồn tại!',
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            });
            return;
        } else {
            if ($scope.Student.password == $scope.repassword) {
                var temp =  document.getElementById("bd").value;
                $scope.Student.birthday = temp;
                // alert( $scope.Student.birthday);
                firebase.database().ref("Students/" + $scope.Student.username).set($scope.Student);
                // $rootScope.Students.push($scope.Student);

                Swal.fire({
                    title: 'Đăng ký thành công!',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1000
                });
                window.location.href = "#layout";
            } else {
                Swal.fire({
                    title: 'Mật khẩu nhập lại không đúng',
                    icon: 'error',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000
                });
            }

        }
    }
})