export type Product = {
  _id: string;
  name: string;
  price: number;
  comparePrice: number;
  description: string;
  image: { url: string; publicId: string };
  gallery: { url: string; alt: string }[];
  category: string;
  material: string;
  color: string;
  sizes: number[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  size: number | null;
  qty: number;
};
