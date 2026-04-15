const Product=require('../models/Productmodel')
const Cloundinary = require('../libs/Cloundinary') 
const logActivity=require('../libs/logger')
const Notification = require("../models/Notificationmodel");

const checkLowStock = async (product, app) => {
  if (product.quantity < 10) {
    const name = `Low Stock Alert: ${product.product || product.name} (Qty: ${product.quantity})`;
    const type = "warning";
    
    // Check if notification already exists for this product in last 24h
    const existing = await Notification.findOne({
      name,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (!existing) {
      const notification = new Notification({ name, type });
      await notification.save();
      const io = app.get("io");
      if (io) io.emit("newNotification", notification);
    }
  }
};

module.exports.Addproduct=async(req,res)=>{
  const userId=req.user._id;
  const ipAddress=req.ip

    try {
        const { product, name, description, category, price, quantity, image } = req.body;
        const productName = product || name; 
        
        if (!productName || !category || !description || !price || !quantity) {
           return res.status(400).json({ message: "Please provide all product details." });
        }

        let imageUrl = "";
        if (image) {
          try {
            const uploadResponse = await Cloundinary.uploader.upload(image, {
              folder: "products",
            });
            imageUrl = uploadResponse.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary Upload Error:", uploadError);
            return res.status(500).json({ message: "Error uploading image to Cloudinary" });
          }
        }

        const createdProduct = new Product({
           product: productName,
           name: productName,
           description, 
           category, 
           price, 
           quantity,
           image: imageUrl
        });

        await createdProduct.save();

        // Check for low stock and create notification
        if (quantity < 10) {
          const Notification = require("../models/Notificationmodel");
          const newNotif = new Notification({
            name: `Low Stock Alert: ${productName}`,
            type: "warning",
            message: `Only ${quantity} units left for ${productName}. Please restock soon.`
          });
          await newNotif.save();
          const io = req.app.get("io");
          if (io) io.emit("newNotification", newNotif);
        }

       await logActivity({
          action:"Add Product",
          description:`Product ${productName} was added`,
          entity:"product",
          entityId:createdProduct._id,
          userId:userId,
          ipAddress:ipAddress,
        })
     
        res.status(201).json({ message: "Product created successfully", product: createdProduct });
     
     } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({ message: "Error in creating product", error: error.message });
     }
    }  

    module.exports.getProduct = async (req, res) => {
        try {
          const { page = 1, limit = 8, search = "", category = "", sort = "" } = req.query;
          const query = {};
          if (search) {
            query.$or = [
              { product: { $regex: search, $options: "i" } },
              { name: { $regex: search, $options: "i" } }
            ];
          }
          if (category) query.category = category;

          const skip = (page - 1) * limit;
          
          const products = await Product.find(query)
            .populate('category')
            .skip(skip)
            .limit(parseInt(limit));

          const totalProduct = await Product.countDocuments(query);
          const totalPages = Math.ceil(totalProduct / limit);
            
            res.status(200).json({
              products, 
              totalProduct,
              totalPages,
              page: parseInt(page)
            });  
        } catch (error) {
            res.status(500).json({ message: "Error getting products", error: error.message });
        }
    };
    





    module.exports.RemoveProduct = async (req, res) => {
      try {
        const { productId } = req.params; 
        const userId=req.user._id;
        const ipAddress=req.ip
    
        const deletedProduct = await Product.findByIdAndDelete(productId);
    
        if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found!" });
        }

        await logActivity({
          action: "Delete Product",
          description: `Product ${deletedProduct.name}" was deleted.`,
          entity: "product",
          entityId: deletedProduct._id,
          userId: userId,
          ipAddress: ipAddress,
        });
    
        res.status(200).json({ message: "Product deleted successfully" });
    
      } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
      }
    };
    



    module.exports.EditProduct = async (req, res) => {
      try {
        const productId = req.params.productId || req.body.productId;
        const { product, name, description, category, price, quantity, image } = req.body;
        const userId = req.user._id;
        const ipAddress = req.ip;
    
        if (!productId) {
          return res.status(400).json({ message: "Product ID is required." });
        }
    
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
          return res.status(404).json({ message: "Product not found." });
        }

        let imageUrl = existingProduct.image;
        if (image && image.startsWith("data:image")) {
          try {
            const uploadResponse = await Cloundinary.uploader.upload(image, {
              folder: "products",
            });
            imageUrl = uploadResponse.secure_url;
          } catch (uploadError) {
            console.error("Cloudinary Update Error:", uploadError);
          }
        }

        const updatedData = {
          product: product || name || existingProduct.product,
          name: product || name || existingProduct.name,
          description: description || existingProduct.description,
          category: category || existingProduct.category,
          price: price || existingProduct.price,
          quantity: quantity !== undefined ? quantity : existingProduct.quantity,
          image: imageUrl
        };

        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          updatedData,
          { new: true } 
        );
    
        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found." });
        }
    

        await logActivity({
          action: "Update Product",
          description: `Product "${updatedProduct.product || updatedProduct.name}" was updated.`,
          entity: "product",
          entityId: updatedProduct._id,
          userId: userId,
          ipAddress: ipAddress,
        });
    
       
        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
      }
    };




module.exports.SearchProduct = async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }
  
      
      const products = await Product.find({
        $or: [
          { product: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }).populate('category');
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error finding product", error: error.message });
    }
  };
  



  module.exports.getTopProductsByQuantity = async (req, res) => {
  try {
    const topProducts = await Product.find({})
      .sort({ quantity: -1 }) 
      .limit(10); 

    if (!topProducts || topProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ success: true, topProducts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products for chart", error: error.message });
  }
};

  

