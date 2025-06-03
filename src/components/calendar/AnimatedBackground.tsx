
import { useTheme } from './ThemeProvider';

export function AnimatedBackground() {
  const { theme } = useTheme();

  if (theme === 'dark') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Moon */}
        <div className="absolute top-10 right-20 w-20 h-20 bg-yellow-300 rounded-full shadow-2xl animate-pulse opacity-90">
          <div className="absolute top-3 left-3 w-4 h-4 bg-yellow-100 rounded-full opacity-80"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-yellow-100 rounded-full opacity-60"></div>
          <div className="absolute top-8 right-6 w-2 h-2 bg-yellow-200 rounded-full opacity-50"></div>
        </div>
        
        {/* Stars */}
        <div className="absolute top-16 left-20 w-2 h-2 bg-white rounded-full animate-pulse opacity-90" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-32 left-40 w-3 h-3 bg-white rounded-full animate-pulse opacity-80" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-24 left-60 w-2 h-2 bg-blue-100 rounded-full animate-pulse opacity-90" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 left-80 w-2 h-2 bg-white rounded-full animate-pulse opacity-85" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-20 left-96 w-3 h-3 bg-purple-100 rounded-full animate-pulse opacity-90" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-32 w-2 h-2 bg-white rounded-full animate-pulse opacity-80" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-48 left-72 w-2 h-2 bg-blue-200 rounded-full animate-pulse opacity-90" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute top-72 left-52 w-3 h-3 bg-white rounded-full animate-pulse opacity-85" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-80 left-20 w-2 h-2 bg-purple-200 rounded-full animate-pulse opacity-80" style={{ animationDelay: '2.2s' }}></div>
        <div className="absolute top-96 left-44 w-2 h-2 bg-white rounded-full animate-pulse opacity-90" style={{ animationDelay: '1.2s' }}></div>
        
        {/* More stars for density */}
        <div className="absolute top-28 right-32 w-4 h-4 bg-blue-200 rounded-full animate-pulse opacity-70" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-52 right-16 w-3 h-3 bg-purple-200 rounded-full animate-pulse opacity-80" style={{ animationDelay: '1.3s' }}></div>
        <div className="absolute top-64 right-48 w-2 h-2 bg-white rounded-full animate-pulse opacity-90" style={{ animationDelay: '1.9s' }}></div>
        <div className="absolute top-88 right-64 w-2 h-2 bg-blue-100 rounded-full animate-pulse opacity-75" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute top-36 right-80 w-3 h-3 bg-white rounded-full animate-pulse opacity-85" style={{ animationDelay: '0.9s' }}></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Sun */}
      <div className="absolute top-10 right-20 w-24 h-24 bg-yellow-400 rounded-full shadow-2xl animate-pulse opacity-90">
        {/* Sun rays */}
        <div className="absolute -top-10 left-1/2 w-2 h-8 bg-yellow-400 transform -translate-x-1/2 animate-pulse opacity-80"></div>
        <div className="absolute -bottom-10 left-1/2 w-2 h-8 bg-yellow-400 transform -translate-x-1/2 animate-pulse opacity-80"></div>
        <div className="absolute -left-10 top-1/2 w-8 h-2 bg-yellow-400 transform -translate-y-1/2 animate-pulse opacity-80"></div>
        <div className="absolute -right-10 top-1/2 w-8 h-2 bg-yellow-400 transform -translate-y-1/2 animate-pulse opacity-80"></div>
        
        {/* Diagonal rays */}
        <div className="absolute -top-7 -left-7 w-6 h-2 bg-yellow-400 transform rotate-45 animate-pulse opacity-70"></div>
        <div className="absolute -top-7 -right-7 w-6 h-2 bg-yellow-400 transform -rotate-45 animate-pulse opacity-70"></div>
        <div className="absolute -bottom-7 -left-7 w-6 h-2 bg-yellow-400 transform -rotate-45 animate-pulse opacity-70"></div>
        <div className="absolute -bottom-7 -right-7 w-6 h-2 bg-yellow-400 transform rotate-45 animate-pulse opacity-70"></div>
      </div>
      
      {/* Heat waves */}
      <div className="absolute top-32 right-16 opacity-60">
        <div className="w-40 h-2 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse transform rotate-12" style={{ animationDelay: '0s' }}></div>
        <div className="w-36 h-2 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse transform rotate-6 mt-3" style={{ animationDelay: '0.5s' }}></div>
        <div className="w-44 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse transform -rotate-3 mt-3" style={{ animationDelay: '1s' }}></div>
        <div className="w-38 h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse transform rotate-9 mt-3" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Additional heat waves */}
      <div className="absolute top-48 right-32 opacity-50">
        <div className="w-32 h-2 bg-gradient-to-r from-transparent via-red-300 to-transparent animate-pulse transform -rotate-6" style={{ animationDelay: '0.3s' }}></div>
        <div className="w-28 h-2 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-pulse transform rotate-12 mt-3" style={{ animationDelay: '0.8s' }}></div>
        <div className="w-36 h-2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-pulse transform -rotate-9 mt-3" style={{ animationDelay: '1.3s' }}></div>
      </div>
      
      {/* More heat waves for effect */}
      <div className="absolute top-64 right-48 opacity-40">
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent animate-pulse transform rotate-15" style={{ animationDelay: '0.6s' }}></div>
        <div className="w-28 h-1 bg-gradient-to-r from-transparent via-red-200 to-transparent animate-pulse transform -rotate-12 mt-2" style={{ animationDelay: '1.1s' }}></div>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-200 to-transparent animate-pulse transform rotate-8 mt-2" style={{ animationDelay: '1.6s' }}></div>
      </div>
    </div>
  );
}
