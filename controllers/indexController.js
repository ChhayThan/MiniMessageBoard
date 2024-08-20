const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const { format } = require("date-fns");
const { use } = require("../routes/indexRouter");

exports.getAllMessages = async (req, res) => {
  const queryResult = await db.getAllMessages();
  let messages = [];
  queryResult.forEach((message) => {
    messages.push({
      id: message.id,
      user: message.username,
      text: message.message,
      added: message.date,
    });
  });
  console.log(queryResult);
  res.render("index", { title: "Mini Messageboard", messages: messages });
};

exports.getMessageForm = (req, res) => {
  res.render("form", { title: "Message Form" });
};

const validateMessage = [
  body("authorName")
    .trim()
    .isAlpha()
    .withMessage("Name must only contain letters.")
    .isLength({ min: 1, max: 10 })
    .withMessage("Name must have be between 2 to 10 characters"),
  body("messageText")
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Message must have at least 2 characters."),
];
exports.postUserMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "Message Form",
        errors: errors.array(),
      });
    }
    const messageText = req.body.messageText;
    const messageUser = req.body.authorName;
    const added = format(new Date(), "yyyy-MM-dd hh:mm:ss");
    await db.insertMessage(messageUser, messageText, added);
    res.redirect("/");
  },
];

exports.getUserMessage = async (req, res) => {
  const queryResult = await db.getMessageById(req.params.id);
  message = queryResult[0];
  res.render("message", {
    title: `${message.username}'s Message!`,
    username: message.username,
    date: message.date,
    message: message.message,
  });
};
