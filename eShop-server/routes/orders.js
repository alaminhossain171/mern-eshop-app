const { Order } = require("../models/order");
const express = require("express");
const { OrderItem } = require("../models/order-item");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.get(`/:id`, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        const newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        return (await newOrderItem.save())._id;
      })
    );

    const total = (await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        return orderItem.product.price * orderItem.quantity;
      })
    )).reduce((acc, curr) => acc + curr, 0);

    const newOrder = await Order.create({
      orderItems: orderItemsIds,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      user: req.body.user,
      dateOrdered: req.body.dateOrdered,
      totalPrice: total,
    });

    res.send(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", (req, res) => {
  const orderId = req.params.id;
  Order.findByIdAndUpdate(orderId, req.body, { new: true })
    .then((order) => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({
          success: false,
          message: "order not found",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    });
});

router.delete("/:id", (req, res) => {
  const orderId = req.params.id;

  Order.findByIdAndDelete(orderId)
    .then((order) => {
      if (order) {
        // Use Promise.all to wait for all OrderItem deletions
        return Promise.all(
          order.orderItems.map((itemId) => {
            return OrderItem.findByIdAndDelete(itemId);
          })
        );
      } else {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Order and associated OrderItems deleted successfully",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
});

router.get("/get/totalsales", async (req, res) => {
    try {
      const totalSales = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalSales: {
              $sum: "$totalPrice",
            },
          },
        },
      ]);
  
      if (!totalSales || totalSales.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No order sales data available",
        });
      }
  
      const totalSalesValue = totalSales[0].totalSales;
  
      res.json({
        totalSales: totalSalesValue,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching total sales:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
  router.get("/get/count", async (req, res) => {
    try {
      const orderCount = await Order.countDocuments();
  
      if (orderCount === 0) {
        return res.status(500).json({
          success: false,
        });
      }
  
      res.json({
        success: true,
        productCount: orderCount
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });


  router.get('/get/userorders/:userId', async (req, res) => {
    try {
      const userOrder = await Order.findOne({ user: req.params.userId })
        .populate({
          path: "orderItems",
          populate: { path: "product", populate: "category" },
        })
        .sort({ 'dateOrdered': -1 });
  
      if (!userOrder) {
        return res.status(404).json({
          success: false,
          message: "No orders found",
        });
      }
  
      res.send(userOrder);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

module.exports = router;
