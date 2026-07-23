import Image from 'next/image';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { Check, Maximize, Users, BedDouble, Snowflake, Wifi, Tv, Bath, Droplet, Sparkles, Shirt, Ban, Heart, Coffee, Star, Smile, Bell } from 'lucide-react';

const getAmenityEmoji = (text) => {
  const t = text.toLowerCase();
  if (t.includes('room size')) return '📏';
  if (t.includes('occupancy') || t.includes('adult') || t.includes('family') || t.includes('families') || t.includes('group') || t.includes('friend')) return '👥';
  if (t.includes('couple')) return '💑';
  if (t.includes('bed')) return '🛏️';
  if (t.includes('air conditioning') || t.includes(' ac ') || t.includes('ac room')) return '❄️';
  if (t.includes('wi-fi') || t.includes('wifi')) return '📶';
  if (t.includes('tv') || t.includes('television')) return '📺';
  if (t.includes('bathroom') || t.includes('hot & cold') || t.includes('shower')) return '🛀';
  if (t.includes('drinking water') || t.includes('room service') || t.includes('tea')) return '☕';
  if (t.includes('toiletries') || t.includes('towel')) return '🧴';
  if (t.includes('housekeeping')) return '🧹';
  if (t.includes('wardrobe')) return '🚪';
  if (t.includes('smoking')) return '🚭';
  if (t.includes('recommend')) return '⭐';
  if (t.includes('comfort') || t.includes('peaceful') || t.includes('relaxing')) return '😌';
  return '✨';
};

// 👇 यह फंक्शन जरूरी है क्योंकि आपका output: 'export' सेट है 👇
export async function generateStaticParams() {
  try {
    const res = await fetch('https://admin.themangobitehotel.com/api/rooms', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.status && data.data) {
        return data.data.map((room) => ({
          id: room.id.toString(),
        }));
      }
    }
  } catch (error) {
    console.error('Failed to fetch rooms for static params:', error);
  }
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  let title = 'Room Details | Best Hotel in Mandvi Kutch';
  try {
    const res = await fetch(`https://admin.themangobitehotel.com/api/rooms`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.status && data.data) {
        const room = data.data.find(r => r.id.toString() === id);
        if (room) {
          title = `${room.title} | Mango Bite Hotel Mandvi`;
        }
      }
    }
  } catch (error) { }

  return {
    title,
    description: `Book the ${title} at Mango Bite Hotel & Restaurant in Mandvi, Kutch. The best luxury rooms and cheap stays featuring traditional artistry.`,
    keywords: 'best luxury rooms in mandvi, a.c. rooms in kutch, deluxe hotel rooms mandvi, cheap and best stay in kutch, mango bite hotel rooms, mandvi beach hotel rooms',
  };
}

