import { Link } from "@tanstack/react-router";
import { formatNT } from "@/lib/data";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart";

type Props = {
  showItems?: boolean;
  action?: { label: string; to: "/cart" | "/checkout" | "/payment"; disabled?: boolean };
  onAction?: () => void;
  actionLabel?: string;
};

export function OrderSummary({ showItems = false, action, onAction, actionLabel }: Props) {
  const { totals, lines, getProduct } = useCart();
  const gap = FREE_SHIPPING_THRESHOLD - totals.subtotal;

  const rows = [
    { label: "商品小計", value: formatNT(totals.subtotal) },
    { label: "活動折扣", value: `-${formatNT(totals.promoDiscount)}`, muted: true },
    { label: "社區會員折扣", value: `-${formatNT(totals.memberDiscount)}`, muted: true },
    { label: "點數折抵", value: `-${formatNT(totals.pointsDiscount)}`, muted: true },
    { label: "運費", value: totals.shipping === 0 ? "免運" : formatNT(totals.shipping) },
  ];

  return (
    <div className="rounded-lg border border-border bg-background p-5 shadow-card">
      <h2 className="text-base font-bold">訂單摘要</h2>

      {showItems && (
        <ul className="mt-4 space-y-3 border-b border-border pb-4">
          {lines.map((line) => {
            const p = getProduct(line.productId);
            if (!p) return null;
            return (
              <li key={line.key} className="flex items-start gap-3">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="size-12 shrink-0 rounded-md border border-border object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-secondary-foreground">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {line.spec}／{line.plan} × {line.qty}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium">{formatNT(p.price * line.qty)}</span>
              </li>
            );
          })}
          {lines.length === 0 && <li className="text-sm text-muted-foreground">購物車內尚無商品。</li>}
        </ul>
      )}

      <dl className="mt-4 space-y-2.5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className={row.muted ? "text-secondary-foreground" : "font-medium"}>{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-border pt-4">
        <span className="text-sm font-medium text-secondary-foreground">應付總額</span>
        <span className="text-xl font-bold text-primary">{formatNT(totals.total)}</span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {gap > 0
          ? `再消費 ${formatNT(gap)} 即可享全站免運。`
          : "本次訂單已符合滿額免運資格。"}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        付款成功可累積 {totals.earnPoints} 點補水金。
      </p>

      {action && (
        <Link
          to={action.to}
          onClick={onAction}
          aria-disabled={action.disabled}
          className={
            "mt-4 flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary-foreground " +
            (action.disabled ? "pointer-events-none opacity-50" : "")
          }
        >
          {actionLabel ?? action.label}
        </Link>
      )}
    </div>
  );
}
