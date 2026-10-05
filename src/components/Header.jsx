import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { RouterContext } from '../contexts/RouterContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { Icons } from './Icons';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'My APIs', path: '/my-apis' },
  { name: 'Login', path: '/login' },
];

export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentRoute, navigate } = useContext(RouterContext);
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-[#D9522C] text-white p-1.5 rounded-lg"><Icons.Spark /></div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">API FORGE</span>
        </button>

        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <button key={item.name} onClick={() => navigate(item.path)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentRoute === item.path ? 'bg-[#D9522C]/10 text-[#D9522C] dark:bg-[#D9522C]/20' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user && <span className="hidden sm:flex max-w-40 items-center gap-2 truncate rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"><Icons.User /><span className="truncate">{user.name || user.email}</span></span>}
          {user && <button onClick={signOut} className="hidden sm:block text-sm text-gray-500 hover:text-[#D9522C]">Sign out</button>}
          <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle theme">
            {theme === 'light' ? <Icons.Moon /> : <Icons.Sun />}
          </button>
          <div className="md:hidden flex gap-2">
            <button onClick={() => navigate('/')} className={`p-2 ${currentRoute === '/' ? 'text-[#D9522C]' : 'text-gray-500'}`}>Menu</button>
          </div>
        </div>
      </div>
    </header>
  );
}