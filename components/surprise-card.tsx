"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Calendar, MapPin, Clock, Lock, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface SurpriseCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
}

export function SurpriseCard({
  title,
  description,
  date,
  location,
  time,
  onAccept,
  onDecline,
  className
}: SurpriseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isUnlocked = date === 'Disponible ahora' || date === 'Próximamente' || !date;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onAccept}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-pink-50 border-2 border-pink-200 p-6 shadow-lg cursor-pointer group transition-all duration-200 hover:shadow-2xl hover:border-pink-400',
        className
      )}
      style={{ minHeight: 260 }}
      tabIndex={0}
      role="button"
      aria-pressed="false"
    >
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
          <Lock className="w-5 h-5 text-green-500" />
        </span>
      </div>
      <span className="absolute left-6 top-6 text-yellow-300 text-2xl animate-pulse select-none">✨</span>
      <span className="absolute right-10 top-10 text-yellow-200 text-xl animate-pulse select-none">✨</span>
      <span className="absolute left-10 bottom-10 text-yellow-200 text-xl animate-pulse select-none">✨</span>
      <div className="flex justify-center mb-2">
        <Gift className="w-14 h-14 text-pink-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">{title}</h2>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <div className="flex justify-center mb-2">
        <Button
          onClick={e => { e.stopPropagation(); onAccept && onAccept(); }}
          className="bg-pink-600 hover:bg-pink-700 text-white w-full max-w-xs text-lg rounded-xl py-2"
        >
          <Heart className="inline mr-2" /> Abrir Sorpresa
        </Button>
      </div>
      <div className="text-center text-sm text-gray-500 mt-2">
        Desbloqueada: {date || 'Disponible ahora'}
      </div>
    </motion.div>
  );
}
