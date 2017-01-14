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

        var operateName = (_operate === 0) ? APPCONSTANTS.CreateLoanBill : APPCONSTANTS.UpdateLoanBill;

        U9Service.post(operateName, { LoanBillInfo: doc }).then(function () {
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
            _docs = docs;
            defer.resolve();
        }, function () {
            defer.resolve();
        });

        return defer.promise;
    }
}]);