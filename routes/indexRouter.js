const { Router } = require("express");
const indexRouter = Router();

const { format } = require("date-fns");

const indexController = require("../controllers/indexController");
// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
//   },
// ];

indexRouter.get("/", indexController.getAllMessages);
indexRouter.get("/new", indexController.getMessageForm);
indexRouter.post("/new", indexController.postUserMessage);

indexRouter.get("/message/:id", indexController.getUserMessage);

module.exports = indexRouter;
