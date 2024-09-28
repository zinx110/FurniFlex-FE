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
} from 'recharts';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalSales: 0,
    userGrowthData: [],
    salesData: [],
  });

  // Rolling up animation state
  const [animatedUsers, setAnimatedUsers] = useState(0);
  const [animatedProducts, setAnimatedProducts] = useState(0);
  const [animatedCategories, setAnimatedCategories] = useState(0);
  const [animatedSales, setAnimatedSales] = useState(0);

  // Animation function
  const animateValue = (value, setValue) => {
    let start = 0;
    const end = value;
    const duration = 1000; // 1 second
    const increment = Math.ceil(end / (duration / 100));

    const animate = () => {
      if (start < end) {
        start += increment;
        setValue(Math.min(start, end));
        setTimeout(animate, 100);
      } else {
        setValue(end);
      }
    };
    animate();
  };

  // Fetch the total users from API
  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/TotalUserCount`, {
        headers: {
          Authorization: `Bearer ${user?.AuthToken}`,
        },
      });
      const totalUsers = response.data;
      setDashboardData(prevData => ({ ...prevData, totalUsers }));
      animateValue(totalUsers, setAnimatedUsers);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  // Fetch the total categories from API
  const fetchTotalCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Categories/Count`, {
        headers: {
          Authorization: `Bearer ${user?.AuthToken}`,
        },
      });
      const { count: totalCategories } = response.data;
      setDashboardData(prevData => ({ ...prevData, totalCategories }));
      animateValue(totalCategories, setAnimatedCategories);
    } catch (error) {
      console.error('Error fetching total categories:', error);
    }
  };

  // Fetch the total products from API
  const fetchTotalProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Products/Count`, {
        headers: {
          Authorization: `Bearer ${user?.AuthToken}`,
        },
      });
      const totalProducts = response.data; // Assuming response.data returns a number
      setDashboardData(prevData => ({ ...prevData, totalProducts }));
      animateValue(totalProducts, setAnimatedProducts);
    } catch (error) {
      console.error('Error fetching total products:', error);
    }
  };

  // Fetch sales data from API
  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Orders/SalesData`, {
        headers: {
          Authorization: `Bearer ${user?.AuthToken}`,
        },
      });
      const salesData = response.data;

      // Group sales data by day for visualization
      const salesByDay = salesData.reduce((acc, sale) => {
        const day = new Date(sale.CreatedAt).toLocaleDateString('en-US', { weekday: 'short' });
        acc[day] = (acc[day] || 0) + sale.TotalPrice;
        return acc;
      }, {});

      const salesDataArray = Object.entries(salesByDay).map(([name, totalPrice]) => ({ name, totalPrice }));

      // Update the dashboard data state
      setDashboardData(prevData => ({
        ...prevData,
        salesData: salesDataArray,
        totalSales: salesData.reduce((total, sale) => total + sale.TotalPrice, 0),
      }));

      // Animate total sales value
      animateValue(salesData.reduce((total, sale) => total + sale.TotalPrice, 0), setAnimatedSales);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  // Fetch user growth data from API
  const fetchUserGrowthData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/UserCreatedAtData`, {
        headers: {
          Authorization: `Bearer ${user?.AuthToken}`,
        },
      });
      const userGrowthData = response.data;

      // Group user data by day for visualization
      const growthByDay = userGrowthData.reduce((acc, date) => {
        const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      const userGrowthDataArray = Object.entries(growthByDay).map(([name, count]) => ({
        name,
        count,
      }));

      setDashboardData(prevData => ({
        ...prevData,
        userGrowthData: userGrowthDataArray,
      }));
    } catch (error) {
      console.error('Error fetching user growth data:', error);
    }
  };

  useEffect(() => {
    fetchTotalUsers(); 
    fetchUserGrowthData(); 
    fetchTotalCategories(); 
    fetchTotalProducts(); 
    fetchSalesData(); 
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
        <div className="chart-box" style={{ flex: '1', minWidth: '300px', height: '300px' }}>
          <h2>Sales This Week</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboardData.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" name='Total sales' dataKey="totalPrice" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box" style={{ flex: '1', minWidth: '300px', height: '300px' }}>
          <h2>User Growth</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboardData.userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
