# AI Patent Editor
 
An AI-assisted document editor where suggestions appear **inline, inside the document**, with accept/reject controls — instead of in a separate chat window.
 
The core idea: for serious document work like patent drafting, chat is the wrong interface. Copying text out to a chatbot, getting an answer, and pasting it back is slow and clumsy. This tool puts the AI *where you write* — you select text, the AI proposes an edit right there in the document, and you accept or reject it like a tracked change. The AI only ever **proposes**; the human always **commits**.
 
## What it does
 
- **Rich-text editor** — a clean document surface to write or paste text into.
- **AI rewrite actions** — select any text and choose an action:
  - *Clarity* — clearer, more readable, meaning preserved
  - *Frecise* — tighter, more formal legal phrasing
  - *Expand* — elaborate with supporting detail
- **Inline accept/reject** — the AI's suggestion appears highlighted in the document with Accept / Reject controls. Accept applies it; Reject restores the original. Nothing changes without the user's decision.
- **Generate section** — describe a section in the prompt box and the AI drafts it, inserted as a pending suggestion for review.
## Why this design
 
Patent attorneys are legally accountable for every word they file, so the AI must never silently change the document. The accept/reject pattern keeps the human in control: the AI proposes, the attorney reviews, and only accepted changes become part of the document. This human-in-the-loop model is the central design decision.
 
## Tech stack
 
**Frontend:** React + TypeScript, [TipTap](https://tiptap.dev/) (rich-text editor built on ProseMirror)
**Backend:** FastAPI (Python)
**AI:** Google Gemini
 
## Project structure
 
```
ai-patent-editor/
├── frontend/     # React + TypeScript + TipTap app
└── backend/      # FastAPI server that calls the LLM
```
 
## Running locally
 
**Backend:**
```bash
cd backend
pip install -r requirements.txt
# add your API key to a .env file (see .env)
python -m fastapi dev main.py
```
 
**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
 
Then open the local URL shown by Vite (usually `http://localhost:5173`).
 
You'll need an LLM API key. Add Google Gemini API Key to `.env` in the `backend/` folder and add your key.
 
## What a production version would add
 
This is a focused demo of the core AI-in-document interaction. A real product would also include:
 
- **Document persistence** (Postgres) so drafts survive across sessions and devices
- **Import/export** of `.docx` and PDF files
- **Word-level redline diffs** showing old vs. new text side by side, like tracked changes
- **User accounts and collaboration** for teams of attorneys
- **Multiple documents** and organization/workspace management
These were deliberately left out to keep the demo focused on the hard, interesting problem: making AI feel native to the document.
 