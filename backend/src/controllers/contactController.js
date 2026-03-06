import Contact from "../models/Contact.js";

/* CREATE MESSAGE (PUBLIC) */
export const sendMessage = async (req, res) => {
  try {
    console.log("📨 Received contact message:", req.body);

    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Contact.create({
      name,
      email,
      message,
      read: false,
    });
    console.log("✅ Message saved:", newMessage._id);

    res.status(201).json({
      message: "Message sent successfully",
      id: newMessage._id,
    });
  } catch (error) {
    console.error("💥 Error saving message:", error);
    res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
};

/* GET ALL MESSAGES (ADMIN) */
export const getMessages = async (req, res) => {
  try {
    console.log("📥 Fetching all messages");
    const messages = await Contact.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${messages.length} messages`);
    res.status(200).json(messages);
  } catch (error) {
    console.error("💥 Error fetching messages:", error);
    res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

/* MARK MESSAGE AS READ (ADMIN) */
export const markMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📖 Marking message as read:", id);

    const updated = await Contact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!updated) {
      console.log("❌ Message not found");
      return res.status(404).json({ message: "Message not found" });
    }

    console.log("✅ Message marked as read");
    res.status(200).json(updated);
  } catch (error) {
    console.error("💥 Error marking message as read:", error);
    res.status(500).json({
      message: "Failed to update message",
      error: error.message,
    });
  }
};

/* DELETE MESSAGE (ADMIN) */
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🗑️ Deleting message:", id);

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      console.log("❌ Message not found");
      return res.status(404).json({ message: "Message not found" });
    }

    console.log("✅ Message deleted");
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("💥 Error deleting message:", error);
    res.status(500).json({
      message: "Failed to delete message",
      error: error.message,
    });
  }
};
