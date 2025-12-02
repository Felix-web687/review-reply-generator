"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, ArrowRight } from "lucide-react"

const PERSONAS = [
  {
    id: "amazon",
    name: "Amazon Compliance Officer",
    icon: "🛒",
    description: "Professional, cautious, policy-aware",
  },
  {
    id: "google",
    name: "Google Marketing Manager",
    icon: "🗺️",
    description: "Enthusiastic, includes store name & keywords",
  },
  {
    id: "social",
    name: "Social Media Operator",
    icon: "📱",
    description: "Friendly, casual, uses emojis",
  },
  {
    id: "crisis",
    name: "Crisis Manager",
    icon: "🔥",
    description: "Humble, focused on de-escalation",
  },
]

export function LeftPanel({
  storeData,
  setStoreData,
  selectedPersona,
  setSelectedPersona,
  review,
  setReview,
  isLoading,
  onDraftReply,
}: any) {
  useEffect(() => {
    const saved = localStorage.getItem("reviewpilot-store")
    if (saved) {
      setStoreData(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("reviewpilot-store", JSON.stringify(storeData))
  }, [storeData])

  return (
    <div className="w-[400px] flex-shrink-0 border-r border-gray-200 bg-white p-6 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900">ReviewPilot</h1>
        </div>
        <p className="text-sm text-gray-500">Navigate your reviews with AI</p>
      </div>

      {/* Store Configuration */}
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Name</label>
          <Input
            placeholder="Your shop name..."
            value={storeData.storeName}
            onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })}
            className="text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">Saved automatically to localStorage</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Keywords (optional)</label>
          <Input
            placeholder="e.g. handmade, organic, premium..."
            value={storeData.keywords}
            onChange={(e) => setStoreData({ ...storeData, keywords: e.target.value })}
            className="text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Output Language</label>
          <Select value={storeData.language} onValueChange={(val) => setStoreData({ ...storeData, language: val })}>
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English US">English US</SelectItem>
              <SelectItem value="English UK">English UK</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="German">German</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-8">
        {/* Review Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Paste Customer Review</label>
          <Textarea
            placeholder="Paste the review here... (supports copy-paste)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-32 text-sm resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">Auto-cleans formatting and extra spaces</p>
        </div>
      </div>

      {/* Persona Selector */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Choose Your Voice</label>
        <div className="space-y-2">
          {PERSONAS.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setSelectedPersona(persona.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedPersona === persona.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{persona.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{persona.name}</div>
                  <div className="text-xs text-gray-500">{persona.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <Button
          onClick={onDraftReply}
          disabled={isLoading || !review.trim() || !storeData.storeName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin">⚙️</span>
              Thinking...
            </>
          ) : (
            <>
              Draft Reply
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
        <p className="text-xs text-gray-400 mt-2 text-center">AI-powered with human touch</p>
      </div>
    </div>
  )
}
