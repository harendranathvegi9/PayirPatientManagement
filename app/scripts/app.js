angular.module('PayirPatientManagement', ['ngAnimate', 'ngRoute', 'ngMaterial', 'ngMessages'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/patient/new', {
            templateUrl: 'views/addpatient.html',
            controller: 'AddPatientCtrl'
        }).when('/patient/:patientId/edit', {
            templateUrl: 'views/addpatient.html',
            controller: 'AddPatientCtrl'
        }).when('/patient/:patientId', {
            templateUrl: 'views/viewpatient.html',
            controller: 'ViewPatientCtrl'
        }).when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        }).when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl'
        }).otherwise({
            redirectTo: '/dashboard'
        });
    })
    .run(function ($rootScope, $location, $mdToast, $mdDialog, StorageService, GoogleService) {
        'use strict';
        $rootScope.goTo = function (path) {
            $location.path(path);
        };

        $rootScope.showSimpleToast = function (text, timeout) {
            $mdToast.show(
                $mdToast.simple()
                .content(text || 'Missing toast text')
                .position('bottom right')
                .hideDelay(timeout || 3000)
            );
        };

        $rootScope.showConfirm = function (options) {
            var confirm = $mdDialog.confirm()
                .title(options.title || 'Missing Title!')
                .content(options.content || 'Missing content!')
                .ariaLabel(options.title || 'Unknown aria')
                .ok(options.ok || 'Missing OK Text');

            if (options.cancel) {
                confirm.cancel(options.cancel);
            }

            return $mdDialog.show(confirm);
        };

        if (navigator.onLine) {

            StorageService.getPendingAlerts().then(function (resArr) {
                if (resArr) {
                    resArr.forEach(function (obj) {
                        GoogleService.createEvent(obj.patient, obj.visit);
                    });
                }
            });
        }

    });