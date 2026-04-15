const Product = require("../models/Productmodel");
const Sale = require("../models/Salesmodel");
const Order = require("../models/Ordermodel");
const ActivityLog = require("../models/ActivityLogmodel");

const getDashboardStats = async (req, res) => {
  try {
    // Total Products
    const totalProducts = await Product.countDocuments();

    // Total Stock (Sum of all product quantities)
    const products = await Product.find({}, "quantity");
    const totalStock = products.reduce((sum, p) => sum + (p.quantity || 0), 0);

    // Low Stock Count (Quantity < 10)
    const lowStockCount = await Product.countDocuments({ quantity: { $lt: 10 } });

    // Total Revenue (Sum of all completed sales)
    const sales = await Sale.find({ status: "completed" }, "totalAmount");
    const totalRevenue = sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);

    // Monthly Sales Data for Chart (Last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlySales = await Sale.aggregate([
      {
        $match: {
          status: "completed",
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format monthly data for frontend charts
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedMonthlySales = monthlySales.map((item) => ({
      month: monthNames[item._id - 1],
      total: item.total,
    }));

    // Recent Activity Logs (Last 5)
    const recentLogs = await ActivityLog.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: {
        products: totalProducts,
        totalStock,
        lowStockCount,
        totalRevenue,
      },
      monthlySales: formattedMonthlySales,
      recentLogs,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
