import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["購物車", "填寫資料", "付款確認", "完成訂單"];

export function CheckoutStepper({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto rounded-lg border border-border bg-surface px-3 py-3 sm:gap-3 sm:px-5">
      {steps.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li key={label} className="flex min-w-0 shrink-0 items-center gap-2">
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full border text-xs font-semibold",
                done && "border-primary bg-primary text-primary-foreground",
                active && "border-primary bg-background text-primary",
                !done && !active && "border-border bg-background text-muted-foreground",
              )}
            >
              {done ? <Check className="size-3.5" /> : step}
            </span>
            <span
              className={cn(
                "whitespace-nowrap text-xs font-medium sm:text-sm",
                active ? "text-primary" : done ? "text-secondary-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
            {step < steps.length && <span className="h-px w-6 bg-border sm:w-10" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}
