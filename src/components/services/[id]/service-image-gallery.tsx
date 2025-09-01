'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Media } from '@/payload-types';

type GalleryImage = string | Media;

interface ServiceImageGalleryProps {
  images: GalleryImage[];
  title: string;
}

function getImageUrl(img: GalleryImage): string {
  if (typeof img === 'string') return img;
  return img.url || img.publicUrl || img.thumbnailURL || '/placeholder.svg';
}

function getImageAlt(img: GalleryImage, fallback: string): string {
  if (typeof img === 'string') return fallback;
  return img.alt || fallback;
}

function getImageSize(img: GalleryImage, fallback: { width: number; height: number }) {
  if (typeof img === 'string') return fallback;
  return {
    width: img.width || fallback.width,
    height: img.height || fallback.height,
  };
}

export function ServiceImageGallery({ images, title }: ServiceImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAll, setShowAll] = useState(false);
  const [maxVisible, setMaxVisible] = useState(images.length);

  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbsRef.current || showAll) {
      setMaxVisible(images.length);
      return;
    }
    const containerWidth = thumbsRef.current.offsetWidth;
    const thumbWidth = 80 + 8;
    const visible = Math.floor(containerWidth / thumbWidth);
    setMaxVisible(visible < images.length ? visible : images.length);
  }, [images.length, showAll]);

  if (!images || images.length === 0) return null;

  const main = images[selectedIndex];
  const mainUrl = getImageUrl(main);
  const mainAlt = getImageAlt(main, title);
  const mainSize = getImageSize(main, { width: 600, height: 400 });
  const hiddenCount = images.length - maxVisible;
  const visibleThumbs = images.slice(0, maxVisible);

  return (
    <>
      <Image
        src={mainUrl}
        alt={mainAlt}
        width={mainSize.width}
        height={mainSize.height}
        className="w-full h-96 object-cover rounded-t-lg transition-all duration-200"
      />
      {images.length > 1 && (
        <div ref={thumbsRef} className="flex gap-2 justify-start">
          {visibleThumbs.map((img, index) => {
            const url = getImageUrl(img);
            const alt = getImageAlt(img, `Vista ${index + 1}`);
            const size = getImageSize(img, { width: 80, height: 80 });
            const isLastVisible = !showAll && index === maxVisible - 1 && hiddenCount > 0;
            return (
              <button
                key={index}
                type="button"
                onMouseEnter={() => {
                  if (!isLastVisible) {
                    setSelectedIndex(index);
                  }
                }}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 focus:outline-none transition-all duration-150 ${selectedIndex === index ? 'border-primary ring-2 ring-primary' : 'border-muted'}`}
                aria-label={isLastVisible ? `Ver ${hiddenCount} imágenes más` : `Ver imagen ${index + 1}`}
              >
                <Image
                  src={url}
                  alt={alt}
                  width={size.width}
                  height={size.height}
                  className="w-full h-full object-cover"
                />
                {isLastVisible && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold">
                    +{hiddenCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
