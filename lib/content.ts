export const content = {
  brand: 'SAISTA COFFEE', tagline: 'From Nature, To Your Cup.', whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919000000000', demoNotice: 'DEMO CONTENT — VERIFY ALL BRAND INFORMATION BEFORE LAUNCH',
  story: { origin: 'Coorg, Karnataka, India', farm: 'SAISTA Estate', process: 'Natural Process', roast: 'Small-batch roasting designed to develop sweetness, balance and aroma while preserving the character of the coffee.' },
  products: [
    { id: 'signature', name: 'SAISTA SIGNATURE', type: '100% Arabica', format: 'Whole Bean', roast: 'Medium Roast', notes: 'Cocoa · Caramel · Roasted Nuts', price: '₹699', weight: '250g', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85' },
    { id: 'origin', name: 'SAISTA ORIGIN', type: '100% Arabica', format: 'Ground', roast: 'Light Roast', notes: 'Citrus · Honey · Floral', price: '₹799', weight: '250g', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=85' },
    { id: 'dark', name: 'SAISTA DARK', type: '100% Arabica', format: 'Whole Bean', roast: 'Dark Roast', notes: 'Dark Chocolate · Brown Sugar · Smoky Finish', price: '₹649', weight: '250g', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85' },
    { id: 'daily', name: 'SAISTA DAILY', type: 'Arabica Blend', format: 'Ground', roast: 'Medium Roast', notes: 'Chocolate · Nuts · Smooth Finish', price: '₹499', weight: '250g', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85' }
  ],
  quality: [{ title: 'Origin', description: 'Understanding where every coffee begins.' }, { title: 'Selection', description: 'Choosing beans with attention to quality and character.' }, { title: 'Roasting', description: 'Developing flavour through carefully controlled roasting.' }, { title: 'Freshness', description: 'Delivering coffee designed to be enjoyed at its best.' }, { title: 'Craft', description: 'Respecting every stage between farm and cup.' }],
  testimonials: [{ quote: 'Beautiful aroma and incredibly smooth.', author: 'Demo Customer' }, { quote: 'Loved the balance between sweetness and roast.', author: 'Demo Customer' }]
} as const;
export function whatsappLink(message: string) { return `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(message)}`; }
