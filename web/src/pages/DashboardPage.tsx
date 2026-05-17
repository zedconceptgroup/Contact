import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { DashboardMetrics } from '@pms/shared/src/models';

const DashboardPage = () => {
  const [data, setData] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return <div className="card">Loading dashboard...</div>;
  }

  return (
    <div className="page">
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <div className="card stat-card">
          <div>
            <p className="small">Total Revenue</p>
            <h2>${data.totalRevenue.toLocaleString()}</h2>
          </div>
          <span className="badge">YTD</span>
        </div>
        <div className="card">
          <p className="section-title">Monthly Occupancy Rate</p>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyOccupancy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="rate" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <p className="section-title">Monthly Bookings</p>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="section-title">Monthly Revenue by Channel</p>
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyRevenue} stackOffset="expand">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="airbnb" stackId="a" fill="#2563eb" />
              <Bar dataKey="booking" stackId="a" fill="#f59e0b" />
              <Bar dataKey="direct" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-split">
        <div className="card">
          <p className="section-title">Upcoming Arrivals</p>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Property</th>
                <th>Guest</th>
                <th>Nights</th>
              </tr>
            </thead>
            <tbody>
              {data.upcomingArrivals.map((item) => (
                <tr key={item.guest + item.date}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.property}</td>
                  <td>{item.guest}</td>
                  <td>{item.nights}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <p className="section-title">Upcoming Departures</p>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Property</th>
                <th>Guest</th>
                <th>Nights</th>
              </tr>
            </thead>
            <tbody>
              {data.upcomingDepartures.map((item) => (
                <tr key={item.guest + item.date}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.property}</td>
                  <td>{item.guest}</td>
                  <td>{item.nights}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <p className="section-title">Notifications</p>
        <div className="notification-list">
          {data.notifications.map((note, idx) => (
            <div key={idx} className="card" style={{ padding: '10px 12px' }}>
              {note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
