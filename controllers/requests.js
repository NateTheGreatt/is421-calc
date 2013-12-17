/*
 * Request CRUD
 */

var mongoose = require('mongoose'), 
	Request = mongoose.model('Request'),
	LoanRequest = mongoose.model('LoanRequest'),
	LoanResponse = mongoose.model('LoanResponse'),
	CommonRequest = mongoose.model('CommonRequest');

// Insert or update a request
exports.addLoanRequest = function(req, res) {
	var data = req.body;

	console.log(data);
	
	var loanObj = new LoanRequest({
		reqLoan : data.loan,
		reqTerm : data.term,
		reqTermUnit : data.termUnit,
		reqInterestRate : data.snterestRate,
		reqStartDateYear : data.startDateYear,
		reqStartDateMonth : data.startDateMonth,
		reqStartDateDay : data.startDateDay
	});

	var commonObj = new CommonRequest({
		
		name : data.name,	//TODO placeholder
		description : data.description,	//TODO placeholder
		image : data.image,	//TODO placeholder
		audio : data.audio,	//TODO placeholder
		comment : data.comment
	});

	Request.update({
		userId : "chico",	// TODO dynamically assign user
		calcType : "loan"
	}, 
	{
		status : "draft",	// TODO status field - define constants. draft, submitted, reviewed
		calcType : "loan",	// TODO calcType field - define constants. lease, loan...
		req_obj : loanObj.toObject(),
		common : commonObj.toObject()
	}, {
		safe : true,
		upsert : true
	},	resultLogCallback);
	
	res.render('../views/qalc');	//TODO replace with dynamic reference
};

// Insert or update a new response for a request
exports.addLoanResponse = function(req, res) {
	var data = req.body;

	var loanObj = new LoanResponse({
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
	
	res.render('../views/bankOffer');	//TODO replace with dynamic reference
};

// Insert or update a new response for a request
exports.getCalcs = function(req, res) {

        
        Request.findOne({
        	userId : "chico",	// TODO dynamically assign user
        	calcType : "loan"},	
        	"calcType req_obj common",
        	populateCalc)};

};

//Populate object for return to myCalcs page. Assumes loan based on page constraints!
function populateCalc(err, request){
	var calc = {
		name : request.common.name,
		description : request.common.description,
		quote : request.req_obj.loan,
		interest : req_obj.interestRate,
		term : request.req_obj.term,
		termUnit : request.req_obj.termUnit,
		monthly : getPayment(request.req_obj.loan, request.term, request.rate, request.termUnit)
	};
	
	
}


/*Throw away function. Created to output sample data in requested format*/
function getPayment(loan, term, rate, termUnit) {

 var princ = loan;
 var term  = convertTerm(term, termUnit);
 var intr   = rate / 1200;
 
 return princ * intr / (1 - (Math.pow(1/(1 + intr), term)));
}

/*Throw away function. Created to output sample data in requested format*/
function convertTerm(term, termUnit){

	switch(termUnit){
		case "months":
			return term;
		case "years":
			return term * 12;
	}
}
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
