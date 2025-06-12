"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface PhotoHeaderProps {
  title: string;
  description?: string;
  likes?: number;
  comments?: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  className?: string;
}

export function PhotoHeader({
  title,
  description,
  likes = 0,
  comments = 0,
  onLike,
  onComment,
  onShare,
  className
}: PhotoHeaderProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800',
        className
      )}
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {description && (
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        )}
        
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                'flex items-center space-x-2 transition-colors',
                isLiked && 'text-pink-500'
              )}
            >
              <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
              <span>{likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onComment}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{comments}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="flex items-center space-x-2"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
