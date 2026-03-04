'use client';
import { useMovies } from '../context/MovieContext';
import { categories, movies } from '../data/movies';

function Select({ label, value, onChange, children }) {
  return (
    <div>
      <label style={{ display:'block', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase',
        color:'var(--text-mute)', marginBottom:'6px', fontFamily:'var(--f-mono)' }}>
        {label}
      </label>
      <div className="relative">
        <select value={value} onChange={onChange} className="filter-select w-full px-3 py-2.5 rounded-lg text-sm appearance-none cursor-pointer pr-8"
          style={{ fontFamily:'var(--f-body)', color:'var(--text)' }}>
          {children}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
          style={{ color:'var(--text-mute)' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  );
}

function Pill({ label, color, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background:`${color}18`, border:`1px solid ${color}40`, color }}>
      {label}
      <button onClick={onRemove} aria-label="Remove filter">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </span>
  );
}

export default function Filters() {
  const { selectedCategory, selectedType, selectedActor, searchQuery,
    setSelectedCategory, setSelectedType, setSelectedActor, clearFilters } = useMovies();
  const allActors = [...new Set(movies.flatMap(m => m.actors))].sort();
  const hasFilters = selectedCategory || selectedType || selectedActor || searchQuery;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.65rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-mute)' }}>
          Filters
        </span>
        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-semibold"
            style={{ color:'var(--rose)', fontFamily:'var(--f-body)' }}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Clear all
          </button>
        )}
      </div>

      <Select label="Genre" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
        <option value="">All Genres</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </Select>

      <Select label="Type" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
        <option value="">All Types</option>
        <option value="Feature Film">Feature Film</option>
        <option value="Documentary">Documentary</option>
        <option value="Short Film">Short Film</option>
      </Select>

      <Select label="Actor" value={selectedActor} onChange={e => setSelectedActor(e.target.value)}>
        <option value="">All Actors</option>
        {allActors.map(a => <option key={a} value={a}>{a}</option>)}
      </Select>

      {hasFilters && (
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedCategory && <Pill label={selectedCategory} color="var(--rose)" onRemove={() => setSelectedCategory('')}/>}
          {selectedType     && <Pill label={selectedType}     color="var(--teal)" onRemove={() => setSelectedType('')}/>}
          {selectedActor    && <Pill label={selectedActor}    color="#a78bfa"     onRemove={() => setSelectedActor('')}/>}
        </div>
      )}
    </div>
  );
}
