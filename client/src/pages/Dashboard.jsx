import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Submitted Request</h2>
          <div className="text-3xl font-bold text-blue-600">0</div>
          <p className="text-sm text-blue-600 mt-2">No pending requests</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-purple-800 mb-3">Alerts</h2>
          <div className="flex items-start mb-3">
            <div className="bg-orange-500 w-3 h-3 rounded-full mt-1.5"></div>
            <div className="ml-3">
              <p className="font-semibold text-orange-600">Birthday</p>
              <p className="text-gray-800">Shashi Choudhary</p>
              <p className="text-sm text-gray-500">07-Nov</p>
            </div>
          </div>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-green-800 mb-3">Recruitment Alerts</h2>
          <div className="text-3xl font-bold text-green-600">0</div>
          <p className="text-sm text-green-600 mt-2">No new alerts</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-yellow-800 mb-3">Quick Stats</h2>
          <div className="text-3xl font-bold text-yellow-600">0</div>
          <p className="text-sm text-yellow-600 mt-2">No data available</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <p className="text-gray-600">No recent activities to display</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              New Request
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;