"use client";
import ScheduleAnimeLIst from "@/components/ScheduleAnimeLIst";
import ScheduleDatePicker from "@/components/ScheduleDatePicker";
import SchedulePagination from "@/components/SchedulePagination";
import ScheduleTab from "@/components/ScheduleTab";
import { useEffect, useState } from "react";

type ScheduledAnime = {
  id: string;
  time: string;
  name: string;
  jname: string;
  episode: number;
  airingTimestamp?: number;
};

type TabType = "today" | "week";
const ITEMS_PER_PAGE = 10;

function getWeekDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

const SchedulePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [animes, setAnimes] = useState<ScheduledAnime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabType>("today");
  const [date, setDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [page, setPage] = useState<number>(1);

  const fetchSchedule = async () => {
    setLoading(true);
    setError(null);
    setPage(1);

    try {
      let fetchedAnimes: ScheduledAnime[] = [];

      if (tab === "today") {
        const res = await fetch(`/api/schedule?date=${date}`);
        if (!res.ok) throw new Error("Failed to fetch schedule for today");
        const data = await res.json();
        fetchedAnimes = data.data?.scheduledAnimes || [];
      } else { // tab === "week"
        const dates = getWeekDates();
        const results = await Promise.all(
          dates.map(async (d) => {
            const res = await fetch(`/api/schedule?date=${d}`);
            return res.ok ? res.json() : { data: { scheduledAnimes: [] } };
          })
        );
        fetchedAnimes = results.flatMap((r) => r.data?.scheduledAnimes || []);
        fetchedAnimes.sort((a, b) => (a.airingTimestamp || 0) - (b.airingTimestamp || 0));
      }
      setAnimes(fetchedAnimes);
    } catch (err) {
      console.error(err);
      setError("Failed to load schedule");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [tab, date]);

  const totalPages = Math.ceil(animes.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentPageData = animes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Anime Schedule</h1>

      <ScheduleTab tab={tab} setTab={setTab} setDate={setDate} />
      {tab === "today" && <ScheduleDatePicker date={date} setDate={setDate} />}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : currentPageData.length === 0 ? (
        <p>No anime scheduled.</p>
      ) : (
        <>
          <ScheduleAnimeLIst animes={currentPageData} />
          <SchedulePagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default SchedulePage;
