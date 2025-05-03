// // routes/chatRoutes.js
// const express = require('express');
// const Chat = require('../models/chat');
// const Message = require('../models/message');
// const router = express.Router();

// // Route to send a message
// router.post('/messages/send', async (req, res) => {
//   const { senderId, receiverId, messageContent } = req.body;

//   // Create a new message document
//   const newMessage = new Message({
//     senderId,
//     receiverId,
//     message: messageContent
//   });
//   await newMessage.save();

//   // Check if a chat between the sender and receiver already exists
//   let chat = await Chat.findOne({
//     $or: [
//       { senderId, receiverId },
//       { senderId: receiverId, receiverId: senderId }
//     ]
//   });

//   if (!chat) {
//     // If no chat exists, create a new chat document
//     chat = new Chat({ senderId, receiverId, messages: [newMessage._id] });
//   } else {
//     // Add the new message to the existing chat
//     chat.messages.push(newMessage._id);
//   }

//   await chat.save();
//   res.status(200).send('Message sent successfully');
// });

// // Route to get chat messages between two users
// router.get('/messages/:senderId/:receiverId', async (req, res) => {
//   const { senderId, receiverId } = req.params;

//   const chat = await Chat.findOne({
//     $or: [
//       { senderId, receiverId },
//       { senderId: receiverId, receiverId: senderId }
//     ]
//   }).populate('messages');

//   if (!chat) {
//     return res.status(404).send('No chat found');
//   }

//   res.status(200).json({ messages: chat.messages });
// });

// module.exports = router;
