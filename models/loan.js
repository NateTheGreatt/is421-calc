var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Catches all the loan data*/

var LoanSchema = new Schema({
  
	reqLoan: Number,
	reqTerm: Number,
	reqTermUnit: String,			//TODO create constants
	reqInterestRate: Number,
	reqStartDateYear: Number, 		//TODO possibly change to date, calculate based on form values
	reqStartDateMonth: String, 		//TODO possibly change to date, calculate based on form values
	reqStartDateDay: Number, 		//TODO possibly change to date, calculate based on form values
	msrp: Number,
	downPayment: Number,
	tradeInValue: Number,
	interestRate: Number,
	term: Number,
	termUnit: String,
	salesTax: Number,
	payment: Number,
	paymentUnit: String
});

mongoose.model('Loan', LoanSchema);
