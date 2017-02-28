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
    $scope.submitDoc = function (doc) {
        u9.showLoading();
        AccountService.submitDoc(doc.ID).then(function () {
            init();
            u9.hideLoading();
        }, function (err) {
            u9.hideLoading();
            u9.alert(err.Message || '提交失败', '提交借款单');
        });
    };
    $scope.deleteDoc = function (doc) {
        u9.showLoading();
        AccountService.deleteDoc(doc.ID).then(function () {
            init();
            u9.hideLoading();
        }, function (err) {
            u9.hideLoading();
            u9.alert(err.Message || '删除失败', '删除借款单');
        });
    };

    $scope.$on('$ionicView.afterEnter', init);

    function init () {
        $scope.data.docs = AccountService.getAccounts();
    }
}]);
