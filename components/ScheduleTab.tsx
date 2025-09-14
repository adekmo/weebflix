type TabType = "today" | "week";

interface Props {
  tab: TabType;
  setTab: (tab: TabType) => void;
  setDate: (date: string) => void;
}

const ScheduleTab = ({ tab, setTab, setDate }: Props) => {
  return (
    <div className="flex space-x-2 mb-4">
      {["today", "week"].map((t) => (
        <button
          key={t}
          onClick={() => {
            setTab(t as TabType);
            if (t === "week") {
              setDate(new Date().toISOString().split("T")[0]); // reset date
            }
          }}
          className={`px-3 py-1 rounded ${
            tab === t ? "bg-[hsl(var(--neon))] text-[hsl(var(--neon-foreground))] shadow-[0_0_0_1px_rgba(6,182,212,0.55)_inset,0_0_12px_rgba(6,182,212,0.35),0_0_28px_rgba(6,182,212,0.25)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.7)_inset,0_0_16px_rgba(6,182,212,0.5),0_0_40px_rgba(6,182,212,0.35)] hover:bg-[hsl(var(--neon))]/90" : "bg-card text-primary hover:bg-[hsl(var(--neon))] border border-[hsl(var(--neon))]/90"
          }`}
        >
          {t === "today" ? "Today" : "This Week"}
        </button>
      ))}
    </div>
  )
}

export default ScheduleTab