const { Router } = require("express");
const indexRouter = Router();

const { format } = require("date-fns");
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: format(new Date(), "	PPPPpppp"),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: format(new Date(), "	PPPPpppp"),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});
indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "Message Form" });
});
indexRouter.post("/new", (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.authorName;
  messages.push({
    text: messageText,
    user: messageUser,
    added: format(new Date(), "	PPPPpppp"),
  });
  res.redirect("/");
});

module.exports = indexRouter;
