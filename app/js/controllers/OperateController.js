angular.module('LoanBill.controllers')

.controller('OperateController', ['$scope', '$ionicHistory', 'AccountService', 'ReferService', 'User',
    function($scope, $ionicHistory, AccountService, ReferService, User) {
        $scope.data = {};

        angular.forEach([
            'DocumentType', 'Project', 'ExpenditureDepartment', 'ExpenditurePerson'
        ], function (referName) {
            $scope.data[referName] = ReferService.get(referName);
        });

        var now = new Date(),
            minDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate()),
            maxDate = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());
        $scope.datePick = {
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            min: minDate,
            max: maxDate
        };

        $scope.data.selectSetting = {
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            dataValue: 'ID',
            dataText: 'Name'
        };

        $scope.saveAccount = function () {
            if (!$scope.data.doc.Money) {
                u9.alert('请输入借款金额', '必填项');
                return;
            }
            u9.showLoading();
            var tmp = angular.copy($scope.data.doc);
            if (tmp.Project === 0) {
                delete tmp.Project;
            }
            AccountService.saveDoc(tmp).then(function () {
                $ionicHistory.goBack();
            }, function (err) {
                u9.alert(err.Message || '处理借款单失败', '操作失败');
            }).finally(function () {
                u9.hideLoading();
            });
        };

        init();

        function init() {
            var operateInfo = AccountService.getOperateDoc();
            $scope.data.title = operateInfo.operate === 0 ? '新增' : operateInfo.doc.DocNo;
            $scope.data.doc = operateInfo.doc;

            if (operateInfo.operate !== 0) {
                return;
            }
            $scope.data.doc.LoanUser = User.get('UserID');
            $scope.data.doc.Department = User.get('DeptID');
            $scope.data.doc.LoanDate = new Date();
            if (angular.isArray($scope.data.DocumentType) && $scope.data.DocumentType.length > 0) {
                $scope.data.doc.DocumentType = $scope.data.DocumentType[0].ID;
            }
            if (angular.isArray($scope.data.Project) && $scope.data.Project.length > 0) {
                $scope.data.doc.Project = $scope.data.Project[0].ID;
            }
        }
    }
]);
