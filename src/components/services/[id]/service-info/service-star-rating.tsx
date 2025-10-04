import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fillColor?: string;
}

export function StarRating({ rating, size = 'md', className = '', fillColor = 'yellow' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const colorClasses = {
    yellow: 'fill-yellow-400 text-yellow-400',
    blue: 'fill-blue-500 text-blue-500',
  };

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? colorClasses[fillColor as keyof typeof colorClasses] || colorClasses.yellow
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
