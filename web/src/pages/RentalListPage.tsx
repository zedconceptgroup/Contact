import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '@pms/shared/src/models';

const RentalListPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then(setProperties)
      .catch(() => setProperties([]));
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCity = cityFilter ? p.city === cityFilter : true;
      return matchesSearch && matchesCity;
    });
  }, [properties, search, cityFilter]);

  const cities = Array.from(new Set(properties.map((p) => p.city)));

  return (
    <div className="page">
      <div className="card">
        <div className="search-row" style={{ marginBottom: 10 }}>
          <input
            className="input"
            placeholder="Search rentals"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="select" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <button className="button">Add Rental</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Phone</th>
              <th>City</th>
              <th>Country</th>
              <th>Distributed</th>
              <th>Ready</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((property) => (
              <tr key={property.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <Link to={`/rentals/${property.id}`} className="badge">
                    {property.name}
                  </Link>
                </td>
                <td>
                  {property.beds} beds · {property.baths} baths · {property.guests} guests
                </td>
                <td>{property.phone}</td>
                <td>{property.city}</td>
                <td>{property.country}</td>
                <td>{property.distributed ? '🌐' : '—'}</td>
                <td className="badge-check">{property.ready ? '✔' : '⏳'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalListPage;
