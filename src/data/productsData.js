// src/data/mockData.js - FIXED (No duplicate exports)
export const mockCategories = [
  { id: 1, name: 'Laptops', slug: 'laptops', icon: '💻', count: 12 },
  { id: 2, name: 'Computer Accessories', slug: 'accessories', icon: '🖱️', count: 15 },
  { id: 3, name: 'Networking Devices', slug: 'networking', icon: '🌐', count: 8 },
  { id: 4, name: 'Phone Accessories', slug: 'phone-accessories', icon: '📱', count: 10 },
  { id: 5, name: 'Computer Components', slug: 'components', icon: '🔧', count: 7 },
  { id: 6, name: 'Technology Gadgets', slug: 'gadgets', icon: '🎧', count: 6 },
];

export const mockBrands = [
  'Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Microsoft', 'Logitech', 'Corsair', 'Kingston', 'TP-Link'
];

export const mockUsers = [
  { id: 1, name: 'Hary Kims', email: 'hkintertech22@gmail.com', password: 'admin123', role: 'admin', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', phone: '+254712345678', address: 'Nairobi, Kenya' },
  { id: 2, name: 'Regular User', email: 'user@example.com', password: 'user123', role: 'user', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', phone: '+254723456789', address: 'Mombasa, Kenya' },
];

export const mockReviews = [
  { id: 1, productId: 1, userId: 2, userName: 'Jane Smith', rating: 5, comment: 'Excellent laptop! Fast and reliable.', date: '2024-01-15' },
  { id: 2, productId: 2, userId: 1, userName: 'John Doe', rating: 4, comment: 'Great phone, amazing camera quality.', date: '2024-01-20' },
  { id: 3, productId: 3, userId: 2, userName: 'Jane Smith', rating: 5, comment: 'Best headphones I ever owned!', date: '2024-02-01' },
];

const baseProducts = [
  {
    id: 1,
    name: 'Logitech MX Master 3S Wireless Mouse',
    brand: 'Logitech',
    category: 'Computer Accessories',
    price: 9900,
    originalPrice: 12900,
    discount: 23,
    description: 'Master your flow with the MX Master 3S – an iconic mouse remastered. Now with Quiet Clicks and 8K DPI tracking for more feel and performance than ever before. This mouse features an ergonomic design that supports your palm and fingers for all-day comfort. The MagSpeed Electromagnetic scroll wheel is fast enough to scroll 1,000 lines in a second and precise enough to stop on a pixel.',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
      'https://images.unsplash.com/photo-1527814732934-9ad91a396efd?w=500',
      'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=500',
      'https://images.unsplash.com/photo-1586810165616-94c631fc2f79?w=500'
    ],
    specs: {
      sensor: 'Darkfield high precision',
      dpi: '8000 DPI',
      buttons: '7 buttons',
      battery: 'Up to 70 days',
    },
    rating: 4.9,
    stock: 50,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
  },
  {
    id: 2,
    name: 'Razer BlackWidow V4 Mechanical Keyboard',
    brand: 'Razer',
    category: 'Computer Accessories',
    price: 18900,
    originalPrice: 22900,
    discount: 17,
    description: 'Command a higher level of control with the Razer BlackWidow V4 — a mechanical gaming keyboard designed for precision, durability, and a stunning RGB experience. Featuring Razer Green Mechanical Switches for clicky, tactile feedback and a dedicated set of macro keys for maximum efficiency. The keyboard also includes a plush leatherette wrist rest for long-lasting comfort during intense gaming sessions.',
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33f75e1c?w=500',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500',
      'https://images.unsplash.com/photo-1541140532154-b024d715b909?w=500'
    ],
    specs: {
      switches: 'Razer Green Mechanical',
      lighting: 'Razer Chroma RGB',
      polling: '8000Hz',
      wristRest: 'Magnetic Plush Leatherette',
    },
    rating: 4.7,
    stock: 18,
    isNew: true,
    isTrending: true,
  },
  {
    id: 3,
    name: 'Dell UltraSharp 27" 4K USB-C Monitor',
    brand: 'Dell',
    category: 'Computer Accessories',
    price: 59900,
    originalPrice: 69900,
    discount: 14,
    description: 'Experience true color and detail with the Dell UltraSharp 27 4K USB-C Hub Monitor. Features brilliant colors and extensive connectivity options including USB-C with up to 90W power delivery. The IPS Black technology provides deeper blacks and better gray scale performance. Ideal for creative professionals who require precise color accuracy and a clean workspace with single-cable connectivity.',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
      'https://images.unsplash.com/photo-1547119957-630f9c44b952?w=500',
      'https://images.unsplash.com/photo-1552308995-2baac1ad5490?w=500',
      'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=500'
    ],
    specs: {
      resolution: '3840 x 2160 (4K)',
      panel: 'IPS Black Technology',
      ports: 'USB-C (90W PD), HDMI, DisplayPort',
      brightness: '400 cd/m2',
    },
    rating: 4.8,
    stock: 12,
    isTrending: true,
    isBestSeller: true,
  },
  {
    id: 4,
    name: 'Corsair Vengeance 32GB DDR5 RAM Kit',
    brand: 'Corsair',
    category: 'Computer Components',
    price: 12900,
    originalPrice: 15900,
    discount: 19,
    description: 'CORSAIR VENGEANCE DDR5 memory is optimized for Intel motherboards, delivering higher frequencies and greater capacities in a high-quality, compact module. DDR5 memory pushes the limits of your system with faster frequencies, greater capacities, and better performance. The sleek design with aluminum heat spreader ensures efficient cooling and looks great in any modern build.',
    images: [
      'https://images.unsplash.com/photo-1562976540-1502c2145188?w=500',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500',
      'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=500',
      'https://images.unsplash.com/photo-1555617766-c94804975da3?w=500'
    ],
    specs: {
      capacity: '32GB (2 x 16GB)',
      speed: '5200MHz',
      type: 'DDR5',
      latency: 'CL40',
    },
    rating: 4.9,
    stock: 25,
    isNew: true,
  },
  {
    id: 5,
    name: 'HP LaserJet Pro M404dn Printer',
    brand: 'HP',
    category: 'Computer Accessories',
    price: 29900,
    originalPrice: 34900,
    discount: 14,
    description: 'A powerful monochrome laser printer designed to help you focus on growing your business and staying ahead of the competition. Features fast print speeds, robust security features, and energy-saving technology. With automatic two-sided printing and built-in Ethernet networking, it is the perfect solution for small to medium-sized office environments.',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500',
      'https://images.unsplash.com/photo-1563351672-62b74891a28a?w=500',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=500',
      'https://images.unsplash.com/photo-1612815154546-6469a4911dcb?w=500'
    ],
    specs: {
      speed: 'Up to 40 ppm',
      duplex: 'Automatic',
      connectivity: 'USB, Ethernet',
      capacity: '250-sheet input tray',
    },
    rating: 4.6,
    stock: 10,
  },
  {
    id: 6,
    name: 'Logitech C922 Pro Stream Webcam',
    brand: 'Logitech',
    category: 'Computer Accessories',
    price: 9900,
    originalPrice: 11900,
    discount: 16,
    description: 'Connect with superior clarity every time you go live on channels like Twitch and YouTube. Stream anything you want in your choice of Full 1080p at 30fps or hyperfast HD 720p at 60fps. The glass lens and 78-degree field of view capture every detail in bright, natural colors, while the dual microphones capture natural sound from every angle.',
    images: [
      'https://images.unsplash.com/photo-1626961202005-7f300958189c?w=500',
      'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500',
      'https://images.unsplash.com/photo-1515343483479-4453509ac000?w=500'
    ],
    specs: {
      resolution: '1080p/30fps - 720p/60fps',
      focus: 'Autofocus',
      lens: 'Full HD Glass',
      mic: 'Dual Stereo',
    },
    rating: 4.8,
    stock: 30,
    isBestSeller: true,
  },
  {
    id: 7,
    name: 'Samsung 990 PRO 2TB NVMe SSD',
    brand: 'Samsung',
    category: 'Computer Components',
    price: 18900,
    originalPrice: 24900,
    discount: 24,
    description: 'The ultimate SSD. Reach max performance with PCIe 4.0. Experience long-lasting, industry-leading speed. The smart heat control of the internal controller delivers supreme power efficiency while maintaining ferocious speed and performance, to always keep you at the top of your game.',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500',
      'https://images.unsplash.com/photo-1531492746076-1a1bd9b29fcb?w=500',
      'https://images.unsplash.com/photo-1555617766-c94804975da3?w=500'
    ],
    specs: {
      capacity: '2TB',
      interface: 'PCIe Gen 4.0 x4, NVMe 2.0',
      read: 'Up to 7450 MB/s',
      write: 'Up to 6900 MB/s',
    },
    rating: 4.9,
    stock: 40,
    isTrending: true,
  },
  {
    id: 8,
    name: 'TP-Link Deco XE75 Mesh WiFi 6E System',
    brand: 'TP-Link',
    category: 'Networking Devices',
    price: 34900,
    originalPrice: 44900,
    discount: 22,
    description: 'Eliminate weak signal areas with whole home Mesh WiFi. Connect over 200 devices with the latest WiFi 6E technology. Experience ultra-fast speeds and incredibly low latency with the new 6GHz band. The Deco XE75 is designed to provide seamless coverage throughout your home, ensuring that you stay connected no matter where you are.',
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=500',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=500',
      'https://images.unsplash.com/photo-1562408590-e32931084e23?w=500'
    ],
    specs: {
      speed: 'AXE5400',
      coverage: 'Up to 5500 sq ft',
      bands: 'Tri-Band (6GHz, 5GHz, 2.4GHz)',
      ports: '3 x Gigabit ports per unit',
    },
    rating: 4.7,
    stock: 15,
    isNew: true,
  },
  {
    id: 9,
    name: 'Asus ROG Swift PG279QM Gaming Monitor',
    brand: 'Asus',
    category: 'Computer Accessories',
    price: 74900,
    originalPrice: 84900,
    discount: 11,
    description: '27-inch QHD (2560 x 1440) fast IPS gaming monitor with 240Hz refresh rate designed for professional gamers. Featuring NVIDIA G-SYNC processor for smooth, tear-free gaming and Reflex Latency Analyzer for accurate system latency measurement. The Fast IPS technology enables a 1ms response time (GTG) for sharp gaming visuals with high frame rates.',
    images: [
      'https://images.unsplash.com/photo-1547119957-630f9c44b952?w=500',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
      'https://images.unsplash.com/photo-1552308995-2baac1ad5490?w=500',
      'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=500'
    ],
    specs: {
      refresh: '240Hz',
      response: '1ms (GTG)',
      gSync: 'NVIDIA G-SYNC',
      hdr: 'DisplayHDR 400',
    },
    rating: 4.8,
    stock: 8,
  },
  {
    id: 10,
    name: 'HyperX Cloud II Pro Gaming Headset',
    brand: 'HyperX',
    category: 'Computer Accessories',
    price: 9900,
    originalPrice: 12900,
    discount: 23,
    description: 'HyperX Cloud II was built to be an ultra-comfortable gaming headset with amazing sound. We put a lot of thought into the details of our HyperX signature memory foam, the premium leatherette, clamping force, and weight distribution. It is no wonder that it has become the preferred headset for millions of gamers.',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    ],
    specs: {
      audio: 'Virtual 7.1 Surround Sound',
      driver: '53mm',
      connection: '3.5mm / USB',
      weight: '320g',
    },
    rating: 4.7,
    stock: 60,
    isBestSeller: true,
  },
  {
    id: 11,
    name: 'Seagate IronWolf 8TB NAS Hard Drive',
    brand: 'Seagate',
    category: 'Computer Components',
    price: 19900,
    originalPrice: 24900,
    discount: 20,
    description: 'IronWolf is designed for consumer and commercial NAS. Delivering Tough, Ready and Scalable performance 24x7 in multi-bay networked environments. Optimized with AgileArray technology for system agility and reliability, IronWolf drives are always on and always working.',
    images: [
      'https://images.unsplash.com/photo-1531492746076-1a1bd9b29fcb?w=500',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500',
      'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=500'
    ],
    specs: {
      capacity: '8TB',
      interface: 'SATA 6Gb/s',
      rpm: '7200 RPM',
      cache: '256MB',
    },
    rating: 4.6,
    stock: 22,
  },
  {
    id: 12,
    name: 'APC Back-UPS Pro 1500VA',
    brand: 'APC',
    category: 'Computer Accessories',
    price: 22900,
    originalPrice: 27900,
    discount: 18,
    description: 'High Performance Computer and Electronics UPS for Premium Power Protection. The Back-UPS Pro provides abundant battery backup power, so you can work through medium and low length power outages. It also safeguards your equipment against damaging surges and spikes that travel along utility and data lines.',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=500',
      'https://images.unsplash.com/photo-1563351672-62b74891a28a?w=500',
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500'
    ],
    specs: {
      output: '1500VA / 865W',
      outlets: '10 outlets',
      type: 'Line Interactive',
      display: 'LCD Status Display',
    },
    rating: 4.7,
    stock: 12,
    isTrending: true,
  },
];

