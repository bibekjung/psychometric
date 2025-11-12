import {
  setEmail,
  setIsAnimationComplete,
  setPassword,
} from '@/slices/authSlice';
import { RootState } from '@/store/store';
import { Lock, PhoneCall } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { email, password, isAnimationComplete } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setIsAnimationComplete(true));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-[#ECF8F3] via-white to-[#F1FBF7]">
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#CFE5FF] blur-3xl opacity-10" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#D1F7E3] blur-3xl opacity-10" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: [
            'linear-gradient(120deg, rgba(30, 20, 20, 0.22), rgba(98, 84, 84, 0.2))',
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=90&w=2400&auto=format&fit=crop')",
            // "url('https://images.unsplash.com/photo-1754137351565-1a9997df8e6b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1631')",
          ].join(','),
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
          backgroundPosition:
            'center, right -12% center, left -12% bottom -12%',
          backgroundSize: 'cover, 960px, 820px',
          backgroundAttachment: 'fixed, scroll, scroll',
          backgroundBlendMode: 'soft-light, normal, multiply',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1000px 600px at 85% 30%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%), radial-gradient(900px 500px at 15% 85%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 60%)',
        }}
      />
      <div className=" rounded-2xl shadow-lg w-full max-w-5xl min-h-[600px] overflow-hidden relative backdrop-blur-[1px]">
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-6 py-10 md:px-10 text-white transition-transform duration-1000 ease-in-out"
          style={{
            transform: isAnimationComplete
              ? 'translateX(-25%)'
              : 'translateX(0)',
          }}
        >
          <div className="relative z-10 flex flex-col items-center">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="KSKL"
              className="h-32 w-auto object-contain"
            />
            <div className="flex flex-col items-center text-center max-w-sm">
              <h1 className="text-xl md:text-3xl font-bold mb-4">
                PSYCHOMETRIC
              </h1>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                Please sign in to continue
              </p>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0F3D3E] via-[#166534] to-[#0E7490] opacity-95" />
          <div
            className="absolute inset-0 -z-10 opacity-15"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.25) 0, rgba(255,255,255,0) 60%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.2) 0, rgba(255,255,255,0) 60%)',
            }}
          />
        </div>
        <div
          className="absolute top-0 right-0 w-1/2 h-full px-6 py-8 md:px-12 md:py-10 flex flex-col justify-center bg-white/95 backdrop-blur-[3px] transition-transform duration-1000 ease-in-out overflow-y-auto"
          style={{
            transform: isAnimationComplete
              ? 'translateX(0)'
              : 'translateX(100%)',
          }}
        >
          {isAnimationComplete && (
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Hello! Welcome Back
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Log in with your credentials you entered.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                    htmlFor="email"
                  >
                    Phone Number
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <PhoneCall className="h-5 w-5 text-gray-400 mr-3" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                      className="w-full outline-none text-sm md:text-base"
                      placeholder="Enter your number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <Lock className="h-5 w-5 text-gray-400 mr-3" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => dispatch(setPassword(e.target.value))}
                      className="w-full outline-none text-sm md:text-base"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full bg-[#246C42] text-white py-3 md:py-4 rounded-lg font-medium hover:bg-[#235748] transition-all duration-300 text-sm md:text-base shadow-sm"
                >
                  Login To Dashboard
                </button>

                <div className="text-center">
                  <a
                    href="#"
                    className="text-sm md:text-base text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs md:text-sm text-gray-500 mb-2">
                  Copyright © Credit Information Bureau of Nepal.
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  By logging in you accept our{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
