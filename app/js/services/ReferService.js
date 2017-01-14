angular.module('LoanBill.services')

.factory('ReferService', ['$q', 'U9Service', 'APPCONSTANTS', 
    function($q, U9Service, APPCONSTANTS) {
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

            U9Service.post(APPCONSTANTS.GetDocumentType, {
                DocType: APPCONSTANTS.DocType
            }).then(function (loanBillTypes) {
                _refer.LoanBillType = loanBillTypes;
                defer.resolve();
            }, function () {
                defer.resolve();
            });

            return defer.promise;
        }
        function queryProjects() {
            var defer = $q.defer();

            U9Service.post(APPCONSTANTS.GetProject).then(function (projects) {
                _refer.Project = projects;
                defer.resolve();
            }, function () {
                defer.resolve();
            });

            return defer.promise;
        }
    }
]);