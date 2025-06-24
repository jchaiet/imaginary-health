"use client";
import { Navbar } from "quirk-ui";
import type { NavItem } from "quirk-ui";

type Props = {
  logo?: React.ReactNode;
  // logoLink: string;
  items: NavItem[];
};

export default function NavbarWrapper({ items, logo }: Props) {
  return <Navbar logo={<>{logo}</>} items={items} />;
}
