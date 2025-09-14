interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SchedulePagination = ({ page, totalPages, onPageChange }: Props) => {
    if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`px-3 py-1 rounded border ${
          page === 1
            ? "bg-[hsl(var(--neon))] text-[hsl(var(--neon-foreground))] cursor-not-allowed disabled:opacity-50"
            : "bg-[hsl(var(--neon))] text-[hsl(var(--neon-foreground))] hover:bg-[hsl(var(--neon))]/90 cursor-pointer "
        }`}
      >
        Previous
      </button>
      <span className="text-sm">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded border ${
          page === totalPages
            ? "bg-[hsl(var(--neon))] text-[hsl(var(--neon-foreground))] cursor-not-allowed disabled:opacity-50"
            : "bg-[hsl(var(--neon))] text-[hsl(var(--neon-foreground))] hover:bg-[hsl(var(--neon))]/90 cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default SchedulePagination