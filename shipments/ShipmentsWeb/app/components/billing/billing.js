angular.module('shipments.billing', [
'auth0'])
.controller('BillingCtrl', function ($scope, auth, $http, $location, store) {
    $scope.billing = [];
    $scope.auth = auth;

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

    function gotobillingX() {
        alert('billing');
        $location.path('/billing');
    }

    $scope.gotobilling = gotobillingX;

    viewBilling();
});