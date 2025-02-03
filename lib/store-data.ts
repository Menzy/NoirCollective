export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'equipment' | 'ingredients' | 'merchandise';
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Professional Chef Knife",
    description: "High-carbon stainless steel chef knife with ergonomic handle",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546",
    category: "equipment",
    inStock: true,
  },
  {
    id: "2",
    name: "Noir Culinary Apron",
    description: "Premium black cotton apron with adjustable neck strap",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16",
    category: "merchandise",
    inStock: true,
  },
  {
    id: "3",
    name: "Artisanal Truffle Oil",
    description: "Premium black truffle infused olive oil",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc",
    category: "ingredients",
    inStock: true,
  },
  {
    id: "4",
    name: "Copper Saucepan Set",
    description: "Professional-grade copper saucepan set with lids",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1592154014052-2d36140a5ea0",
    category: "equipment",
    inStock: false,
  },
  {
    id: "5",
    name: "Signature Spice Blend",
    description: "Exclusive house-made spice blend",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757",
    category: "ingredients",
    inStock: true,
  },
  {
    id: "6",
    name: "Culinary Course Video Series",
    description: "Digital access to exclusive cooking technique videos",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1592155931584-901ac15763e3",
    category: "merchandise",
    inStock: true,
  },
];