export default async function RoomDetails({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  let room = null;
  let apiDebugStatus = "Pending";

  try {
    // Fetching Data Serverside
    const res = await fetch(`https://admin.themangobitehotel.com/api/rooms`, {
      cache: 'no-store', // Always fetch fresh data
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    if (res.ok) {
      const data = await res.json();
      apiDebugStatus = "API Request Success";
      if (data && data.status && data.data) {
        room = data.data.find(r => r.id.toString() === id.toString());
        if (!room) {
          apiDebugStatus = `Success, but Room ID ${id} not found in array.`;
        }
      } else {
        apiDebugStatus = "API returned success, but data format is wrong.";
      }
    } else {
      apiDebugStatus = `API Request Failed. Status: ${res.status}`;
    }
  } catch (error) {
    apiDebugStatus = `Fetch Error: ${error.message}`;
  }

  // Debug Screen
  if (!room) {
    return (
      <div style={{ padding: '150px 20px', minHeight: '100vh', textAlign: 'center', backgroundColor: '#fcfaf8' }}>
        <h1 style={{ color: 'red', marginBottom: '20px' }}>⚠️ Data Fetch Issue</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}><strong>Requested Room ID:</strong> {id}</p>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}><strong>API Status:</strong> {apiDebugStatus}</p>
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto 30px' }}>
          404 Error इसी वजह से आ रहा था क्योंकि सर्वर को API से इस ID का रूम नहीं मिल रहा है। कृपया चेक करें कि API सही डेटा दे रही है या नहीं।
        </p>
        <Link href="/rooms" style={{ padding: '10px 20px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>
          Go Back to Rooms
        </Link>
      </div>
    );
  }

  // Handle Main Image URL
  let mainImageUrl = room.image;
  if (mainImageUrl && !mainImageUrl.startsWith('/images/')) {
    mainImageUrl = mainImageUrl.startsWith('/storage')
      ? `https://admin.themangobitehotel.com${mainImageUrl}`
      : `https://admin.themangobitehotel.com/storage/${mainImageUrl}`;
  }

  // WhatsApp setup
  const whatsappNumber = '918490991577';
  const whatsappMessage = encodeURIComponent(`Hello, I would like to book the ${room.title}.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Process Description
  let cleanDesc = room.description || '';
  cleanDesc = cleanDesc.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, '');
  cleanDesc = cleanDesc.replace(/<p>[^<]*?(?:<strong>)?(?:Room Information|Why Choose This Room\?|Room Amenities|Room Features)(?:<\/strong>)?[^<]*?<\/p>/gi, '');

  const listItems = [];
  const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
  let match;
  while ((match = liRegex.exec(room.description || '')) !== null) {
    listItems.push(match[1].replace(/<[^>]*>?/gm, '').trim());
  }
  cleanDesc = cleanDesc.replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, '');

  return (
    <div className="room-page-wrapper" style={{
      background: 'linear-gradient(135deg, #fcfaf8 0%, #f4eee6 100%)',
      minHeight: '100vh', position: 'relative'
    }}>
      <style>{`
        .room-page-wrapper { padding: 100px 15px 40px; }
        .room-main-card {
          display: flex; flex-direction: column; gap: 20px;
          background-color: #ffffff; border: 1px solid rgba(197, 85, 59, 0.2);
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 5px 25px rgba(0,0,0,0.06); padding: 15px;
        }
        .hero-split-layout { display: flex; flex-direction: column; gap: 15px; }
        .hero-image-box {
          position: relative; width: 100%; min-height: 250px;
          border-radius: 12px; overflow: hidden; background-color: #fcfaf8;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .hero-details-box {
          display: flex; flex-direction: column; justify-content: center;
          background-color: #fdfdfd; border-radius: 12px; padding: 20px;
          border: 1px solid rgba(197, 85, 59, 0.1); box-shadow: 0 5px 20px rgba(0,0,0,0.02);
        }
        .hero-title-text {
          color: var(--dark); font-size: 2rem; margin: 0 0 15px 0;
          font-family: var(--font-heading); line-height: 1.2;
        }
        .room-content-area { padding: 10px; margin-top: 15px; }
        
        @media (min-width: 768px) {
          .room-page-wrapper { padding: 120px 0 60px; }
          .room-main-card { padding: 30px; gap: 40px; border-radius: 20px; box-shadow: 0 0 50px rgba(0,0,0,0.08); }
          .hero-split-layout { flex-direction: row; align-items: flex-start; gap: 30px; }
          .hero-image-box { flex: 1 1 50%; min-height: 400px; border-radius: 15px; position: sticky; top: 120px; }
          .hero-details-box { flex: 1 1 50%; padding: 40px; border-radius: 15px; }
          .hero-title-text { font-size: 2.8rem; margin-bottom: 20px; }
          .room-content-area { padding: 0 20px; margin-top: 20px; }
        }
      `}</style>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <BackButton style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '20px', textDecoration: 'none', fontWeight: '600', backgroundColor: '#fff', padding: '8px 16px', borderRadius: '50px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          &larr; Back
        </BackButton>

        <div className="room-main-card">
          <div className="hero-split-layout">
            <div className="hero-image-box">
              <div style={{ position: 'absolute', inset: 0 }}>
                {mainImageUrl ? (
                  <Image src={mainImageUrl} alt={room.title} fill style={{ objectFit: 'cover' }} priority={true} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image Available</div>
                )}
              </div>
            </div>

            <div className="hero-details-box">
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(197, 85, 59, 0.1)', color: 'var(--primary)', padding: '6px 15px', borderRadius: '20px', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', alignSelf: 'flex-start', fontWeight: '700' }}>Premium Stay</div>
              <h1 className="hero-title-text">{room.title}</h1>
              <div
                style={{ lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '10px' }}
                dangerouslySetInnerHTML={{ __html: cleanDesc }}
              />
            </div>
          </div>

          <div className="room-content-area">
            {listItems.length > 0 && (
              <div style={{ marginBottom: '40px', paddingTop: '20px' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '25px', fontSize: '1.5rem', borderBottom: '2px solid rgba(197, 85, 59, 0.2)', paddingBottom: '10px', display: 'inline-block' }}>Key Features & Amenities</h3>
                <style>{`
                  .amenity-card {
                    background: linear-gradient(145deg, #ffffff 0%, #fff8f2 100%);
                    border: 1.5px solid rgba(230, 126, 34, 0.3); border-radius: 16px;
                    padding: 25px 15px; display: flex; flex-direction: column;
                    align-items: center; justify-content: center; text-align: center; gap: 15px;
                    color: #333; box-shadow: 0 4px 15px rgba(230, 126, 34, 0.08); transition: all 0.3s ease;
                  }
                  .amenity-card:hover {
                    transform: translateY(-6px); box-shadow: 0 12px 25px rgba(230, 126, 34, 0.3);
                    border-color: #e67e22;
                  }
                `}</style>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                  {listItems.map((item, idx) => (
                    <div key={idx} className="amenity-card">
                      <div style={{ fontSize: '3rem', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                        {getAmenityEmoji(item)}
                      </div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.4', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              marginTop: '30px', padding: '20px 30px', backgroundColor: '#fff',
              borderRadius: '16px', boxShadow: '0 5px 25px rgba(0,0,0,0.06)',
              border: '1px solid rgba(197, 85, 59, 0.1)', display: 'flex',
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'
            }}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#25D366', color: '#fff', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', fontSize: '1.1rem', boxShadow: '0 5px 15px rgba(37, 211, 102, 0.3)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                Book Now via WhatsApp
              </a>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', textAlign: 'right' }}>
                ₹{parseInt(room.price).toLocaleString('en-IN')} <span style={{ fontSize: '1.1rem', fontWeight: '500', opacity: 0.8, color: 'var(--text-muted)' }}>/night</span>
              </div>
            </div>

            {room.sub_images && room.sub_images.length > 0 && (
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '20px', fontSize: '1.5rem' }}>Room Gallery</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                  {room.sub_images.map((img, idx) => {
                    let subImgUrl = img;
                    if (!subImgUrl.startsWith('/images/')) {
                      subImgUrl = subImgUrl.startsWith('/storage')
                        ? `https://admin.themangobitehotel.com${subImgUrl}`
                        : `https://admin.themangobitehotel.com/storage/${subImgUrl}`;
                    }
                    return (
                      <div key={idx} style={{ position: 'relative', height: '200px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        <Image src={subImgUrl} alt={`${room.title} - Image ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}