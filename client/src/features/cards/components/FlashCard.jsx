import { useState, useCallback } from 'react';
import { useSwipe } from '../../../shared/hooks/useSwipe';
import './FlashCard.scss';

const DIFFICULTY_COLORS = {
  easy: { bg: 'var(--success-light)', color: 'var(--success)' },
  medium: { bg: 'rgba(255, 149, 0, 0.15)', color: 'var(--warning)' },
  hard: { bg: 'rgba(255, 59, 48, 0.12)', color: 'var(--error)' },
};

const ICONS = {
  dontKnow: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  learned: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  know: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

export function FlashCard({ word, onKnow, onDontKnow, onLearned, showPinyin = true }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [exiting, setExiting] = useState({ active: false, direction: null });
  const [showHardExamples, setShowHardExamples] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleSwipeLeft = useCallback(() => {
    setExiting({ active: true, direction: 'left' });
  }, []);

  const handleSwipeRight = useCallback(() => {
    setExiting({ active: true, direction: 'right' });
  }, []);

  const swipeRef = useSwipe({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold: 50,
  });

  const handleAnimationEnd = useCallback(() => {
    if (exiting.active) {
      if (exiting.direction === 'left') {
        onDontKnow?.();
      } else {
        onKnow?.();
      }
      setExiting({ active: false, direction: null });
    }
  }, [exiting.active, exiting.direction, onKnow, onDontKnow]);

  const handleDontKnow = useCallback(() => {
    onDontKnow?.();
  }, [onDontKnow]);

  const handleLearned = useCallback(() => {
    onLearned?.();
  }, [onLearned]);

  const handleKnow = useCallback(() => {
    onKnow?.();
  }, [onKnow]);

  const difficultyStyle = DIFFICULTY_COLORS[word?.difficulty] || DIFFICULTY_COLORS.medium;
  const examples = word?.examples ?? [];
  const filteredExamples = showHardExamples
    ? examples
    : examples.filter((ex) => ex.difficulty !== 'hard');

  return (
    <div
      ref={swipeRef}
      className={`flash-card ${exiting.active ? `flash-card--exiting flash-card--exiting-${exiting.direction}` : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="flash-card__inner" onClick={handleFlip}>
        <div className={`flash-card__flipper ${isFlipped ? 'flash-card__flipper--flipped' : ''}`}>
          {/* FRONT */}
          <div className="flash-card__side flash-card__side--front">
            <span
              className="flash-card__difficulty"
              style={{ background: difficultyStyle.bg, color: difficultyStyle.color }}
            >
              {word?.difficulty || 'medium'}
            </span>
            <div className="flash-card__chinese">{word?.chinese}</div>
            {showPinyin && <div className="flash-card__pinyin">{word?.pinyin}</div>}
          </div>

          {/* BACK */}
          <div className="flash-card__side flash-card__side--back">
            <div className="flash-card__translation">
              <span className="flash-card__translation-ru">{word?.translations?.ru}</span>
              {word?.translations?.en && (
                <span className="flash-card__translation-en">{word?.translations.en}</span>
              )}
            </div>
            {word?.grammarNote && (
              <div className="flash-card__grammar">{word.grammarNote}</div>
            )}
            {examples.length > 0 && (
              <div className="flash-card__examples">
                <button
                  type="button"
                  className="flash-card__examples-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHardExamples((prev) => !prev);
                  }}
                >
                  {showHardExamples ? 'Все примеры' : 'Только лёгкие'}
                </button>
                <div className="flash-card__examples-list">
                  {filteredExamples.map((ex, i) => (
                    <div key={i} className="flash-card__example">
                      <div className="flash-card__example-chinese">{ex.chinese}</div>
                      {showPinyin && <div className="flash-card__example-pinyin">{ex.pinyin}</div>}
                      <div className="flash-card__example-translation">
                        {ex.translation?.ru}
                        {ex.translation?.en && (
                          <span className="flash-card__example-translation-en">
                            {' '}({ex.translation.en})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flash-card__actions" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="flash-card__btn flash-card__btn--dont-know"
          onClick={handleDontKnow}
          aria-label="Don't know"
        >
          {ICONS.dontKnow}
          <span>Не знаю</span>
        </button>
        <button
          type="button"
          className="flash-card__btn flash-card__btn--learned"
          onClick={handleLearned}
          aria-label="Выучено"
        >
          {ICONS.learned}
          <span>Выучил</span>
        </button>
        <button
          type="button"
          className="flash-card__btn flash-card__btn--know"
          onClick={handleKnow}
          aria-label="Знаю"
        >
          {ICONS.know}
          <span>Знаю</span>
        </button>
      </div>
    </div>
  );
}
