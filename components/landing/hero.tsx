"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Boost your productivity.
                <br />
                Start using our app today.
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl">
                  提升你的工作效率。今天就
                  <br />
                  开始使用我们的应用吧。
                </span>
              </h1>
            </div>

            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
              </p>
              <p>
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur.Malesuada adipiscing sagittis vel nulla.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-gray-100 font-semibold px-8 rounded-lg"
              >
                Get started 开始
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 font-semibold"
              >
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
                <span className="ml-2">了解更多信息 →</span>
              </Button>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="hidden lg:block">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 w-64"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">All projects</div>
                {[
                  { name: "Planetaria / ios-app", status: "initiated", time: "1m 32s ago", color: "gray" },
                  { name: "Planetaria / mobile-api", status: "deployed", time: "3m ago", color: "green" },
                  { name: "Tailwind Labs / tailwindcss.com", status: "initiated", time: "5m 45s ago", color: "gray" },
                  { name: "Tailwind Labs / tailwindui.com ⭐", status: "initiated", time: "8m ago", color: "gray" },
                  { name: "Protocol / relay-service", status: "deployed", time: "3h ago", color: "green" },
                ].map((project, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${project.color === "green" ? "bg-green-500" : "bg-gray-500"}`} />
                      <span className="text-sm text-white font-medium">{project.name}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Deploys from GitHub • {project.status === "deployed" ? "Deployed" : "Initiated"} {project.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
    </section>
  )
}


