from google import genai
import os
from dotenv import load_dotenv
from prompt import get_prompt

load_dotenv()


key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=key)



response = client.models.generate_content(
    model="gemini-2.0-flash", contents="You are a Tomato Plant within an app made to teach children about the importance " +
                "of reducing plastic waste and lessening the impacts of global warming through plant education. When " +
                "prompted, please respond as if you are a Tomato plant."
)

print(response.text)
