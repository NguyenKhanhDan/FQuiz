app.controller("quenMatKhauCtrl", function($scope, $rootScope, $http) {
    $scope.ma = null;
    $scope.maxn = null;
    var check = 0;
    $scope.kt = null;
    // $scope.username = null;
    var name = null;
    localStorage.setItem("vt", "#quenMatKhau");
    $scope.checkMail = function() {
        $rootScope.Students.forEach(st => {
            if (st.email == $scope.mail) {
                check = 1;
                name = st.username;
            }
        });
        if (check == 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Email không tồn tại!',
                // text: 'Hẹn gặp lại!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 2000
            });
        } else {
            $scope.ma = Math.floor(Math.random() * 1000000);
            $scope.kt = $scope.mail;
            // console.log($scope.ma);
            Email.send({
                //7924ac6c-d9d1-41c7-a1d6-32174f645251
                SecureToken: "aae8f5f7-4b58-4d34-a68c-1fbd2e88a812",
                To: $scope.mail,
                From: "fquizzz@gmail.com",
                Subject: "Mã xác nhận đổi mật khẩu FQuiz",
                Body: "Mã xác nhận của bạn là: " + $scope.ma
            }).then(
                message => Swal.fire({
                    icon: 'success',
                    title: 'Gửi thành công!',
                    // text: 'Hẹn gặp lại!',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1500
                })
            );
        }
    }
    $scope.checkValidCode = function() {
        if ($scope.validCode != $scope.ma) {
            Swal.fire({
                icon: 'warning',
                title: 'Mã xác nhận không hợp lệ!',
                // text: 'Hẹn gặp lại!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 2000
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Mã xác nhận hợp lệ!',
                // text: 'Hẹn gặp lại!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1500
            });
            $scope.maxn = $scope.ma;
            $scope.ma = null;

        }
    }
    $scope.changePass = function() {
        if ($scope.newPass != $scope.reNewPass) {
            Swal.fire({
                icon: 'warning',
                title: 'Xác nhận mật khẩu không khớp!',
                // text: 'Hẹn gặp lại!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 2000
            });
        } else {
            firebase.database().ref("Students/" + name + "/password").set($scope.newPass);
            Swal.fire({
                icon: 'success',
                title: 'Đổi thành công!',
                // text: 'Hẹn gặp lại!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 2000
            });
            window.location.href = "#dangNhap";
        }
    }
});