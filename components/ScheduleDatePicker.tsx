interface Props {
  date: string;
  setDate: (date: string) => void;
}

const ScheduleDatePicker = ({ date, setDate }: Props) => {
  return (
    <div className="mb-4">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-card text-primary hover:bg-[hsl(var(--neon))] border border-[hsl(var(--neon))]/90 px-2 py-1"
      />
    </div>
  )
}

export default ScheduleDatePicker