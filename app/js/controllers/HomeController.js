angular.module('LoanBill.controllers')

.controller('HomeController', ['$scope', '$state', 'AccountService', function($scope, $state, AccountService) {
    $scope.data = {
        docs: []
    };

    $scope.addDoc = function () {
        AccountService.setOperateDoc(0, {});
        $state.go('operate');
    };
    $scope.editDoc = function (doc) {
        AccountService.setOperateDoc(1, doc);
        $state.go('operate');
    };
    $scope.deleteDoc = function (doc) {
        AccountService.deleteDoc(doc.ID).then(function () {
            init();
        }, function () {
            u9.alert('删除失败', '删除借款单');
        });
    };

    $scope.$on('$ionicView.afterEnter', init);

    function init () {
        $scope.data.docs = AccountService.getAccounts();
    }
}]);
