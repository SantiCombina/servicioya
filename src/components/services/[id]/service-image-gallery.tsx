'use client';

import Image from 'next/image';
import React, { useState } from 'react';

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
  const maxThumbnails = 6; // Máximo número de miniaturas visibles

  if (!images || images.length === 0) return null;

  const main = images[selectedIndex];
  const mainUrl = getImageUrl(main);
  const mainAlt = getImageAlt(main, title);

  // Solo mostrar thumbnails si hay más de una imagen
  const showThumbnails = images.length > 1;
  const visibleThumbs = images.slice(0, maxThumbnails);
  const hiddenCount = Math.max(0, images.length - maxThumbnails);

  return (
    <div className="flex gap-4">
      {/* Thumbnails Column - Solo mostrar si hay más de una imagen */}
      {showThumbnails && (
        <div className="flex flex-col justify-between w-16 h-[500px] flex-shrink-0">
          {visibleThumbs.map((img, index) => {
            const url = getImageUrl(img);
            const alt = getImageAlt(img, `Vista ${index + 1}`);
            const size = getImageSize(img, { width: 64, height: 64 });
            const isLastVisible = index === maxThumbnails - 1 && hiddenCount > 0;

            return (
              <button
                key={index}
                type="button"
                onMouseEnter={() => {
                  if (!isLastVisible) {
                    setSelectedIndex(index);
                  }
                }}
                onClick={() => {
                  if (!isLastVisible) {
                    setSelectedIndex(index);
                  }
                }}
                className={`relative w-16 h-16 rounded-sm overflow-hidden border flex-shrink-0 focus:outline-none transition-all duration-150 hover:border-primary ${
                  selectedIndex === index ? 'border-primary ring-1 ring-primary' : 'border-muted'
                }`}
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
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-2xl">
                    +{hiddenCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full h-[500px] overflow-hidden">
          <Image src={mainUrl} alt={mainAlt} fill className="object-contain transition-all duration-200" priority />
        </div>
      </div>
    </div>
  );
}
