
import { useTheme } from './ThemeProvider';

export function AnimatedBackground() {
  const { theme } = useTheme();

  if (theme === 'dark') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Moon */}
        <div className="absolute top-10 right-20 w-16 h-16 bg-yellow-200 rounded-full shadow-lg animate-pulse">
          <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-100 rounded-full opacity-70"></div>
          <div className="absolute bottom-3 right-3 w-2 h-2 bg-yellow-100 rounded-full opacity-50"></div>
        </div>
        
        {/* Stars */}
        <div className="absolute top-16 left-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-32 left-40 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-24 left-60 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 left-80 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-20 left-96 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-32 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-48 left-72 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute top-72 left-52 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-80 left-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.2s' }}></div>
        <div className="absolute top-90 left-44 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
        
        {/* Larger stars for more variety */}
        <div className="absolute top-28 right-32 w-2 h-2 bg-blue-100 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-52 right-16 w-1.5 h-1.5 bg-purple-100 rounded-full animate-pulse" style={{ animationDelay: '1.3s' }}></div>
        <div className="absolute top-64 right-48 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.9s' }}></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Sun */}
      <div className="absolute top-10 right-20 w-20 h-20 bg-yellow-400 rounded-full shadow-lg animate-pulse">
        {/* Sun rays */}
        <div className="absolute -top-8 left-1/2 w-1 h-6 bg-yellow-400 transform -translate-x-1/2 animate-pulse"></div>
        <div className="absolute -bottom-8 left-1/2 w-1 h-6 bg-yellow-400 transform -translate-x-1/2 animate-pulse"></div>
        <div className="absolute -left-8 top-1/2 w-6 h-1 bg-yellow-400 transform -translate-y-1/2 animate-pulse"></div>
        <div className="absolute -right-8 top-1/2 w-6 h-1 bg-yellow-400 transform -translate-y-1/2 animate-pulse"></div>
        
        {/* Diagonal rays */}
        <div className="absolute -top-6 -left-6 w-4 h-1 bg-yellow-400 transform rotate-45 animate-pulse"></div>
        <div className="absolute -top-6 -right-6 w-4 h-1 bg-yellow-400 transform -rotate-45 animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-4 h-1 bg-yellow-400 transform -rotate-45 animate-pulse"></div>
        <div className="absolute -bottom-6 -right-6 w-4 h-1 bg-yellow-400 transform rotate-45 animate-pulse"></div>
      </div>
      
      {/* Heat waves */}
      <div className="absolute top-32 right-16 opacity-30">
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-pulse transform rotate-12" style={{ animationDelay: '0s' }}></div>
        <div className="w-28 h-1 bg-gradient-to-r from-transparent via-red-300 to-transparent animate-pulse transform rotate-6 mt-2" style={{ animationDelay: '0.5s' }}></div>
        <div className="w-36 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-pulse transform -rotate-3 mt-2" style={{ animationDelay: '1s' }}></div>
        <div className="w-30 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse transform rotate-9 mt-2" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Additional heat waves */}
      <div className="absolute top-48 right-32 opacity-20">
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-200 to-transparent animate-pulse transform -rotate-6" style={{ animationDelay: '0.3s' }}></div>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent animate-pulse transform rotate-12 mt-2" style={{ animationDelay: '0.8s' }}></div>
        <div className="w-28 h-1 bg-gradient-to-r from-transparent via-yellow-200 to-transparent animate-pulse transform -rotate-9 mt-2" style={{ animationDelay: '1.3s' }}></div>
      </div>
    </div>
  );
}
