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
        className="border rounded px-2 py-1"
      />
    </div>
  )
}

export default ScheduleDatePicker