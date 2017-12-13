/* eslint-disable no-console */
module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const timestamped = { timestamps: true };
    
    const oauth = new Schema({
        githubId: { type: String },
        github: { type: Object },

    }, timestamped);

    return mongooseClient.model('oauth', oauth);
};