import bottle from "@/assets/product-bottle.jpg";
import family from "@/assets/product-family.jpg";
import trial from "@/assets/product-trial.jpg";
import monthly from "@/assets/product-monthly.jpg";
import clean from "@/assets/product-clean.jpg";
import cardImg from "@/assets/product-card.jpg";
import bannerStation from "@/assets/banner-station.jpg";
import bannerFamily from "@/assets/banner-family.jpg";
import bannerCommunity from "@/assets/banner-community.jpg";

export type Category = "補水用品" | "家庭方案" | "社區方案" | "試用體驗";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  badge: string;
  description: string;
  intro: string;
  image: string;
  gallery: string[];
  tags: ("hot" | "new")[];
  specOptions: { label: string; values: string[] };
  planOptions: { label: string; values: string[] };
};

export const CATEGORIES: { label: string; value: Category | "all" }[] = [
  { label: "全部商品", value: "all" },
  { label: "補水用品", value: "補水用品" },
  { label: "家庭儲值", value: "家庭方案" },
  { label: "社區方案", value: "社區方案" },
  { label: "試用體驗", value: "試用體驗" },
];

export const products: Product[] = [
  {
    id: "hydro-bottle",
    name: "利每家富氫隨行瓶",
    category: "補水用品",
    price: 880,
    badge: "熱銷",
    description: "750 ml 取水瓶，適合日常外出補水。",
    intro:
      "採用食品級不鏽鋼內膽與密封瓶蓋，能穩定保存富氫水的口感，適合上班、通勤與運動時隨身補水。",
    image: bottle,
    gallery: [bottle, clean, cardImg],
    tags: ["hot"],
    specOptions: { label: "容量", values: ["750 ml", "1000 ml"] },
    planOptions: { label: "瓶身顏色", values: ["晶透白", "水藍"] },
  },
  {
    id: "family-refill",
    name: "家庭補水儲值組",
    category: "家庭方案",
    price: 1680,
    badge: "儲值",
    description: "30 次取水額度，適合一家人固定補水。",
    intro:
      "一次儲值 30 次取水額度，全家共用同一組會員條碼，於任一利每家智慧水站皆可取水。",
    image: family,
    gallery: [family, monthly, cardImg],
    tags: ["hot"],
    specOptions: { label: "方案", values: ["30 次", "60 次"] },
    planOptions: { label: "取水次數", values: ["每日 1 次", "不限次數分配"] },
  },
  {
    id: "trial-kit",
    name: "社區試用體驗包",
    category: "試用體驗",
    price: 390,
    badge: "體驗",
    description: "首次接觸富氫水的入門體驗包。",
    intro: "包含 5 次取水額度與體驗說明手冊，適合第一次認識富氫水的社區住戶。",
    image: trial,
    gallery: [trial, bottle, bannerCommunity],
    tags: ["new"],
    specOptions: { label: "容量", values: ["5 次體驗"] },
    planOptions: { label: "體驗期間", values: ["14 天", "30 天"] },
  },
  {
    id: "station-monthly",
    name: "富氫水站月用方案",
    category: "社區方案",
    price: 1200,
    badge: "月用",
    description: "固定月用取水額度，適合社區或家庭長期使用。",
    intro: "每月固定額度，系統自動於月初重置，適合社區長期穩定的飲水需求。",
    image: monthly,
    gallery: [monthly, bannerStation, family],
    tags: ["hot"],
    specOptions: { label: "方案", values: ["標準月用", "加量月用"] },
    planOptions: { label: "月份", values: ["1 個月", "3 個月", "6 個月"] },
  },
  {
    id: "family-monthly-card",
    name: "富氫補水家庭月卡",
    category: "家庭方案",
    price: 1480,
    badge: "月用",
    description: "家庭共用月卡，最多綁定 4 位成員。",
    intro: "一張月卡可綁定 4 位家庭成員，各自於社區水站取水並共用同一額度。",
    image: cardImg,
    gallery: [cardImg, family, bannerFamily],
    tags: ["new"],
    specOptions: { label: "方案", values: ["家庭月卡"] },
    planOptions: { label: "月份", values: ["1 個月", "3 個月"] },
  },
  {
    id: "bottle-clean",
    name: "隨行瓶清潔組",
    category: "補水用品",
    price: 320,
    badge: "配件",
    description: "瓶刷與清潔錠組合，維持瓶身乾淨衛生。",
    intro: "含長柄瓶刷、清潔錠與速乾布，建議每週清潔一次，維持取水口感。",
    image: clean,
    gallery: [clean, bottle],
    tags: [],
    specOptions: { label: "容量", values: ["標準組"] },
    planOptions: { label: "清潔錠數量", values: ["12 顆", "24 顆"] },
  },
  {
    id: "community-share",
    name: "社區共享補水卡",
    category: "社區方案",
    price: 2280,
    badge: "社區",
    description: "社區共享額度，適合管委會統一採購。",
    intro: "由管委會統一儲值，住戶依樓層或戶號取水，後台可查看每月使用紀錄。",
    image: bannerCommunity,
    gallery: [bannerCommunity, bannerStation, monthly],
    tags: ["hot"],
    specOptions: { label: "方案", values: ["100 次", "200 次"] },
    planOptions: { label: "使用期限", values: ["6 個月", "12 個月"] },
  },
  {
    id: "starter-set",
    name: "新會員入門組",
    category: "試用體驗",
    price: 990,
    badge: "新上架",
    description: "隨行瓶加 10 次取水額度的入門組合。",
    intro: "新會員專屬組合，含 750 ml 隨行瓶與 10 次取水額度，完成付款再送 100 點。",
    image: bottle,
    gallery: [bottle, trial, bannerFamily],
    tags: ["new"],
    specOptions: { label: "容量", values: ["750 ml + 10 次"] },
    planOptions: { label: "取水次數", values: ["10 次", "20 次"] },
  },
];

