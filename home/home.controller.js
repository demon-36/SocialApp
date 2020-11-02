angular
    .module('app')
    .controller('HomeController', HomeController);

HomeController.$inject = ['UserService', '$rootScope'];

function HomeController(UserService, $rootScope){
    var vm=this;

    vm.user=null;
    vm.allPosts = [];
    initController();

    function initController(){
        loadCurrentUser();
        loadAllPosts();
    }

    function loadCurrentUser(){
        UserService.GetByUsername($rootScope.globals.currentUser.username)
            .then(function(user){
                vm.user=user;
            });
    }

    function loadAllPosts(){
        UserService.getAllPosts()
        .then(res => {
            vm.allPosts = res;
        });
    }

    vm.newPost = function (){
        var data = {
            username: vm.user.username,
            postdata: vm.postdata,
            likes: ""
        };
        UserService.CreateNewPost(data)
            .then(function(res){
                if(res.success){
                    vm.postdata="";
                    console.log("post added successfully");
                }
                else console.log("some error occured");
            }).then(() => {
                vm.allPosts.push(data);
            })
    }

    vm.likePost = function (postdata, username){
        var data = {
            curruser: vm.user.username,
            username: username,
            postdata: postdata
        };
        console.log(data);
        //UserService.likePost(data)
        //    .then(function(res){
        //        if(res.success){
        //            console.log(data.curruser + "liked post");
        //        }
        //        else console.log("some error occured");
        //    })
    }
}