from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
import re
import os

app = Flask(__name__)
CORS(app)

# Настройка Gemini AI
genai.configure(api_key="AIzaSyA1Q-fqaV4xxym85Hazq6G25-GwMVVU0Tk")
model = genai.GenerativeModel("gemini-2.5-flash")

def clean_text(text):
    return text.replace('**', '').replace('*', '')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Сообщение не может быть пустым'}), 400

        response = model.generate_content(f"""
        Ты — чат-бот поддержки для людей в Кыргызстане, столкнувшихся с насилием.
        Пользователь написал: "{user_message}"
        
        Отвечай на том же языке, что и пользователь. Будь простым и человечным.
        
        Важные моменты:
        - Выслушай и поддержи эмоционально
        - Объясни, что насилие — это не нормально
        - Предложи 1-2 практичных шага для безопасности
        - В конце — ободряющая фраза
        
        На сайте есть карта помощи с организациями Кыргызстана — можешь упомянуть при необходимости.
        Не навязывай информацию о карте, только если уместно.
        
        Пиши обычным текстом, без списков и форматирования.
        """)

        clean_response = clean_text(response.text)

        return jsonify({
            'response': clean_response,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({'error': 'Ошибка сервера'}), 500

# Serve React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(f"dist/{path}"):
        return send_from_directory('dist', path)
    else:
        return send_from_directory('dist', 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)


