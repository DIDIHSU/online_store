import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./data";

export type CartLine = {
  key: string;
  productId: string;
  spec: string;
  plan: string;
  qty: number;
};

export type CheckoutInfo = {
  name: string;
  phone: string;
  email: string;
  delivery: "宅配到府" | "社區水站取貨";
  address: string;
  note: string;
  payment: "信用卡" | "ATM 轉帳" | "LINE Pay";
  invoice: "電子發票" | "公司戶發票" | "捐贈發票";
};

type Totals = {
  subtotal: number;
  promoDiscount: number;
  memberDiscount: number;
  pointsDiscount: number;
  shipping: number;
  total: number;
  earnPoints: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  add: (product: Product, opts?: { spec?: string; plan?: string; qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  promoCode: string;
  appliedPromo: string | null;
  setPromoCode: (v: string) => void;
  applyPromo: () => { ok: boolean; message: string };
  usePoints: boolean;
  setUsePoints: (v: boolean) => void;
  pointsInput: number;
  setPointsInput: (v: number) => void;
  totals: Totals;
  checkout: CheckoutInfo;
  setCheckout: (patch: Partial<CheckoutInfo>) => void;
  lastOrder: { id: string; total: number; points: number } | null;
  placeOrder: () => { id: string; total: number; points: number };
  getProduct: (id: string) => Product | undefined;
};

const CartContext = createContext<CartContextValue | null>(null);

const FREE_SHIPPING = 1200;
const SHIPPING_FEE = 60;
export const MAX_POINTS = 1240;

const defaultLines: CartLine[] = [
  { key: "hydro-bottle|750 ml|晶透白", productId: "hydro-bottle", spec: "750 ml", plan: "晶透白", qty: 1 },
  { key: "family-refill|30 次|每日 1 次", productId: "family-refill", spec: "30 次", plan: "每日 1 次", qty: 1 },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(defaultLines);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsInput, setPointsInput] = useState(180);
  const [lastOrder, setLastOrder] = useState<CartContextValue["lastOrder"]>(null);
  const [checkout, setCheckoutState] = useState<CheckoutInfo>({
    name: "Joy Wang",
    phone: "0912-345-678",
    email: "joy.wang@example.com",
    delivery: "社區水站取貨",
    address: "台北市中山區水映路 88 號 12 樓",
    note: "",
    payment: "信用卡",
    invoice: "電子發票",
  });

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce((sum, l) => {
      const p = getProduct(l.productId);
      return sum + (p ? p.price * l.qty : 0);
    }, 0);

    const promoDiscount = appliedPromo ? Math.round(subtotal * 0.05) : 0;
    const memberDiscount = subtotal > 0 ? Math.round((subtotal - promoDiscount) * 0.05) : 0;
    const afterDiscount = subtotal - promoDiscount - memberDiscount;
    const pointsDiscount =
      usePoints && subtotal > 0 ? Math.min(pointsInput, MAX_POINTS, Math.max(afterDiscount - 1, 0)) : 0;
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
    const total = Math.max(afterDiscount - pointsDiscount + shipping, 0);
    const earnPoints = Math.round(total * 0.05);

    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      add: (product, opts) => {
        const spec = opts?.spec ?? product.specOptions.values[0];
        const plan = opts?.plan ?? product.planOptions.values[0];
        const qty = opts?.qty ?? 1;
        const key = `${product.id}|${spec}|${plan}`;
        setLines((prev) => {
          const found = prev.find((l) => l.key === key);
          if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { key, productId: product.id, spec, plan, qty }];
        });
      },
      setQty: (key, qty) =>
        setLines((prev) =>
          prev.map((l) => (l.key === key ? { ...l, qty: Math.min(Math.max(qty, 1), 99) } : l)),
        ),
      remove: (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
      clear: () => setLines([]),
      promoCode,
      appliedPromo,
      setPromoCode,
      applyPromo: () => {
        const code = promoCode.trim().toUpperCase();
        if (!code) return { ok: false, message: "請先輸入優惠碼" };
        if (code === "WATER95" || code === "LMJ95") {
          setAppliedPromo(code);
          return { ok: true, message: `已套用優惠碼 ${code}，活動折扣 5%` };
        }
        return { ok: false, message: "優惠碼無效，可試用 WATER95" };
      },
      usePoints,
      setUsePoints,
      pointsInput,
      setPointsInput: (v) => setPointsInput(Math.min(Math.max(Math.round(v) || 0, 0), MAX_POINTS)),
      totals: { subtotal, promoDiscount, memberDiscount, pointsDiscount, shipping, total, earnPoints },
      checkout,
      setCheckout: (patch) => setCheckoutState((prev) => ({ ...prev, ...patch })),
      lastOrder,
      placeOrder: () => {
        const order = { id: `LMJ${Date.now().toString().slice(-12)}`, total, points: earnPoints };
        setLastOrder(order);
        return order;
      },
      getProduct,
    };
  }, [lines, promoCode, appliedPromo, usePoints, pointsInput, checkout, lastOrder]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const FREE_SHIPPING_THRESHOLD = FREE_SHIPPING;
