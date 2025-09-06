import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with your API key
const API_KEY = 'AIzaSyAy3zumpfXOFivj_YOouzz5oOzf20j__Jk';
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export class GeminiChatService {
  private chatSession: any;
  private conversationHistory: ChatMessage[] = [];
  private isInitialized: boolean = false;

  constructor() {
    this.initializeChatSession();
  }

  private async initializeChatSession() {
    try {
      console.log('Initializing Gemini chat session...');
      
      // Initialize chat session with general assistant context
      const initialPrompt = `You are Sawasthya Assistant, a helpful and knowledgeable AI assistant. You can help with a wide variety of topics including but not limited to:

- General questions and information
- Technology and programming
- Science and education
- Creative writing and brainstorming
- Problem-solving and analysis
- Health and wellness (general information only)
- Entertainment and hobbies
- Travel and lifestyle
- Business and productivity

Guidelines:
- Provide helpful, accurate, and informative responses
- Be friendly, professional, and engaging
- Keep responses clear and well-structured
- If you're unsure about something, acknowledge it honestly
- For medical questions, provide general information but remind users to consult healthcare professionals for specific medical advice
- Be creative and helpful while maintaining accuracy

Please respond in a conversational and helpful manner to any questions or topics the user brings up.`;

      this.chatSession = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: initialPrompt }]
          },
          {
            role: 'model',
            parts: [{ text: 'Hello! I\'m Sawasthya Assistant, your helpful AI companion. I\'m here to assist you with a wide range of topics and questions. Whether you need help with technology, want to learn something new, need creative ideas, or just want to have a conversation, I\'m ready to help! What can I assist you with today?' }]
          }
        ]
      });
      
      this.isInitialized = true;
      console.log('Gemini chat session initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini chat session:', error);
      this.isInitialized = false;
    }
  }

  async sendMessage(message: string): Promise<string> {
    try {
      console.log('Sending message to Gemini:', message);
      
      // Check if session is initialized
      if (!this.isInitialized || !this.chatSession) {
        console.log('Chat session not initialized, reinitializing...');
        await this.initializeChatSession();
        
        if (!this.isInitialized) {
          throw new Error('Failed to initialize chat session');
        }
      }
      
      // Add user message to history
      this.conversationHistory.push({
        text: message,
        isUser: true,
        timestamp: new Date()
      });

      // Send message to Gemini with retry logic
      let result;
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        try {
          result = await this.chatSession.sendMessage(message);
          break;
        } catch (retryError) {
          attempts++;
          console.warn(`Attempt ${attempts} failed:`, retryError);
          
          if (attempts >= maxAttempts) {
            throw retryError;
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }

      if (!result) {
        throw new Error('Failed to get response after retries');
      }

      const response = await result.response;
      const responseText = response.text();

      console.log('Received response from Gemini:', responseText);

      // Add AI response to history
      this.conversationHistory.push({
        text: responseText,
        isUser: false,
        timestamp: new Date()
      });

      return responseText;
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      
      // More specific error handling
      let fallbackResponse = "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.";
      
      if (error instanceof Error) {
        if (error.message.includes('API_KEY') || error.message.includes('401')) {
          fallbackResponse = "There seems to be an API authentication issue. Please verify the API key is correct.";
        } else if (error.message.includes('quota') || error.message.includes('limit') || error.message.includes('429')) {
          fallbackResponse = "I've reached my usage limit for now. Please try again later.";
        } else if (error.message.includes('network') || error.message.includes('fetch') || error.message.includes('NETWORK_ERROR')) {
          fallbackResponse = "I'm having network connectivity issues. Please check your internet connection and try again.";
        } else if (error.message.includes('SAFETY') || error.message.includes('blocked')) {
          fallbackResponse = "I can't process that request due to safety guidelines. Please try rephrasing your question.";
        }
      }
      
      this.conversationHistory.push({
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date()
      });

      return fallbackResponse;
    }
  }

  getConversationHistory(): ChatMessage[] {
    return this.conversationHistory;
  }

  clearHistory(): void {
    this.conversationHistory = [];
    this.isInitialized = false;
    this.initializeChatSession();
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing Gemini API connection...');
      const testModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await testModel.generateContent('Hello');
      const response = await result.response;
      const text = response.text();
      console.log('API test successful:', text);
      return true;
    } catch (error) {
      console.error('API test failed:', error);
      return false;
    }
  }

  // Predefined quick responses for common queries
  getQuickResponses(): string[] {
    return [
      "Tell me something interesting",
      "Help me brainstorm ideas",
      "Explain a complex topic simply",
      "What's trending in technology?",
      "Give me productivity tips"
    ];
  }
}

// Export a singleton instance
export const geminiChatService = new GeminiChatService();
