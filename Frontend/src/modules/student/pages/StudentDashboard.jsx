import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'
import { LoadingState } from '@/shared/components'
import { getStudentDashboard } from '@/modules/student/api/studentApi'
import { FileText, CheckSquare, Clock, Send, Grid3X3, BookOpen, DollarSign, Coins, Play, MoreVertical } from 'lucide-react'
import { Link } from 'react-router-dom'

export const StudentDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const studentId = 1; // Hardcoded until auth is ready

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        const res = await getStudentDashboard(studentId)
        setData(res)
        setError(null)
      } catch (err) {
        console.error('Failed to load student dashboard:', err)
        setError(err.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const sidebarItems = [
    {
      title: 'Dashboard',
      items: [
        { label: 'Dashboard', path: '/student', icon: Grid3X3 },
      ],
    },
    {
      title: 'Learning',
      items: [
        { label: 'Notes', path: '/student/notes', icon: FileText },
        { label: 'Assignments', path: '/student/assignments', icon: CheckSquare },
      ],
    },
    {
      title: 'Progress',
      items: [
        { label: 'Submissions', path: '/student/submissions', icon: Send },
        { label: 'Attendance', path: '/student/attendance', icon: Clock },
      ],
    },
  ]

  if (loading) return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="Student" userName="Student User" logo="YUKTI LMS">
      <LoadingState message="Loading dashboard data..." />
    </DashboardLayout>
  )

  if (error) return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="Student" userName="Student User" logo="YUKTI LMS">
      <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg"><p className="font-medium">{error}</p></div>
    </DashboardLayout>
  )

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userRole="Student"
      userName="Student User"
      logo="YUKTI LMS"
    >
      <div className="space-y-6 font-sans pb-10">
        
        {/* Top Filter Buttons (Mock) */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-6 py-2 rounded-full bg-white border border-border text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors">All</button>
          <button className="px-6 py-2 rounded-full bg-white border border-primary text-primary text-sm font-semibold shadow-sm flex items-center gap-2">
            Information Technology <span className="bg-danger text-white text-[10px] px-1.5 rounded uppercase font-bold tracking-wider animate-pulse">Live</span>
          </button>
          <button className="px-6 py-2 rounded-full bg-white border border-border text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors">Physics</button>
          <button className="px-6 py-2 rounded-full bg-white border border-border text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors">Chemistry</button>
          
          <button className="ml-auto px-6 py-2 rounded-full bg-[#198754] text-white text-sm font-semibold shadow-sm hover:bg-green-700 transition-colors flex items-center gap-2">
            Add Subject <span className="text-lg leading-none">+</span>
          </button>
        </div>

        {/* Top 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Experience Points */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="text-center">
                <div className="w-10 h-10 bg-[#198754] rounded-full mx-auto flex items-center justify-center text-white mb-2 shadow-inner">
                  <DollarSign size={20} />
                </div>
                <div className="text-xs font-semibold text-text-secondary">Experience Dollar</div>
                <div className="text-xl font-black text-primary">240 XD</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-[#FFC107] rounded-full mx-auto flex items-center justify-center text-[#553200] mb-2 shadow-inner">
                  <Coins size={20} fill="currentColor" />
                </div>
                <div className="text-xs font-semibold text-text-secondary">Experience Points</div>
                <div className="text-xl font-black text-primary">5 PTS</div>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button className="flex-1 py-2.5 rounded-full bg-[#198754] text-white font-semibold text-sm hover:opacity-90">Redeem</button>
              <button className="flex-1 py-2.5 rounded-full bg-[#FFB057] text-[#553200] font-semibold text-sm hover:opacity-90">Collect Points</button>
            </div>
          </div>

          {/* Card 2: Academic Advisor */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold text-secondary-dark mb-2 leading-tight">Schedule a call with an<br/>academic advisor</h3>
            <p className="text-sm text-text-secondary mb-6 flex items-center gap-1 justify-center">
              Powered by <span className="font-bold text-blue-500">ZOHO</span> Bookings
            </p>
            <button className="px-8 py-2.5 rounded-full bg-secondary-dark text-white font-semibold text-sm hover:bg-slate-700 transition-colors">Schedule Now</button>
          </div>

          {/* Card 3: Profile Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-dark">Student User</h3>
                  <a href="#" className="text-sm font-semibold text-primary hover:underline">Edit profile</a>
                </div>
              </div>
              <button className="text-text-light hover:text-primary"><MoreVertical size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <div className="text-xs font-semibold text-text-secondary mb-1">Total Batches</div>
                <div className="text-xl font-black text-[#FFB057]">{data?.enrolledBatches ?? 0} <span className="text-sm font-semibold text-text-light">Batches</span></div>
              </div>
              <div>
                <div className="text-xs font-semibold text-text-secondary mb-1">Attendance</div>
                <div className="text-xl font-black text-[#198754]">{data?.attendancePercentage ?? 0}% <span className="text-sm font-semibold text-text-light">Overall</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Courses (Mock matching the design) */}
        <div>
          <div className="flex items-center justify-between mb-4 mt-8">
            <h2 className="text-xl font-bold text-secondary-dark">Recommended Courses</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary shadow-sm hover:bg-gray-50">{'<'}</button>
              <button className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary shadow-sm hover:bg-gray-50">{'>'}</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Additional Mathematics', time: '8 Hour Taken / 32 Hour', live: true },
              { title: 'Basic Calculus', time: '8 Hour Taken / 32 Hour', live: false },
              { title: 'Algebra', time: '6 Hour Taken / 24 Hour', live: false },
            ].map((course, idx) => (
              <div key={idx} className="bg-accent-green rounded-3xl p-6 shadow-sm relative overflow-hidden group">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-semibold text-secondary-dark pl-1">Instructor</span>
                    <img src={`https://i.pravatar.cc/100?img=${idx + 10}`} alt="Instructor" className="w-6 h-6 rounded-full border border-white" />
                  </div>
                  {course.live && <span className="bg-danger text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider animate-pulse border border-white/20">Live</span>}
                  <button className="px-4 py-1.5 rounded-full bg-[#FFB057] text-[#553200] text-sm font-bold shadow-sm hover:bg-[#FFA33D] transition-colors">Start</button>
                </div>
                <h3 className="text-xl font-bold text-secondary-dark mb-4">{course.title}</h3>
                <div className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1.5 w-max shadow-sm">
                  <Clock size={14} className="text-[#FFB057]" />
                  <span className="text-xs font-semibold text-secondary-dark">{course.time}</span>
                </div>
                {/* Decorative background shape */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Classes & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          
          {/* Your Classes List */}
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-secondary-dark">Your Classes</h2>
              <div className="flex bg-gray-100 rounded-full p-1">
                <button className="px-4 py-1 rounded-full bg-white shadow-sm text-sm font-semibold">All</button>
                <button className="px-4 py-1 rounded-full text-text-secondary text-sm font-semibold hover:text-secondary-dark">Live</button>
                <button className="px-4 py-1 rounded-full text-text-secondary text-sm font-semibold hover:text-secondary-dark">Upcoming</button>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Biology Molecular', mins: 50, lessons: 21, assignments: 5, students: 34, icon: '🧬' },
                { title: 'Physics', mins: 40, lessons: 32, assignments: 7, students: 28, icon: '⚛️' },
              ].map((cls, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border flex flex-col gap-3 hover:border-primary/30 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cls.icon}</span>
                    <h4 className="font-bold text-secondary-dark">{cls.title}</h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-text-secondary">
                    <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#FFB057]" /> {cls.mins} Minute</div>
                    <div className="flex items-center gap-1.5"><BookOpen size={14} className="text-[#FFB057]" /> {cls.lessons} Lessons</div>
                    <div className="flex items-center gap-1.5"><CheckSquare size={14} className="text-[#FFB057]" /> {cls.assignments} Assignments</div>
                    <div className="flex items-center gap-1.5"><Grid3X3 size={14} className="text-[#FFB057]" /> {cls.students} Students</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Activities Chart (Mock visual) */}
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-secondary-dark">Learning Activities</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-50">
                Select Date <Calendar size={14}/>
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-8">Total time & course completion</p>
            
            {/* CSS-based Mock Area Chart */}
            <div className="relative flex-1 min-h-[200px] flex items-end justify-between px-2 pb-6 border-b border-l border-border mt-auto">
              {/* Y Axis labels */}
              <div className="absolute -left-6 top-0 bottom-6 flex flex-col justify-between text-[10px] text-text-light font-bold">
                <span>100</span><span>80</span><span>60</span><span>40</span><span>20</span>
              </div>
              
              {/* Chart Waves (Using SVGs to mock the design) */}
              <svg className="absolute inset-0 w-full h-full pb-6 pl-2" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,100 C30,70 40,80 50,40 C60,10 70,20 100,50 L100,100 L0,100 Z" fill="#6EE7B7" opacity="0.3" />
                <path d="M0,100 C20,50 40,90 60,70 C80,50 90,30 100,60 L100,100 L0,100 Z" fill="#0A58CA" opacity="0.4" />
                
                {/* Tooltip Line Mock */}
                <line x1="75" y1="20" x2="75" y2="100" stroke="#0A58CA" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="75" cy="42" r="2" fill="#fff" stroke="#0A58CA" strokeWidth="1" />
              </svg>
              
              {/* Tooltip */}
              <div className="absolute right-[18%] top-[10%] bg-white border border-primary/20 shadow-md text-primary font-bold text-xs px-2 py-1 rounded">
                54 Hours
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </DashboardLayout>
  )
}
