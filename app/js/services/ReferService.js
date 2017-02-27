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

        var batches = [queryDocumentType()];
        angular.forEach([
            'Project', 'ExpenditureDepartment', 'ExpenditurePerson'
        ], function (referName) {
            batches.push(queryRefer(referName));
        });
        $q.all(batches).finally(function () {
            _defer.resolve();
        });

        return o;

        function queryRefer(referName) {
            var defer = $q.defer();

            U9Service.post(APPCONSTANTS['Get' + referName]).then(function (refers) {
                _refer[referName] = refers;
                defer.resolve();
            }, function () {
                defer.resolve();
            });

            return defer.promise;
        }

        function queryDocumentType() {
            var defer = $q.defer();

            U9Service.post(APPCONSTANTS.GetDocumentType, {
                docType: APPCONSTANTS.DocType
            }).then(function (documentTypes) {
                _refer.DocumentType = documentTypes;
                defer.resolve();
            }, function () {
                defer.resolve();
            });

            return defer.promise;
        }
    }
]);
