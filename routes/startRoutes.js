const express = require("express");
const Product = require("../models/productSchema");

const router = express.Router();

// Serve the intro page on "/"
router.get("/", (req, res) => {
    res.render("index"); // Render index.ejs
});

//Serve the Register page on "/register"
router.get("/register", (req, res) => {
    res.render("register"); // Render register.ejs
});

//Serve the Login page on "/login"
router.get("/login", (req, res) => {
    res.render("login"); // Render login.ejs
});

router.get("/sell", (req, res) => {
    res.render("sell"); // Render sell.ejs
})

router.get("sell-form", (req, res) => {
    const { category, subcategory } = req.query;
    res.render("sell-form", { category, subcategory }); // Render sell-form.ejs with query params
})

router.get("/chat", (req, res) => {
    res.render("chat"); // Render chat.ejs

})

// //Serve the Home page on "/home"
// router.get("/home", (req, res) => {
//     if (!req.session.user) {
//         return res.redirect("/login");
//     }
//     res.render("home", { user: req.session.user });
// });
//Serve the Home page on "/home"
router.get("/home", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    try {
        const products = await Product.find({ isSold: false }); // fetch products
        res.render("home", { user: req.session.user, products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Server error");
    }
});

router.get("/product/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("Product not found");

        res.render("productDetail", { product });
    } catch (err) {
        console.error("Error fetching product detail:", err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
