import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { formatNT, orders } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { CheckoutStepper } from "@/components/checkout-stepper";

export const Route = createFileRoute("/order-complete")({
  head: () => ({
    meta: [
      { title: "訂單已成立｜利每家補水商城" },
      { name: "description", content: "訂單已成立，可查看訂單明細或回到補水商城繼續選購。" },
      { property: "og:title", content: "訂單已成立｜利每家補水商城" },
      { property: "og:description", content: "訂單已成立，可查看訂單明細或繼續選購。" },
    ],
  }),
  component: OrderCompletePage,
});

function OrderCompletePage() {
  const { lastOrder, totals, checkout } = useCart();
  const orderId = lastOrder?.id ?? orders[0].id;
  const total = lastOrder?.total ?? totals.total;
  const points = lastOrder?.points ?? totals.earnPoints;

  const rows = [
    { label: "訂單編號", value: orderId },
    { label: "應付金額", value: formatNT(total) },
    { label: "付款方式", value: checkout.payment },
    {
      label: checkout.delivery === "宅配到府" ? "預計配送" : "預計取貨",
      value:
        checkout.delivery === "宅配到府"
          ? "付款完成後 2-3 個工作日送達"
          : "付款完成後 1 個工作日即可至社區水站取貨",
    },
    { label: "累積點數", value: `本次累積 ${points} 點` },
  ];

  return (
    <div className="bg-surface pb-12">
      <div className="container-shop pt-4">
        <CheckoutStepper current={4} />
      </div>

      <div className="container-shop mt-6 max-w-2xl">
        <div className="rounded-lg border border-border bg-background p-6 text-center sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-secondary text-primary">
            <CheckCircle2 className="size-9" />
          </span>
          <h1 className="mt-4 text-xl font-bold sm:text-2xl">訂單已成立</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            感謝您的訂購，付款結果與配送進度將以 Email 通知。
          </p>

          <dl className="mt-6 divide-y divide-border text-left text-sm">
            {rows.map((r) => (
              <div key={r.label} className="grid gap-1 py-3 sm:grid-cols-[110px_minmax(0,1fr)]">
                <dt className="text-muted-foreground">{r.label}</dt>
                <dd className="break-words font-medium text-secondary-foreground">{r.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/orders/$orderId"
              params={{ orderId: orders[0].id }}
              className="inline-flex flex-1 items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary-foreground"
            >
              查看訂單
            </Link>
            <Link
              to="/"
              className="inline-flex flex-1 items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
            >
              回到商城
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
