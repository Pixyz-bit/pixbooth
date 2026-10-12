export default function TemplateTools({ count, setCount, counts }) {
  return (
    <div className="template-tools">
      <label className="template-count-filter">
        <span>Photo count</span>
        <select
          aria-label="Photo count"
          value={count}
          onChange={(event) =>
            setCount(event.target.value === 'all' ? 'all' : Number(event.target.value))
          }
        >
          <option value="all">All layouts</option>
          {counts.map((value) => (
            <option key={value} value={value}>
              {value} {value === 1 ? 'photo' : 'photos'}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
