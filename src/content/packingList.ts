export type PackingItem = {
  id: string;
  name: string;
  description: string;
  isRequired?: boolean;
};

export type PackingCategory = {
  id: string;
  title: string;
  items: PackingItem[];
};

export const mustCarryItems: PackingItem[] = [
  { id: "mc-1", name: "Raincoat / Poncho", description: "Monsoon showers can arrive without warning.", isRequired: true },
  { id: "mc-2", name: "Umbrella", description: "Useful during breaks and while exploring viewpoints.", isRequired: true },
  { id: "mc-3", name: "Backpack Rain Cover", description: "Protects clothing, electronics and valuables.", isRequired: true },
  { id: "mc-4", name: "Trekking Shoes", description: "Good grip is essential on slippery forest trails and wet rocks.", isRequired: true },
  { id: "mc-5", name: "Water Bottle (Min 2L)", description: "Stay hydrated throughout the trek.", isRequired: true }
];

export const packingCategories: PackingCategory[] = [
  {
    id: "cat-clothing",
    title: "Clothing",
    items: [
      { id: "cl-1", name: "Quick Dry T-Shirts", description: "2-3 pairs. Avoid cotton." },
      { id: "cl-2", name: "Trek Pants", description: "Quick dry material recommended. Avoid jeans." },
      { id: "cl-3", name: "Extra Socks", description: "3-4 pairs. Wet socks are common during monsoon treks." },
      { id: "cl-4", name: "Light Jacket / Fleece", description: "For early mornings and evenings." },
      { id: "cl-5", name: "Comfortable Night Wear", description: "For homestay and Airbnb stay." }
    ]
  },
  {
    id: "cat-essentials",
    title: "Trekking Essentials",
    items: [
      { id: "te-2", name: "Power Bank", description: "Network and GPS usage drain batteries quickly." },
      { id: "te-3", name: "Cap / Hat", description: "For sun protection when weather clears." },
      { id: "te-4", name: "Sunglasses", description: "Optional but useful at viewpoints." },
      { id: "te-5", name: "Trek Pole", description: "Optional. Helpful during steep descents." }
    ]
  },
  {
    id: "cat-personal",
    title: "Personal Care",
    items: [
      { id: "pc-1", name: "Sunscreen", description: "Even during monsoon, UV exposure can be high." },
      { id: "pc-2", name: "Mosquito Repellent", description: "Recommended for forest areas." },
      { id: "pc-3", name: "Personal Toiletries", description: "Carry travel-sized essentials." },
      { id: "pc-4", name: "Personal Medication", description: "Bring any prescription medicines." },
      { id: "pc-5", name: "Basic First Aid", description: "Band-aids, Pain relief, Antiseptic cream." }
    ]
  },
  {
    id: "cat-electronics",
    title: "Electronics",
    items: [
      { id: "el-1", name: "Mobile Phone", description: "For communication and photography." },
      { id: "el-2", name: "Charging Cable", description: "Do not forget." },
      { id: "el-3", name: "Camera", description: "Optional but highly recommended. The scenery is spectacular." },
      { id: "el-4", name: "Waterproof Mobile Pouch", description: "Strongly recommended during river crossings and waterfalls." }
    ]
  },
  {
    id: "cat-optional",
    title: "Optional but Recommended",
    items: [
      { id: "op-1", name: "Energy Bars", description: "Quick energy during the trek." },
      { id: "op-2", name: "Chocolates", description: "Useful for energy boosts." },
      { id: "op-4", name: "Small Garbage Bag", description: "Leave no trace. Carry back personal waste." }
    ]
  }
];

export const prohibitedItems = [
  "Large suitcases",
  "Expensive jewellery",
  "Heavy clothing",
  "Excessive luggage",
  "Single-use plastics"
];
