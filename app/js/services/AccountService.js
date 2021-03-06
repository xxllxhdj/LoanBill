angular.module('LoanBill.services')

.factory('AccountService', ['$q', '$filter', 'U9Service', 'APPCONSTANTS', 'User',
    function($q, $filter, U9Service, APPCONSTANTS, User) {
        var _defer = $q.defer();

        var o = {
            init: _defer.promise
        };

        var _operate; // 0: 新增; 1: 修改
        var _operateDoc;

        var _docs = [];

        o.setOperateDoc = function (operate, doc) {
        	_operate = operate;
        	_operateDoc = doc ? angular.copy(doc) : {};
        };
        o.getOperateDoc = function () {
        	return {
        		operate: _operate,
        		doc: _operateDoc
        	};
        };
        o.saveDoc = function (doc) {
            var defer = $q.defer();

            doc.LoanUser = doc.LoanUser.ID;
            doc.Department = doc.Department.ID;
            if (doc.Project) {
                doc.Project = doc.Project.ID;
            }
            doc.LoanDate = toJavaTime(doc.LoanDate);

            var operateName = (_operate === 0) ? APPCONSTANTS.CreateLoanBill : APPCONSTANTS.UpdateLoanBill;

            U9Service.post(operateName, { loanBillInfo: doc }).then(function () {
                return getLoanBillList();
            }).then(function () {
                defer.resolve();
            }).catch(function (err) {
                defer.reject(err || {});
            });

            return defer.promise;
        };
        o.deleteDoc = function (docId) {
            var defer = $q.defer();

            U9Service.post(APPCONSTANTS.DeleteLoanBill, { iD: docId }).then(function (success) {
                if (success) {
                    return getLoanBillList();
                } else {
                    return $q.reject();
                }
            }).then(function () {
                defer.resolve();
            }).catch(function (err) {
                defer.reject(err || {});
            });

            return defer.promise;
        };
        o.submitDoc = function(docId) {
            var defer = $q.defer();

            U9Service.post(APPCONSTANTS.SubmitLoanBill, { iD: docId }).then(function(success) {
                if (success) {
                    return getLoanBillList();
                } else {
                    return $q.reject();
                }
            }).then(function() {
                defer.resolve();
            }).catch(function(err) {
                defer.reject(err || {});
            });

            return defer.promise;
        };
        o.getAccounts = function () {
        	return _docs;
        };

        User.init.finally(function () {
            getLoanBillList().finally(function () {
                _defer.resolve();
            });
        });

        return o;

        function getLoanBillList() {
            var defer = $q.defer();

            U9Service.post(APPCONSTANTS.GetLoanBillList, {
                userID: User.get('UserID') || -1
            }).then(function (docs) {
                angular.forEach(docs, function (doc) {
                    if (doc.DocumentType) {
                        doc.DocumentType = doc.DocumentType.ID;
                    }
                    doc.LoanDate = toJsTime(doc.LoanDate);
                    delete doc.__type;
                });
                _docs = $filter('orderBy')(docs, ['ReimburseDate', 'DocNo'], true);;
                defer.resolve();
            }, function () {
                defer.resolve();
            });

            return defer.promise;
        }

        function toJsTime(date) {
            return new Date(parseInt(date.replace(/\/Date\((\d+[\+\-]\d+)\)\//g, '$1')));
        }

        function toJavaTime(date) {
            var timeZone = date.getTimezoneOffset() / 60,
                tz = '';
            if (timeZone < 0) {
                tz += '+';
                timeZone = -1 * timeZone;
            } else {
                tz += '-';
            }
            if (timeZone < 10) {
                tz += '0';
            }
            tz += timeZone;
            return '\/Date(' + date.valueOf() + tz + '00)\/';
        }
    }
]);
