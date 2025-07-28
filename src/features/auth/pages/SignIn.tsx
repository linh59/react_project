
import { useEffect, useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, BookOpen, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authActions'
import type { RootState, AppDispatch } from '../../../app/store';
import { ToastAction } from '@radix-ui/react-toast';
import { toast } from 'sonner';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userProfile = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      dispatch(loginUser({ email, password }));


      // For demo, accept any email/password combination
      console.log('Signing in with:', userProfile);


    } catch (err) {
      console.log(err);
      setError('Invalid email or password. Please try again.');
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(userProfile)
    if (userProfile.token) {
      navigate('/')
    }
  }, [userProfile, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="clay-card-form p-8 text-center">

          {/* Logo and Title */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full pastel-purple clay-button flex items-center justify-center animate-bounce-gentle">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-baloo font-bold text-primary mb-2">Welcome Back!</h1>
            <p className="text-gray-600 font-poppins">Sign in to continue your English journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-poppins text-sm">{error}</span>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 font-poppins"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12 font-poppins"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <span className="font-poppins text-gray-600">Remember me</span>
              </label>
              <Link
                to="/reset-password"
                className="text-purple-600 hover:text-purple-700 font-poppins transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-poppins">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
          <div className='mt-4'>
            <LanguageSwitcher/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
