const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
	reporter: String,
	reportee: String,
	anime: String,
	reason: String
});

ReportSchema.index({reportee: "text"});

const Report = mongoose.model('Report', ReportSchema);

module.exports = { Report };