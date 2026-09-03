import { createFileRoute } from "@tanstack/react-router";
import { useCart, type CheckoutInfo } from "@/lib/cart";
import { OrderSummary } from "@/components/order-summary";
import { CheckoutStepper } from "@/components/checkout-stepper";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "填寫結帳資料｜利每家補水商城" },
      { name: "description", content: "填寫收件資訊、選擇配送與付款方式，完成補水商品結帳。" },
      { property: "og:title", content: "填寫結帳資料｜利每家補水商城" },
      { property: "og:description", content: "填寫收件資訊、選擇配送與付款方式。" },
    ],
  }),
  component: CheckoutPage,
});

const inputClass =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40";

function RadioRow<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div className="mt-2 grid gap-2 sm:grid-cols-3">
      {options.map((o) => (
        <label
          key={o}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors",
            value === o
              ? "border-primary bg-secondary text-primary"
              : "border-border text-muted-foreground hover:border-primary",
          )}
        >
          <input
            type="radio"
            name={name}
            checked={value === o}
            onChange={() => onChange(o)}
            className="size-4 accent-[oklch(0.494_0.176_259.5)]"
          />
          <span className="truncate">{o}</span>
        </label>
      ))}
    </div>
  );
}

function CheckoutPage() {
  const { checkout, setCheckout, lines } = useCart();
  const set = <K extends keyof CheckoutInfo>(k: K, v: CheckoutInfo[K]) => setCheckout({ [k]: v });

  return (
    <div className="bg-surface pb-12">
      <div className="container-shop pt-4">
        <CheckoutStepper current={2} />
        <h1 className="mt-5 text-xl font-bold sm:text-2xl">填寫結帳資料</h1>
      </div>

      <div className="container-shop mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <section className="rounded-lg border border-border bg-background p-5">
            <h2 className="text-base font-bold">收件資訊</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground" htmlFor="name">
                  姓名
                </label>
                <input
                  id="name"
                  className={inputClass}
                  value={checkout.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground" htmlFor="phone">
                  手機
                </label>
                <input
                  id="phone"
                  className={inputClass}
                  value={checkout.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  value={checkout.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
            </div>

            <p className="mt-5 text-xs font-medium text-muted-foreground">取貨／配送方式</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {(["宅配到府", "社區水站取貨"] as const).map((o) => (
                <label
                  key={o}
                  className={cn(
                    "mt-2 flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors",
                    checkout.delivery === o
                      ? "border-primary bg-secondary text-primary"
                      : "border-border text-muted-foreground hover:border-primary",
                  )}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={checkout.delivery === o}
                    onChange={() => set("delivery", o)}
                    className="size-4 accent-[oklch(0.494_0.176_259.5)]"
                  />
                  {o}
                </label>
              ))}
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="address">
                {checkout.delivery === "宅配到府" ? "配送地址" : "取貨水站地址"}
              </label>
              <input
                id="address"
                className={inputClass}
                value={checkout.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="note">
                備註
              </label>
              <textarea
                id="note"
                rows={3}
                placeholder="如有指定取貨時間，可在此說明。"
                className={inputClass}
                value={checkout.note}
                onChange={(e) => set("note", e.target.value)}
              />
            </div>
          </section>

          <section className="rounded-lg border border-border bg-background p-5">
            <h2 className="text-base font-bold">付款方式</h2>
            <RadioRow
              name="payment"
              options={["信用卡", "ATM 轉帳", "LINE Pay"] as const}
              value={checkout.payment}
              onChange={(v) => set("payment", v)}
            />
          </section>

          <section className="rounded-lg border border-border bg-background p-5">
            <h2 className="text-base font-bold">發票資訊</h2>
            <RadioRow
              name="invoice"
              options={["電子發票", "公司戶發票", "捐贈發票"] as const}
              value={checkout.invoice}
              onChange={(v) => set("invoice", v)}
            />
          </section>
        </form>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary
            showItems
            action={{ label: "前往付款確認", to: "/payment", disabled: lines.length === 0 }}
          />
        </div>
      </div>
    </div>
  );
}
