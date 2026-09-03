import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatNT } from "@/lib/data";
import { useCart, MAX_POINTS } from "@/lib/cart";
import { OrderSummary } from "@/components/order-summary";
import { CheckoutStepper } from "@/components/checkout-stepper";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "購物車｜利每家補水商城" },
      { name: "description", content: "確認補水商品、套用優惠碼與點數折抵，前往結帳。" },
      { property: "og:title", content: "購物車｜利每家補水商城" },
      { property: "og:description", content: "確認補水商品、套用優惠碼與點數折抵。" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();

  return (
    <div className="bg-surface pb-12">
      <div className="container-shop pt-4">
        <CheckoutStepper current={1} />
        <h1 className="mt-5 text-xl font-bold sm:text-2xl">購物車</h1>
      </div>

      <div className="container-shop mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background">
            {cart.lines.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">
                購物車目前是空的。
                <Link to="/" className="ml-1 font-medium text-primary">
                  回商城選購
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {cart.lines.map((line) => {
                  const p = cart.getProduct(line.productId);
                  if (!p) return null;
                  return (
                    <li key={line.key} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-24 w-full shrink-0 rounded-md border border-border object-cover sm:size-24"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-secondary-foreground">{p.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {line.spec}／{line.plan}
                        </p>
                        <p className="mt-1 text-sm text-primary">{formatNT(p.price)}</p>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <div className="inline-flex items-center rounded-md border border-border">
                          <button
                            type="button"
                            aria-label="減少數量"
                            onClick={() => cart.setQty(line.key, line.qty - 1)}
                            className="grid size-8 place-items-center text-muted-foreground hover:text-primary"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-9 text-center text-sm font-medium">{line.qty}</span>
                          <button
                            type="button"
                            aria-label="增加數量"
                            onClick={() => cart.setQty(line.key, line.qty + 1)}
                            className="grid size-8 place-items-center text-muted-foreground hover:text-primary"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{formatNT(p.price * line.qty)}</p>
                          <button
                            type="button"
                            onClick={() => cart.remove(line.key)}
                            className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-3.5" /> 移除
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-border bg-background p-5">
            <h2 className="text-base font-bold">優惠與點數</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground" htmlFor="promo">
                  優惠碼
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    id="promo"
                    value={cart.promoCode}
                    onChange={(e) => cart.setPromoCode(e.target.value)}
                    placeholder="例如 WATER95"
                    className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const r = cart.applyPromo();
                      r.ok ? toast.success(r.message) : toast.error(r.message);
                    }}
                    className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-secondary-foreground"
                  >
                    套用
                  </button>
                </div>
                {cart.appliedPromo && (
                  <p className="mt-1.5 text-xs text-primary">已套用：{cart.appliedPromo}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground" htmlFor="points">
                  點數折抵（可用 {MAX_POINTS} 點）
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    id="points"
                    type="number"
                    min={0}
                    max={MAX_POINTS}
                    value={cart.pointsInput}
                    onChange={(e) => cart.setPointsInput(Number(e.target.value))}
                    className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  />
                  <label className="flex shrink-0 items-center gap-2 text-xs text-secondary-foreground">
                    <input
                      type="checkbox"
                      checked={cart.usePoints}
                      onChange={(e) => cart.setUsePoints(e.target.checked)}
                      className="size-4 accent-[oklch(0.494_0.176_259.5)]"
                    />
                    折抵
                  </label>
                </div>
              </div>
            </div>
            <p className="mt-4 rounded-md bg-surface px-3 py-2 text-xs text-secondary-foreground">
              提示：滿 NT$1,200 免運，社區會員自動享 95 折。
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary
            showItems
            action={{ label: "前往結帳", to: "/checkout", disabled: cart.lines.length === 0 }}
          />
        </div>
      </div>
    </div>
  );
}
