export interface Property {
  id: number;
  title: string;
  slug: string;
  location: string;
  price: string;
  oldPrice?: string;
  image: string;
  details: string[];
  description: string[];
}

const properties: Property[] = [
  {
    id: 1,
    title: "Rumah 3 Lantai",
    slug: "rumah-3-lantai",
    location: "Jakarta Selatan",
    price: "Rp. 1.200.000.000",
    oldPrice: "Rp. 1.500.000.000",
    image:
      "https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg",
    details: [
      "2 Kamar Tidur",
      "2 Kamar Mandi",
      "Luas Tanah: 120 m2",
      "Luas Bangunan: 90 m2",
      "Garasi: 1 Mobil",
    ],
    description: [
      "Fully furnished",
      "Dekat sekolah dan pusat perbelanjaan",
      "Lingkungan aman",
      "Akses transportasi mudah",
    ],
  },
  {
    id: 2,
    title: "Apartment Mewah",
    slug: "apartment-mewah",
    location: "Depok",
    price: "Rp. 2.000.000.000",
    image:
      "https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg",
    details: [
      "3 Kamar Tidur",
      "2 Kamar Mandi",
      "Luas Bangunan: 150 m2",
      "Kolam Renang",
    ],
    description: [
      "Dekat pusat kota",
      "Keamanan 24 jam",
      "Akses transportasi mudah",
    ],
  },
  {
    id: 3,
    title: "Rumah Minimalis",
    slug: "rumah-minimalis",
    location: "Bandung",
    price: "Rp. 800.000.000",
    oldPrice: "Rp. 1.000.000.000",
    image:
      "https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg",
    details: [
      "2 Kamar Tidur",
      "1 Kamar Mandi",
      "Luas Tanah: 100 m2",
      "Luas Bangunan: 80 m2",
    ],
    description: [
      "Dekat dengan alam",
      "Lingkungan tenang",
      "Akses transportasi mudah",
    ],
  },
  {
    id: 4,
    title: "Villa Mewah",
    slug: "villa-mewah",
    location: "Bali",
    price: "Rp. 10.000.000.000",
    image:
      "https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg",
    details: [
      "4 Kamar Tidur",
      "4 Kamar Mandi",
      "Luas Tanah: 500 m2",
      "Luas Bangunan: 400 m2",
      "Kolam Renang",
    ],
    description: [
      "Pemandangan laut",
      "Dekat dengan pantai",
      "Lingkungan eksklusif",
    ],
  },
  {
    id: 5,
    title: "Rumah Cluster",
    slug: "rumah-cluster",
    location: "Surabaya",
    price: "Rp. 2.500.000.000",
    image:
      "https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg",
    details: [
      "3 Kamar Tidur",
      "2 Kamar Mandi",
      "Luas Tanah: 150 m2",
      "Luas Bangunan: 120 m2",
      "Garasi: 2 Mobil",
    ],
    description: [
      "Dekat pusat perbelanjaan",
      "Keamanan 24 jam",
      "Akses transportasi mudah",
    ],
  },
  {
    id: 6,
    title: "Studio Apartment",
    slug: "studio-apartment",
    location: "Jakarta Pusat",
    price: "Rp. 1.000.000.000",
    image:
      "https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg",
    details: ["1 Kamar Tidur", "1 Kamar Mandi", "Luas Bangunan: 50 m2"],
    description: ["Dekat pusat kota", "Akses transportasi umum"],
  },
  // Add 12 more properties similar to above ensuring variety in locations, details, and pricing.
  ...Array.from({ length: 12 }, (_, index) => ({
    id: index + 7,
    title: `Properti ${index + 7}`,
    slug: `properti-${index + 7}`,
    location: "Lokasi Acak",
    price: `Rp. ${800 + index * 200}.000.000`,
    oldPrice: index % 2 === 0 ? `Rp. ${900 + index * 200}.000.000` : undefined,
    image:
      "https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg",
    details: ["1-3 Kamar Tidur", "1-2 Kamar Mandi", "Luas Tanah: 100-300m2"],
    description: ["Dekat Pusat School"],
  })),
];

export default properties;
