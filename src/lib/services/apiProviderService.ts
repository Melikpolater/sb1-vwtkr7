import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import type { AITool, APIProvider } from '../../types';

const PROVIDER_ENDPOINTS = {
  openai: '/v1/models',
  anthropic: '/v1/models',
  google: '/v1/models',
};

async function fetchToolsFromProvider(provider: APIProvider): Promise<Partial<AITool>[]> {
  try {
    const response = await fetch(`${provider.baseUrl}${PROVIDER_ENDPOINTS[provider.type]}`, {
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`API call failed: ${response.statusText}`);

    const data = await response.json();
    return transformProviderData(data, provider);
  } catch (error) {
    console.error(`Error fetching from ${provider.name}:`, error);
    return [];
  }
}

function transformProviderData(data: any, provider: APIProvider): Partial<AITool>[] {
  switch (provider.type) {
    case 'openai':
      return data.data.map((model: any) => ({
        name: model.id,
        description: model.description || `AI model by ${provider.name}`,
        category: determineCategory(model.id),
        tags: determineTags(model.id),
        apiProvider: provider.name,
        pricing: {
          type: model.training_cost ? 'premium' : 'free',
          price: model.training_cost,
        },
      }));
    // Add cases for other providers
    default:
      return [];
  }
}

function determineCategory(modelId: string): string {
  if (modelId.includes('gpt')) return 'Metin Üretme';
  if (modelId.includes('dall-e')) return 'Görüntü İşleme';
  if (modelId.includes('whisper')) return 'Ses İşleme';
  return 'Diğer';
}

function determineTags(modelId: string): string[] {
  const tags = [];
  if (modelId.includes('gpt')) tags.push('GPT', 'NLP', 'Sohbet');
  if (modelId.includes('dall-e')) tags.push('Görsel', 'Sanat', 'Üretken AI');
  if (modelId.includes('whisper')) tags.push('Ses', 'Transkripsiyon');
  return tags;
}

export async function syncToolsFromProviders(): Promise<void> {
  const providersRef = collection(db, 'providers');
  const providersSnapshot = await getDocs(providersRef);
  const providers = providersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as APIProvider[];

  const toolsRef = collection(db, 'tools');

  for (const provider of providers) {
    const tools = await fetchToolsFromProvider(provider);
    
    for (const tool of tools) {
      await addDoc(toolsRef, {
        ...tool,
        lastUpdated: new Date(),
      });
    }
  }
}