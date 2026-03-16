import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetStudyCardsQuery } from '../features/cards/api/cardsApi';
import { useUpdateProgressMutation } from '../features/progress/api/progressApi';
import { useGetCategoriesQuery } from '../features/categories/api/categoriesApi';
import { FlashCard } from '../features/cards/components/FlashCard';
import { Loader } from '../shared/components/Loader';
import './StudyPage.scss';

const DIFFICULTIES = [
  { value: '', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

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

export default function StudyPage() {
  const { categorySlug } = useParams();
  const [difficulty, setDifficulty] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedIds, setLearnedIds] = useState(new Set());

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data ?? [];
  const category = categories.find((c) => c.slug === categorySlug);

  const { data, isLoading, error } = useGetStudyCardsQuery(
    { categorySlug: categorySlug || 'body', difficulty: difficulty || undefined },
    { skip: !categorySlug }
  );

  const [updateProgress] = useUpdateProgressMutation();

  const words = data?.data ?? [];
  const total = words.length;
  const currentWord = normalizeWord(words[currentIndex]);
  const learnedCount = learnedIds.size;

  const handleLearned = async () => {
    const id = currentWord?._id ?? currentWord?.id;
    if (!id) return;
    setLearnedIds((prev) => new Set([...prev, id]));
    try {
      await updateProgress({
        wordId: id,
        status: 'known',
        correct: true,
      }).unwrap();
    } catch {
      // Revert on error
      setLearnedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
    goNext();
  };

  const goNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  if (!categorySlug) {
    return (
      <div className="study-page">
        <div className="study-page__empty">
          <p>Select a category to start studying</p>
          <Link to="/" className="study-page__link">
            Browse categories
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="study-page study-page--error">
        <p>Failed to load cards</p>
        <Link to="/">Back to categories</Link>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="study-page">
        <div className="study-page__empty">
          <p>No cards in this category</p>
          <Link to="/">Back to categories</Link>
        </div>
      </div>
    );
  }

  const allDone = currentIndex >= total;
  const displayIndex = Math.min(currentIndex + 1, total);

  if (allDone) {
    return (
      <div className="study-page">
        <div className="study-page__complete">
          <h2>Completed!</h2>
          <p className="study-page__complete-stats">
            You studied {total} cards. Learned: {learnedCount}
          </p>
          <div className="study-page__complete-actions">
            <button
              type="button"
              className="study-page__btn"
              onClick={() => {
                setCurrentIndex(0);
                setLearnedIds(new Set());
              }}
            >
              Study again
            </button>
            <Link to="/" className="study-page__btn study-page__btn--secondary">
              Back to categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="study-page">
      <div className="study-page__header">
        <h1 className="study-page__title">{category?.name?.zh ?? categorySlug}</h1>
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
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
        <p className="study-page__counter">
          {displayIndex} / {total}
        </p>
      </div>

      <div className="study-page__card-wrap">
        <FlashCard
          word={currentWord}
          onKnow={goNext}
          onDontKnow={goNext}
          onLearned={handleLearned}
        />
      </div>
    </div>
  );
}
