(function () {
    'use strict';

    var app = angular.module('controllers', []);
    app.controller('halaCtrl', function ($scope, $state, halaService) {
        $scope.datas = [];
        $scope.button = 'Save';
        showData();
        function showData() {
            halaService.query(function (response) {
                $scope.datas = [].concat(response);
            });
        }
        function clear() {
            showData();
            $scope.button = 'Save';
            $scope.player = '';
            $scope.search = '';
        };
        $scope.refresh = function () {
            clear();
        };
        $scope.save = function () {
            if ($scope.button === 'Save') {
                halaService.save($scope.player,function (response) {
                    $scope.player = response.data;
                    $state.go('playerList');
                    //window.location.href = "http://127.0.0.1:8080/#/playerList";
                    /*alert('Saving Form Success...');
                    clear();*/

                });
            } else {
                halaService.update($scope.player,function (response) {
                    $scope.player = response.data;
                    alert('Update Form Success...');
                    clear();
                });
            }
        };

        $scope.remove = function (data) {
            var r = confirm("Are you sure delete this player ? ");
            if (r === true)
					$scope.player=halaService.get({id:data._id},function (response) {
						response.$delete(function(){
						  alert('Delete Form Success...');
						  clear()
						});
					}) ;

        };
        $scope.click = function (data) {

            alert(data.nombre);
            $scope.player = data;
          //holi ani
        };

    });
})();
