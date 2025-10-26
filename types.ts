
export interface ImageStyle {
  id: string;
  name: string;
  prompt: string;
  description: string;
}

export interface HistoryItem {
  id: string;
  originalImage: string;
  generatedImage: string;
  styleName: string;
  timestamp: number;
}
