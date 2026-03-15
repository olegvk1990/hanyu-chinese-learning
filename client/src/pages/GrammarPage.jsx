import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetGrammarRulesQuery } from '../features/grammar/api/grammarApi';
import { useGetCategoriesQuery } from '../features/categories/api/categoriesApi';
import { Loader } from '../shared/components/Loader';
import './GrammarPage.scss';

export default function GrammarPage() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const { data, isLoading, error } = useGetGrammarRulesQuery(
    categoryFilter || undefined
  );
  const { data: categoriesData } = useGetCategoriesQuery();

  const rules = data?.data ?? [];
  const categories = categoriesData?.data ?? [];

  const grammarCategories = categories.filter(
    (c) =>
      ['location', 'comparisons', 'idioms', 'grammar'].includes(c.slug) ||
      c.type === 'grammar'
  );

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="grammar-page grammar-page--error">
        <p>Failed to load grammar rules</p>
      </div>
    );
  }

  return (
    <div className="grammar-page">
      <div className="grammar-page__container">
        <div className="grammar-page__tabs">
          <button
            type="button"
            className={`grammar-page__tab ${!categoryFilter ? 'grammar-page__tab--active' : ''}`}
            onClick={() => setCategoryFilter('')}
          >
            All
          </button>
          {grammarCategories.map((c) => (
            <button
              key={c._id || c.slug}
              type="button"
              className={`grammar-page__tab ${categoryFilter === c.slug ? 'grammar-page__tab--active' : ''}`}
              onClick={() => setCategoryFilter(c.slug)}
            >
              {c.nameZh || c.name}
            </button>
          ))}
        </div>

        <ul className="grammar-page__list">
          {rules.map((rule) => {
            const id = rule._id ?? rule.id;
            const isExpanded = expandedId === id;

            return (
              <li key={id} className="grammar-page__item">
                <button
                  type="button"
                  className="grammar-page__card"
                  onClick={() =>
                    setExpandedId((prev) => (prev === id ? null : id))
                  }
                >
                  <span className="grammar-page__title">
                    {rule.title ?? rule.name}
                  </span>
                  <span className="grammar-page__expand-icon">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>
                {isExpanded && (
                  <div className="grammar-page__content">
                    {rule.explanation && (
                      <p className="grammar-page__explanation">
                        {rule.explanation}
                      </p>
                    )}
                    {rule.pattern && (
                      <p className="grammar-page__pattern">
                        <strong>Pattern:</strong> {rule.pattern}
                      </p>
                    )}
                    {rule.examples?.length > 0 && (
                      <div className="grammar-page__examples">
                        <strong>Examples:</strong>
                        {rule.examples.map((ex, i) => (
                          <p key={i} className="grammar-page__example">
                            {typeof ex === 'string'
                              ? ex
                              : `${ex.zh ?? ex.chinese ?? ''} — ${ex.ru ?? ex.translation ?? ''}`}
                          </p>
                        ))}
                      </div>
                    )}
                    <Link
                      to={`/grammar/${id}`}
                      className="grammar-page__detail-link"
                    >
                      View full details →
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {rules.length === 0 && (
          <div className="grammar-page__empty">
            <p>No grammar rules in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
