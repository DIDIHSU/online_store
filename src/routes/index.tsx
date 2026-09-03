import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { banners, campaigns, CATEGORIES, products, formatNT } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "補水商城｜利每家智慧富氫水站前台商城" },
      {
        name: "description",
        content:
          "利每家補水商城提供富氫隨行瓶、家庭儲值組、社區月用方案與試用體驗包，滿 NT$1,200 免運，社區會員 95 折。",
      },
      { property: "og:title", content: "補水商城｜利每家智慧富氫水站" },
      {
        property: "og:description",
        content: "隨行瓶、家庭儲值、社區補水方案一次選購，社區會員享 95 折優惠。",
      },
    ],
  }),
  component: ShopHome,
});

type SortKey = "recommend" | "asc" | "desc";

function ShopHome() {
  const [slide, setSlide] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [chip, setChip] = useState<"all" | "hot" | "new">("all");
  const [sort, setSort] = useState<SortKey>("recommend");
  const [keyword, setKeyword] = useState("");
  const [maxPrice, setMaxPrice] = useState(2500);

  const list = useMemo(() => {
    let out = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (chip !== "all" && !p.tags.includes(chip)) return false;
      if (keyword && !`${p.name}${p.description}`.includes(keyword)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    if (sort === "asc") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "desc") out = [...out].sort((a, b) => b.price - a.price);
    return out;
  }, [category, chip, keyword, maxPrice, sort]);

  const banner = banners[slide];

  return (
    <div className="bg-surface">
      {/* Banner */}
      <section className="container-shop pt-4 md:pt-6">
        <div className="relative overflow-hidden rounded-lg border border-border bg-background">
          <div className="relative h-[280px] sm:h-[340px] lg:h-[400px]">
            {banners.map((b, i) => (
              <img
                key={b.id}
                src={b.image}
                alt={b.title}
                width={1600}
                height={600}
                className={cn(
                  "absolute inset-0 size-full object-cover transition-opacity duration-500",
                  i === slide ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.35_0.145_262_/_88%)] via-[oklch(0.35_0.145_262_/_55%)] to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-6 py-6 sm:px-10 lg:px-14">
                <p className="text-xs font-semibold tracking-wider text-primary-foreground/85 sm:text-sm">
                  {banner.eyebrow}
                </p>
                <h1 className="mt-2 text-2xl font-bold leading-tight text-primary-foreground sm:text-3xl lg:text-4xl">
                  {banner.title}
                </h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/90">
                  {banner.text}
                </p>
                <a
                  href="#shop"
                  className="mt-5 inline-flex items-center rounded-md bg-background px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
                >
                  {banner.cta}
                </a>
              </div>
            </div>

            <button
              type="button"
              aria-label="上一張"
              onClick={() => setSlide((s) => (s - 1 + banners.length) % banners.length)}
              className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/85 text-secondary-foreground transition-colors hover:bg-background"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="下一張"
              onClick={() => setSlide((s) => (s + 1) % banners.length)}
              className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/85 text-secondary-foreground transition-colors hover:bg-background"
            >
              <ChevronRight className="size-4" />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {banners.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  aria-label={`切換到第 ${i + 1} 張`}
                  onClick={() => setSlide(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === slide ? "w-6 bg-primary-foreground" : "w-2.5 bg-primary-foreground/50",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Campaign shortcuts */}
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {campaigns.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setActiveCampaign((v) => (v === c.id ? null : c.id))}
                className={cn(
                  "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  activeCampaign === c.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Toolbar */}
      <section id="shop" className="container-shop pt-8">
        <div className="rounded-lg border border-border bg-background px-4 py-4 sm:px-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <h2 className="text-xl font-bold sm:text-2xl">補水商城</h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                共 {products.length} 件商品・目前顯示 {list.length} 件
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { key: "all", label: "全部" },
                  { key: "hot", label: "熱銷" },
                  { key: "new", label: "新上架" },
                ] as const
              ).map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setChip(c.key)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                    chip === c.key
                      ? "border-primary bg-secondary text-primary"
                      : "border-border bg-background text-muted-foreground hover:text-primary",
                  )}
                >
                  {c.label}
                </button>
              ))}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-md border border-input bg-background px-3 py-1.5 text-xs text-secondary-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
              >
                <option value="recommend">推薦排序</option>
                <option value="asc">價格低到高</option>
                <option value="desc">價格高到低</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Sidebar + grid */}
      <section className="container-shop grid gap-6 pt-6 pb-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <h3 className="text-sm font-bold">商品分類</h3>
            <ul className="mt-3 hidden space-y-1 lg:block">
              {CATEGORIES.map((c) => (
                <li key={c.value}>
                  <button
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                      category === c.value
                        ? "bg-secondary font-semibold text-primary"
                        : "text-muted-foreground hover:bg-surface hover:text-secondary-foreground",
                    )}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={cn(
                    "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    category === c.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <h3 className="text-sm font-bold">篩選</h3>
            <label className="mt-3 block text-xs font-medium text-muted-foreground" htmlFor="kw">
              搜尋商品
            </label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="kw"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="輸入商品名稱"
                className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <label className="mt-4 block text-xs font-medium text-muted-foreground" htmlFor="price">
              價格範圍（最高 {formatNT(maxPrice)}）
            </label>
            <input
              id="price"
              type="range"
              min={300}
              max={2500}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-[oklch(0.494_0.176_259.5)]"
            />
            <button
              type="button"
              onClick={() => {
                setKeyword("");
                setMaxPrice(2500);
                setCategory("all");
                setChip("all");
              }}
              className="mt-4 w-full rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              清除篩選條件
            </button>
          </div>
        </aside>

        <div>
          {list.length === 0 ? (
            <div className="grid place-items-center rounded-lg border border-border bg-background p-12 text-sm text-muted-foreground">
              找不到符合條件的商品，請調整篩選條件。
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
