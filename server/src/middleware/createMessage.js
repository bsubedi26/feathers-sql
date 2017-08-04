module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const messageModel = mongooseClient.model('Message');
  const roomModel = mongooseClient.model('Room');
  
  
  return async function (req, res, next) {
    const { message, room } = req.body;
    const roomDoc = await roomModel.find({ room: room })
    const messageDoc = await messageModel.create({ text: message, roomId: roomDoc[0]._id })
    
    return res.json(messageDoc);
  };

}