# Mindra — Mental AI Therapy Chatbot based on Emotion Vectors

> **FA2 Design Thinking Submission Prototype**  
> Evaluated on: **Design & Documentation (10m)** • **Framework Selection (10m)** • **Prototype Demonstration (5m)**

---

## 1. Executive Summary & Problem Framing

Mindra is a mental-wellness support prototype created for the **FA2 Design Thinking** curriculum, derived from `Mental_AI_Therapy_Chatbot (1).pptx`.

### Core Problem Statement
Users across diverse life stages (from students facing competitive exams to seniors coping with loneliness) struggle to identify, articulate, and navigate acute emotional distress. Existing mental-health solutions present high barriers:
- **Prohibitive Cost & Waiting Lists:** In-person therapy is inaccessible or unaffordable for many students and young workers.
- **Stigma & Privacy Fear:** Users worry their vulnerable emotional disclosures might be logged, harvested, or leaked.
- **Scripted & Black-Box Chatbots:** Conventional bots output generic platitudes without explaining their rationale or adapting to the user's life stage.
- **Binary Emotion Tracking:** Traditional apps track simplistic "happy vs. sad" scores rather than nuanced emotional compositions.

### Mindra's Proposed Solution
1. **Multi-Dimensional Emotion Vectors:** Evaluates input across Robert Plutchik's 8 primary emotion dimensions (*Joy, Trust, Fear, Surprise, Sadness, Disgust, Anger, Anticipation*).
2. **Explainable AI (XAI):** Accompanies every supportive response with a transparent *"Why this response?"* card revealing the linguistic heuristics and dominant emotional axes.
3. **5 Life-Stage Personas:** Adapts vocabulary, pacing, and coping strategies specifically for *Students (13–22)*, *Young Adults (23–30)*, *Working Adults (31–45)*, *Middle-Aged (46–60)*, and *Seniors (60+)*.
4. **Physiological Coping Tools:** Built-in interactive 4-4-4 Box Breathing visualizer and 5-4-3-2-1 Sensory Grounding.
5. **Tiered Safety Escalation:** Deterministic crisis keywords immediately engage safety protocols routing to verified Indian helplines (Tele-MANAS `14416` and Emergency `112`).
6. **100% Local Ephemeral Privacy:** Operates entirely in browser session memory with zero external API calls or persistent telemetry.

---

## 2. FA2 Rubric Alignment & Acceptance Evidence

### Row 1: Design & Documentation of Prototype/Solution (10 Marks)
- **Affinity Mapping:** Grouped PPT pain points into 4 core themes: *Access & Availability*, *Trust & Privacy*, *Life-Stage Personalisation*, and *Emotional Awareness*.
- **Persona Coverage:** Detailed profiles for Aarav (Student), Priya (Young Professional), Rajesh (Mid-Career Parent), Sunita (Mid-Life Transition), and Col. Sharma (Senior).
- **Feature-to-Need Matrix:** Clear mapping demonstrating how each UI element directly solves an identified user friction point.
- **In-App Documentation:** Embedded interactive tab (`Design Rationale & Rubric`) allowing evaluators to inspect the design choices directly inside the running app.

### Row 2: Selection & Application of Framework (10 Marks)
- **Framework Choice:** Built on **React 19 + TypeScript + Vite**.
  - *TypeScript:* Enforces strict typing across vector mathematics, explanation payloads, and persona models.
  - *Vite:* Ultra-fast HMR and bundle compilation (`< 4.5s`).
  - *Lucide Icons:* Clean, modern iconography aligned with medical-grade calm aesthetics.
  - *Zero External LLM / Cloud Dependencies:* Deterministic local semantic heuristic engine guarantees 100% uptime, zero latency, and zero risk of live demo failure.
  - *Custom Vector SVG Radar Engine:* Pure SVG trigonometry renders 8D emotion radar polygons responsively with zero heavy charting library bloat.

