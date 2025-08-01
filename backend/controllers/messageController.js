const Message = require("../models/message");
const Notification = require("../models/notification");
const Chat = require("../models/chat");

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, text, image } = req.body;
    const senderId = req.user.id;

    const chat = await Chat.findById(chatId).populate("participants");
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    const receiver = chat.participants.find((p) => p._id.toString() !== senderId);
    if (!receiver) return res.status(400).json({ error: "Receiver not found" });

    const message = await Message.create({
      chat: chatId,
      sender: senderId,
      text: text || "",
      image: image || null
    });

    // Populate sender info for real-time emission
    const populated = await Message.findById(message._id)
      .populate("sender", "firstName lastName img");

    const senderName = populated.sender
      ? `${populated.sender.firstName} ${populated.sender.lastName}`
      : "Someone";

    // Save notification for receiver
    if (text?.trim()) {
      await Notification.create({
        type:    'message',
        user:    receiver._id,
        message: `New message from ${senderName}: "${text.slice(0,30)}..."`,
        chatId,
        sender:  senderId,
        isRead:  false,
      });
    }

    // Send real-time message to chat participants
    req.io.to(chatId).emit("newMessage", populated);

    // Send notification to receiver (for all pages)
    req.io.to(`user_${receiver._id}`).emit("newMessageNotification", {
      chatId,
      message: text || "[Image]",
      senderName,
      senderId
    });

    res.json(message);
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "firstName lastName img")
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    console.error("getMessages error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
