export type Checkpoint = {
  id: string;
  day: 1 | 2 | 3;
  time?: string;
  title: string;
  location: string;
  elevationM: number;
  distanceKm: number;
  description: string;
  tags?: string[];
  imageUrl?: string;
  sceneType?: 'forest' | 'river' | 'summit' | 'campfire' | 'sunrise' | 'valley' | 'waterfall' | 'homestay';
  funFact?: string;
  link?: string;
};

export const trekInfo = {
  name: "Netravati Expedition",
  organizer: "Netravati Expedition",
  dates: "26th Jun – 28th Jun",
  region: "Western Ghats, Karnataka",
  totalDistanceKm: 14,
  summitElevationM: 1520,
  baseElevationM: 800,
  difficulty: "Moderate to Strenuous",
  batchSize: 12,
};

export const itinerary: Checkpoint[] = [
  // DAY 1
  {
    id: "d1-mudigere",
    day: 1,
    time: "05:30 AM",
    title: "Arrival & Pickup",
    location: "Mudigere Bus Stand",
    elevationM: 980,
    distanceKm: 0,
    description: "Group meets at Mudigere. Scenic morning drive to our base in Samse.",
    tags: ["arrival", "transport"],
    imageUrl: "/illustrations/arrival_vector.png"
  },
  {
    id: "d1-samse",
    day: 1,
    time: "07:30 AM",
    title: "Basecamp Briefing",
    location: "Samse Homestay",
    elevationM: 850,
    distanceKm: 0,
    description: "Freshen up, enjoy a traditional Malnad breakfast, and attend the trek briefing.",
    tags: ["breakfast", "briefing"],
    imageUrl: "/illustrations/homestay_vector.png",
    funFact: ""
  },
  {
    id: "d1-checkpost",
    day: 1,
    time: "09:00 AM",
    title: "Into the Wild",
    location: "Netravati Forest Checkpost",
    elevationM: 950,
    distanceKm: 0.5,
    description: "Transition from road to trail. We begin with an off-road jeep stretch into the dense canopy.",
    tags: ["forest", "jeep"],
    imageUrl: "/illustrations/jeep_vector.png"
  },
  {
    id: "d1-river",
    day: 1,
    time: "11:30 AM",
    title: "The River Crossing",
    location: "Netravati River",
    elevationM: 1100,
    distanceKm: 3.5,
    description: "Navigate across the flowing streams. The ascent gets steeper from here.",
    tags: ["river-crossing", "waterfall"],
    imageUrl: "/illustrations/river_vector.png",
    funFact: "The Netravati river originates at Bangrabalige valley, Yelaneeru Ghat."
  },
  {
    id: "d1-summit-push",
    day: 1,
    time: "01:00 PM",
    title: "Above the Clouds",
    location: "Netravati Peak",
    elevationM: 1400,
    distanceKm: 6.0,
    description: "Breaking through the tree line. The wind picks up as we walk the final ridge.",
    tags: ["ascent", "viewpoint"],
    imageUrl: "/illustrations/summit_vector.png"
  },
  {
    id: "d1-summit",
    day: 1,
    time: "02:00 PM",
    title: "The Summit",
    location: "Netravati Peak",
    elevationM: 1520,
    distanceKm: 7.0,
    description: "Panoramic reward. We take our time here for a packed lunch and photography.",
    tags: ["summit", "lunch"],
    imageUrl: "/illustrations/summit_vector.png",
    funFact: "From the peak, you can see the Kudremukh peak on a clear day."
  },
  {
    id: "d1-return",
    day: 1,
    time: "05:30 PM",
    title: "Golden Hour Descent",
    location: "Samse Homestay",
    elevationM: 850,
    distanceKm: 14.0,
    description: "Return to the homestay as the sun sets. Rest your legs.",
    tags: ["descent", "rest", "dinner"],
    imageUrl: "/illustrations/viewpoint_vector.png"
  },


  // DAY 2
  {
    id: "d2-sunrise",
    day: 2,
    time: "07:30 AM",
    title: "Morning Light",
    location: "Samse Homestay",
    elevationM: 850,
    distanceKm: 14.0,
    description: "Wake up to birdsong and the aroma of fresh coffee and breakfast.",
    tags: ["morning", "breakfast"],
    imageUrl: "/illustrations/homestay_vector.png"
  },
  {
    id: "d2-maidadi",
    day: 2,
    time: "10:30 AM",
    title: "Valley Views",
    location: "Maidadi View Point",
    elevationM: 1050,
    distanceKm: 16.0,
    description: "A short drive/hike to maidadi view point 360-degree viewpoint over the ranges.",
    tags: ["viewpoint"],
    imageUrl: "/illustrations/viewpoint_vector.png"
  },
  {
    id: "d2-kodige",
    day: 2,
    time: "11:00 AM",
    title: "Kodige Water Falls",
    location: "Kodige Falls",
    elevationM: 920,
    distanceKm: 17.5,
    description: "Cool off by the waterfalls. A perfect mid-morning refresh.",
    tags: ["waterfall"],
    imageUrl: "/illustrations/waterfall_vector.png",
    funFact: "Also known as Dabbegundi falls, surrounded by coffee estates."
  },
  {
    id: "d2-lunch",
    day: 2,
    time: "01:30 PM",
    title: "Traditional Feast",
    location: "Local Village",
    elevationM: 900,
    distanceKm: 18.0,
    description: "Authentic Malnad lunch.",
    tags: ["lunch", "culture"],
    imageUrl: "/illustrations/homestay_vector.png"
  },
  {
    id: "d2-tea-estate",
    day: 2,
    time: "02:30 PM",
    title: "Tea Estate",
    location: "Tea Estate",
    elevationM: 900,
    distanceKm: 18.0,
    description: "Relaxing walk in the kelagur tea estate.",
    tags: ["tea-estate"],
    imageUrl: "/illustrations/tea_estate_vector.png"
  },
  {
    id: "d2-estate",
    day: 2,
    time: "05:30 PM",
    title: "Coffee Country",
    location: "Milan Farm Stay",
    elevationM: 950,
    distanceKm: 20.0,
    description: "Check into our private cofee plantation estate.",
    tags: ["estate", "sunset"],
    imageUrl: "https://a0.muscache.com/im/pictures/hosting/Hosting-804934854034152061/original/f6b1df9e-a5d3-4ff2-853d-0812dfa7e5ec.jpeg?im_w=720&width=720&quality=70&auto=webp",
    link: "https://www.airbnb.co.in/rooms/804934854034152061"
  },
  {
    id: "d2-night",
    day: 2,
    time: "08:00 PM",
    title: "Campfire Tales",
    location: "Milan Farm Stay",
    elevationM: 950,
    distanceKm: 20.0,
    description: "Dinner, firecamp (if weather permits), and night ambience in the estate. Stargazing and group wind-down.",
    tags: ["dinner", "campfire"],
    imageUrl: "/illustrations/campfire_vector.png",
    link: "https://www.airbnb.co.in/rooms/804934854034152061"
  },

  // DAY 3
  {
    id: "d3-morning",
    day: 3,
    title: "Slow Morning",
    location: "Milan Farm Stay",
    elevationM: 950,
    distanceKm: 20.0,
    description: "No alarms. Enjoy a slow morning with coffee tasting and a walk through the dew-covered plantation.",
    tags: ["morning", "walk"],
    imageUrl: "https://a0.muscache.com/im/pictures/hosting/Hosting-804934854034152061/original/f6b1df9e-a5d3-4ff2-853d-0812dfa7e5ec.jpeg?im_w=720&width=720&quality=70&auto=webp",
    link: "https://www.airbnb.co.in/rooms/804934854034152061"
  },
  {
    id: "d3-checkout",
    day: 3,
    time: "10:00 AM",
    title: "Farewell to the Mountains",
    location: "Mudigere Bus Stand",
    elevationM: 980,
    distanceKm: 22.0,
    description: "Check out and head back to the bus stand. Every summit leaves a story behind.",
    tags: ["departure"],
    imageUrl: "/illustrations/arrival_vector.png"
  }
];
