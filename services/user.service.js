(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.CreateNewPost = CreateNewPost;
        service.getAllPosts = getAllPosts;
        //service.likePost = likePost;

        return service;

        function GetByUsername(username) {
            return $http.get('http://127.0.0.1:3000/user/login', {
                params: {uname: username}
            }).then(handleSuccessGet, handleError('Error getting user by username'));
        }

        function Create(user) {
            var x=JSON.stringify(user);
            return $http.post('http://127.0.0.1:3000/user/new', x).then(handleSuccess, handleError('Error creating user'));
        }

        function CreateNewPost(postData){
            return $http.post('http://127.0.0.1:3000/new/post', postData).then(handleSuccess, handleError('Error adding post'));
        }

        function getAllPosts(){
            return $http.get('http://127.0.0.1:3000/allposts').then(handleSuccessGet, handleError('Error getting posts'));
        }

        //function likePost(data){
        //    return $http.post('http://127.0.0.1:3000/like/post', data).then(handleSuccess, handleError('Error adding post'));
        //}

        function handleSuccess(res) {
            return { success: true };
        }

        function handleSuccessGet(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();