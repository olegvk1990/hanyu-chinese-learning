import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Router } from './Router';
import '../features/auth/api/authApi';
import '../features/categories/api/categoriesApi';
import '../features/cards/api/cardsApi';
import '../features/grammar/api/grammarApi';
import '../features/progress/api/progressApi';

function App() {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
