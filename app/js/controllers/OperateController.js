angular.module('LoanBill.controllers')

.controller('OperateController', ['$scope', '$ionicHistory', 'AccountService', 'LgSelect', 'TextInput', 'ReferService', 'User',
    function($scope, $ionicHistory, AccountService, LgSelect, TextInput, ReferService, User) {
        $scope.data = {};

        $scope.data.DocumentType = ReferService.get('DocumentType');

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

        $scope.numPad = {
            theme: 'ios',
            lang: 'zh',
            decimalSeparator: '.',
            thousandsSeparator: '',
            display: 'bottom',
            min: 0.01,
            max: 99999999999.99,
            scale: 2,
            preset: 'decimal'
        };

        angular.forEach([
            { key: 'LoanUser', refer: 'ExpenditurePerson', name: '借款人' },
            { key: 'Department', refer: 'ExpenditureDepartment', name: '借款部门' },
            { key: 'Project', refer: 'Project', name: '项目' }
        ], function (fn) {
            $scope['select' + fn.key] = function (tag) {
                LgSelect.show({
                    title: fn.name,
                    list: ReferService.get(fn.refer),
                    displayField: 'Name'
                }).then(function (item) {
                    tag[fn.key] = item;
                });
            };
        });

        $scope.inputUse = function (tag) {
            TextInput.show({
                title: '用途',
                text: tag.Remark
            }).then(function (text) {
                tag.Remark = text;
            });
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
            $scope.data.doc.LoanUser = {
                ID: User.get('UserID'),
                Name: User.get('UserName')
            };
            $scope.data.doc.Department = {
                ID: User.get('DeptID'),
                Name: User.get('DeptName')
            };
            $scope.data.doc.LoanDate = new Date();
            if (angular.isArray($scope.data.DocumentType) && $scope.data.DocumentType.length > 0) {
                $scope.data.doc.DocumentType = $scope.data.DocumentType[0].ID;
            }
        }
    }
]);
