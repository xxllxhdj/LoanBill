angular.module('LoanBill.controllers')

.controller('OperateController', ['$scope', '$ionicHistory', 'AccountService', 'ReferService',
    function($scope, $ionicHistory, AccountService, ReferService) {
        $scope.data = {};

        $scope.data.LoanBillTypes = ReferService.get('LoanBillType');
        $scope.data.Projects = ReferService.get('Project');

        $scope.data.selectSetting = {
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            dataValue: 'Code',
            dataText: 'Name'
        };

        $scope.saveAccount = function () {
            if (!$scope.data.doc.Money) {
                u9.alert('请输入借款金额', '必填项');
                return;
            }
            u9.showLoading();
            AccountService.saveDoc($scope.data.doc).then(function () {
                $ionicHistory.goBack();
            }).finally(function () {
                var operateInfo = AccountService.getOperateDoc(),
                    operateName = operateInfo.operate === 0 ? '新增' : '编辑';
                u9.alert(operateName + '借款单失败', operateName);
                u9.hideLoading();
            });
        };

        init();

        function init() {
            var operateInfo = AccountService.getOperateDoc();
            $scope.data.title = operateInfo.operate === 0 ? '新增' : operateInfo.doc.DocNo;
            $scope.data.doc = operateInfo.doc;
        }
    }
]);
