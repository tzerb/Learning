angular.module('shipments.home', [
'auth0'])
.controller('HomeCtrl', function ($scope, auth, $http, $location, store) {
    $scope.shipments = [];
    $scope.auth = auth;

    function viewShipment() {
        $http({
            url: SERVICE_BASE + '/api/shipments',
            method: 'GET'
        }).then(function (response) {
            $scope.shipments = response.data;
        }, function (response) {
            alert(response.data);
        });
    }

    $scope.viewShipment = viewShipment;

    function viewBilling() {
        $http({
            url: SERVICE_BASE + '/api/billing',
            method: 'GET'
        }).then(function (response) {
            $scope.billing = response.data;
        }, function (response) {
            alert(response.data);
        });
    }

    $scope.viewBilling = viewBilling;

    $scope.logout = function () {
        auth.signout();
        store.remove('profile');
        store.remove('token');
        store.remove('refreshToken');
        $location.path('/login');
    }

    viewShipment();
    viewBilling();
});