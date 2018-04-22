const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    mark: { type: Number, required: true, min: [1, 'minimum is 1'] },
    status: { type: String, enum: ['inactive', 'active', 'declined', 'completed'] },
    project: { type: Number, ref: 'Project', required: true },
    author: { type: Number, ref: 'User', required: true },
    members: [{ type: Number, ref: 'User', required: true }]
});

TaskSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Task', TaskSchema);
