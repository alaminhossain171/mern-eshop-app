const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.get(`/:id`, (req, res) => {
  Category.findById(req.params.id)
  .then((category) => {
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
  })
  .catch((error)=>{
    res.status(400).json({
      success: false,
      message: error.message, // use error.message for a more descriptive error
    });
  })
});

router.post("/", async (req, res) => {
  let newCategory = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  newCategory = await newCategory.save();
  if (!newCategory) {
    return res.status(404).send("the category cant not be created!");
  }
  res.send(newCategory);
});

router.put("/:id",(req,res)=>{
    const categoryId = req.params.id;
    Category.findByIdAndUpdate(categoryId,req.body,{new:true})
  .then((category)=>{
    if(category){
      res.status(200).json(category);
    }else{
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
  })
  .catch((error)=>{
    res.status(400).json({
        success: false,
        message: error.message, 
      });
  })
})

router.delete('/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Step 1: Find the Order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Step 2: Delete Order Items
    const orderItemIds = order.orderItems;

    // Assuming OrderItem model has a static method `deleteMany` to delete multiple items by IDs
    await OrderItem.deleteMany({ _id: { $in: orderItemIds } });

    // Step 3: Delete the Order
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      success: true,
      message: 'Order and associated Order Items deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});



module.exports = router;
