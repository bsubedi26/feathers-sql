// monn-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const monn = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  }, {
    timestamps: true
  });

  return mongooseClient.model('monn', monn);
};
