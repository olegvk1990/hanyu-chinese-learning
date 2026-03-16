import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetStudyCardsQuery } from '../features/cards/api/cardsApi';
import { useUpdateProgressMutation, useSaveStudyStateMutation } from '../features/progress/api/progressApi';
import { useGetCategoriesQuery } from '../features/categories/api/categoriesApi';
import { FlashCard } from '../features/cards/components/FlashCard';
import { Loader } from '../shared/components/Loader';
import './StudyPage.scss';

const DIFFICULTIES = [
  { value: '', label: 'Все' },
  { value: 'easy', label: 'Лёгкие' },
  { value: 'medium', label: 'Средние' },
  { value: 'hard', label: 'Сложные' },
];

const STORAGE_KEY = 'hanyu_study_state';

function loadState(categorySlug) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const all = JSON.parse(raw);
    return all[categorySlug] ?? null;
  } catch { return null; }
}

function saveStateLocal(categorySlug, state) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[categorySlug] = { ...state, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch { /* noop */ }
}

function normalizeWord(word) {
  if (!word) return null;
  return {
    ...word,
    chinese: word.chinese ?? word.character ?? word.zh,
    pinyin: word.pinyin,
    translations: {
      ru: word.translation ?? word.meaning ?? word.ru ?? word.translations?.ru,
      en: word.translations?.en,
    },
    examples: word.examples ?? [],
    grammarNote: word.grammarNote,
    difficulty: word.difficulty ?? 'medium',
  };
}

const ICONS = {
  cards: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  table: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  ),
  eye: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeOff: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
};

