export const initialBattleData = {
  data: {
    problem: "capital of india",
    solution_1: "The capital of India is **New Delhi**.",
    solution_2: "The capital of India is **New Delhi**. It is the seat of the Government of India and serves as the political and administrative center of the country. New Delhi is part of the larger metropolitan area known as the National Capital Territory of Delhi (NCT).",
    judege_response: {
      solution_1_score: 9,
      solution_2_score: 10,
      solutio_1_reasoning: "The solution is accurate and directly answers the question, though it is very brief.",
      solutio_2_reasoning: "The solution is accurate, provides the correct answer, and adds valuable context that enhances the user's understanding of the subject."
    }
  }
};

export const sampleBattles = [
  {
    id: "battle-1",
    title: "Capital of India",
    timestamp: "Just now",
    model1: "Model Alpha (v4.5)",
    model2: "Model Beta (v2.1)",
    judgeModel: "Arbiter-Pro v3",
    latency1: "180ms",
    latency2: "320ms",
    tokens1: "12 tokens",
    tokens2: "48 tokens",
    data: {
      problem: "capital of india",
      solution_1: "The capital of India is **New Delhi**.",
      solution_2: "The capital of India is **New Delhi**. It is the seat of the Government of India and serves as the political and administrative center of the country. New Delhi is part of the larger metropolitan area known as the National Capital Territory of Delhi (NCT).",
      judege_response: {
        solution_1_score: 9,
        solution_2_score: 10,
        solutio_1_reasoning: "The solution is accurate and directly answers the question, though it is very brief.",
        solutio_2_reasoning: "The solution is accurate, provides the correct answer, and adds valuable context that enhances the user's understanding of the subject."
      }
    }
  },
  {
    id: "battle-2",
    title: "Quantum Entanglement",
    timestamp: "12 mins ago",
    model1: "Model Alpha (v4.5)",
    model2: "Model Beta (v2.1)",
    judgeModel: "Arbiter-Pro v3",
    latency1: "1.1s",
    latency2: "0.85s",
    tokens1: "65 tokens",
    tokens2: "88 tokens",
    data: {
      problem: "Explain quantum entanglement to a 5-year-old child.",
      solution_1: "Imagine you have a pair of **magic socks**. If you put one sock on your left foot at home, the other sock instantly knows it belongs on your right foot—even if it's on the Moon! That instant magic connection between two particles is quantum entanglement.",
      solution_2: "Think of two **magical twin teddy bears** connected by invisible rainbow threads. Whatever secret song one bear sings, the other bear instantly dances to, no matter how far away they are. In nature, tiny particles called quanta can connect just like those twins!",
      judege_response: {
        solution_1_score: 9.5,
        solution_2_score: 10,
        solutio_1_reasoning: "The socks analogy is intuitive and memorable for young listeners.",
        solutio_2_reasoning: "The magical twins analogy evokes greater visual imagination and accurately conveys the bidirectional synchronized state."
      }
    }
  },
  {
    id: "battle-3",
    title: "React useEffect vs useLayoutEffect",
    timestamp: "1 hour ago",
    model1: "Model Alpha (v4.5)",
    model2: "Model Beta (v2.1)",
    judgeModel: "Arbiter-Pro v3",
    latency1: "540ms",
    latency2: "620ms",
    tokens1: "82 tokens",
    tokens2: "115 tokens",
    data: {
      problem: "What is the difference between useEffect and useLayoutEffect in React?",
      solution_1: "`useEffect` runs **asynchronously after the browser paints** the screen, making it ideal for API calls and subscriptions. `useLayoutEffect` runs **synchronously immediately after DOM mutations** before paint, preventing visual flickers when measuring DOM elements.",
      solution_2: "**Key Differences:**\n1. **Timing:** `useEffect` executes after DOM rendering and screen paint (non-blocking). `useLayoutEffect` fires synchronously before browser paint.\n2. **Use Cases:** Use `useEffect` for 99% of side-effects (data fetching, timers). Use `useLayoutEffect` only when reading layout geometry (e.g., `getBoundingClientRect()`) or preventing UI flicker.",
      judege_response: {
        solution_1_score: 8.5,
        solution_2_score: 9.8,
        solutio_1_reasoning: "Accurately highlights the async vs synchronous paint distinction in a compact summary.",
        solutio_2_reasoning: "Structured formatting with clear decision heuristics and actionable developer guidance."
      }
    }
  }
];

export const generateBattleResponse = (promptText) => {
  const cleanPrompt = promptText.trim();
  const lower = cleanPrompt.toLowerCase();

  if (lower.includes("capital") && lower.includes("india")) {
    return {
      problem: cleanPrompt,
      solution_1: "The capital of India is **New Delhi**.",
      solution_2: "The capital of India is **New Delhi**. It is the seat of the Government of India and serves as the political and administrative center of the country. New Delhi is part of the larger metropolitan area known as the National Capital Territory of Delhi (NCT).",
      judege_response: {
        solution_1_score: 9,
        solution_2_score: 10,
        solutio_1_reasoning: "The solution is accurate and directly answers the question, though it is very brief.",
        solutio_2_reasoning: "The solution is accurate, provides the correct answer, and adds valuable context that enhances the user's understanding of the subject."
      }
    };
  }

  // Dynamic generator for any other message
  const sol1 = `Here is a concise answer for **"${cleanPrompt}"**:\n\n` +
    `The primary principle behind this query focuses on core direct accuracy. In essence, it delivers the direct factual outcome without unnecessary verbosity.`;

  const sol2 = `### Comprehensive Analysis for: *${cleanPrompt}*\n\n` +
    `1. **Direct Answer:** Provides the verified factual baseline for the requested topic.\n` +
    `2. **Context & Depth:** Expands on practical implications, edge cases, and real-world background.\n` +
    `3. **Key Takeaway:** Offers structured insights enabling actionable decision-making for the user.`;

  return {
    problem: cleanPrompt,
    solution_1: sol1,
    solution_2: sol2,
    judege_response: {
      solution_1_score: 8.8,
      solution_2_score: 9.7,
      solutio_1_reasoning: "Solution 1 gives a sharp, no-nonsense answer with low cognitive overhead.",
      solutio_2_reasoning: "Solution 2 provides structured markdown breakdown with contextual depth and actionable clarity."
    }
  };
};
