import React from 'react';
import GalleryDetailClient from './GalleryDetailClient';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch('https://admin.themangobitehotel.com/api/galleries', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    const activeEvent = data.data?.find(g => g.slug === slug || g.id.toString() === slug);

    if (activeEvent) {
      return {
        title: `${activeEvent.title} Gallery | Mango Bite Hotel`,
        description: activeEvent.description || 'Explore our photo gallery.',
      };
    }
  } catch (error) {
    console.error('Metadata fetch error:', error);
  }

  return {
    title: 'Gallery | Mango Bite Hotel',
  };
}

export default async function GalleryDetailPage({ params }) {
  const { slug } = await params;
  let activeEvent = null;
  let prevSlug = null;
  let nextSlug = null;

  try {
    const res = await fetch('https://admin.themangobitehotel.com/api/galleries', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const galleries = data.data || [];
      
      const currentIndex = galleries.findIndex(g => g.slug === slug || g.id.toString() === slug);
      if (currentIndex !== -1) {
        activeEvent = galleries[currentIndex];
        
        if (currentIndex > 0) {
          const prev = galleries[currentIndex - 1];
          prevSlug = prev.slug || prev.id;
        }
        if (currentIndex < galleries.length - 1) {
          const next = galleries[currentIndex + 1];
          nextSlug = next.slug || next.id;
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
  }

  return (
    <GalleryDetailClient activeEvent={activeEvent} prevSlug={prevSlug} nextSlug={nextSlug} />
  );
}
