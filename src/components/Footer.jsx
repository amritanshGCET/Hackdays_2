import { useContext } from 'react';
import { RouterContext } from '../contexts/RouterContext';
import { Icons } from './Icons';

const socialLinks = [
  { label: 'Instagram', path: '/coming-soon/instagram', icon: Icons.Instagram },
  { label: 'X', path: '/coming-soon/x', icon: Icons.Twitter },
  { label: 'LinkedIn', path: '/coming-soon/linkedin', icon: Icons.Linkedin },
];

export function Footer() {
  const { currentRoute, navigate } = useContext(RouterContext);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-500 dark:text-gray-400 text-sm">(c) 2026 API FORGE. All rights reserved.</div>
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/')} className={`text-sm ${currentRoute === '/' ? 'text-[#D9522C]' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Home</button>
          <button onClick={() => navigate('/my-apis')} className={`text-sm ${currentRoute === '/my-apis' ? 'text-[#D9522C]' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>My APIs</button>
          <button onClick={() => navigate('/login')} className={`text-sm ${currentRoute === '/login' ? 'text-[#D9522C]' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Login</button>
          <span className="h-5 w-px bg-gray-200 dark:bg-gray-700" />
          {socialLinks.map(({ label, path, icon: Icon }) => <button key={label} type="button" onClick={() => navigate(path)} className="text-gray-500 transition-colors hover:text-[#D9522C]" aria-label={`${label} coming soon`}><Icon /></button>)}
        </div>
      </div>
    </footer>
  );
}