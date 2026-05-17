import { useEffect, useState } from 'react';
import { Room } from '@pms/shared/src/models';

interface PropertyRooms {
  propertyId: string;
  rooms: Room[];
}

const RoomsPage = () => {
  const [data, setData] = useState<PropertyRooms[]>([]);

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="page">
      <div className="card">
        <p className="section-title">Rooms</p>
        {data.map((entry) => (
          <div key={entry.propertyId} className="card" style={{ marginBottom: 12 }}>
            <p className="section-title">Property {entry.propertyId}</p>
            {entry.rooms.length === 0 && <p className="small">No rooms configured yet.</p>}
            {entry.rooms.map((room, idx) => (
              <div key={idx} style={{ marginBottom: 10 }}>
                <strong>{room.name}</strong>
                <p className="small">
                  {room.roomType} · {room.roomSubType} · {room.size}
                </p>
                <p className="small">Bathroom: {room.bathroomType}</p>
                <p>{room.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
