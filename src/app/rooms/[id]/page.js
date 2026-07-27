import Roomspage from "./roomspage";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  let title = "Room Details | Best Hotel in Mandvi Kutch";
  try {
    const res = await fetch(`https://admin.themangobitehotel.com/api/rooms`, {
      cache: "no-store", // Fully dynamic
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.status && data.data) {
        const room = data.data.find((r) => r.id.toString() === id);
        if (room) {
          title = `${room.title} | Mango Bite Hotel Mandvi`;
        }
      }
    }
  } catch (error) {}

  return {
    title,
    description: `Book the ${title} at Mango Bite Hotel & Restaurant in Mandvi, Kutch. The best luxury rooms and cheap stays featuring traditional artistry.`,
    keywords:
      "best luxury rooms in mandvi, a.c. rooms in kutch, deluxe hotel rooms mandvi, cheap and best stay in kutch, mango bite hotel rooms, mandvi beach hotel rooms",
  };
}

export default async function Page({ params }) {
  return <Roomspage params={params} />;
}
