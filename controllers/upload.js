var mongoose = require('mongoose');

// create file schema for mongo
/*var Schema = mongoose.Schema;
var FileSchema = new Schema({
    name: {type: String, required: true, unique: true}
});
var File = mongoose.model('File', FileSchema);*/

exports.uploadForm = function(req, res) {
    res.render('upload_form');
};

exports.upload = function(req, res) {
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
};

exports.viewFiles = function(req, res) {
    File.find({}, function(error, data) {
        //res.json(data);
        res.render('data', {data: data, title: 'Test'});
    });
};
