import React, { useEffect, useState } from 'react';
// import { fetchDashboardStats } from '../services/dashboardService';
import Card from '../../components/card';
import InfoCard from '../../components/InfoCard';

const Dashboard = () => {
  const [stats, setStats] = useState({
  "totalProducts": 8,
  "totalStock": 65,
  "ordersToday": 0,
  "revenue": 1000,
  "outOfStock": [
    {"name": "Screen", "category": "Electronic"}
  ],
  "highestSaleProduct": {
    "name": "Monitor",
    "category": "Electronic",
    "totalUnitsSold": 2
  },
  "lowStock": [
    {"name": "Monitor", "stock": 3, "category": "Electronic"},
    {"name": "PC", "stock": 3, "category": "Tech"},
    {"name": "RAM", "stock": 2, "category": "Tech"}
  ]
});


  // useEffect(() => {
  //   fetchDashboardStats().then(data => setStats(data));
  // }, []);

  if (!stats) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card title="Total Products" value={stats.totalProducts} color="bg-blue-500" />
        <Card title="Total Stock" value={stats.totalStock} color="bg-green-500" />
        <Card title="Order Today" value={stats.ordersToday} color="bg-yellow-500" />
        <Card title="Revenue" value={`$${stats.revenue}`} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <InfoCard title="Out of Stock Products">
          {stats.outOfStock.map((item, index) => (
            <div key={index}>{item.name} <span className="text-gray-500">({item.category})</span></div>
          ))}
        </InfoCard>

        <InfoCard title="Highest Sale Product">
          <p><strong>Name:</strong> {stats.highestSaleProduct.name}</p>
          <p><strong>Category:</strong> {stats.highestSaleProduct.category}</p>
          <p><strong>Total Units Sold:</strong> {stats.highestSaleProduct.totalUnitsSold}</p>
        </InfoCard>

        <InfoCard title="Low Stock Products">
          {stats.lowStock.map((item, index) => (
            <div key={index}>
              <strong>{item.name}</strong> - {item.stock} left <span className="text-gray-500">({item.category})</span>
            </div>
          ))}
        </InfoCard>
      </div>
    </div>
  );
};





export default Dashboard;
