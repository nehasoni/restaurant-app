var App = angular
    .module('app', [
        'ngRoute','ngMap'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'components/restaurant/searchRestaurant.html',
                controller: 'searchRestaurantController'

            })
            .otherwise({
                redirectTo: '/'
            });
    });
