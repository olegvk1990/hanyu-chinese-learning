import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetStatsQuery } from '../features/progress/api/progressApi';
import { useGetReviewCardsQuery } from '../features/progress/api/progressApi';
import { logout } from '../features/auth/slices/authSlice';
import { toggleTheme } from '../features/auth/slices/themeSlice';
import { Loader } from '../shared/components/Loader';
import './ProgressPage.scss';

export default function ProgressPage() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);

  const { data: statsData, isLoading: statsLoading } = useGetStatsQuery();
  const { data: reviewData, isLoading: reviewLoading } = useGetReviewCardsQuery();

  const stats = statsData?.data ?? {};
  const reviewCards = reviewData?.data ?? [];
  const total = stats.total ?? 0;
  const newCount = stats.new ?? 0;
  const learning = stats.learning ?? 0;
  const review = stats.review ?? 0;
  const known = stats.known ?? 0;

  const handleLogout = () => {
    dispatch(logout());
  };

  const getPieSegment = (value, totalVal, offset) => {
    if (totalVal === 0) return 0;
    return (value / totalVal) * 100;
  };

  const totalStudied = total || newCount + learning + review + known;
  const segments = [
    { value: newCount, color: 'var(--accent)' },
    { value: learning, color: 'var(--warning)' },
    { value: review, color: 'var(--text-pinyin)' },
    { value: known, color: 'var(--success)' },
  ].filter((s) => s.value > 0);

  let offset = 0;
  const conicParts = segments
    .map((s) => {
      const pct = getPieSegment(s.value, totalStudied, offset);
      offset += pct;
      return `${s.color} ${offset - pct}% ${offset}%`;
    })
    .join(', ');

  if (statsLoading) return <Loader />;

  return (
    <div className="progress-page">
      <div className="progress-page__container">
        <section className="progress-page__profile">
          <div className="progress-page__avatar">
            {user?.name?.[0] ?? user?.email?.[0] ?? '?'}
          </div>
          <h2 className="progress-page__name">
            {user?.name ?? user?.email ?? 'User'}
          </h2>
        </section>

        <section className="progress-page__stats">
          <h3>Statistics</h3>
          <div className="progress-page__pie-wrap">
            {totalStudied > 0 ? (
              <div
                className="progress-page__pie"
                style={{
                  background: `conic-gradient(${conicParts})`,
                }}
              />
            ) : (
              <div className="progress-page__pie progress-page__pie--empty" />
            )}
            <div className="progress-page__pie-center">
              <span className="progress-page__pie-total">{totalStudied}</span>
              <span className="progress-page__pie-label">words</span>
            </div>
          </div>
          <div className="progress-page__breakdown">
            <span className="progress-page__stat">
              <span className="progress-page__stat-dot" style={{ background: 'var(--accent)' }} />
              New: {newCount}
            </span>
            <span className="progress-page__stat">
              <span className="progress-page__stat-dot" style={{ background: 'var(--warning)' }} />
              Learning: {learning}
            </span>
            <span className="progress-page__stat">
              <span className="progress-page__stat-dot" style={{ background: 'var(--text-pinyin)' }} />
              Review: {review}
            </span>
            <span className="progress-page__stat">
              <span className="progress-page__stat-dot" style={{ background: 'var(--success)' }} />
              Known: {known}
            </span>
          </div>
        </section>

        <section className="progress-page__streak">
          <h3>Streak</h3>
          <p className="progress-page__streak-value">0 days</p>
          <span className="progress-page__streak-hint">(placeholder)</span>
        </section>

        <section className="progress-page__review">
          <h3>Review due today</h3>
          {reviewLoading ? (
            <p>Loading...</p>
          ) : (
            <p className="progress-page__review-count">
              {reviewCards.length} cards
            </p>
          )}
          {reviewCards.length > 0 && (
            <Link to="/study" className="progress-page__review-link">
              Start review
            </Link>
          )}
        </section>

        <section className="progress-page__settings">
          <h3>Settings</h3>
          <div className="progress-page__setting-row">
            <span>Theme</span>
            <button
              type="button"
              className="progress-page__theme-btn"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
          <div className="progress-page__setting-row">
            <span>Language</span>
            <span className="progress-page__setting-value">Russian</span>
          </div>
        </section>

        <button
          type="button"
          className="progress-page__logout"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
