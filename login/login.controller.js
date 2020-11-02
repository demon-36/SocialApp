angular
    .module('app')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

function LoginController($location, AuthenticationService, FlashService){
    var vm = this;
    vm.login = login;
    
    (function initController(){
        AuthenticationService.ClearCredentials();
    })();

    function login(){
        vm.dataLoading = true;
        AuthenticationService.Login(vm.username, vm.password, function (res){
            if(res.success){
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $location.path('/');
            }
            else{
                FlashService.Error(res.message);
                vm.dataLoading = false;
            }
        });
    };
}