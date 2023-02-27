app.controller("doiMKCtrl", function($scope, $rootScope) {
    localStorage.setItem("vt", "#doiMatKhau");
    $scope.changePass = function() {
        if ($rootScope.Student.password != $scope.OldPassword) {
            Swal.fire({
                title: 'Mật khẩu cũ không đúng!',
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            });
        } else if ($rootScope.Student.password == $scope.newPassword) {
            Swal.fire({
                title: 'Mật khẩu mới trùng với mật khẩu cũ!',
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            });
        } else {
            if ($scope.newPassword != $scope.reNewPassword) {
                Swal.fire({
                    title: 'Mật khẩu nhập lại không đúng',
                    icon: 'error',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000
                });
            } else {
                $rootScope.Student.password = angular.copy($scope.newPassword);
                // $rootScope.Students[$rootScope.indexStudent] = angular.copy($rootScope.Student);
                firebase.database().ref("Students/" + $rootScope.Student.username).set($rootScope.Student);

                Swal.fire({
                    icon: 'success',
                    title: 'Đổi mật khẩu thành công!',
                    timer: 1500
                });
            }
        }

    }
});