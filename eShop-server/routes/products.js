const express = require("express");
const router = express.Router();
const { Product } = require("../models/products");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    const removeExtention = file.originalname.split(".");
    const fileName = removeExtention[0].split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get("/", async (req, res) => {
  let filter = {};

  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  try {
    const productList = await Product.find(filter).populate("category");
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", uploadOptions.single("image"), async (req, res) => {
  try {
    const categoryId = req.body.category;
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request");
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Invalid category",
      });
    }
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basePath}${fileName}`,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: category._id,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    });

    const savedProduct = await newProduct.save();
    if (!savedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not created",
      });
    }

    res.status(201).send(savedProduct);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", uploadOptions.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product id",
    });
  }
  try {
    const categoryId = req.body.category;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Invalid category",
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send({ message: "Product not found" });
    const file = req.files;
    let imagePath;

    if (file) {
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      imagePath = `${basePath}${fileName}`;
    } else {
      imagePath = product.image;
    }
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagePath,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: category._id,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      numReviews:req.body.numReviews
    },
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  Product.findByIdAndDelete(productId)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "product deleted successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "product not found",
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: error.message, // use error.message for a more descriptive error
      });
    });
});

router.get("/get/count", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    if (productCount === 0) {
      return res.status(500).json({
        success: false,
      });
    }

    res.json({
      success: true,
      productCount: productCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count || 0;
  const products = await Product.find({ isFeatured: true })
    .select("name _id")
    .limit(count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(products);
});

router.put(
  '/gallery-images/:id',
  uploadOptions.array('images', 10),
  async (req, res) => {
      if (!mongoose.isValidObjectId(req.params.id)) {
          return res.status(400).send('Invalid Product Id');
      }
      const files = req.files;
      let imagesPaths = [];
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

      if (files) {
          files.map((file) => {
              imagesPaths.push(`${basePath}${file.filename}`);
          });
      }

      const product = await Product.findByIdAndUpdate(
          req.params.id,
          {
              images: imagesPaths,
          },
          { new: true }
      );

      if (!product)
          return res.status(500).send('the gallery cannot be updated!');

      res.send(product);
  }
);
module.exports = router;
