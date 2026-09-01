
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
    label: 'Neon Shop', 
    href: '/shop-neon-collection',
    isMega: true,
    columns: []
  },
  { label: "Track Order", href: "/customer" },
  { label: "Support", href: "/contact-us" }
];
