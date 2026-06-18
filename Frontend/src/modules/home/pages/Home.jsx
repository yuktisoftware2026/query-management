import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Shield, Zap, CheckCircle2, ChevronRight, MonitorPlay, BarChart3, GraduationCap } from 'lucide-react'

export const Home = () => {
  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-lg shadow-primary/30">
               <span className="text-white font-black text-xl">Y</span>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">YUKTI<span className="text-primary">.LMS</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-text-secondary">
            <a href="#features" className="hover:text-primary transition-colors">Platform</a>
            <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
            <a href="#resources" className="hover:text-primary transition-colors">Resources</a>
          </div>
          
          <div className="flex items-center gap-4 font-semibold">
            <Link to="/login" className="text-text-secondary hover:text-primary transition-colors">
              Log in
            </Link>
            <Link to="/login" className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-primary transition-all shadow-md hover:shadow-xl hover:shadow-primary/20 flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-green/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary font-semibold text-sm mb-8 animate-fade-in">
            <Zap size={16} fill="currentColor" />
            <span>The Operating System for Modern Education</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8">
            Manage learning,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">effortlessly.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-12">
            Yukti LMS brings administration, teaching, and learning into one unified, intelligent workspace. Built for high-performance academic institutions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-2">
              Enter LMS Portal <ChevronRight size={20} />
            </Link>
          </div>

          {/* Student Image */}
          <div className="relative mx-auto w-full max-w-4xl">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[16/9] z-20">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&h=800&fit=crop" alt="Students learning" className="w-full h-full object-cover" />
            </div>
            
            {/* Decorative elements behind image */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl z-10"></div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-accent-green/20 rounded-full blur-3xl z-10"></div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-border bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold text-text-light uppercase tracking-widest mb-8">Trusted by innovative institutions worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
            {/* Using SVG shapes to mock logos */}
            <div className="flex items-center gap-2 font-black text-xl"><BookOpen/> EDUTECH</div>
            <div className="flex items-center gap-2 font-black text-xl"><Shield/> GUARDIAN</div>
            <div className="flex items-center gap-2 font-black text-xl"><GraduationCap/> ACADEMIA</div>
            <div className="flex items-center gap-2 font-black text-xl"><MonitorPlay/> NEXUS</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Everything you need to run a modern campus</h2>
            <p className="text-xl text-text-secondary">Eliminate fragmented tools. Yukti LMS provides a seamless experience across all academic operations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-10 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Command Center</h3>
              <p className="text-text-secondary leading-relaxed mb-6">Powerful administrative dashboards to manage courses, batches, and users with real-time analytics.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-900"><CheckCircle2 size={18} className="text-primary"/> User Management</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-900"><CheckCircle2 size={18} className="text-primary"/> Batch Allocation</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-900"><CheckCircle2 size={18} className="text-primary"/> Financial Reports</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-10 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Teaching Hub</h3>
              <p className="text-text-secondary leading-relaxed mb-6">Equip faculty with tools to schedule sessions, upload notes, and evaluate assignments effortlessly.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-900"><CheckCircle2 size={18} className="text-green-600"/> Session Scheduling</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-900"><CheckCircle2 size={18} className="text-green-600"/> Assignment Grading</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-900"><CheckCircle2 size={18} className="text-green-600"/> Attendance Tracking</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-10 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Learning Space</h3>
              <p className="text-text-secondary leading-relaxed mb-6">A focused environment for students to track progress, submit assignments, and access materials.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-900"><CheckCircle2 size={18} className="text-orange-500"/> Activity Dashboard</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-900"><CheckCircle2 size={18} className="text-orange-500"/> Multi-format Submissions</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-slate-900"><CheckCircle2 size={18} className="text-orange-500"/> Material Access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to transform your institution?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">Join hundreds of forward-thinking schools and universities building the future of education on Yukti LMS.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
              Get Started for Free
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-text-light py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-black text-sm">Y</span>
              </div>
              <span className="text-xl font-black text-white tracking-tight">YUKTI.LMS</span>
            </div>
            <p className="max-w-sm">The operating system for modern education. Streamline administration, empower faculty, and inspire students.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
