import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Menu, LogOut, ListChecks, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setIsOpen } from '@/slices/sidebarSlice';
import { clearAuth } from '@/slices/authSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    { name: 'Quiz', path: '/quiz', icon: <ListChecks size={20} /> },
    { name: 'User Management', path: '/users', icon: <Users size={20} /> },
  ];

  return (
    <div
      className={`bg-[#235748] text-white flex flex-col justify-between 
  transition-all duration-300 ${isOpen ? 'w-64' : 'w-24'} h-screen shadow-lg`}
    >
      <div>
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <img
            src={
              isOpen
                ? `${import.meta.env.BASE_URL}kskl.png`
                : `${import.meta.env.BASE_URL}logo.png`
            }
            alt="Logo"
            className={`object-contain transition-all duration-300 ${
              isOpen ? 'h-10 w-auto' : 'h-10 w-10 mx-auto'
            }`}
          />

          <button
            onClick={() => dispatch(setIsOpen(!isOpen))}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? 'bg-[#418773] text-white shadow-md'
                    : 'text-gray-300 hover:bg-[#418773] hover:text-white'
                }`
              }
            >
              {item.icon}
              <span className={`${isOpen ? 'block' : 'hidden'}`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-700">
        <button
          onClick={() => {
            dispatch(clearAuth());
            navigate('/');
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white transition-all"
        >
          <LogOut size={20} />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>Logout</span>
        </button>
      </div>
    </div>
  );
}
