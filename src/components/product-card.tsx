import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Heart, ShoppingCart } from "lucide-react";
import { formatNT, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [fav, setFav] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-shadow hover:shadow-card-hover">
      <div className="relative">
        <Link to="/product/$productId" params={{ productId: product.id }} className="block">
          <div className="aspect-[4/3] overflow-hidden bg-surface">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
        <span className="absolute left-3 top-3 rounded bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
          {product.badge}
        </span>
        <button
          type="button"
          aria-label="加入收藏"
          onClick={() => setFav((v) => !v)}
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-border bg-background/90 text-muted-foreground transition-colors hover:text-primary"
        >
          <Heart className={cn("size-4", fav && "fill-primary text-primary")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <h3 className="mt-1 line-clamp-1 text-sm font-bold md:text-base">
          <Link to="/product/$productId" params={{ productId: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-3 text-lg font-bold text-primary">{formatNT(product.price)}</p>
        <button
          type="button"
          onClick={() => {
            add(product);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1600);
          }}
          className={cn(
            "mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
            added
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary text-primary-foreground hover:bg-secondary-foreground",
          )}
        >
          {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
          {added ? "已加入購物車" : "加入購物車"}
        </button>
      </div>
    </article>
  );
}
