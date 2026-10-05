import { useContext } from 'react';
import { RouterContext } from '../contexts/RouterContext';
import { Icons } from '../components/Icons';

export function ComingSoon() {
  const { navigate, currentRoute } = useContext(RouterContext);
  const network = currentRoute.split('/').pop();
  const title = network === 'x' ? 'X' : network.charAt(0).toUpperCase() + network.slice(1);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl dark:border-gray-800 dark:bg-[#1c1c1c]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D9522C]/10 text-[#D9522C]"><Icons.Spark /></div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D9522C]">{title}</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Coming soon</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">Our {title} community is still being forged. Check back soon.</p>
        <button type="button" onClick={() => navigate('/')} className="mt-8 rounded-xl bg-[#D9522C] px-5 py-3 font-medium text-white transition-colors hover:bg-[#c44725]">Back to home</button>
      </div>
    </div>
  );
}