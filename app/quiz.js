app.controller("quizCtrl", function($scope, $rootScope, $routeParams, $http, $interval) {
    $scope.Questions = null;
    $scope.expression = [];
    $scope.indexQuestions = 0;
    $rootScope.timer = 900; //giây
    $scope.mark = 0;
    var mark = 0;
    var checkEndTime = 0;
    localStorage.setItem("vt", "#quiz");
    $scope.checkSubmit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //mảng lưu câu trả lời đúng
    $scope.start = function() {
        $http.get('db/Quizs/' + $routeParams.id + '.js').then(function(reponse) {
            $scope.questions = reponse.data;
            // $scope.Questions
            // LoadAnswer(0);
            ranDomAns();
        });

        // Lấy tên môn học
        $rootScope.Subjects.forEach(arr => {
            if (arr.Id == $routeParams.id) {
                $scope.subject = angular.copy(arr);
                return;
            }
        });
        // Load câu hỏi
        $scope.moveQuestion = function(x) {
            $scope.indexQuestions = x;
            LoadAnswer($scope.indexQuestions);
        };
        // Load câu trả lời
        function LoadAnswer(x) {
            $scope.answers = angular.copy($scope.Questions[x].Answers);
        };
        // Next - prev câu trả lời
        $scope.moveQuestion = function(x) {
            $scope.indexQuestions = x;
            LoadAnswer($scope.indexQuestions);
        };
        // Kiểm tra trả lời đúng-sai
        $scope.checkAnswer = function() {
            if ($scope.Questions[$scope.indexQuestions].AnswerId == $scope.expression[$scope.indexQuestions].answer) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bạn đã trả lời đúng!',
                });
                $scope.mark++;
                mark++;
                $rootScope.Student.marks = angular.copy($scope.mark);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Bạn đã trả lời sai!',
                });
            }
            //Check câu trả lời đúng khi submit
            $scope.answers.forEach(as => {
                if ($scope.Questions[$scope.indexQuestions].AnswerId == as.Id) {
                    $scope.checkSubmit[$scope.indexQuestions] = angular.copy(as.Id);
                }
            });
        }

        // Random câu hỏi
        function ranDomAns() {
            var dem = 0;
            $scope.Questions = [];
            for (var i = 0; i < 10; i++) {
                var ran = Math.floor(Math.random() * $scope.questions.length);
                $scope.Questions[dem] = $scope.questions[ran];
                $scope.questions.splice(ran, 1);
                dem++;
            }
            LoadAnswer(0);
        }

        //Kết thúc bài quiz
        $scope.finish = function() {
            Swal.fire({
                title: 'Bạn có chắc muốn kết thúc?',
                // text: "Bạn thật sự muốn kết thúc bài thi!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'blue',
                cancelButtonColor: 'red',
                confirmButtonText: 'Có',
                cancelButtonText: 'Không'
            }).then((result) => {
                if (result.value) {
                    checkEndTime = 1;
                    $rootScope.timer = 5;
                    Swal.fire({
                        title: 'Kết thúc bài thi',
                        text: 'Tổng số điểm của bạn: ' + mark,
                        icon: 'success',
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 5000
                    });

                }
            })

        }

        // Thời gian
        var stop = $interval(function() {
            if ($scope.timer > 0) {
                $rootScope.timer -= 1;
            } else if ($rootScope.timer == 0) {
                $rootScope.Students[$rootScope.indexStudent] = angular.copy($rootScope.Student);
                // window.location.href = "#!viewtest/" + $scope.subject.Id;
                // alert("Hết thời gian!!!");
                if (checkEndTime == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hết thời gian!!!',
                        text: 'Tổng số điểm của bạn: ' + mark,
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 5000
                    });
                }
                window.location.href = "#danhSachMonhoc";
                $interval.cancel(stop);
            }
        }, 1000);
    };
});