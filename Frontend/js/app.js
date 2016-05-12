(function () {
    'use strict';
    var app = angular.module('app', [
        'angularUtils.directives.dirPagination',
        'services',
        'controllers',
        'ui.router',
		'ngResource'
    ]);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/playerList');
        $stateProvider
        .state('player', {
            url: '/player',
            templateUrl: 'partials/player.html'
            //controller: 'halaCtrl'
        })
        .state('playerList', {
            url: '/playerList',
            templateUrl: 'partials/playerList.html'
            //controller: 'halaCtrl'
        });
    });
})();
