import { Outlet } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { BottomNav } from './BottomNav';
import './Layout.scss';

export function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <h1 className="layout__title">汉语学习</h1>
        <ThemeToggle />
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
