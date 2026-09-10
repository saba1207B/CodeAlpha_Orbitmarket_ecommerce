export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  badge?: string;
  color: string;
  image: string;
  detailImage: string;
  description: string;
  specs: string[];
};

const imageBase = "https://images.unsplash.com/";
const image = (id: string, width = 900) => `${imageBase}${id}?auto=format&fit=crop&w=${width}&q=86`;

export const products: Product[] = [
  {
    id: "arc-lamp",
    name: "Arc Study Lamp",
    category: "Objects",
    price: 3499,
    compareAt: 4299,
    badge: "Editor’s pick",
    color: "sand",
    image: image("photo-1505693416388-ac5ce068fe85"),
    detailImage: image("photo-1540932239986-30128078f3c5", 1200),
    description: "A sculptural desk lamp with a linen shade and an easy, warm glow for slow mornings and late-night ideas.",
    specs: ["Powder-coated steel", "Natural linen shade", "Warm LED bulb included"],
  },
  {
    id: "terra-mug",
    name: "Terra Stack Mug",
    category: "Kitchen",
    price: 799,
    badge: "New",
    color: "terracotta",
    image: image("photo-1493663284031-b7e3aefcae8e"),
    detailImage: image("photo-1493663284031-b7e3aefcae8e", 1200),
    description: "Hand-thrown stoneware with a quiet, rounded handle. Designed to feel good in the palm and stack neatly in the cupboard.",
    specs: ["Hand-thrown stoneware", "350 ml capacity", "Dishwasher safe"],
  },
  {
    id: "linen-tote",
    name: "Everyday Linen Tote",
    category: "Carry",
    price: 1499,
    color: "sage",
    image: image("photo-1524758631624-e2822e304c36"),
    detailImage: image("photo-1497366754035-f200968a6e72", 1200),
    description: "A generous, durable carryall cut from washed linen canvas. The daily companion for market runs, library trips, and everything between.",
    specs: ["100% washed linen canvas", "Internal pocket", "Reinforced handles"],
  },
  {
    id: "stone-vase",
    name: "Quiet Stone Vase",
    category: "Objects",
    price: 1899,
    compareAt: 2399,
    badge: "Bestseller",
    color: "cream",
    image: image("photo-1522708323590-d24dbb6b0267"),
    detailImage: image("photo-1522708323590-d24dbb6b0267", 1200),
    description: "A soft, chalky vessel that brings a little architecture to a bookshelf or bedside table, with or without a stem.",
    specs: ["Glazed ceramic", "23 cm tall", "Each piece varies slightly"],
  },
  {
    id: "field-notebook",
    name: "Field Notes Set",
    category: "Paper",
    price: 599,
    color: "ink",
    image: image("photo-1531058020387-3be344556be6"),
    detailImage: image("photo-1518005020951-eccb494ad742", 1200),
    description: "Three pocket notebooks for lists, sketches, and the thoughts that show up on the way home.",
    specs: ["Set of three", "Recycled paper", "Smyth-sewn binding"],
  },
  {
    id: "cloud-throw",
    name: "Cloud Cotton Throw",
    category: "Textiles",
    price: 2799,
    compareAt: 3299,
    badge: "Soft landing",
    color: "blue",
    image: image("photo-1505693416388-ac5ce068fe85"),
    detailImage: image("photo-1518005020951-eccb494ad742", 1200),
    description: "Lightweight cotton with a nubby texture and just enough weight for a sofa nap or a breezy evening outside.",
    specs: ["100% cotton", "130 × 180 cm", "Machine washable"],
  },
  {
    id: "brass-catchall",
    name: "Brass Catchall Tray",
    category: "Objects",
    price: 999,
    color: "brass",
    image: image("photo-1505693416388-ac5ce068fe85"),
    detailImage: image("photo-1497366754035-f200968a6e72", 1200),
    description: "A small cast-brass landing place for keys, rings, and the little things you don’t want to lose.",
    specs: ["Solid brass", "Hand-finished", "14 cm diameter"],
  },
  {
    id: "cedar-candle",
    name: "Cedar / Smoke Candle",
    category: "Rituals",
    price: 899,
    badge: "Slow burn",
    color: "charcoal",
    image: image("photo-1522708323590-d24dbb6b0267"),
    detailImage: image("photo-1531058020387-3be344556be6", 1200),
    description: "A grounding blend of cedar, charred wood, and a little moss. Poured in a reusable smoked-glass tumbler.",
    specs: ["Soy wax blend", "45 hour burn time", "Phthalate-free fragrance"],
  },
];

export const categories = ["All pieces", "Objects", "Kitchen", "Carry", "Paper", "Textiles", "Rituals"];
export const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
