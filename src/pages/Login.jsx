import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function Login() {
  const { signIn, signUp } = useContext(AuthContext);
  const [mode, setMode] = useState('signIn');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isSignIn = mode === 'signIn';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setMessageType('');
    setSubmitting(true);
    try {
      if (isSignIn) await signIn(form);
      else await signUp(form);
      setMessage(isSignIn ? 'Sign in successful. You are now signed in.' : 'Account created successfully. You are now signed in.');
      setMessageType('success');
    } catch (error) {
      setMessage(error.message || 'Authentication failed. Please try again.');
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1c1c1c] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
        <div className="text-center mb-8"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isSignIn ? 'Welcome back' : 'Create your account'}</h2><p className="text-gray-500 dark:text-gray-400 mt-2">{isSignIn ? 'Sign in to manage your APIs' : 'Start generating APIs with API Gen'}</p></div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isSignIn && <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">Name</label><input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D9522C]/50" placeholder="Your name" /></div>}
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label><input id="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D9522C]/50" placeholder="dev@example.com" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Password</label><input id="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength="8" type="password" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D9522C]/50" placeholder="At least 8 characters" /></div>
          <button disabled={submitting} type="submit" className="w-full bg-[#D9522C] hover:bg-[#c44725] disabled:opacity-50 text-white py-3 rounded-xl font-medium transition-colors mt-6">{submitting ? 'Working...' : isSignIn ? 'Sign In' : 'Create Account'}</button>
        </form>
        {message && <p className={`mt-4 rounded-xl px-4 py-3 text-center text-sm ${messageType === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300'}`} role="alert">{message}</p>}
        <button type="button" onClick={() => { setMode(isSignIn ? 'signUp' : 'signIn'); setMessage(''); setMessageType(''); }} className="w-full mt-6 text-sm text-[#D9522C] hover:underline">{isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in'}</button>
      </div>
    </div>
  );
}