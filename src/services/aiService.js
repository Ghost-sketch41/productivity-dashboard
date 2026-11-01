/**
 * services/aiService.js
 * Mock AI service — replace these with real OpenAI / Claude API calls.
 * Each function simulates a network delay and returns plausible data.
 */

// Simulated delay to mimic real API latency
const delay = (ms = 1200) => new Promise((res) => setTimeout(res, ms))

// ─── Task Suggestions ──────────────────────────────────────────────────────
/**
 * Given a user goal string, return 3-5 smart task suggestions.
 * In production: POST to /v1/chat/completions with a structured prompt.
 */
export async function suggestTasks(goal) {
  await delay(1400)

  const suggestions = {
    productive: [
      { title: 'Time-block your calendar for deep work (2 hrs)', priority: 'high' },
      { title: 'Review and prioritize top 3 goals for today', priority: 'high' },
      { title: 'Clear email inbox using the 2-minute rule', priority: 'medium' },
      { title: 'Take a 10-min walk to reset focus', priority: 'low' },
      { title: 'Document progress on current project', priority: 'medium' },
    ],
    fitness: [
      { title: '30-minute morning workout session', priority: 'high' },
      { title: 'Prep healthy meals for the week (meal prep)', priority: 'high' },
      { title: 'Log daily water intake — target 2.5L', priority: 'medium' },
      { title: 'Research a new HIIT routine to try', priority: 'low' },
      { title: 'Stretch routine before bed (15 min)', priority: 'medium' },
    ],
    learning: [
      { title: 'Read 20 pages of current book', priority: 'medium' },
      { title: 'Complete one online course module', priority: 'high' },
      { title: 'Write 3 key learnings in your journal', priority: 'medium' },
      { title: 'Watch one technical talk / YouTube lesson', priority: 'low' },
      { title: 'Practice new skill for 25 min (Pomodoro)', priority: 'high' },
    ],
    default: [
      { title: "Review and plan tomorrow's schedule", priority: 'high' },
      { title: 'Reply to pending messages and emails', priority: 'medium' },
      { title: 'Organise desktop and downloads folder', priority: 'low' },
      { title: 'Brainstorm one new idea for your main project', priority: 'medium' },
      { title: 'Set a "done-by" time and stick to it', priority: 'high' },
    ],
  }

  const lower = goal.toLowerCase()
  if (lower.includes('fit') || lower.includes('health') || lower.includes('exercise')) {
    return suggestions.fitness
  }
  if (lower.includes('learn') || lower.includes('study') || lower.includes('read')) {
    return suggestions.learning
  }
  if (lower.includes('product') || lower.includes('focus') || lower.includes('work')) {
    return suggestions.productive
  }
  return suggestions.default
}

// ─── Note Summarizer ───────────────────────────────────────────────────────
/**
 * Summarize a block of text into 1-2 sentences.
 * In production: POST to Claude / OpenAI with a summarise prompt.
 */
export async function summarizeNote(text) {
  await delay(1000)

  if (!text || text.trim().length < 30) {
    return 'Text too short to summarise meaningfully.'
  }

  // Mock: take first sentence + word count reduction indicator
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  const firstTwo = sentences.slice(0, 2).join(' ').trim()
  const wordCount = text.split(/\s+/).length
  const summaryWords = firstTwo.split(/\s+/).length

  return `${firstTwo} [AI summary: reduced from ${wordCount} to ~${summaryWords} words]`
}
