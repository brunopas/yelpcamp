const express = require("express");
const router = express.Router();

const CampgroundController = require("../controllers/CampgroundController");
const CampgroundModel = require("../models/campground");

const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/");
        cb(null, Date.now() + "." + extension[extension.length - 1]);
    },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/" });

router
    .route("/")
    .get(catchAsync(CampgroundController.index))
    .post(
        isLoggedIn,
        upload.array("image", 12),
        validateCampground,
        catchAsync(CampgroundController.createCampground)
    );

router.get("/new", isLoggedIn, CampgroundController.renderNewForm);

router
    .route("/:id")
    .get(catchAsync(CampgroundController.showCampground))
    .put(
        isLoggedIn,
        isAuthor,
        upload.array("image", 12),
        validateCampground,
        catchAsync(CampgroundController.updateCampground)
    )
    .delete(
        isLoggedIn,
        isAuthor,
        catchAsync(CampgroundController.deleteCampground)
    );

router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor,
    catchAsync(CampgroundController.renderEditForm)
);

module.exports = router;
