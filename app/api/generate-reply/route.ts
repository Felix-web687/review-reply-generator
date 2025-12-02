import { NextRequest, NextResponse } from "next/server"

// Persona configurations
const PERSONA_CONFIGS = {
  amazon: {
    name: "Amazon Compliance Officer",
    systemPrompt: `You are a professional customer service representative for an Amazon seller. You must:
- Be professional, empathetic, and policy-compliant
- Never mention refunds directly (use phrases like "we'll make it right" or "contact our support team")
- Focus on problem-solving and customer satisfaction
- Keep responses concise and genuine
- Avoid overpromising`,
    warnings: ['Avoid using "refund" directly'],
  },
  google: {
    name: "Google Marketing Manager",
    systemPrompt: `You are a marketing-savvy customer service representative. You must:
- Include the store name naturally in the response
- Incorporate relevant keywords when appropriate
- Be enthusiastic and professional
- Focus on brand reputation and SEO benefits
- Maintain a positive, solution-oriented tone`,
    warnings: [],
  },
  social: {
    name: "Social Media Operator",
    systemPrompt: `You are a friendly social media manager responding to customer feedback. You must:
- Use a casual, conversational tone
- Include appropriate emojis (but don't overdo it)
- Keep responses short and mobile-friendly
- Be warm and personable
- Show genuine care for the customer`,
    warnings: [],
  },
  crisis: {
    name: "Crisis Manager",
    systemPrompt: `You are a crisis management specialist handling difficult customer situations. You must:
- Be extremely humble and apologetic
- Focus on de-escalation and resolution
- Acknowledge the customer's feelings and concerns
- Offer immediate action steps
- Maintain professionalism while showing empathy`,
    warnings: [],
  },
}

interface RequestBody {
  review: string
  storeName: string
  keywords?: string
  language: string
  persona: keyof typeof PERSONA_CONFIGS
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { review, storeName, keywords, language, persona } = body

    // Validate required fields
    if (!review || !storeName || !persona) {
      return NextResponse.json(
        { error: "Missing required fields: review, storeName, or persona" },
        { status: 400 }
      )
    }

    // Validate API key
    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey || apiKey === "your_api_key_here") {
      return NextResponse.json(
        { error: "DeepSeek API key not configured. Please set DEEPSEEK_API_KEY in .env.local" },
        { status: 500 }
      )
    }

    const personaConfig = PERSONA_CONFIGS[persona]
    if (!personaConfig) {
      return NextResponse.json({ error: "Invalid persona" }, { status: 400 })
    }

    // Build the user prompt
    const userPrompt = `
Store Name: ${storeName}
${keywords ? `Keywords to incorporate: ${keywords}` : ""}
Output Language: ${language}

Customer Review:
"${review}"

Please generate 3 different reply options with varying styles:
1. "The Direct & Warm" - Direct, genuine, no fluff
2. "The Professional & SEO" - Includes store name and keywords (if provided)
3. "The Short & Sweet" - Mobile-friendly, concise (under 50 words)

For each option, provide:
- title: The option name
- description: A brief description of the style
- content: The actual reply text

Return ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{
  "options": [
    {
      "title": "The Direct & Warm",
      "description": "Direct, genuine, no fluff",
      "content": "your reply here"
    },
    {
      "title": "The Professional & SEO",
      "description": "Includes store name and keywords",
      "content": "your reply here"
    },
    {
      "title": "The Short & Sweet",
      "description": "Mobile-friendly, concise",
      "content": "your reply here"
    }
  ]
}
`

    // Call DeepSeek API
    const apiUrl = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/chat/completions"
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: personaConfig.systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("DeepSeek API error:", errorData)
      return NextResponse.json(
        { error: `DeepSeek API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content

    if (!aiResponse) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 })
    }

    // Parse the AI response
    let parsedResponse
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim()
      
      parsedResponse = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse)
      return NextResponse.json(
        { error: "Failed to parse AI response", rawResponse: aiResponse },
        { status: 500 }
      )
    }

    // Return the response with warnings
    return NextResponse.json({
      persona,
      options: parsedResponse.options,
      warnings: personaConfig.warnings,
      usage: data.usage,
    })
  } catch (error) {
    console.error("Error in generate-reply API:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}


