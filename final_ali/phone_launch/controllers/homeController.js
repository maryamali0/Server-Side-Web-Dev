"use strict";

exports.showSignUp = (req, res) => {
    res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
};

exports.showSpecifications = (req, res)=> {
    res.render("specifications");
};

exports.showOurcompany = (req, res)=> {
    res.render("ourcompany");
};

exports.showFaq = (req, res)=> {
    res.render("faq");
};

exports.showPurchase = (req, res)=> {
    res.render("purchase");
};