export const banners = [
  {
    id: "b1",
    image: bannerStation,
    eyebrow: "智慧富氫水站",
    title: "社區樓下就能取水",
    text: "全台社區智慧水站，掃碼即取富氫水，乾淨、穩定、隨時可用。",
    cta: "瀏覽商城方案",
  },
  {
    id: "b2",
    image: bannerFamily,
    eyebrow: "家庭補水方案",
    title: "全家共用同一組額度",
    text: "家庭儲值組一次 30 次取水額度，成員各自取水，額度共用不浪費。",
    cta: "看家庭儲值組",
  },
  {
    id: "b3",
    image: bannerCommunity,
    eyebrow: "社區共享服務",
    title: "管委會統一採購更省心",
    text: "社區共享補水卡提供統一儲值與每月使用紀錄，導入流程簡單。",
    cta: "看社區方案",
  },
];

export const campaigns = [
  { id: "free-ship", label: "滿 NT$1,200 免運" },
  { id: "member", label: "社區會員 95 折" },
  { id: "newbie", label: "新會員送 100 點" },
  { id: "bottle", label: "富氫瓶加購價" },
];

export const member = {
  name: "Joy Wang",
  level: "社區會員",
  points: 1240,
  coupons: 3,
  totalSpent: 18600,
  phone: "0912-345-678",
  email: "joy.wang@example.com",
  birthday: "1990-06-18",
  community: "水映花園社區",
};

export type MemberOrder = {
  id: string;
  date: string;
  status: "待付款" | "處理中" | "已完成" | "已取消";
  amount: number;
  payment: string;
  delivery: string;
  receiver: { name: string; phone: string; address: string };
  items: { name: string; spec: string; price: number; qty: number }[];
  points: number;
};

