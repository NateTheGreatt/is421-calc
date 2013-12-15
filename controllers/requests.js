/*
 * Request CRUD
 */

var mongoose = require('mongoose'), 
	Request = mongoose.model('Request'),
	LoanRequest = mongoose.model('LoanRequest'),
	LoanResponse = mongoose.model('LoanResponse');

// Insert or update a request
exports.addLoanRequest = function(req, res) {
	var data = req.body;

	var loanObj = new LoanRequest({
		reqLoan : data.reqLoan,
		reqTerm : data.reqTerm,
		reqTermUnit : data.reqTermUnit,
		reqInterestRate : data.reqInterestRate,
		reqStartDateYear : data.reqStartDateYear,
		reqStartDateMonth : data.reqStartDateMonth,
		reqStartDateDay : data.reqStartDateDay
	});

	
	
	Request.update({
		userId : "chico",	// TODO dynamically assign user
		calcType : "loan"
	}, 
	{
		status : "draft",	// TODO status field - define constants. draft, submitted, reviewed
		calcType : "loan",	// TODO calcType field - define constants. lease, loan...
		req_obj : loanObj.toObject()
	}, {
		safe : true,
		upsert : true
	},	resultLogCallback);
	
	res.render('../views/qalc');
};

// Insert or update a new response for a request
exports.addLoanResponse = function(req, res) {
	var data = req.body;

	var loanObj = new LoanRequest({
		msrp : data.msrp,
		downPayment : data.downPayment,
		tradeInValue : data.tradeInValue,
		interestRate : data.interestRate,
		term : data.term,
		termUnit : data.termUnit,
		salesTax : data.salesTax,
		payment : data.payment,
		paymentUnit : data.paymentUnit
	});

	Request.update({
		userId : "chico",	// TODO dynamically assign user
		calcType : "loan"	// TODO define constant
	},
	{
		$push : {
		resp_obj : loanObj
		}
	}, {
		safe : true,
		upsert : true
	}, resultLogCallback);
	
	res.render('../views/qalc');
};

function resultLogCallback(err, numberAffected, raw) {

	if (err)
		return handleError(err);
	console.log('The number of updated documents was %d', numberAffected);
	console.log('The raw response from Mongo was ', raw);
	
}

function handleError(err) {

	console.log("*************The update could not be completed ****************************");
	console.log(err);
};
