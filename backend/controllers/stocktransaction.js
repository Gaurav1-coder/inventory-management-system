const StockTransaction = require('../models/StockTranscationmodel');


module.exports.createStockTransaction = async (req, res) => {
  try {
    const { product, type, quantity, supplier } = req.body;

    // Handle frontend "IN/OUT" to backend "Stock-in/Stock-out" mapping
    let transactionType = type;
    if (type === "IN") transactionType = "Stock-in";
    if (type === "OUT") transactionType = "Stock-out";

    if (!product || !transactionType || !quantity) {
      return res.status(400).json({ success: false, message: "Product, type, and quantity are required." });
    }

    const newTransaction = new StockTransaction({
      product,
      type: transactionType,
      quantity,
      supplier: supplier || undefined,
    });

    await newTransaction.save();

    // Update Product Quantity
    const ProductModel = require('../models/Productmodel');
    const productRecord = await ProductModel.findById(product);
    if (productRecord) {
      if (transactionType === "Stock-in") {
        productRecord.quantity += Number(quantity);
      } else {
        productRecord.quantity -= Number(quantity);
      }
      await productRecord.save();
    }

    res.status(201).json({ success: true, message: "Stock transaction created successfully", transaction: newTransaction });
  } catch (error) {
    console.error("Stock Transaction Error:", error);
    res.status(500).json({ success: false, message: "Error creating stock transaction", error: error.message });
  }
};


module.exports.getAllStockTransactions = async (req, res) => {
  try {
    const transactions = await StockTransaction.find()
    .populate("product", "product name")
    .populate("supplier", "name")
    .sort({ transactionDate: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching stock transactions", error: error.message });
  }
};


module.exports.getStockTransactionsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const transactions = await StockTransaction.find({ product: productId }).populate('Supplier').sort({ transactionDate: -1 });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found for this product." });
    }

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching transactions by product", error });
  }
};


module.exports.getStockTransactionsBySupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const transactions = await StockTransaction.find({ supplier: supplierId }).populate('product').sort({ transactionDate: -1 });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found for this supplier." });
    }

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching transactions by supplier", error });
  }
};


module.exports.searchStocks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const stocks = await StockTransaction.find({})
      .populate('product') 
      .then((transactions) => {
        return transactions.filter((transaction) => 
          transaction.type.toLowerCase().includes(query.toLowerCase()) ||
          (transaction.product && transaction.product.name.toLowerCase().includes(query.toLowerCase()))
        );
      });

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error finding product", error: error.message });
  }
};