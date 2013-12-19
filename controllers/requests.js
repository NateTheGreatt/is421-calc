/*
 * Request CRUD
 */

var mongoose = require('mongoose'), 
	Request = mongoose.model('Request'),
	LoanRequest = mongoose.model('LoanRequest'),
	LoanResponse = mongoose.model('LoanResponse'),
	CommonRequest = mongoose.model('CommonRequest');

var viewsDir = "..\\views";


exports.getLoanCalc = function(req, res){
	Request.findOne(
			{userId : "chico",
			calcType : "loan"},
			"status calcType req_obj common",
			null,
			function(err, request){
				console.log("REQUEST = " + request);
				
				res.render(
						viewsDir + req.path,
						{request : request});
			}
	);
	
};

// Insert or update a request
exports.addLoanRequest = function(req, res) {
	var data = req.body;

	console.log(data);
	
	var loanObj = new LoanRequest({
		loan : data.loan,
		term : data.term,
		termUnit : data.termUnit,
		interestRate : data.interestRate,
		startDateYear : data.startDateYear,
		startDateMonth : data.startDateMonth,
		startDateDay : data.startDateDay
	});
	
	var commonObj = new CommonRequest({
		
		name : data.name,	//TODO placeholder
		description : data.description,	//TODO placeholder
		image : data.image,	//TODO placeholder
		audio : data.audio,	//TODO placeholder
		comment : data.comment
	});
	
	var request = new Request({
		status : "draft",	// TODO status field - define constants. draft, submitted, reviewed
		calcType : "loan",	// TODO calcType field - define constants. lease, loan...
		req_obj : loanObj.toObject(),
		common : commonObj.toObject()
		
	});
	
	request = request.toObject();
	delete request._id;
	console.log("Request object to be saved : ");
	console.log(request);
	
	Request.findOneAndUpdate({
		userId : "chico",	// TODO dynamically assign user
		calcType : "loan"
	}, 
	request
	, {
		safe : true,
		upsert : true
	},	function(err, request){
				console.log("Request object returned : ");
				console.log(request.toJSON());
				
				res.render(
					viewsDir + "\\qalc",	//TODO replace with dynamic reference
					{request : request});

		});
	
	
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
	}, function(err, numberAffected, raw){
		resultLogCallback(
				err,
				numberAffected,
				raw,
				function(){
					res.render('../views/bankOffer');	//TODO replace with dynamic reference
				});
		}
	);
};

// Insert or update a new response for a request
exports.getCalcs = function(req, res) {

        
        Request.findOne({
        	userId : "chico",	// TODO dynamically assign user
        	calcType : "loan"},	
        	"calcType req_obj common",
        	null,
        	function(err, doc){
        		populateCalc(err, doc, res);
        	});

};

//Populate object for return to myCalcs page. Assumes loan based on page constraints!
function populateCalc(err, request, res){
	
	var calc = [];
	if(request != ""){
		console.log("ERR is : " + err +
		" request is : " + request +
		" res is : " + res);
		
		calc.push({
			name : request.common.name,
			description : request.common.description,
			quote : request.req_obj.loan,
			interest : request.req_obj.interestRate,
			term : request.req_obj.term,
			termUnit : request.req_obj.termUnit,
			monthly : getPayment(request.req_obj.loan, request.term, request.rate, request.termUnit)
		});
	}
	
	res.render(
		viewsDir + req.path, 
		calc
	);
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
function resultLogCallback(err, numberAffected, raw, callback) {

	if (err)
		return handleError(err);
	console.log('The number of updated documents was %d', numberAffected);
	console.log('The raw response from Mongo was ', raw);
	callback();
}

function handleError(err) {

	console.log("*************The update could not be completed ****************************");
	console.log(err);
};
