"use client"

import { useState } from "react"
import { LeftPanel } from "./left-panel"
import { RightPanel } from "./right-panel"

export function Dashboard() {
  const [storeData, setStoreData] = useState({
    storeName: "",
    keywords: "",
    language: "English US",
  })

  const [selectedPersona, setSelectedPersona] = useState("amazon")
  const [review, setReview] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState<any>(null)
  const [showThinking, setShowThinking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDraftReply = async () => {
    if (!review.trim() || !storeData.storeName.trim()) {
      return
    }

    setIsLoading(true)
    setShowThinking(true)
    setError(null)
    setResponses(null)

    try {
      // Call the API
      const response = await fetch("/api/generate-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: review.trim(),
          storeName: storeData.storeName.trim(),
          keywords: storeData.keywords.trim(),
          language: storeData.language,
          persona: selectedPersona,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `API Error: ${response.status}`)
      }

      // Set the responses
      setResponses({
        persona: data.persona,
        options: data.options,
        warnings: data.warnings || [],
        usage: data.usage,
      })

      // Hide thinking animation after a delay
      setTimeout(() => {
        setShowThinking(false)
      }, 1500)
    } catch (err) {
      console.error("Error generating reply:", err)
      setError(err instanceof Error ? err.message : "Failed to generate reply. Please try again.")
      setShowThinking(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-50">
      <LeftPanel
        storeData={storeData}
        setStoreData={setStoreData}
        selectedPersona={selectedPersona}
        setSelectedPersona={setSelectedPersona}
        review={review}
        setReview={setReview}
        isLoading={isLoading}
        onDraftReply={handleDraftReply}
      />

      <RightPanel
        responses={responses}
        isLoading={isLoading}
        showThinking={showThinking}
        selectedPersona={selectedPersona}
        error={error}
      />
    </div>
  )
}
