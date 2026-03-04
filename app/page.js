import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import HeroSection from '../components/HeroSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="accent-divider mb-10"/>
        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="lg:w-60 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <SearchBar/>
              <div className="rounded-lg p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <Filters/>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <MovieList/>
          </div>
        </div>
      </section>
    </div>
  );
}
