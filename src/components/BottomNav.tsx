import { Home, BarChart3, Wallet, Menu, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const items = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/expenses", label: "Expenses", icon: Wallet },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/settings", label: "More", icon: Menu },
];

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 mt-auto">
      <div className="relative bg-card/95 backdrop-blur border-t border-border/60 px-3 pt-2 pb-3">
        {showOptions && (
          <>
            <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setShowOptions(false)} />
            <div className="absolute bottom-[calc(100%+1rem)] left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 bg-card border border-border shadow-lg rounded-2xl p-2 animate-in fade-in zoom-in duration-200">
              <button onClick={() => { setShowOptions(false); navigate("/expense/new?type=income"); }} className="px-5 py-3 text-sm font-semibold hover:bg-muted rounded-xl text-success whitespace-nowrap text-center transition-colors">
                Add Income
              </button>
              <div className="h-px bg-border/50 mx-2" />
              <button onClick={() => { setShowOptions(false); navigate("/expense/new?type=expense"); }} className="px-5 py-3 text-sm font-semibold hover:bg-muted rounded-xl text-destructive whitespace-nowrap text-center transition-colors">
                Add Expense
              </button>
            </div>
          </>
        )}
        <div className="grid grid-cols-5 items-center relative z-50">
          {items.slice(0, 2).map((it) => (
            <NavBtn key={it.path} {...it} active={pathname === it.path} onClick={() => { setShowOptions(false); navigate(it.path); }} />
          ))}
          <div className="flex justify-center -mt-8 relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              aria-label="Add transaction"
              className={`h-14 w-14 rounded-full gradient-primary glow-primary grid place-items-center text-primary-foreground transition-transform duration-200 ${showOptions ? "rotate-45 scale-105" : "hover:scale-105 active:scale-95"}`}
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
          {items.slice(2).map((it) => (
            <NavBtn key={it.path} {...it} active={pathname === it.path} onClick={() => { setShowOptions(false); navigate(it.path); }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NavBtn({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: typeof Home;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 py-1 text-[11px] transition ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}
