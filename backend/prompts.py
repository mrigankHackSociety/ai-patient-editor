from schema.schema import UserPatentInteraction

def ai_patent_prompts(user_interaction_payload: UserPatentInteraction, prompt: str):
    return f"""--- START OF EDITOR DATA ---
 {user_interaction_payload.editorData}
--- END OF EDITOR DATA ---

INSTRUCTION: Based on the data provided above, please execute the following request:
 {prompt}

STRICT OUTPUT RULES:
1. Return ONLY the final processed text.
2. Do NOT include the "--- START OF EDITOR DATA ---" or "--- END OF EDITOR DATA ---" delimiters in your response.
3. Do NOT include any conversational preamble, explanations, or introductory text (e.g., do not say "Here is the text:").
4. Provide the raw text output directly.
"""