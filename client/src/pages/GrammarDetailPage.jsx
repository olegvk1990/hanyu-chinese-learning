import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetGrammarByIdQuery } from '../features/grammar/api/grammarApi';
import { Loader } from '../shared/components/Loader';
import './GrammarDetailPage.scss';

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

export default function GrammarDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetGrammarByIdQuery(id, {
    skip: !id,
  });

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

  if (isLoading) return <Loader />;

  if (error || !data?.data) {
    return (
      <div className="grammar-detail grammar-detail--error">
        <p>Правило не найдено</p>
        <Link to="/grammar">← Назад к грамматике</Link>
      </div>
    );
  }

  const rule = data.data;

  return (
    <div className="grammar-detail">
      <div className="grammar-detail__container">
        <div className="grammar-detail__top-bar">
          <Link to="/grammar" className="grammar-detail__back">
            ← Назад к грамматике
          </Link>
          <button
            type="button"
            className={`grammar-detail__pinyin-toggle ${showPinyin ? 'grammar-detail__pinyin-toggle--active' : ''}`}
            onClick={togglePinyin}
            aria-label="Toggle pinyin"
          >
            {showPinyin ? <EyeIcon /> : <EyeOffIcon />}
            <span>Пиньинь</span>
          </button>
        </div>

        <h1 className="grammar-detail__title">
          {typeof rule.title === 'object' ? (rule.title.zh || '') : (rule.title ?? rule.name)}
        </h1>
        {showPinyin && rule.title?.pinyin && (
          <p className="grammar-detail__title-pinyin">{rule.title.pinyin}</p>
        )}
        {typeof rule.title === 'object' && rule.title.ru && (
          <p className="grammar-detail__subtitle">{rule.title.ru}</p>
        )}

        {rule.explanation && (
          <section className="grammar-detail__section">
            <h2>Объяснение</h2>
            <p className="grammar-detail__explanation">
              {typeof rule.explanation === 'object' ? (rule.explanation.ru || rule.explanation.en) : rule.explanation}
            </p>
          </section>
        )}

        {rule.pattern && (
          <section className="grammar-detail__section">
            <h2>Паттерн</h2>
            <pre className="grammar-detail__pattern">{rule.pattern}</pre>
          </section>
        )}

        {rule.examples?.length > 0 && (
          <section className="grammar-detail__section">
            <h2>Примеры</h2>
            <ul className="grammar-detail__examples">
              {rule.examples.map((ex, i) => (
                <li key={i} className="grammar-detail__example">
                  {typeof ex === 'string' ? (
                    ex
                  ) : (
                    <>
                      <span className="grammar-detail__example-zh">
                        {ex.zh ?? ex.chinese ?? ''}
                      </span>
                      {showPinyin && (ex.pinyin != null) && (
                        <span className="grammar-detail__example-pinyin">
                          {ex.pinyin}
                        </span>
                      )}
                      <span className="grammar-detail__example-translation">
                        {typeof ex.translation === 'object' ? (ex.translation.ru || ex.translation.en) : (ex.ru ?? ex.translation ?? '')}
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {rule.notes && (
          <section className="grammar-detail__section">
            <h2>Заметки</h2>
            <p className="grammar-detail__notes">{rule.notes}</p>
          </section>
        )}
      </div>
    </div>
  );
}
