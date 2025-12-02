"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Copy, CheckCircle2, Zap, Brain, Shield } from "lucide-react"

const THINKING_STEPS = [
  { icon: Brain, label: "Analyzing sentiment...", color: "text-blue-600" },
  {
    icon: Shield,
    label: "Checking platform policies...",
    color: "text-green-600",
  },
  { icon: Zap, label: "Drafting response...", color: "text-yellow-600" },
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
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Thinking Process */}
        {showThinking && (
          <div className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">AI Thinking...</h3>
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
                      <span className="text-sm text-gray-600">{step.label}</span>
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-900 mb-1">Error</h4>
                  <p className="text-sm text-red-800">{error}</p>
                  <p className="text-xs text-red-700 mt-2">
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
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to draft replies?</h2>
            <p className="text-gray-600 max-w-sm">
              Select a persona on the left, paste a review, and let AI help you craft human-like responses
            </p>
          </div>
        )}

        {/* Response Cards */}
        {responses && (
          <div className="space-y-4">
            {/* Warnings */}
            {responses.warnings && responses.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-900 mb-1">Policy Warning</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
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
                <Card key={idx} className="hover:shadow-md transition-shadow overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-3">
                    <div className="flex items-start justify-between mb-1">
                      <CardTitle className="text-base text-gray-900">{option.title}</CardTitle>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Option {idx + 1}
                      </span>
                    </div>
                    <CardDescription className="text-xs">{option.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-4 pb-4">
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">{option.content}</p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(option.content, idx)}
                      className="w-full text-xs font-medium"
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
              <p className="text-xs text-gray-500">
                Modify your review and click "Draft Reply" again to get new options
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
