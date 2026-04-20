import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Star, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const deliveryPersons = [
  { name: 'Ravi Kumar', rating: 4.8, trips: 1250, phone: '+91 98765 43210', image: null },
  { name: 'Amit Singh', rating: 4.9, trips: 890, phone: '+91 98765 43211', image: null },
  { name: 'Priya Sharma', rating: 4.7, trips: 650, phone: '+91 98765 43212', image: null },
];

export default function DeliveryPersonCard({ orderId }) {
  // Simulate random delivery person based on order
  const person = deliveryPersons[Math.abs(orderId?.charCodeAt(0) || 0) % deliveryPersons.length];

  return (
    <motion.div
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-14 h-14 border-2 border-[#F77F00]">
            <AvatarImage src={person.image} />
            <AvatarFallback className="bg-gradient-to-br from-[#D62828] to-[#F77F00] text-white font-semibold">
              {person.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
            <Bike className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-[#2B2B2B]">{person.name}</h4>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#FCBF49] fill-[#FCBF49]" />
              {person.rating}
            </span>
            <span>•</span>
            <span>{person.trips}+ trips</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10 border-[#F77F00] text-[#F77F00] hover:bg-[#FFF3E0]"
            onClick={() => window.open(`tel:${person.phone}`)}
          >
            <Phone className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10 border-[#D62828] text-[#D62828] hover:bg-red-50"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Your delivery partner is on the way. You can contact them for any delivery updates.
        </p>
      </div>
    </motion.div>
  );
}