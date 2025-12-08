"use client"

export function Stats() {
  const stats = [
    {
      value: "99.9%",
      label: "Uptime guarantee",
      description: "我们保证99.9%的正常运行时间",
    },
    {
      value: "500K+",
      label: "Reviews processed",
      description: "已处理超过50万条评论",
    },
    {
      value: "10K+",
      label: "Active users",
      description: "活跃用户超过1万名",
    },
    {
      value: "24/7",
      label: "Customer support",
      description: "全天候客户支持服务",
    },
  ]

  return (
    <section className="bg-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by businesses worldwide
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            为全球企业提供值得信赖的服务
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
                <div className="text-center space-y-3">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-white font-semibold text-lg">
                    {stat.label}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "150+", label: "Countries", cn: "个国家" },
            { number: "4.9/5", label: "Average rating", cn: "平均评分" },
            { number: "<2min", label: "Response time", cn: "响应时间" },
            { number: "ISO 27001", label: "Certified", cn: "认证" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl font-bold text-white">{item.number}</div>
              <div className="text-gray-400 text-sm">
                {item.label}
                <br />
                <span className="text-gray-500">{item.cn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


