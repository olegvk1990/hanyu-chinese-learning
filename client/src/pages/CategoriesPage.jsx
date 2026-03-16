import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../features/categories/api/categoriesApi';
import { Loader } from '../shared/components/Loader';
import './CategoriesPage.scss';

const SLUG_TO_EMOJI = {
  body: '🏃',
  food: '🍜',
  verbs: '⚡',
  adjectives: '🎨',
  feelings: '❤️',
  furniture: '🪑',
  materials: '🪵',
  'furniture-terms': '🔧',
  finishing: '🎨',
  consumables: '📦',
  business: '💼',
  'business-phrases': '💬',
  location: '📍',
  comparisons: '⚖️',
  idioms: '📚',
};

const GROUP_ORDER = ['basic', 'furniture', 'business', 'grammar'];
const SLUG_TO_GROUP = {
  body: 'basic',
  food: 'basic',
  verbs: 'basic',
  adjectives: 'basic',
  feelings: 'basic',
  furniture: 'furniture',
  materials: 'furniture',
  'furniture-terms': 'furniture',
  finishing: 'furniture',
  consumables: 'furniture',
  business: 'business',
  'business-phrases': 'business',
  location: 'grammar',
  comparisons: 'grammar',
  idioms: 'grammar',
};

const GROUP_LABELS = {
  basic: 'Basic',
  furniture: 'Furniture',
  business: 'Business',
  grammar: 'Grammar',
};

function getEmoji(slug) {
  return SLUG_TO_EMOJI[slug] || '📖';
}

function getGroup(slug) {
  return SLUG_TO_GROUP[slug] || 'basic';
}

export default function CategoriesPage() {
  const { data, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <div className="categories-page categories-page--error">
        <p>Failed to load categories</p>
      </div>
    );
  }

  const categories = data?.data ?? [];
  const grouped = categories.reduce((acc, cat) => {
    const group = getGroup(cat.slug);
    if (!acc[group]) acc[group] = [];
    acc[group].push(cat);
    return acc;
  }, {});

  return (
    <div className="categories-page">
      <div className="categories-page__container">
        {GROUP_ORDER.filter((g) => grouped[g]?.length).map((groupKey) => (
          <section key={groupKey} className="categories-page__section">
            <h2 className="categories-page__section-title">
              {GROUP_LABELS[groupKey]}
            </h2>
            <div className="categories-page__grid">
              {grouped[groupKey].map((cat) => (
                <Link
                  key={cat._id || cat.slug}
                  to={`/study/${cat.slug}`}
                  className="categories-page__card"
                >
                  <span
                    className="categories-page__accent"
                    style={{
                      '--accent-color': `var(--accent)`,
                    }}
                  />
                  <span className="categories-page__emoji">
                    {getEmoji(cat.slug)}
                  </span>
                  <span className="categories-page__name-zh">
                    {cat.name?.zh ?? cat.name}
                  </span>
                  <span className="categories-page__name-ru">
                    {cat.name?.ru ?? cat.name?.en ?? ''}
                  </span>
                  <span className="categories-page__badge">
                    {cat.wordCount ?? 0} words
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
