app.controller("capNhatTKCtrl", function($scope, $rootScope) {
    localStorage.setItem("vt", "#capNhatTK");
    $scope.update = function() {
        // $rootScope.Students[$rootScope.indexStudent] = angular.copy($rootScope.Student);
        firebase.database().ref("Students/" + $scope.Student.username).set($rootScope.Student);
        Swal.fire({
            icon: 'success',
            title: 'Cập nhật thành công!',
            timer: 1500
        });

    }
})