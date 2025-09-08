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
            tab === t ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {t === "today" ? "Today" : "This Week"}
        </button>
      ))}
    </div>
  )
}

export default ScheduleTab