function WordTable({ words, showPinyin, learnedIds, selectedIds, onToggleLearned, onToggleSelected, selectionMode }) {
  return (
    <div className="word-table">
      <div className="word-table__header">
        {selectionMode && <span className="word-table__col word-table__col--sel" />}
        <span className="word-table__col word-table__col--zh">汉字</span>
        {showPinyin && <span className="word-table__col word-table__col--py">拼音</span>}
        <span className="word-table__col word-table__col--ru">Перевод</span>
        <span className="word-table__col word-table__col--act" />
      </div>
      <div className="word-table__body">
        {words.map((raw, i) => {
          const w = normalizeWord(raw);
          const id = w?._id ?? w?.id ?? i;
          const learned = learnedIds.has(id);
          const selected = selectedIds.has(id);
          return (
            <div key={id} className={`word-table__row ${learned ? 'word-table__row--learned' : ''} ${selected ? 'word-table__row--selected' : ''}`}>
              {selectionMode && (
                <span className="word-table__col word-table__col--sel">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggleSelected(id)}
                    className="word-table__checkbox"
                  />
                </span>
              )}
              <span className="word-table__col word-table__col--zh">{w?.chinese}</span>
              {showPinyin && <span className="word-table__col word-table__col--py">{w?.pinyin}</span>}
              <span className="word-table__col word-table__col--ru">{w?.translations?.ru}</span>
              <span className="word-table__col word-table__col--act">
                <button
                  type="button"
                  className={`word-table__learn-btn ${learned ? 'word-table__learn-btn--active' : ''}`}
                  onClick={() => onToggleLearned(id)}
                  aria-label={learned ? 'Снять выучено' : 'Выучено'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function StudyPage() {
  const { categorySlug } = useParams();
  const token = useSelector((s) => s.auth.token);

  const saved = useMemo(() => categorySlug ? loadState(categorySlug) : null, [categorySlug]);

  const [difficulty, setDifficulty] = useState(saved?.difficulty ?? '');
  const [currentIndex, setCurrentIndex] = useState(saved?.currentIndex ?? 0);
  const [learnedIds, setLearnedIds] = useState(() => new Set(saved?.learnedIds ?? []));
  const [showPinyin, setShowPinyin] = useState(saved?.showPinyin ?? true);
  const [viewMode, setViewMode] = useState(saved?.viewMode ?? 'cards');
  const [selectedIds, setSelectedIds] = useState(() => new Set(saved?.selectedWordIds ?? []));
  const [selectionMode, setSelectionMode] = useState(false);
  const [studySelected, setStudySelected] = useState(false);

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data ?? [];
  const category = categories.find((c) => c.slug === categorySlug);

  const { data, isLoading, error } = useGetStudyCardsQuery(
    { categorySlug: categorySlug || 'body', difficulty: difficulty || undefined },
    { skip: !categorySlug }
  );

  const [updateProgress] = useUpdateProgressMutation();
  const [saveStudyState] = useSaveStudyStateMutation();
  const saveTimerRef = useRef(null);

  const allWords = data?.data ?? [];
  const useSelected = selectedIds.size > 0 && (studySelected || viewMode === 'cards');
  const words = useSelected
    ? allWords.filter((w) => selectedIds.has(w._id ?? w.id))
    : allWords;
  const total = words.length;
  const currentWord = normalizeWord(words[currentIndex]);
  const learnedCount = learnedIds.size;

  const persistState = useCallback(() => {
    if (!categorySlug || isLoading) return;
    const state = {
      difficulty,
      currentIndex,
      learnedIds: [...learnedIds],
      showPinyin,
      viewMode,
      selectedWordIds: [...selectedIds],
    };
    saveStateLocal(categorySlug, state);
    if (token) {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        saveStudyState({ categorySlug, state }).catch(() => {});
      }, 2000);
    }
  }, [categorySlug, difficulty, currentIndex, learnedIds, showPinyin, viewMode, selectedIds, isLoading, token, saveStudyState]);

  useEffect(() => {
    persistState();
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [persistState]);

  useEffect(() => {
    if (!categorySlug) return;
    const s = loadState(categorySlug);
    if (s) {
      setDifficulty(s.difficulty ?? '');
      setCurrentIndex(s.currentIndex ?? 0);
      setLearnedIds(new Set(s.learnedIds ?? []));
      setShowPinyin(s.showPinyin ?? true);
      setViewMode(s.viewMode ?? 'cards');
      setSelectedIds(new Set(s.selectedWordIds ?? []));
    } else {
      setDifficulty('');
      setCurrentIndex(0);
      setLearnedIds(new Set());
      setShowPinyin(true);
      setViewMode('cards');
      setSelectedIds(new Set());
    }
    setStudySelected(false);
    setSelectionMode(false);
  }, [categorySlug]);

  const handleLearned = async () => {
    const id = currentWord?._id ?? currentWord?.id;
    if (!id) return;
    setLearnedIds((prev) => new Set([...prev, id]));
    try {
      await updateProgress({ wordId: id, status: 'known', correct: true }).unwrap();
    } catch {
      setLearnedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
    goNext();
  };

  const handleToggleTableLearned = async (id) => {
    const wasLearned = learnedIds.has(id);
    setLearnedIds((prev) => {
      const next = new Set(prev);
      wasLearned ? next.delete(id) : next.add(id);
      return next;
    });
    if (!wasLearned) {
      try {
        await updateProgress({ wordId: id, status: 'known', correct: true }).unwrap();
      } catch {
        setLearnedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    }
  };

  const handleToggleSelected = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleStudySelected = () => {
    setStudySelected(true);
    setViewMode('cards');
    setCurrentIndex(0);
  };

  const handleSelectAll = () => {
    const allIds = allWords.map((w) => w._id ?? w.id);
    setSelectedIds(new Set(allIds));
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const goNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(total);
    }
  };

  if (!categorySlug) {
    return (
      <div className="study-page">
        <div className="study-page__empty">
          <h2 style={{ marginBottom: '0.5rem' }}>Выберите категорию</h2>
          <p>Перейдите на главную страницу и выберите тему</p>
          <Link to="/" className="study-page__link" style={{ marginTop: '1rem', display: 'inline-block', color: 'var(--accent)' }}>
            ← Категории
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="study-page study-page--error">
        <p>Ошибка загрузки карточек</p>
        <Link to="/">← Назад</Link>
      </div>
    );
  }

  if (allWords.length === 0) {
    return (
      <div className="study-page">
        <div className="study-page__empty">
          <p>Нет карточек в этой категории</p>
          <Link to="/">← Назад</Link>
        </div>
      </div>
    );
  }

  if (total === 0 && viewMode === 'cards') {
    return (
      <div className="study-page">
        <div className="study-page__empty">
          <h2 style={{ marginBottom: '0.5rem' }}>Нет выбранных слов</h2>
          <p>Выберите слова в режиме таблицы или сбросьте выбор</p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" className="study-page__btn" onClick={() => { setViewMode('table'); setSelectionMode(true); }}>
              Выбрать слова
            </button>
            <button type="button" className="study-page__btn study-page__btn--outline" onClick={() => { setSelectedIds(new Set()); setStudySelected(false); }}>
              Показать все
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allDone = currentIndex >= total;
  const displayIndex = Math.min(currentIndex + 1, total);

  if (allDone && viewMode === 'cards') {
    return (
      <div className="study-page">
        <div className="study-page__complete">
          <h2>Завершено!</h2>
          <p className="study-page__complete-stats">
            Изучено карточек: {total}. Выучено: {learnedCount}
          </p>
          <div className="study-page__complete-actions">
            <button type="button" className="study-page__btn" onClick={() => { setCurrentIndex(0); setLearnedIds(new Set()); }}>
              Ещё раз
            </button>
            <button type="button" className="study-page__btn study-page__btn--outline" onClick={() => { setViewMode('table'); setStudySelected(false); }}>
              Режим таблицы
            </button>
            <Link to="/" className="study-page__btn study-page__btn--secondary">← Категории</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="study-page">
      <div className="study-page__header">
        <div className="study-page__title-row">
          <h1 className="study-page__title">
            {category?.name?.zh ?? categorySlug}
            {category?.name?.ru && <span className="study-page__title-ru"> — {category.name.ru}</span>}
          </h1>
        </div>
        <div className="study-page__filters">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value || 'all'}
              type="button"
              className={`study-page__filter ${difficulty === d.value ? 'study-page__filter--active' : ''}`}
              onClick={() => {
                setDifficulty(d.value);
                setCurrentIndex(0);
                setLearnedIds(new Set());
                setStudySelected(false);
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="study-page__controls">
          {viewMode === 'cards' && (
            <p className="study-page__counter">
              {useSelected && <span className="study-page__badge">Выбрано: {selectedIds.size}</span>}
              {displayIndex} / {total}
            </p>
          )}
          {viewMode === 'table' && (
            <p className="study-page__counter">Всего: {allWords.length} · Выучено: {learnedCount}{selectedIds.size > 0 && ` · Выбрано: ${selectedIds.size}`}</p>
          )}
          <div className="study-page__toggles">
            <button type="button" className={`study-page__mode-toggle ${viewMode === 'cards' ? 'study-page__mode-toggle--active' : ''}`} onClick={() => { setViewMode('cards'); setCurrentIndex(0); }} aria-label="Карточки">
              {ICONS.cards}
            </button>
            <button type="button" className={`study-page__mode-toggle ${viewMode === 'table' ? 'study-page__mode-toggle--active' : ''}`} onClick={() => { setViewMode('table'); setStudySelected(false); }} aria-label="Таблица">
              {ICONS.table}
            </button>
            <button type="button" className={`study-page__pinyin-toggle ${showPinyin ? 'study-page__pinyin-toggle--active' : ''}`} onClick={() => setShowPinyin((p) => !p)} aria-label="Пиньинь">
              {showPinyin ? ICONS.eye : ICONS.eyeOff}
              <span>Пиньинь</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'cards' && (
        <div className="study-page__card-wrap">
          <FlashCard
            key={currentWord?._id ?? currentIndex}
            word={currentWord}
            onKnow={goNext}
            onDontKnow={goNext}
            onLearned={handleLearned}
            showPinyin={showPinyin}
          />
        </div>
      )}

      {viewMode === 'table' && (
        <>
          <div className="study-page__table-actions">
            <button
              type="button"
              className={`study-page__select-toggle ${selectionMode ? 'study-page__select-toggle--active' : ''}`}
              onClick={() => setSelectionMode((p) => !p)}
            >
              {selectionMode ? 'Готово' : 'Выбрать слова'}
            </button>
            {selectionMode && (
              <>
                <button type="button" className="study-page__select-btn" onClick={handleSelectAll}>Все</button>
                <button type="button" className="study-page__select-btn" onClick={handleDeselectAll}>Сбросить</button>
              </>
            )}
            {selectedIds.size > 0 && (
              <button type="button" className="study-page__study-selected-btn" onClick={handleStudySelected}>
                Учить выбранные ({selectedIds.size})
              </button>
            )}
          </div>
          <WordTable
            words={allWords}
            showPinyin={showPinyin}
            learnedIds={learnedIds}
            selectedIds={selectedIds}
            onToggleLearned={handleToggleTableLearned}
            onToggleSelected={handleToggleSelected}
            selectionMode={selectionMode}
          />
        </>
      )}
    </div>
  );
}