export const orders: MemberOrder[] = [
  {
    id: "LMJ202609030015",
    date: "2026-09-03",
    status: "處理中",
    amount: 2188,
    payment: "信用卡（末四碼 4312）",
    delivery: "社區水站取貨",
    receiver: {
      name: "Joy Wang",
      phone: "0912-345-678",
      address: "台北市中山區水映路 88 號 12 樓",
    },
    items: [
      { name: "利每家富氫隨行瓶", spec: "750 ml／晶透白", price: 880, qty: 1 },
      { name: "家庭補水儲值組", spec: "30 次", price: 1680, qty: 1 },
    ],
    points: 109,
  },
  {
    id: "LMJ202608120008",
    date: "2026-08-12",
    status: "已完成",
    amount: 1200,
    payment: "LINE Pay",
    delivery: "宅配到府",
    receiver: {
      name: "Joy Wang",
      phone: "0912-345-678",
      address: "台北市中山區水映路 88 號 12 樓",
    },
    items: [{ name: "富氫水站月用方案", spec: "標準月用／1 個月", price: 1200, qty: 1 }],
    points: 60,
  },
  {
    id: "LMJ202607250021",
    date: "2026-07-25",
    status: "待付款",
    amount: 390,
    payment: "ATM 轉帳",
    delivery: "社區水站取貨",
    receiver: {
      name: "Joy Wang",
      phone: "0912-345-678",
      address: "台北市中山區水映路 88 號 12 樓",
    },
    items: [{ name: "社區試用體驗包", spec: "5 次體驗／14 天", price: 390, qty: 1 }],
    points: 0,
  },
  {
    id: "LMJ202606100004",
    date: "2026-06-10",
    status: "已取消",
    amount: 320,
    payment: "信用卡（末四碼 4312）",
    delivery: "宅配到府",
    receiver: {
      name: "Joy Wang",
      phone: "0912-345-678",
      address: "台北市中山區水映路 88 號 12 樓",
    },
    items: [{ name: "隨行瓶清潔組", spec: "標準組／12 顆", price: 320, qty: 1 }],
    points: 0,
  },
];

export const pointLogs = [
  { date: "2026-09-03", source: "完成訂單 LMJ202609030015", change: 109, note: "訂單金額回饋 5%" },
  { date: "2026-09-03", source: "購物折抵", change: -180, note: "結帳時折抵 NT$180" },
  { date: "2026-08-12", source: "完成訂單 LMJ202608120008", change: 60, note: "月用方案回饋" },
  { date: "2026-07-01", source: "新會員禮", change: 100, note: "首次註冊贈點" },
];

export const coupons = [
  {
    id: "c1",
    name: "社區會員 95 折",
    expire: "2026-12-31",
    condition: "社區會員限定，單筆不限金額",
    status: "可使用",
  },
  {
    id: "c2",
    name: "滿 NT$1,200 免運",
    expire: "2026-10-31",
    condition: "單筆消費滿 NT$1,200 適用",
    status: "可使用",
  },
  {
    id: "c3",
    name: "新會員 100 點補水金",
    expire: "2026-09-30",
    condition: "新會員首購，可折抵 NT$100",
    status: "即將到期",
  },
];

export const addresses = [
  {
    id: "a1",
    name: "Joy Wang",
    phone: "0912-345-678",
    address: "台北市中山區水映路 88 號 12 樓",
    isDefault: true,
    tag: "住家",
  },
  {
    id: "a2",
    name: "王小明",
    phone: "0922-111-333",
    address: "新北市板橋區清泉街 15 號 3 樓",
    isDefault: false,
    tag: "家人",
  },
];

export const payments = [
  { id: "p1", label: "信用卡", detail: "VISA 末四碼 4312", note: "預設付款方式" },
  { id: "p2", label: "LINE Pay", detail: "已綁定 joy.wang", note: "付款後即時通知" },
  { id: "p3", label: "ATM 轉帳", detail: "取得虛擬帳號後 3 日內完成轉帳", note: "" },
];

export const formatNT = (n: number) => `NT$${n.toLocaleString("zh-TW")}`;
