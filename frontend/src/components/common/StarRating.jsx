function StarRating({ value, onChange, size = 'text-xl' }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${size} transition ${value >= star ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
          onClick={() => onChange(star)}
          title={`Calificar con ${star}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default StarRating
