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
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
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
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default SchedulePagination