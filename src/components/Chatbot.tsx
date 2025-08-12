import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const Chatbot = () => {
	useEffect(() => {
		createChat({
			webhookUrl: 'https://ef0651.n8nsh.site/webhook/de7a7274-d014-445f-8908-4ec21f99aab0/chat'
		});

		// Thêm CSS để làm cho links có thể click được
		const style = document.createElement('style');
		style.textContent = `
			.n8n-chat .message-content a,
			.n8n-chat .message-content [href],
			.n8n-chat .message-content *[href*="http"],
			.n8n-chat .message-content *[href*="www"],
			.n8n-chat .message-content *:contains("http"),
			.n8n-chat .message-content *:contains("www") {
				color: #3b82f6 !important;
				text-decoration: underline !important;
				cursor: pointer !important;
				pointer-events: auto !important;
			}
			
			.n8n-chat .message-content {
				pointer-events: auto !important;
			}
		`;
		document.head.appendChild(style);

		// Thêm event listener để xử lý click trên links
		const handleLinkClick = (e: Event) => {
			const target = e.target as HTMLElement;
			const text = target.textContent || '';
			
			// Kiểm tra nếu text chứa URL
			const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
			const match = text.match(urlRegex);
			
			if (match) {
				let url = match[0];
				if (!url.startsWith('http')) {
					url = 'https://' + url;
				}
				window.open(url, '_blank');
			}
		};

		// Thêm event listener sau khi chat được tạo
		setTimeout(() => {
			document.addEventListener('click', handleLinkClick);
		}, 1000);

		return () => {
			document.removeEventListener('click', handleLinkClick);
		};
	}, []);

	return null; // Không cần render gì cả, chat tự động chèn vào DOM
};

export default Chatbot;
