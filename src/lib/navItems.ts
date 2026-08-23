
export type NavItem = {
  label: string;
  href: string;
  isMega?: boolean;
  dropdown?: { label: string; href: string; }[];
  columns?: { header?: string; items: { label: string; href: string; subMenu?: { label: string; href: string; }[]; }[] }[][];
};

export const navItems: NavItem[] = [
  { 
    label: "Customize Neon Sign", 
    href: "#",
    dropdown: [
      { label: "Custom Neon Sign", href: "/products/customize-neon-signs" },
      { label: "Mojo Mix", href: "/products/customize-mojo-mix" },
      { label: "UV Printed Neon", href: "/products/uv-printed-neon" },
      { label: "Business Logo", href: "/products/business-logo" },
    ]
  },
  { 
    label: "Neon Shop", 
    href: "/shop-neon-collection",
    isMega: true,
    columns: [
      [
        {
          header: "Personal & Home",
          items: [
            { label: "Gaming Neon Signs", href: "/shop-neon-collection?cat=gaming-neon-signs" },
            { label: "Man Cave Neon Signs", href: "/shop-neon-collection?cat=man-cave-neon-signs" },
            { label: "Home Decor Neon Signs", href: "/shop-neon-collection?cat=home-decor-neon-signs" },
            { label: "Quotes & Typography", href: "/shop-neon-collection?cat=quotes-typography" },
            { label: "Gods & Devotional Neon Signs", href: "/shop-neon-collection?cat=gods-devotional-neon-signs" },
            { label: "Love / Heart Neon Signs", href: "/shop-neon-collection?cat=love-heart-neon-signs" },
            { label: "Clock Neon Signs", href: "/shop-neon-collection?cat=clock-neon-signs" },
            { label: "Skull & Gothic Signs", href: "/shop-neon-collection?cat=skull-gothic-signs" },
            { label: "Astronaut & Space Signs", href: "/shop-neon-collection?cat=astronaut-space-signs" },
            { label: "Travel & Wanderlust", href: "/shop-neon-collection?cat=travel-wanderlust" },
          ]
        },
        {
          header: "Deals",
          items: [
            { label: "B-Stock", href: "/shop-neon-collection?cat=b-stock" },
          ]
        }
      ],
      [
        {
          header: "Business & Events",
          items: [
            { label: "For Businesses & Offices", href: "/shop-neon-collection?cat=for-businesses-offices" },
            { label: "Barber Shop & Salon Signs", href: "/shop-neon-collection?cat=barber-shop-salon-signs" },
            { label: "Beauty, Nail & Hair Salon Neon Signs", href: "/shop-neon-collection?cat=beauty-nail-hair-salon-neon-signs" },
            { label: "Café & Coffee Shop Signs", href: "/shop-neon-collection?cat=caf-coffee-shop-signs" },
            { label: "Bars & Pub Neon Signs", href: "/shop-neon-collection?cat=bars-pub-neon-signs" },
            { label: "Gym, Fitness & Yoga Signs", href: "/shop-neon-collection?cat=gym-fitness-yoga-signs" },
            { label: "Happy Birthday Neon Signs", href: "/shop-neon-collection?cat=happy-birthday-neon-signs" },
            { label: "New Year Neon Signs", href: "/shop-neon-collection?cat=new-year-neon-signs" },
            { label: "Tattoo Shop Neon Signs", href: "/shop-neon-collection?cat=tattoo-shop-neon-signs" },
          ]
        },
      ]
    ]
  },
  { label: "Track Order", href: "/customer" },
  { label: "Support", href: "/contact-us" }
];

