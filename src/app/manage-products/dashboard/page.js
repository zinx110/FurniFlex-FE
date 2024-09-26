'use client';
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  // Dummy data mimicking the responses from APIs
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 1000, // API 1: Total Users
    totalProducts: 500, // API 2: Total Products
    totalCategories: 5, // API 3: Total Categories
    totalSales: 11400, // Total Sales
    salesData: [], // Sales data based on createdAt
    categoriesData: [ // Dummy categories data
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Groceries' },
      { name: 'Books' },
      { name: 'Sports' },
    ]
  });

  // Sample sales data you provided
  const salesDataFromAPI = [
    { createdAt: '2024-09-25 14:30:00', totalPrice: 1500 },
    { createdAt: '2024-09-26 10:00:00', totalPrice: 1200 },
    { createdAt: '2024-09-27 09:15:00', totalPrice: 1700 },
    { createdAt: '2024-09-27 11:00:00', totalPrice: 1800 },
    { createdAt: '2024-09-28 13:30:00', totalPrice: 2200 },
    { createdAt: '2024-09-29 15:00:00', totalPrice: 2000 },
    { createdAt: '2024-09-30 12:00:00', totalPrice: 1000 },
  ];

  // PieChart color palette
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Rolling up animation state
  const [animatedUsers, setAnimatedUsers] = useState(0);
  const [animatedProducts, setAnimatedProducts] = useState(0);
  const [animatedCategories, setAnimatedCategories] = useState(0);
  const [animatedSales, setAnimatedSales] = useState(0);

  // Animation function
  const animateValue = (value, setValue) => {
    let start = 0;
    const end = value;
    const duration = 1000; // Duration of the animation in milliseconds
    const increment = Math.ceil(end / (duration / 100)); // Increment for each interval (100 ms)

    const animate = () => {
      if (start < end) {
        start += increment;
        setValue(Math.min(start, end)); // Ensure it doesn't exceed the end value
        setTimeout(animate, 100); // Call again every 100ms
      } else {
        setValue(end);
      }
    };
    animate();
  };

  // Simulate API calls with useEffect and dummy data
  useEffect(() => {
    // Process sales data
    const salesByDay = {};

    salesDataFromAPI.forEach(sale => {
      const date = new Date(sale.createdAt);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., "Mon"
      const totalPrice = sale.totalPrice;

      // Aggregate sales by day
      if (salesByDay[day]) {
        salesByDay[day] += totalPrice;
      } else {
        salesByDay[day] = totalPrice;
      }
    });

    // Convert aggregated sales data to an array format
    const salesDataArray = Object.entries(salesByDay).map(([name, totalPrice]) => ({ name, totalPrice }));

    // Calculate total sales
    const totalSales = salesDataFromAPI.reduce((total, sale) => total + sale.totalPrice, 0);

    // Update the dashboard state
    setDashboardData(prevData => ({
      ...prevData,
      salesData: salesDataArray,
      totalSales: totalSales,
    }));

    // Start the rolling-up animations
    animateValue(dashboardData.totalUsers, setAnimatedUsers);
    animateValue(dashboardData.totalProducts, setAnimatedProducts);
    animateValue(dashboardData.totalCategories, setAnimatedCategories);
    animateValue(dashboardData.totalSales, setAnimatedSales);
  }, []);

  return (
    <div className="dashboard-container" style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>

      <div className="stats-container" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div className="stat-box" style={{ flex: 1, textAlign: 'center', marginRight: '20px' }}>
          <h2>Total Users</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{animatedUsers}</p>
        </div>

        <div className="stat-box" style={{ flex: 1, textAlign: 'center', marginRight: '20px' }}>
          <h2>Total Products</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{animatedProducts}</p>
        </div>

        <div className="stat-box" style={{ flex: 1, textAlign: 'center', marginRight: '20px' }}>
          <h2>Total Categories</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{animatedCategories}</p>
        </div>

        <div className="stat-box" style={{ flex: 1, textAlign: 'center' }}>
          <h2>Total Sales</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${animatedSales}</p>
        </div>
      </div>

      <div className="charts-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Sales Line Chart */}
        <div className="chart-box" style={{ flex: '1', minWidth: '300px', height: '300px' }}>
          <h2>Sales This Week</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboardData.salesData} animationDuration={500}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalPrice" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Users Bar Chart */}
        <div className="chart-box" style={{ flex: '1', minWidth: '300px', height: '300px' }}>
          <h2>Total Users Growth</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={Array.from({ length: 7 }, (_, i) => ({ name: `Day ${i + 1}`, users: dashboardData.totalUsers / 7 }))} animationDuration={500}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#82ca9d" animationDuration={500} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Products Bar Chart */}
        <div className="chart-box" style={{ flex: '1', minWidth: '300px', height: '300px' }}>
          <h2>Products Added</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={Array.from({ length: 7 }, (_, i) => ({ name: `Day ${i + 1}`, products: dashboardData.totalProducts / 7 }))} animationDuration={500}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="products" fill="#ffc658" animationDuration={500} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Categories Bar Chart */}
        <div className="chart-box" style={{ flex: '1', minWidth: '300px', height: '300px' }}>
          <h2>Categories Distribution</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboardData.categoriesData.map(category => ({ name: category.name, count: 1 }))} animationDuration={500}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" animationDuration={500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
