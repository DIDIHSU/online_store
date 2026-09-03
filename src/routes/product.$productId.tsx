import { useState } from "react";
import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import { products, formatNT } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "商品不存在｜利每家商城" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name}｜利每家補水商城` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name}｜利每家補水商城` },
        { property: "og:description", content: p.description },
      ],
    };
  },
  component: ProductDetail,
});

const tabs = ["商品介紹", "規格說明", "取水方式", "常見問題"] as const;

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [img, setImg] = useState(0);
  const [spec, setSpec] = useState(product.specOptions.values[0]);
  const [plan, setPlan] = useState(product.planOptions.values[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("商品介紹");
  const [added, setAdded] = useState(false);

  const tabContent: Record<string, string> = {
    商品介紹: product.intro,
    規格說明: `分類：${product.category}／${product.specOptions.label}：${product.specOptions.values.join("、")}／${product.planOptions.label}：${product.planOptions.values.join("、")}。所有方案皆可於全台利每家智慧富氫水站使用。`,
    取水方式:
      "於社區智慧水站以會員條碼或 App 掃碼即可取水，系統會自動扣除對應額度，並在會員中心同步紀錄。",
    常見問題:
      "Q：額度可以轉讓嗎？A：家庭方案可綁定家庭成員共用。Q：可以退貨嗎？A：未使用的實體商品 7 日內可申請退貨，儲值類商品依剩餘額度計算。",
  };

  return (
    <div className="bg-surface pb-12">
      <div className="container-shop pt-4">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            補水商城
          </Link>
          <span className="mx-1.5">/</span>
          <span>{product.category}</span>
          <span className="mx-1.5">/</span>
          <span className="text-secondary-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container-shop mt-4 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="aspect-[4/3] overflow-hidden rounded-md bg-surface">
            <img
              src={product.gallery[img]}
              alt={product.name}
              width={1024}
              height={768}
              className="size-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImg(i)}
                aria-label={`檢視圖片 ${i + 1}`}
                className={cn(
                  "aspect-[4/3] overflow-hidden rounded-md border bg-surface",
                  i === img ? "border-primary" : "border-border",
                )}
              >
                <img src={g} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background p-5">
          <p className="text-xs text-muted-foreground">{product.category}</p>
          <h1 className="mt-1 text-xl font-bold sm:text-2xl">{product.name}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <p className="mt-4 text-2xl font-bold text-primary">{formatNT(product.price)}</p>

          <ul className="mt-4 space-y-1.5 rounded-md bg-surface p-3 text-xs text-secondary-foreground">
            <li>・社區會員結帳享 95 折</li>
            <li>・單筆滿 NT$1,200 免運</li>
            <li>・付款成功累積 5% 補水金點數</li>
          </ul>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">{product.specOptions.label}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.specOptions.values.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSpec(v)}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-sm transition-colors",
                      spec === v
                        ? "border-primary bg-secondary font-medium text-primary"
                        : "border-border text-muted-foreground hover:text-primary",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{product.planOptions.label}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.planOptions.values.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setPlan(v)}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-sm transition-colors",
                      plan === v
                        ? "border-primary bg-secondary font-medium text-primary"
                        : "border-border text-muted-foreground hover:text-primary",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-xs font-medium text-muted-foreground">數量</p>
              <div className="inline-flex items-center rounded-md border border-border">
                <button
                  type="button"
                  aria-label="減少數量"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-9 place-items-center text-muted-foreground hover:text-primary"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  type="button"
                  aria-label="增加數量"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="grid size-9 place-items-center text-muted-foreground hover:text-primary"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                add(product, { spec, plan, qty });
                setAdded(true);
                toast.success("已加入購物車", { description: `${product.name}／${spec}` });
                window.setTimeout(() => setAdded(false), 1600);
              }}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-md border border-primary px-4 py-2.5 text-sm font-semibold transition-colors",
                added ? "bg-secondary text-primary" : "bg-background text-primary hover:bg-secondary",
              )}
            >
              {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
              {added ? "已加入購物車" : "加入購物車"}
            </button>
            <button
              type="button"
              onClick={() => {
                add(product, { spec, plan, qty });
                navigate({ to: "/cart" });
              }}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary-foreground"
            >
              立即購買
            </button>
          </div>
        </div>
      </div>

      <div className="container-shop mt-6">
        <div className="rounded-lg border border-border bg-background">
          <div className="flex gap-1 overflow-x-auto border-b border-border p-2">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  tab === t
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-secondary-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="p-5 text-sm leading-relaxed text-muted-foreground">{tabContent[tab]}</p>
        </div>
      </div>
    </div>
  );
}
