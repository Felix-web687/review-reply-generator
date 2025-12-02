"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Copy, CheckCircle2, Zap, Brain, Shield } from "lucide-react"

const THINKING_STEPS = [
  { icon: Brain, label: "Analyzing sentiment...", color: "text-pink-500" },
  {
    icon: Shield,
    label: "Checking platform policies...",
    color: "text-purple-500",
  },
  { icon: Zap, label: "Drafting response...", color: "text-indigo-500" },
]

export function RightPanel({ responses, isLoading, showThinking, selectedPersona, error }: any) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!showThinking) {
      setCurrentStep(0)
      return
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < THINKING_STEPS.length - 1 ? prev + 1 : prev))
    }, 1000)

    return () => clearInterval(interval)
  }, [showThinking])

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Thinking Process */}
        {showThinking && (
          <div className="mb-8">
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
              <h3 className="text-sm font-semibold text-white mb-3">AI Thinking...</h3>
              <div className="space-y-2">
                {THINKING_STEPS.map((step, idx) => {
                  const Icon = step.icon
                  const isActive = idx <= currentStep
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 transition-opacity ${
                        isActive ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${step.color}`} />
                      <span className="text-sm text-zinc-300">{step.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-8">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-1">Error</h4>
                  <p className="text-sm text-red-300">{error}</p>
                  <p className="text-xs text-red-400/70 mt-2">
                    {error.includes("API key") && (
                      <>Please configure your DeepSeek API key in the .env.local file</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!responses && !isLoading && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Ready to draft replies?</h2>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              Select a persona on the left, paste a review, and let AI help you craft human-like responses
            </p>
          </div>
        )}

        {/* Response Cards */}
        {responses && (
          <div className="space-y-4">
            {/* Warnings */}
            {responses.warnings && responses.warnings.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-400 mb-1">Policy Warning</h4>
                    <ul className="text-sm text-amber-300/80 space-y-1">
                      {responses.warnings.map((warning: string, idx: number) => (
                        <li key={idx}>⚠️ {warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Response Options */}
            {responses.options &&
              responses.options.map((option: any, idx: number) => (
                <Card key={idx} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden hover:shadow-lg hover:shadow-purple-500/5">
                  <CardHeader className="bg-gradient-to-r from-zinc-900 to-zinc-800/50 pb-3">
                    <div className="flex items-start justify-between mb-1">
                      <CardTitle className="text-base text-white">{option.title}</CardTitle>
                      <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full">
                        Option {idx + 1}
                      </span>
                    </div>
                    <CardDescription className="text-xs text-zinc-500">{option.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-4 pb-4">
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">{option.content}</p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(option.content, idx)}
                      className={`w-full text-xs font-medium border-zinc-700 hover:bg-zinc-800 hover:text-white transition-all ${
                        copiedIndex === idx ? "bg-green-500/20 border-green-500/50 text-green-400" : "text-zinc-300"
                      }`}
                    >
                      {copiedIndex === idx ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5" />
                          Copy to clipboard
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}

            {/* Regenerate Hint */}
            <div className="text-center pt-4">
              <p className="text-xs text-zinc-500">
                Modify your review and click "Draft Reply" again to get new options
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
