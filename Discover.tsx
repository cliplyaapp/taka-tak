import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, MessageSquare, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { ReactNode } from 'react';

export default function Layout() {
  const location = useLocation();
  const isDark = location.pathname === '/' || location.pathname === '/upload';

  return (
    <div className={cn("h-screen w-full flex flex-col overflow-hidden", isDark ? "bg-black text-white" : "bg-white text-black")}>
      <main className="flex-1 overflow-hidden relative">
        <Outlet />
      </main>

      <nav className={cn(
        "h-16 border-t flex items-center justify-around px-2 pb-safe z-50",
        isDark ? "bg-black border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-500"
      )}>
        <NavItem to="/" icon={<Home />} label="Home" active={location.pathname === '/'} isDark={isDark} />
        <NavItem to="/discover" icon={<Search />} label="Discover" active={location.pathname === '/discover'} isDark={isDark} />
        <Link to="/upload" className="flex items-center justify-center w-12 h-8 bg-gradient-to-r from-cyan-400 via-black to-pink-500 rounded-xl relative">
          <div className="absolute inset-0.5 bg-white rounded-lg flex items-center justify-center text-black">
            <PlusSquare size={20} />
          </div>
        </Link>
        <NavItem to="/inbox" icon={<MessageSquare />} label="Inbox" active={location.pathname === '/inbox'} isDark={isDark} />
        <NavItem to="/profile" icon={<User />} label="Profile" active={location.pathname === '/profile'} isDark={isDark} />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, active, isDark }: { to: string, icon: ReactNode, label: string, active: boolean, isDark: boolean }) {
  return (
    <Link to={to} className={cn("flex flex-col items-center justify-center w-16 gap-1", active && (isDark ? "text-white" : "text-black"))}>
      <div className={cn("[&>svg]:w-6 [&>svg]:h-6", active && "stroke-[2.5px]")}>{icon}</div>
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
