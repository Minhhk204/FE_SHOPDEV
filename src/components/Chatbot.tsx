import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const Chatbot = () => {
	useEffect(() => {
		createChat({
			webhookUrl: 'https://ef0651.n8nsh.site/webhook/444bf81d-47db-4f41-83d1-12bcaad70f42/chat'
		});
	}, []);

	return null; // Không cần render gì cả, chat tự động chèn vào DOM
};

export default Chatbot;
