"use strict";

const express = require("express"),
app = express(),
errorController = require("./controllers/errorController.js"),
homeController = require("./controllers/homeController"),
subscribersController = require("./controllers/subscribersController"),
layouts = require("express-ejs-layouts"),
mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://it231:e8Gc56ZIItWYiufU@cluster1997-sc4tj.gcp.mongodb.net/phone_launch?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res)=> {
    res.render("index");
});

app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

app.post("/contact", homeController.postedSignUpForm);
app.get("/specifications", homeController.showSpecifications);
app.get("/ourcompany", homeController.showOurcompany);
app.get("/faq", homeController.showFaq);
app.get("/purchase", homeController.showPurchase);


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});