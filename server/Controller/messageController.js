import { messageModel } from "../Models/messageModel.js";

//create message
/**
 * creates message and send it to DB and client
 * @param {chatId, senderId, text} req
 * @param {}
 */
export async function createMessage(req, res) {
  const { chatId, senderId, text } = req.body;

  const message = new messageModel({ chatId, senderId, text });

  //saving message on DB
  try {
    const response = await message.save();

    //send to client
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

//get messages
/**
 * get messages with chat id
 * @param {chatId} req
 */
export async function getMessage(req, res) {
  const { chatId } = req.params;

  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
