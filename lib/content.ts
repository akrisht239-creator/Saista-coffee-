export const content = {
  brand: 'SAISTA COFFEE',
  tagline: 'From Nature, To Your Cup.',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919000000000',
  demoNotice: 'DEMO CONTENT — VERIFY ALL BRAND INFORMATION BEFORE LAUNCH',
  story: {
    origin: 'Coorg, Karnataka, India',
    farm: 'SAISTA Estate',
    process: 'Natural Process',
    roast: 'Small-batch roasting designed to develop sweetness, balance and aroma while preserving the character of the coffee.'
  },
  products: [
    { id: 'signature', name: 'SAISTA SIGNATURE', type: '100% Arabica', roast: 'Medium Roast', notes: 'Cocoa · Caramel · Roasted Nuts', price: '₹699', weight: '250g', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85' },
    { id: 'origin', name: 'SAISTA ORIGIN', type: '100% Arabica', roast: 'Light Roast', notes: 'Citrus · Honey · Floral', price: '₹799', weight: '250g', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=85' },
    { id: 'dark', name: 'SAISTA DARK', type: '100% Arabica', roast: 'Dark Roast', notes: 'Dark Chocolate · Brown Sugar · Smoky Finish', price: '₹649', weight: '250g', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85' },
    { id: 'daily', name: 'SAISTA DAILY', type: 'Arabica Blend', roast: 'Medium Roast', notes: 'Chocolate · Nuts · Smooth Finish', price: '₹499', weight: '250g', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85' }
  ]
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
