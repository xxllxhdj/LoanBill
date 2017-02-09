angular.module('LoanBill.services')

.factory('AccountService', ['$q', 'U9Service', 'APPCONSTANTS', function($q, U9Service, APPCONSTANTS) {
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

        doc.LoanDate = toJavaTime(doc.LoanDate);

        var operateName = (_operate === 0) ? APPCONSTANTS.CreateLoanBill : APPCONSTANTS.UpdateLoanBill;

        U9Service.post(operateName, { loanBillInfo: doc }).then(function () {
            return getLoanBillList();
        }).then(function () {
            defer.resolve();
        }).catch(function (err) {
            defer.reject(err);
        });

        return defer.promise;
    };
    o.deleteDoc = function (docId) {
        var defer = $q.defer();

        U9Service.post(APPCONSTANTS.DeleteLoanBill, { ID: docId }).then(function () {
            return getLoanBillList();
        }).then(function () {
            defer.resolve();
        }).catch(function (err) {
            defer.reject(err);
        });

        return defer.promise;
    };
    o.getAccounts = function () {
    	return _docs;
    };

    getLoanBillList().finally(function () {
        _defer.resolve();
    });

    return o;

    function getLoanBillList() {
        var defer = $q.defer();

        U9Service.post(APPCONSTANTS.GetLoanBillList, {
            UserCode: u9.getLoginData().UserCode
        }).then(function (docs) {
            angular.forEach(docs, function (doc) {
                doc.LoanDate = toJsTime(doc.LoanDate);
            });
            _docs = docs;
            defer.resolve();
        }, function () {
            defer.resolve();
        });

        return defer.promise;
    }

    function toJsTime(date) {
        return new Date(parseInt(date.replace(/\/Date\((\d+\+\d+)\)\//g, '$1')));
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
}]);
