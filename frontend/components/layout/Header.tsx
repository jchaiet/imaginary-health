import { Navbar } from "quirk-ui";

export default function Header() {
  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "About",
      sublinks: [
        { label: "Leadership", href: "/leadership" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      label: "Services",
      sublinks: [
        { label: "Service 1", href: "/service-1" },
        { label: "Service 2", href: "/service-2" },
      ],
    },
    {
      label: "Products",
      href: "/products",
    },
    { label: "Contact", href: "/contact" },
  ];

  return <Navbar logo={<span>LOGO</span>} items={navItems} isSticky />;
}
