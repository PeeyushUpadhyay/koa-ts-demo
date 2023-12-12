const mongoosee = require('mongoose')

const managerSchema = new mongoosee.Schema({
    name: {
      type: String,
      required: true
    }
});

const Manager = mongoosee.model('Manager', managerSchema);

module.exports = Manager;