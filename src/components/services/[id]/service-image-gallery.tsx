import Image from 'next/image';

interface ServiceImageGalleryProps {
  images: string[];
  title: string;
}

export function ServiceImageGallery({ images, title }: ServiceImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <>
      <Image src={images[0]} alt={title} width={600} height={400} className="w-full h-96 object-cover rounded-t-lg" />
      {images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto">
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-muted flex-shrink-0"
            >
              <Image
                src={image}
                alt={`Vista ${index + 2}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
