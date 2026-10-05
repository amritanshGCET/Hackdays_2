import { useContext } from 'react';
import { RouterContext } from '../contexts/RouterContext';
import { Footer } from './Footer';
import { Header } from './Header';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { MyApis } from '../pages/MyApis';
import { ComingSoon } from '../pages/ComingSoon';

export function Layout() {
  const { currentRoute } = useContext(RouterContext);
  const pages = { '/': <Home />, '/my-apis': <MyApis />, '/login': <Login /> };
  const page = pages[currentRoute] || (currentRoute.startsWith('/coming-soon/') ? <ComingSoon /> : <Home />);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans selection:bg-[#D9522C] selection:text-white">
      <Header />
      <main className="flex-1 flex flex-col w-full">{page}</main>
      <Footer />
    </div>
  );
}