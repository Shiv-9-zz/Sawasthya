import { GoogleGenerativeAI } from '@google/generative-ai';

// Use the same API key as the chatbot
const API_KEY = 'AIzaSyAy3zumpfXOFivj_YOouzz5oOzf20j__Jk';
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface SymptomAnalysis {
  severity: 'low' | 'medium' | 'high';
  response: string;
  recommendations: string[];
  suggestions: string[];
  urgency: 'routine' | 'soon' | 'urgent' | 'emergency';
  possibleCauses: string[];
}

export class SymptomAnalysisService {
  private chatSession: any;

  constructor() {
    this.initializeSession();
  }

  private initializeSession() {
    const medicalPrompt = `You are an AI Medical Assistant specialized in symptom analysis. Your role is to:

1. Analyze symptoms described by users
2. Provide educational information about possible causes
3. Recommend appropriate levels of medical care
4. Always emphasize the importance of professional medical consultation

IMPORTANT GUIDELINES:
- Always include medical disclaimers
- Never provide specific diagnoses
- Focus on general health education
- Recommend appropriate urgency levels
- Provide practical self-care advice when appropriate
- Always suggest consulting healthcare professionals for concerning symptoms

For each symptom analysis, provide:
- Severity assessment (low/medium/high)
- Educational response about the symptoms
- Practical recommendations
- Follow-up questions to gather more information
- Urgency level (routine/soon/urgent/emergency)
- Possible general causes (educational only)

Always maintain a professional, caring, and informative tone while emphasizing that this is educational information only.`;

    this.chatSession = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: medicalPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I\'m ready to provide educational symptom analysis while always emphasizing the importance of professional medical consultation. I\'ll analyze symptoms, provide general health information, and recommend appropriate care levels while maintaining clear medical disclaimers.' }]
        }
      ]
    });
  }

  async analyzeSymptoms(symptoms: string): Promise<SymptomAnalysis> {
    try {
      const analysisPrompt = `Please analyze these symptoms and provide a structured response in JSON format:

Symptoms: "${symptoms}"

Please respond with a JSON object containing:
{
  "severity": "low|medium|high",
  "response": "Educational response about the symptoms (2-3 sentences)",
  "recommendations": ["practical recommendation 1", "practical recommendation 2", "practical recommendation 3", "practical recommendation 4"],
  "suggestions": ["follow-up question 1", "follow-up question 2", "follow-up question 3"],
  "urgency": "routine|soon|urgent|emergency",
  "possibleCauses": ["general cause 1", "general cause 2", "general cause 3"]
}

Guidelines for severity:
- low: Minor symptoms that can often be managed at home
- medium: Symptoms that should be evaluated by a healthcare provider
- high: Symptoms requiring prompt medical attention

Guidelines for urgency:
- routine: Can schedule regular appointment
- soon: Should see doctor within a few days
- urgent: Should seek medical care within 24 hours
- emergency: Requires immediate emergency care

Always include appropriate medical disclaimers in recommendations.`;

      const result = await this.chatSession.sendMessage(analysisPrompt);
      const response = await result.response;
      const responseText = response.text();

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysisData = JSON.parse(jsonMatch[0]);
        return analysisData as SymptomAnalysis;
      }

      // Fallback if JSON parsing fails
      return this.getFallbackAnalysis(symptoms);

    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      
      // Enhanced error handling for symptom analysis
      if (error instanceof Error) {
        if (error.message.includes('API_KEY') || error.message.includes('401')) {
          console.error('API authentication failed');
        } else if (error.message.includes('quota') || error.message.includes('429')) {
          console.error('API quota exceeded');
        } else if (error.message.includes('SAFETY')) {
          console.error('Content blocked by safety filters');
        }
      }
      
      return this.getFallbackAnalysis(symptoms);
    }
  }

  private getFallbackAnalysis(_symptoms: string): SymptomAnalysis {
    return {
      severity: 'medium',
      response: `Thank you for describing your symptoms. While I can provide general health information, it's important to consult with a healthcare professional for proper evaluation and diagnosis of your specific situation.`,
      recommendations: [
        'Consult with a healthcare professional for proper evaluation',
        'Monitor your symptoms and note any changes',
        'Keep a symptom diary with dates and severity',
        'Seek immediate care if symptoms worsen significantly'
      ],
      suggestions: [
        'When did these symptoms first start?',
        'Have you experienced these symptoms before?',
        'Are there any other symptoms you\'re experiencing?'
      ],
      urgency: 'soon',
      possibleCauses: [
        'Various medical conditions could cause these symptoms',
        'Professional medical evaluation is needed for accurate assessment',
        'Multiple factors could be contributing to your symptoms'
      ]
    };
  }

  async getFollowUpResponse(originalSymptoms: string, followUpInfo: string): Promise<SymptomAnalysis> {
    try {
      const followUpPrompt = `Based on the original symptoms and this additional information, please provide an updated analysis:

Original symptoms: "${originalSymptoms}"
Additional information: "${followUpInfo}"

Please respond with an updated JSON analysis following the same format as before, taking into account both the original symptoms and the new information provided.`;

      const result = await this.chatSession.sendMessage(followUpPrompt);
      const response = await result.response;
      const responseText = response.text();

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysisData = JSON.parse(jsonMatch[0]);
        return analysisData as SymptomAnalysis;
      }

      return this.getFallbackAnalysis(originalSymptoms + ' ' + followUpInfo);

    } catch (error) {
      console.error('Error in follow-up analysis:', error);
      return this.getFallbackAnalysis(originalSymptoms + ' ' + followUpInfo);
    }
  }
}

// Export singleton instance
export const symptomAnalysisService = new SymptomAnalysisService();
