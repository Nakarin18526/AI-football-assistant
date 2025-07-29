import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

# คำหลักที่เกี่ยวข้องกับฟุตบอลและนักเตะ (รวมเรื่องส่วนตัว)
FOOTBALL_KEYWORDS = [
    "ฟุตบอล", "บอล", "นักบอล", "นักเตะ", "เลี้ยงบอล", "เตะบอล", "ผู้รักษาประตู",
    "ยิงประตู", "เทคนิคฟุตบอล", "ซ้อมบอล", "soccer", "football", "goalkeeper",
    "midfielder", "striker", "defender", "coach", "ทีมฟุตบอล", "สโมสร",
    "โรนัลโด้", "เมสซี่", "เนย์มาร์", "ฮาแลนด์", "เอ็มบัปเป้",
    "ชีวิตนักบอล", "ข้อมูลส่วนตัว", "นักบอลชอบอะไร", "ครอบครัวนักเตะ",
    "ประวัตินักบอล", "แฟนนักเตะ", "บ้านของนักเตะ", "เงินเดือนนักบอล", "หล่อนักบอล",
    "ตำแหน่ง", "อาชีพ"

]

def is_football_related(text):
    text_lower = text.lower()
    return any(keyword in text_lower for keyword in FOOTBALL_KEYWORDS)

def generate_text(prompt):
    if not is_football_related(prompt):
        return "ขออภัย ฉันให้ข้อมูลเฉพาะเรื่องฟุตบอลเท่านั้น เเละบางเรื่องก็ไม่สามรถให้ข้อมูลได้"
    
    response = model.generate_content(prompt)
    return response.text.strip()
