import { Link } from "@tanstack/react-router";
import { Droplets, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

const navItems = [
  { to: "/", label: "商城", exact: true },
  { to: "/product/hydro-bottle", label: "商品明細", exact: false },
  { to: "/cart", label: "購物車", exact: false },
  { to: "/account", label: "會員中心", exact: false },
] as const;

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-shop grid h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-16">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <Droplets className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-secondary-foreground md:text-base">
              利每家<sup className="text-[0.6em]">®</sup>・智慧富氫水站
            </span>
            <span className="hidden text-xs text-muted-foreground md:block">前台商城</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-6">
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/cart"
            className="relative inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">購物車</span>
            <span className="grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