// Generate additional products to reach 50+
const generateMoreProducts = () => {
  const brands = mockBrands;
  const categories = mockCategories;
  const products = [...baseProducts];
  
  for (let i = 13; i <= 50; i++) {
    const brand = brands[i % brands.length];
    const category = categories[i % categories.length];
    const price = Math.floor(Math.random() * 15000) + 500;
    products.push({
      id: i,
      name: `${brand} ${category.name} Product ${i}`,
      brand: brand,
      category: category.name,
      price: price,
      originalPrice: Math.floor(price * 1.15),
      discount: Math.floor(Math.random() * 30),
      description: `High-quality ${category.name.toLowerCase()} from ${brand}. This product is designed with the latest technology to ensure maximum performance and reliability. It features a sleek and modern design that will complement any workspace. Whether you are a professional or a casual user, this ${category.name.toLowerCase()} is the perfect choice for your needs.`,
      images: [
        `https://picsum.photos/id/${i + 100}/500/500`,
        `https://picsum.photos/id/${i + 150}/500/500`,
        `https://picsum.photos/id/${i + 200}/500/500`,
        `https://picsum.photos/id/${i + 250}/500/500`
      ],
      specs: {
        feature1: 'Premium quality',
        feature2: 'Latest technology',
        feature3: '1-year warranty',
      },
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      stock: Math.floor(Math.random() * 50) + 5,
      isNew: i > 45,
      isTrending: i % 7 === 0,
      isBestSeller: i % 5 === 0,
    });
  }
  return products;
};

export const mockProducts = generateMoreProducts();