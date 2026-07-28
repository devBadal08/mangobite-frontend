import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import RoomGalleryClient from "@/components/RoomGalleryClient";
import { notFound } from "next/navigation";
import {
  Check,
  Maximize,
  Users,
  BedDouble,
  Snowflake,
  Wifi,
  Tv,
  Bath,
  Droplet,
  Sparkles,
  Shirt,
  Ban,
  Heart,
  Coffee,
  Star,
  Smile,
  Bell,
} from "lucide-react";

const getAmenityIcon = (text) => {
  const t = text.toLowerCase();
  const iconProps = {
    size: 42,
    color: "#d35400",
    strokeWidth: 1.5,
    style: { filter: "drop-shadow(3px 5px 5px rgba(211, 84, 0, 0.5))" },
  };

  if (t.includes("room size")) return <Maximize {...iconProps} />;
  if (
    t.includes("occupancy") ||
    t.includes("adult") ||
    t.includes("family") ||
    t.includes("families") ||
    t.includes("group") ||
    t.includes("friend")
  )
    return <Users {...iconProps} />;
  if (t.includes("couple")) return <Heart {...iconProps} />;
  if (t.includes("bed")) return <BedDouble {...iconProps} />;
  if (
    t.includes("air conditioning") ||
    t.includes(" ac ") ||
    t.includes("ac room")
  )
    return <Snowflake {...iconProps} />;
  if (t.includes("wi-fi") || t.includes("wifi")) return <Wifi {...iconProps} />;
  if (t.includes("tv") || t.includes("television"))
    return <Tv {...iconProps} />;
  if (
    t.includes("bathroom") ||
    t.includes("hot & cold") ||
    t.includes("shower")
  )
    return <Bath {...iconProps} />;
  if (
    t.includes("drinking water") ||
    t.includes("room service") ||
    t.includes("tea")
  )
    return <Coffee {...iconProps} />;
  if (t.includes("toiletries") || t.includes("towel"))
    return <Droplet {...iconProps} />;
  if (t.includes("housekeeping")) return <Sparkles {...iconProps} />;
  if (t.includes("wardrobe")) return <Shirt {...iconProps} />;
  if (t.includes("smoking")) return <Ban {...iconProps} />;
  if (t.includes("recommend")) return <Star {...iconProps} />;
  if (t.includes("comfort") || t.includes("peaceful") || t.includes("relaxing"))
    return <Smile {...iconProps} />;
  return <Check {...iconProps} />;
};

