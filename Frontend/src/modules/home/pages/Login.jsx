import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpen, User, Users, UserCheck, Shield, ArrowRight } from 'lucide-react'

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e, path) => {
    e.preventDefault()
    setLoading(true)
    // Simulate network delay
    setTimeout(() => {
      navigate(path)
    }, 600)
  }

  const dummyRoles = [
    { name: 'Admin', path: '/admin', icon: Shield, color: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600' },
    { name: 'Faculty', path: '/faculty', icon: Users, color: 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600' },
    { name: 'Student', path: '/student', icon: BookOpen, color: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600' },
    { name: 'Mentor', path: '/mentor', icon: UserCheck, color: 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-600 hover:text-white hover:border-amber-600' },
  ]

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Form Side */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 max-w-3xl animate-fade-in">
        <Link to="/" className="flex items-center gap-2 mb-16 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Y</span>
          </div>
          <span className="text-xl font-bold text-text-primary tracking-tight">Yukti LMS</span>
        </Link>

        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">Welcome back</h1>
          <p className="text-text-secondary mb-10 text-lg">Sign in to your account to continue</p>
        </div>

        <form onSubmit={(e) => handleLogin(e, '/student')} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Email address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-text-primary">Password</label>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">Forgot password?</a>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-70 mt-4"
          >
            {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-text-light font-medium tracking-wide">QUICK LOGIN FOR DEMO</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            {dummyRoles.map((role) => (
              <button
                key={role.name}
                onClick={(e) => handleLogin(e, role.path)}
                disabled={loading}
                className={`flex items-center justify-center gap-2 py-3 px-4 border rounded-xl font-medium transition-all duration-300 ${role.color} disabled:opacity-50`}
              >
                <role.icon size={18} />
                {role.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="hidden lg:flex flex-1 relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-secondary to-secondary opacity-90"></div>
        
        {/* Abstract decorative elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-20 text-white h-full w-full max-w-2xl mx-auto animate-slide-up">
          <div className="glass-panel border-white/10 !bg-white/5 p-12 rounded-3xl shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <BookOpen size={32} className="text-blue-300" />
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">Elevate your educational institution to the next level.</h2>
            <p className="text-blue-100/80 text-lg leading-relaxed mb-8">
              A comprehensive suite of tools designed to seamlessly manage students, faculty, batches, assignments, and attendance in one unified ecosystem.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center bg-gradient-to-br text-xs font-bold ${
                    i===1 ? 'from-blue-400 to-blue-600' : 
                    i===2 ? 'from-emerald-400 to-emerald-600' :
                    i===3 ? 'from-amber-400 to-amber-600' :
                    'from-purple-400 to-purple-600'
                  }`}>
                    {['A','F','S','M'][i-1]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-blue-200 font-medium">Join 500+ active users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
