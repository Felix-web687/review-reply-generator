import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Stats /></div>
      
      {/* Dashboard Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try ReviewPilot Now
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Start generating AI-powered review responses instantly
              <br />
              <span className="text-gray-500">立即开始使用 AI 生成评论回复</span>
            </p>
          </div>
          <Dashboard />
        </div>
      </section>
    </main>
  )
}
