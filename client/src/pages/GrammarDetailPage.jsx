import { useParams, Link } from 'react-router-dom';
import { useGetGrammarByIdQuery } from '../features/grammar/api/grammarApi';
import { Loader } from '../shared/components/Loader';
import './GrammarDetailPage.scss';

export default function GrammarDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetGrammarByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) return <Loader />;

  if (error || !data?.data) {
    return (
      <div className="grammar-detail grammar-detail--error">
        <p>Grammar rule not found</p>
        <Link to="/grammar">Back to grammar</Link>
      </div>
    );
  }

  const rule = data.data;

  return (
    <div className="grammar-detail">
      <div className="grammar-detail__container">
        <Link to="/grammar" className="grammar-detail__back">
          ← Back to grammar
        </Link>

        <h1 className="grammar-detail__title">{rule.title ?? rule.name}</h1>

        {rule.explanation && (
          <section className="grammar-detail__section">
            <h2>Explanation</h2>
            <p className="grammar-detail__explanation">{rule.explanation}</p>
          </section>
        )}

        {rule.pattern && (
          <section className="grammar-detail__section">
            <h2>Pattern</h2>
            <pre className="grammar-detail__pattern">{rule.pattern}</pre>
          </section>
        )}

        {rule.examples?.length > 0 && (
          <section className="grammar-detail__section">
            <h2>Examples</h2>
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
                      <span className="grammar-detail__example-pinyin">
                        {ex.pinyin ?? ''}
                      </span>
                      <span className="grammar-detail__example-translation">
                        {ex.ru ?? ex.translation ?? ''}
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
            <h2>Notes</h2>
            <p className="grammar-detail__notes">{rule.notes}</p>
          </section>
        )}
      </div>
    </div>
  );
}
