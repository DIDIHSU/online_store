import { Link } from "@tanstack/react-router";
import { Store, PackageSearch, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart";

export function MobileNav() {
  const { count } = useCart();

  const items = [
    { to: "/", label: "商城", icon: Store, exact: true },
    { to: "/product/hydro-bottle", label: "明細", icon: PackageSearch, exact: false },
    { to: "/cart", label: "購物車", icon: ShoppingCart, exact: false, badge: count },
    { to: "/account", label: "會員", icon: User, exact: false },
  ] as const;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background md:hidden">
      <ul className="grid grid-cols-4">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-muted-foreground"
              activeProps={{ className: "text-primary" }}
            >
              <span className="relative">
                <item.icon className="size-5" />
                {"badge" in item && item.badge ? (
                  <span className="absolute -right-2 -top-1.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] leading-4 text-primary-foreground">
                    {item.badge}
                  </span>
                ) : null}
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
