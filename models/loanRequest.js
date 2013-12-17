var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Catches all the loan data*/

var LoanRequestSchema = new Schema({
  
	loan: Number,
	term: Number,
	termUnit: String,			//TODO create constants
	interestRate: Number,
	startDateYear: Number, 		//TODO possibly change to date, calculate based on form values
	startDateMonth: String, 		//TODO possibly change to date, calculate based on form values
	startDateDay: Number 		//TODO possibly change to date, calculate based on form values
});

mongoose.model('LoanRequest', LoanRequestSchema);
