
angular.module('LoanBill.utility')

.constant('APPCONSTANTS', {
    DocType: 2,

    GetLoanBillList: 'U9.Cust.GDJT.ISV.LoanBillService.IGetLoanBillListService',
    CreateLoanBill: 'U9.Cust.GDJT.ISV.LoanBillService.ICreateLoanBillService',
    UpdateLoanBill: 'U9.Cust.GDJT.ISV.LoanBillService.IUpdateLoanBillService',
    DeleteLoanBill: 'U9.Cust.GDJT.ISV.LoanBillService.IDeleteLoanBillService',

    GetDocumentType: 'U9.Cust.GDJT.ISV.CommonService.IGetDocumentTypeService',
    GetProject: 'U9.Cust.GDJT.ISV.CommonService.IGetProjectService'
});
