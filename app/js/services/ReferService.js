angular.module('LoanBill.services')

.factory('ReferService', ['$q', '$timeout', function($q, $timeout) {
    var _defer = $q.defer(),
        _refer = {};

    var o = {
        init: _defer.promise
    };

    o.get = function (key) {
        return _refer[key] ? angular.copy(_refer[key]) : [];
    };

    $q.all([
        queryLoanBillTypes(), 
        queryProjects()
    ]).finally(function () {
        _defer.resolve();
    });

    return o;

    function queryLoanBillTypes() {
        var defer = $q.defer();

        $timeout(function () {
            _refer.LoanBillType = [
                { Code: 'Cash', Name: '现金借款单' },
                { Code: 'Bank', Name: '银行借款单' }
            ];
            defer.resolve();
        }, 100);

        return defer.promise;
    }
    function queryProjects() {
        var defer = $q.defer();

        $timeout(function () {
            var t = [];
            for (var i = 10; i <= 50; i++) {
                t.push({ Code: 'ExpPj' + i, Name: '项目' + i });
            }
            _refer.Project = t;
            defer.resolve();
        }, 100);

        return defer.promise;
    }
}]);