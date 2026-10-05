import { useContext, useState } from 'react';
import { Icons } from '../components/Icons';
import { ApiContext } from '../contexts/ApiContext';

const suggestions = [
  { title: 'E-commerce Backend', desc: 'Users, products, categories, and a shopping cart' },
  { title: 'Blog API', desc: 'Posts, authors, tags, and comment threads' },
  { title: 'Social Media Mock', desc: 'Profiles, feeds, likes, and followers' },
  { title: 'Task Manager', desc: 'Projects, boards, tasks, and deadlines' },
];

export function Home() {
  const [prompt, setPrompt] = useState('');
  const { activeApi, addApi } = useContext(ApiContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (prompt.trim()) {
      addApi(prompt.trim());
      setPrompt('');
    }
  };

  const statusMessage = {
    thinking: 'Thinking about your API design...',
    creating: 'Creating your API...',
    ready: 'Your API is ready.',
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">Zero-Setup API Generator <br className="hidden md:block" /> for Frontend Devs</h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Paste a prompt and get a temporary, fully working REST API instantly. Stop wasting hours on backend boilerplate.</p>
      </div>

      <div className="w-full max-w-3xl mb-16 relative">
        <div className="absolute -inset-1 bg-linear-to-r from-[#D9522C] to-orange-400 rounded-3xl blur opacity-25 transition duration-1000" />
        <form onSubmit={handleSubmit} className="relative flex items-center bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-2 border border-gray-100 dark:border-gray-700">
          <input type="text" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="I need an e-commerce backend with users, products, and a cart..." className="flex-1 bg-transparent px-6 py-4 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 text-lg rounded-full" />
          <button type="submit" disabled={!prompt.trim()} className="bg-[#D9522C] hover:bg-[#c44725] disabled:opacity-50 disabled:hover:bg-[#D9522C] text-white p-4 rounded-full transition-colors flex items-center justify-center shrink-0" aria-label="Generate API"><Icons.Send /></button>
        </form>
        {activeApi && (
          <div className="relative mt-4 flex items-center gap-2 px-5 text-sm text-gray-600 dark:text-gray-400" role="status" aria-live="polite">
            {activeApi.status !== 'ready' && <span className="h-2 w-2 animate-pulse rounded-full bg-[#D9522C]" />}
            <span>{activeApi.status === 'ready' && activeApi.message ? activeApi.message : statusMessage[activeApi.status]}</span>
          </div>
        )}
        {activeApi?.endpoint && (
          <section className="relative mt-4 rounded-2xl border border-[#D9522C]/25 bg-linear-to-br from-[#fff1ec] via-white to-[#fffaf7] p-5 shadow-sm dark:border-[#D9522C]/40 dark:from-[#321a14] dark:via-gray-900 dark:to-[#241711]" aria-label="Generated API endpoint">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D9522C]">Live API endpoint</p>
            <p className="mt-3 break-all rounded-xl bg-white px-4 py-3 font-mono text-sm text-gray-700 shadow-inner dark:bg-gray-900 dark:text-gray-300">{activeApi.endpoint}</p>
            <p className="mt-2 text-xs text-[#9f4b35] dark:text-[#f3aa92]">This temporary endpoint is visible here until you refresh the tab. It remains available in My APIs.</p>
          </section>
        )}
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-6 text-center">Or start with a template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((item) => (
            <button key={item.title} onClick={() => setPrompt(item.desc)} className="group text-left cursor-pointer bg-white dark:bg-[#1c1c1c] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-[#D9522C]/50 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3 mb-2"><div className="text-[#D9522C]"><Icons.Database /></div><h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#D9522C] transition-colors">{item.title}</h3></div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}