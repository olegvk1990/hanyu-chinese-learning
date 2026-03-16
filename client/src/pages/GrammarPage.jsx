import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetGrammarRulesQuery } from '../features/grammar/api/grammarApi';
import { useGetCategoriesQuery } from '../features/categories/api/categoriesApi';
import { Loader } from '../shared/components/Loader';
import './GrammarPage.scss';

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function GrammarPage() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [showPinyin, setShowPinyin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hanyu_grammar_pinyin') ?? 'true'); }
    catch { return true; }
  });

  const togglePinyin = () => {
    setShowPinyin((prev) => {
      const next = !prev;
      localStorage.setItem('hanyu_grammar_pinyin', JSON.stringify(next));
      return next;
    });
  };

  const { data, isLoading, error } = useGetGrammarRulesQuery(
    categoryFilter || undefined
  );
  const { data: categoriesData } = useGetCategoriesQuery();

  const rules = data?.data ?? [];
  const categories = categoriesData?.data ?? [];

  const grammarCategories = categories;

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="grammar-page grammar-page--error">
        <p>Ошибка загрузки грамматики</p>
      </div>
    );
  }

  return (
    <div className="grammar-page">
      <div className="grammar-page__container">
        <div className="grammar-page__toolbar">
          <div className="grammar-page__tabs">
            <button
              type="button"
              className={`grammar-page__tab ${!categoryFilter ? 'grammar-page__tab--active' : ''}`}
              onClick={() => setCategoryFilter('')}
            >
              Все
            </button>
            {grammarCategories.map((c) => (
              <button
                key={c._id || c.slug}
                type="button"
                className={`grammar-page__tab ${categoryFilter === c.slug ? 'grammar-page__tab--active' : ''}`}
                onClick={() => setCategoryFilter(c.slug)}
              >
                {c.name?.ru ?? c.name?.zh ?? c.slug}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`grammar-page__pinyin-toggle ${showPinyin ? 'grammar-page__pinyin-toggle--active' : ''}`}
            onClick={togglePinyin}
            aria-label="Toggle pinyin"
          >
            {showPinyin ? <EyeIcon /> : <EyeOffIcon />}
            <span>Пиньинь</span>
          </button>
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
                    <span className="grammar-page__title-zh">{typeof rule.title === 'object' ? (rule.title.zh || '') : (rule.title ?? rule.name)}</span>
                    {showPinyin && rule.title?.pinyin && (
                      <span className="grammar-page__title-pinyin">{rule.title.pinyin}</span>
                    )}
                    {typeof rule.title === 'object' && rule.title.ru && (
                      <span className="grammar-page__title-ru">{rule.title.ru}</span>
                    )}
                  </span>
                  <span className="grammar-page__expand-icon">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>
                {isExpanded && (
                  <div className="grammar-page__content">
                    {rule.explanation && (
                      <p className="grammar-page__explanation">
                        {typeof rule.explanation === 'object' ? (rule.explanation.ru || rule.explanation.en) : rule.explanation}
                      </p>
                    )}
                    {rule.pattern && (
                      <p className="grammar-page__pattern">
                        <strong>Паттерн:</strong> {rule.pattern}
                      </p>
                    )}
                    {rule.examples?.length > 0 && (
                      <div className="grammar-page__examples">
                        <strong>Примеры:</strong>
                        {rule.examples.map((ex, i) => (
                          <div key={i} className="grammar-page__example">
                            {typeof ex === 'string' ? (
                              <span>{ex}</span>
                            ) : (
                              <>
                                <span className="grammar-page__example-zh">
                                  {ex.zh ?? ex.chinese ?? ''}
                                </span>
                                {showPinyin && (ex.pinyin != null) && (
                                  <span className="grammar-page__example-pinyin">
                                    {ex.pinyin}
                                  </span>
                                )}
                                <span className="grammar-page__example-translation">
                                  {typeof ex.translation === 'object'
                                    ? (ex.translation.ru || ex.translation.en)
                                    : (ex.ru ?? ex.translation ?? '')}
                                </span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <Link
                      to={`/grammar/${id}`}
                      className="grammar-page__detail-link"
                    >
                      Подробнее →
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {rules.length === 0 && (
          <div className="grammar-page__empty">
            <p>Нет правил в этой категории</p>
          </div>
        )}
      </div>
    </div>
  );
}
