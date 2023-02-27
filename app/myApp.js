var app = angular.module("myApp", ["ngRoute"]);
app.run(function($rootScope, $http) {
    let index = localStorage.getItem("vt");
    if(index){
        window.location.href=index;
    }
    $rootScope.Student = null;
    $rootScope.timer = 0;
    $rootScope.Students = [];
    $http.get('db/Subjects.js').then(function(reponse) {
        $rootScope.Subjects = reponse.data;
        // alert($rootScope.Subjects);

    })
    // $http.get('db/Students.js').then(function(response) {
    //     $rootScope.Students = response.data;
    //     autoLogin();
    // });
    $rootScope.logout = function() {

        Swal.fire({
            title: 'Bạn muốn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Đã đăng xuất!',
                    text: 'Hẹn gặp lại!',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 500
                });
                $rootScope.Student = null;
                $rootScope.indexStudent = -1;
                window.location.href = "#layout";
                $rootScope.hide = 0;

                localStorage.setItem("user-name", "none");
                localStorage.setItem("user-pass", "none");
            }
        })
    }

    // Lưu đăng nhập khi load lại web
    function autoLogin() {
        //username password
        let userName = localStorage.getItem("user-name");
        let userPass = localStorage.getItem("user-pass");
        // alert(userName);
        if (userName != "none" && userPass != "none") {
            $rootScope.Students.forEach(arr => {
                if (arr.username == userName && arr.password == userPass) {
                    $rootScope.Student = arr;
                }
            })
        }
    }

    // Firebase
    loadingStudent();
    function loadingStudent() {
        var dbRef = firebase.database().ref().child("Students");
        dbRef.on(
          "value",
          (snapshot) => {
            var i = 0;
            snapshot.forEach(function (childSnapshot) {
              var key = childSnapshot.key;
              $rootScope.Students[i] = snapshot.child(key).val();
              i++;
            });
            autoLogin();
            // Load lại trang sau khi chạy
            let pointer = localStorage.getItem("vt");
          if(pointer == "#dangNhap"){
            pointer = "#index";
          }
          if(pointer==null){
            pointer = "#login";
          }
          if (pointer != "#dangNhap") {
            window.location.href = pointer;
          }
          },
          (errorObject) => {
            console.log("The read failed: " + errorObject.name);
          }
        );
      }
});
app.config(function($routeProvider) {

    $routeProvider
        .when("/layout", { templateUrl: "html/layout.html", controller: "layoutCtrl" })
        .when("/dangKy", { templateUrl: "html/dangKy.html", controller: "dangKyCtrl" })
        .when("/dangNhap", { templateUrl: "html/dangNhap.html", controller: "dangNhapCtrl" })
        .when("/doiMatKhau", { templateUrl: "html/doiMatKhau.html", controller: "doiMKCtrl" })
        .when("/gioiThieu", { templateUrl: "html/gioiThieu.html" })
        .when("/lienHe", { templateUrl: "html/lienHe.html" })
        // .when("/lienHe", { templateUrl: "html/lienHe.html" })
        .when("/quenMatKhau", { templateUrl: "html/quenMatKhau.html", controller: "quenMatKhauCtrl" })
        .when("/quiz/:id", { templateUrl: "html/quiz.html", controller: "quizCtrl" })
        .when("/capNhatTK", { templateUrl: "html/capNhatTK.html", controller: "capNhatTKCtrl" })
        .when("/danhSachMonhoc", { templateUrl: "html/danhSachMon.html", controller: "DSMonHocCtrl" })
        .otherwise({
            redirectTo: "/layout"
        });
})