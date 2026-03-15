import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetLearnedWordsQuery } from '../features/progress/api/progressApi';
import { useUpdateProgressMutation } from '../features/progress/api/progressApi';
import { useGetCategoriesQuery } from '../features/categories/api/categoriesApi';
import { Loader } from '../shared/components/Loader';
import './LearnedPage.scss';

export default function LearnedPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const { data, isLoading, error } = useGetLearnedWordsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [updateProgress] = useUpdateProgressMutation();

  const categories = categoriesData?.data ?? [];
  const items = data?.data ?? [];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const word = item.word ?? item;
      const chinese = word?.chinese ?? word?.character ?? word?.zh ?? '';
      const translation = word?.translation ?? word?.meaning ?? word?.ru ?? '';
      const pinyin = word?.pinyin ?? '';
      const matchesSearch =
        !search ||
        chinese.includes(search) ||
        translation.toLowerCase().includes(search.toLowerCase()) ||
        pinyin.toLowerCase().includes(search.toLowerCase());
      const catSlug = word?.category ?? item?.categorySlug ?? '';
      const matchesCategory = !categoryFilter || catSlug === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, categoryFilter]);

  const handleReview = async (item) => {
    const word = item.word ?? item;
    const id = word?._id ?? word?.id ?? item?.wordId;
    if (!id) return;
    try {
      await updateProgress({
        wordId: id,
        status: 'learning',
        correct: false,
      }).unwrap();
    } catch {
      // ignore
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="learned-page learned-page--error">
        <p>Failed to load learned words</p>
      </div>
    );
  }

  return (
    <div className="learned-page">
      <div className="learned-page__container">
        <div className="learned-page__filters">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="learned-page__search"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="learned-page__select"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c._id || c.slug} value={c.slug}>
                {c.nameZh || c.name}
              </option>
            ))}
          </select>
        </div>

        <ul className="learned-page__list">
          {filteredItems.map((item) => {
            const word = item.word ?? item;
            const id = word?._id ?? word?.id ?? item?._id;
            const chinese = word?.chinese ?? word?.character ?? word?.zh ?? '';
            const pinyin = word?.pinyin ?? '';
            const translation =
              word?.translation ?? word?.meaning ?? word?.ru ?? '';
            const examples = word?.examples ?? [];
            const isExpanded = expandedId === id;

            return (
              <li key={id} className="learned-page__item">
                <button
                  type="button"
                  className="learned-page__card"
                  onClick={() =>
                    setExpandedId((prev) => (prev === id ? null : id))
                  }
                >
                  <span className="learned-page__chinese">{chinese}</span>
                  <span className="learned-page__pinyin">{pinyin}</span>
                  <span className="learned-page__translation">
                    {translation}
                  </span>
                  {examples.length > 0 && (
                    <span className="learned-page__expand-icon">
                      {isExpanded ? '−' : '+'}
                    </span>
                  )}
                </button>
                {isExpanded && examples.length > 0 && (
                  <div className="learned-page__examples">
                    {examples.map((ex, i) => (
                      <p key={i} className="learned-page__example">
                        {typeof ex === 'string'
                          ? ex
                          : `${ex.zh ?? ex.chinese} — ${ex.ru ?? ex.translation}`}
                      </p>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  className="learned-page__review"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReview(item);
                  }}
                >
                  Review
                </button>
              </li>
            );
          })}
        </ul>

        {filteredItems.length === 0 && (
          <div className="learned-page__empty">
            <p>No learned words yet</p>
            <Link to="/" className="learned-page__link">
              Start studying
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
