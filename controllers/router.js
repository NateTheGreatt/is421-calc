module.exports = function(app) {
    // initialize mongoose
    var mongoose = require('mongoose');
    
    // create file schema for mongo
    var Schema = mongoose.Schema;
    var FileSchema = new Schema({
        name: {type: String, required: true, unique: true}
    });
    var File = mongoose.model('File', FileSchema);

    /*Controllers setup
     * */
    var requests = require('./requests');
    
    
    app.get('/', function(req, res) {
        res.render('login');
    });

    app.get('/QalcSelect', function(req, res) {
        res.render('QalcSelect');
    });
       app.get('/login', function(req, res) {
        res.render('login');
    });

    app.get('/MyQalc', function(req, res) {
        res.render('MyQalc');
    });

    app.get('/offerF', function(req, res) {
        res.render('offerF');
    });
     app.get('/qalc', function(req, res) {
        res.render('qalc');
    });
     
     
     app.post('/createQalc', requests.addLoan);
     
    
    // upload form and processing
    // files uploaded to /public/uploads
    app.get('/upload', function(req, res) {
        res.render('upload_form');
    });
    
    app.post("/upload", function (req, res) {
        req.form.on('end', function(){
            var filename = req.files.file.path.split('\\');
            filename = path.basename(filename.pop());
            var file_data = {
                name: filename
            };
            var file = new File(file_data);
            file.save(function (error, data) {
                if (error) {
                    res.json(error);
                } else {
                    console.log("Added New File");
                    res.statusCode = 201;
                    res.send();
                    res.render('upload_form');
                }
            });
        });
    });
    
    // view the files stored in mongo
    app.get('/viewfiles', function (req, res) {
        File.find({}, function(error, data) {
            //res.json(data);
            res.render('data', {data: data, title: 'Test'});
        });
    });

};
