
angular.module('LoanBill.utility')

.constant('APPCONSTANTS', {
    DocType: 2,

    GetLoanBillList: 'U9.Cust.GDJT.ISV.LoanBillService.IGetLoanBillListService',
    CreateLoanBill: 'U9.Cust.GDJT.ISV.LoanBillService.ICreateLoanBillService',
    UpdateLoanBill: 'U9.Cust.GDJT.ISV.LoanBillService.IUpdateLoanBillService',
    SubmitLoanBill: 'U9.Cust.GDJT.ISV.LoanBillService.ISubmitLoanBillService',
    DeleteLoanBill: 'U9.Cust.GDJT.ISV.LoanBillService.IDeleteLoanBillService',

    GetUser: 'U9.Cust.GDJT.ISV.CommonService.IGetUserInfoService',
    GetDocumentType: 'U9.Cust.GDJT.ISV.CommonService.IGetDocumentTypeService',
    GetProject: 'U9.Cust.GDJT.ISV.CommonService.IGetProjectService',
    GetExpenditureDepartment: 'U9.Cust.GDJT.ISV.CommonService.IGetExpenditureDepartmentService',
    GetExpenditurePerson: 'U9.Cust.GDJT.ISV.CommonService.IGetExpenditurePersonService'
});
