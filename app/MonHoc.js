app.controller("DSMonHocCtrl", function($scope, $rootScope, $http) {
    $scope.subjects = $rootScope.Subjects;
    localStorage.setItem("vt", "#danhSachMonHoc");
    // Tìm kiếm môn học
    $scope.Search = function() {
        $rootScope.begin = 0;
        if ($scope.search == null) {
            $scope.subjects = $rootScope.Subjects;
        } else {
            $scope.SubjectTemp = [];
            var dem = 0;
            for (var i = 0; i < $rootScope.Subjects.length; i++) {
                if ((($rootScope.Subjects[i].Name).toLowerCase()).includes(($scope.search).toLowerCase())) {
                    $scope.SubjectTemp[dem] = $rootScope.Subjects[i];
                    dem++;
                }

            }
            $scope.subjects = $scope.SubjectTemp;
        }
    }
    $rootScope.begin = 0;
    $scope.pageCount = Math.ceil($scope.subjects.length / 6);
    $scope.count = 1;

    $scope.first = function() {
        $rootScope.begin = 0;
        $scope.count = 1;
    }

    $scope.prev = function() {
        if ($rootScope.begin > 0) {
            $rootScope.begin -= 6;
            $scope.count = $scope.count - 1;
        }
    }

    $scope.next = function() {

        if ($rootScope.begin < ($scope.pageCount - 1) * 6) {
            $rootScope.begin += 6;
            $scope.count = $scope.count + 1;
        }
    }

    $scope.last = function() {
        $rootScope.begin = ($scope.pageCount - 1) * 6;
        $scope.count = $scope.pageCount;
    }

});