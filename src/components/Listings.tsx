import { useEffect, useState } from 'react';

interface Listing {
  id: number;
  name: string;
  image: string; // masih JSON string
  transaction_count: number;
}

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings`)
      .then(res => res.json())
      .then(data => {
        // Jika pakai paginate, ambil data.data
        setListings(data.data.data || data.data);
      });
  }, []);

  return (
    <div>
      {listings.map(listing => (
        <div key={listing.id} style={{ marginBottom: '20px' }}>
          <h3>{listing.name}</h3>
          {/* parse JSON array gambar */}
          {JSON.parse(listing.image).map((img: string) => (
            <img
              key={img}
              src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${img}`}
              alt={listing.name}
              width={200}
              style={{ marginRight: '10px' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
