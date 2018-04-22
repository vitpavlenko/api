const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    status: { type: String, enum: ['inactive', 'active', 'declined', 'completed'] },
    author: { type: Number, ref: 'User', required: true },
    members: [{ type: Number, ref: 'User', required: true }]
});

ProjectSchema.plugin(autoIncrement.plugin, {
    model: 'Project',
    field: 'projectId',
    startAt: 100
});
ProjectSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Project', ProjectSchema);
