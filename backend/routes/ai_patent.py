import logging

from fastapi import APIRouter, HTTPException
from google import genai

from config import settings
from prompts import ai_patent_prompts
from schema.schema import UserPatentInteraction, PatentInteractionResponse

logger = logging.getLogger(__name__)

client = genai.Client(api_key=settings.llm_api_key)
llm_model = settings.llm_model

patent_prompts = {
    "clarity": "Rewrite the following patent text to be clearer and easier to read while keeping its precise technical meaning. Simplify convoluted sentence structure, remove ambiguity, and improve flow. Do not change any technical facts.",
    "expand": "Expand the following patent text into a more detailed version, elaborating with supporting technical detail and fuller explanation, as would appear in the detailed description of a patent. Do not introduce new inventions or claims — only elaborate on what is already implied by the text.",
    "formal": "Rewrite the following patent text to be more formal and legally precise, using the exact, unambiguous language appropriate for a patent specification. Prefer precise technical terminology and remove casual or vague phrasing. Do not change any technical facts."
}

router = APIRouter(prefix='/ai-patent')

@router.post('/patent-interaction-text', response_model=PatentInteractionResponse)
def generate_text(user_interaction_payload: UserPatentInteraction):
    instruction = user_interaction_payload.instruction

    if instruction:
        prompt = patent_prompts.get(instruction)
        if prompt is None:
            raise HTTPException(status_code=400, detail="Invalid instruction")
    else:
        prompt = user_interaction_payload.userInteraction
        if not prompt:
            raise HTTPException(
                status_code=400,
                detail="Either an instruction or userInteraction is required",
            )

    combined_input = ai_patent_prompts(user_interaction_payload, prompt)

    try:
        interaction = client.interactions.create(
            model=llm_model,
            input=combined_input,
        )
    except Exception:
        logger.exception("LLM interaction failed")
        raise HTTPException(status_code=502, detail="Failed to generate text")

    return {"success": True, "data": interaction.output_text}
