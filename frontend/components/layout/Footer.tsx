import { Footer as FooterNav } from "quirk-ui";

export default function Footer() {
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

  return (
    <FooterNav
      logo={<span>LOGO</span>}
      items={navItems}
      copyright={`${new Date().getFullYear()}`}
    />
  );
}
