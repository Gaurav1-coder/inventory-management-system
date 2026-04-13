const express = require('express');
const router = express.Router();
const {createStockTransaction,getAllStockTransactions,searchStocks,getStockTransactionsByProduct,getStockTransactionsBySupplier} = require('../controller/stocktransaction');


router.post('/', createStockTransaction);
router.post('/createStockTransaction', createStockTransaction); // Backward compatibility
router.get('/', getAllStockTransactions);
router.get('/getallStockTransaction', getAllStockTransactions); // Backward compatibility
router.get('/product/:productId',getStockTransactionsByProduct);
router.get('/supplier/:supplierId',getStockTransactionsBySupplier);
router.get('/searchstocks',searchStocks);


module.exports = router;
