import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const Chatbot = () => {
	useEffect(() => {
		createChat({
			webhookUrl: 'https://ef0651.n8nsh.site/webhook/de7a7274-d014-445f-8908-4ec21f99aab0/chat'
		});
	}, []);

	return null; // Không cần render gì cả, chat tự động chèn vào DOM
};

export default Chatbot;
