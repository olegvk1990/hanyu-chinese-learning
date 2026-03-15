import './Loader.scss';

export function Loader() {
  return (
    <div className="loader-wrapper" role="status" aria-label="Loading">
      <div className="loader-spinner" />
    </div>
  );
}
