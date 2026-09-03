import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { formatNT } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { OrderSummary } from "@/components/order-summary";
import { CheckoutStepper } from "@/components/checkout-stepper";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "付款確認｜利每家補水商城" },
      { name: "description", content: "確認訂購人資訊、配送與付款方式後完成付款。" },
      { property: "og:title", content: "付款確認｜利每家補水商城" },
      { property: "og:description", content: "確認訂購人資訊、配送與付款方式後完成付款。" },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const { checkout, totals, lines, getProduct, placeOrder } = useCart();
  const navigate = useNavigate();

  const rows = [
    { label: "訂購人", value: `${checkout.name}／${checkout.phone}` },
    { label: "Email", value: checkout.email },
    { label: "配送方式", value: `${checkout.delivery}・${checkout.address}` },
    { label: "付款方式", value: checkout.payment },
    { label: "發票類型", value: checkout.invoice },
    { label: "備註", value: checkout.note || "無" },
  ];

  return (
    <div className="bg-surface pb-12">
      <div className="container-shop pt-4">
        <CheckoutStepper current={3} />
        <h1 className="mt-5 text-xl font-bold sm:text-2xl">付款確認</h1>
      </div>

      <div className="container-shop mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <section className="rounded-lg border border-border bg-background p-5">
            <h2 className="text-base font-bold">訂單資訊</h2>
            <dl className="mt-4 divide-y divide-border text-sm">
              {rows.map((r) => (
                <div key={r.label} className="grid gap-1 py-2.5 sm:grid-cols-[120px_minmax(0,1fr)]">
                  <dt className="text-muted-foreground">{r.label}</dt>
                  <dd className="break-words text-secondary-foreground">{r.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-lg border border-border bg-background p-5">
            <h2 className="text-base font-bold">商品摘要</h2>
            <ul className="mt-4 divide-y divide-border">
              {lines.map((line) => {
                const p = getProduct(line.productId);
                if (!p) return null;
                return (
                  <li key={line.key} className="flex items-center gap-3 py-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="size-14 shrink-0 rounded-md border border-border object-cover"
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
              {lines.length === 0 && (
                <li className="py-3 text-sm text-muted-foreground">購物車內尚無商品。</li>
              )}
            </ul>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/checkout"
              className="inline-flex flex-1 items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
            >
              返回修改
            </Link>
            <button
              type="button"
              disabled={lines.length === 0}
              onClick={() => {
                placeOrder();
                navigate({ to: "/order-complete" });
              }}
              className="inline-flex flex-1 items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary-foreground disabled:opacity-50"
            >
              確認付款 {formatNT(totals.total)}
            </button>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