### Row 3: Prototype Demonstration & Functionality (5 Marks)
- **Complete End-to-End Flow:**
  1. Welcome dashboard with sample weekly trends and medical disclaimer.
  2. Persona and tone selection with multilingual previews (English, Hindi, Marathi).
  3. Interactive check-in with guided chips and live send.
  4. Real-time 8D emotion radar rendering, dimension breakdown bars, and XAI rationale card.
  5. Interactive 4-4-4 Box Breathing and 5-4-3-2-1 Grounding exercises.
  6. Verified helpline drawer (Tele-MANAS 14416) and crisis keyword safety intercept.
  7. One-click demo session reset.

---

## 3. Implemented vs. Simulated vs. Future Work

| Feature | Status | Notes |
|---|---|---|
| **Plutchik 8D Emotion Vector** | ✅ Fully Functional | Calculated via weighted semantic lexicon across 8 axes |
| **Persona-Adaptive Tone** | ✅ Fully Functional | 5 life-stage cohorts adapt phrasing and coping guidance |
| **Explainable AI Card** | ✅ Fully Functional | Plain-language heuristic explanation of trigger keywords |
| **Interactive 4-4-4 Breathing** | ✅ Fully Functional | Animated vagus-nerve pacing circle with cycle counter |
| **Interactive 5-4-3-2-1 Grounding** | ✅ Fully Functional | Step-by-step checklist to de-escalate sensory overload |
| **Crisis Safety Intercept** | ✅ Fully Functional | Halts coaching and routes to Tele-MANAS (14416) / 112 |
| **Acoustic / Voice Cue Toggle** | 🟡 Simulated Concept | Simulates pitch variance, cadence, and vocal strain |
| **Regional Language Previews** | 🟡 Simulated Concept | Previews Hindi & Marathi response capability |
| **Longitudinal 7-Day History** | 🟡 Seeded Sample Data | Realistically seeded + updates dynamically upon check-in |
| **On-Device Quantized SLM** | 🚀 Future Engineering | Roadmap for running 1B parameter edge models locally |

---

## 4. Quick Start & Execution Instructions

### Prerequisites
- Node.js (v18 or higher recommended; built and validated on v26.9.0)
- npm (v9 or higher; validated on v11.19.1)

### Setup & Run
```bash
# Navigate to project directory
cd mindra

# Install dependencies
npm install

# Start development dev server
npm run dev
```

Open `http://localhost:5173` in your browser to experience the prototype.

### Production Build & Type-Check
```bash
npm run build
```

---

## 5. 60–90 Second Poster Presentation Script (FA2 Evaluation)

```text
[0:00 - 0:20 | Problem & Hook]
"Good morning evaluators. In our Design Thinking study, we observed that users across all age groups struggle to express and manage emotional overload—whether it is a student panicking before exams or a working adult balancing child care with work deadlines. Yet, 80% face therapy cost barriers, and existing chatbots only offer generic, black-box scripts."

[0:20 - 0:45 | Emotion Vector Solution]
"We built Mindra, an emotion-vector guided mental wellness prototype. When our student persona, Aarav, enters 'I feel completely overwhelmed by my exams tomorrow', Mindra decomposes this input into Robert Plutchik's 8-dimensional emotion vector, pinpointing acute Anticipation and Fear."

[0:45 - 1:10 | Explainability & Personalisation]
"Crucially, Mindra eliminates the black-box dilemma with our 'Why this response?' explainability engine, revealing the exact linguistic triggers and reason for the chosen tone. If we switch the persona to Rajesh, a working adult, the tone automatically adapts from gentle reassurance to structured grounding."

[1:10 - 1:30 | Safety, Grounding & Summary]
"For safety, any acute distress keywords trigger an immediate crisis intercept routing to India's official Tele-MANAS 14416 helpline. Combined with interactive 4-4-4 Box Breathing and weekly trend tracking, Mindra provides a private, human-centered, and explainable prototype for our FA2 submission."
```

---

## 6. Safety & Clinical Boundaries Disclaimer
*Mindra is an educational design prototype developed exclusively for academic evaluation in FA2 Design Thinking. It does not provide clinical medical diagnosis, psychiatric psychotherapy, or emergency crisis intervention. In case of acute emotional crisis or self-harm concerns, please immediately contact verified professionals or call Tele-MANAS at 14416 (India) or 112.*