export default async function Roomspage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  let room = null;
  let prevId = null;
  let nextId = null;
  let apiDebugStatus = "Pending";

  try {
    const res = await fetch(`https://admin.themangobitehotel.com/api/rooms`, {
      cache: "no-store", // ✅ Use no-store for completely dynamic fetching
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      apiDebugStatus = "API Request Success";
      if (data && data.status && data.data) {
        const rooms = data.data;
        const currentIndex = rooms.findIndex((r) => r.id.toString() === id.toString());
        if (currentIndex !== -1) {
          room = rooms[currentIndex];
          if (currentIndex > 0) prevId = rooms[currentIndex - 1].id;
          if (currentIndex < rooms.length - 1) nextId = rooms[currentIndex + 1].id;
        }
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

  if (!room) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#fff', minHeight: '60vh' }}>
        <h1 style={{ color: 'red', marginBottom: '20px' }}>⚠️ 404 - Room Not Found</h1>
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', display: 'inline-block', textAlign: 'left', border: '1px solid #ddd' }}>
          <p><strong>Requested Room ID:</strong> {id}</p>
          <p><strong>API Fetch Status:</strong> {apiDebugStatus}</p>
          <p style={{ marginTop: '15px', color: '#666', fontSize: '0.9rem' }}>
            * This error appears because the API did not return a room matching this ID.<br/>
            * If you are on the server, try running `npm run build` again.
          </p>
        </div>
        <br/>
        <Link href="/rooms" style={{ display: 'inline-block', marginTop: '30px', padding: '10px 20px', background: 'var(--primary)', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Go Back to Rooms
        </Link>
      </div>
    );
  }

  // Handle Main Image URL
  let mainImageUrl = room.image;
  if (mainImageUrl && !mainImageUrl.startsWith("/images/")) {
    mainImageUrl = mainImageUrl.startsWith("/storage")
      ? `https://admin.themangobitehotel.com${mainImageUrl}`
      : `https://admin.themangobitehotel.com/storage/${mainImageUrl}`;
  }

  // WhatsApp setup
  const whatsappNumber = "918490991577";
  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to book the ${room.title}.`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Process Description
  let cleanDesc = room.description || "";
  cleanDesc = cleanDesc.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, "");
  cleanDesc = cleanDesc.replace(
    /<p>[^<]*?(?:<strong>)?(?:Room Information|Why Choose This Room\?|Room Amenities|Room Features)(?:<\/strong>)?[^<]*?<\/p>/gi,
    "",
  );

  const listItems = [];
  const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
  let match;
  while ((match = liRegex.exec(room.description || "")) !== null) {
    listItems.push(match[1].replace(/<[^>]*>?/gm, "").trim());
  }
  cleanDesc = cleanDesc.replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, "");

  return (
    <div
      className="room-page-wrapper"
      style={{
        background: "linear-gradient(135deg, #fcfaf8 0%, #f4eee6 100%)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <style>{`
        .room-page-wrapper { padding: 20px 15px 40px; }
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
          .room-page-wrapper { padding: 40px 0 60px; }
          .room-main-card { padding: 30px; gap: 40px; border-radius: 20px; box-shadow: 0 0 50px rgba(0,0,0,0.08); }
          .hero-split-layout { flex-direction: row; align-items: flex-start; gap: 30px; }
          .hero-image-box { flex: 1 1 50%; min-height: 400px; border-radius: 15px; position: sticky; top: 120px; }
          .hero-details-box { flex: 1 1 50%; padding: 40px; border-radius: 15px; }
          .hero-title-text { font-size: 2.8rem; margin-bottom: 20px; }
          .room-content-area { padding: 0 20px; margin-top: 20px; }
        }
      `}</style>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="room-main-card">
          <div className="hero-split-layout">
            <div className="hero-image-box">
              <div style={{ position: "absolute", inset: 0 }}>
                {mainImageUrl ? (
                  <Image
                    src={mainImageUrl}
                    alt={room.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority={true}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            <div className="hero-details-box">
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(197, 85, 59, 0.1)",
                  color: "var(--primary)",
                  padding: "6px 15px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                  alignSelf: "flex-start",
                  fontWeight: "700",
                }}
              >
                Premium Stay
              </div>
              <h1 className="hero-title-text">{room.title}</h1>
              <div
                style={{
                  lineHeight: "1.8",
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  marginBottom: "10px",
                }}
                dangerouslySetInnerHTML={{ __html: cleanDesc }}
              />
            </div>
          </div>

          <div className="room-content-area">
            {room.sub_images && room.sub_images.length > 0 && (
              <RoomGalleryClient
                title={room.title}
                images={room.sub_images.map((img) => {
                  let url = img;
                  if (!url.startsWith("/images/")) {
                    url = url.startsWith("/storage")
                      ? `https://admin.themangobitehotel.com${url}`
                      : `https://admin.themangobitehotel.com/storage/${url}`;
                  }
                  return url;
                })}
              />
            )}

            {listItems.length > 0 && (
              <div style={{ marginBottom: "40px", paddingTop: "20px" }}>
                <h3
                  style={{
                    color: "var(--primary)",
                    marginBottom: "25px",
                    fontSize: "1.5rem",
                    borderBottom: "2px solid rgba(197, 85, 59, 0.2)",
                    paddingBottom: "10px",
                    display: "inline-block",
                  }}
                >
                  Key Features & Amenities
                </h3>
                <style>{`
                  .amenity-card {
                    background: #ffffff;
                    border: 1px solid rgba(255, 255, 255, 0.4); 
                    border-radius: 16px;
                    padding: 25px 15px; display: flex; flex-direction: column;
                    align-items: center; justify-content: center; text-align: center; gap: 15px;
                    color: #333; 
                    box-shadow: 
                      -8px -8px 15px rgba(255, 255, 255, 0.8),
                      8px 8px 15px rgba(211, 84, 0, 0.1),
                      inset 2px 2px 4px rgba(255, 255, 255, 1);
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                  }
                  .amenity-card:hover {
                    transform: translateY(-5px); 
                    box-shadow: 
                      -10px -10px 20px rgba(255, 255, 255, 1),
                      10px 10px 20px rgba(211, 84, 0, 0.15),
                      inset 2px 2px 4px rgba(255, 255, 255, 1);
                  }
                  .icon-3d-wrapper {
                    display: flex; align-items: center; justify-content: center;
                    width: 75px; height: 75px;
                    border-radius: 50%;
                    background: linear-gradient(145deg, #ffffff, #f0f0f0);
                    box-shadow:  5px 5px 10px rgba(211, 84, 0, 0.1), -5px -5px 10px #ffffff;
                    margin-bottom: 10px;
                  }
                `}</style>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "25px",
                    padding: "10px",
                  }}
                >
                  {listItems.map((item, idx) => (
                    <div key={idx} className="amenity-card">
                      <div className="icon-3d-wrapper">
                        {getAmenityIcon(item)}
                      </div>
                      <span
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: "1.4",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              style={{
                marginTop: "30px",
                padding: "20px 30px",
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 5px 25px rgba(0,0,0,0.06)",
                border: "1px solid rgba(197, 85, 59, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  padding: "15px 30px",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                  fontSize: "1.1rem",
                  boxShadow: "0 5px 15px rgba(37, 211, 102, 0.3)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                </svg>
                Book Now via WhatsApp
              </a>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "var(--primary)",
                  textAlign: "right",
                }}
              >
                ₹{parseInt(room.price).toLocaleString("en-IN")}{" "}
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    opacity: 0.8,
                    color: "var(--text-muted)",
                  }}
                >
                  /night
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1rem' }}>
          
          <div style={{ flex: 1, textAlign: 'left' }}>
            {prevId && (
              <Link href={`/rooms/${prevId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '50px', backgroundColor: '#fff', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '1.2rem' }}>&larr;</span> Previous Room
              </Link>
            )}
          </div>

          <div style={{ flex: 1, textAlign: 'center' }}>
            <Link href="/rooms" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
              Back to Rooms
            </Link>
          </div>

          <div style={{ flex: 1, textAlign: 'right' }}>
            {nextId && (
              <Link href={`/rooms/${nextId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '50px', backgroundColor: '#fff', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                Next Room <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
