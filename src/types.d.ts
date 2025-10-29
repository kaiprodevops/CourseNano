// 基于你提供的最新官方文档 (LanguageModel / Summarizer)

type LanguageModelAvailability = "available" | "downloading" | "downloadable" | "unavailable";

/**
 * LanguageModel API (window.LanguageModel)
 */
interface LanguageModel {
  /**
   * 检查 AI 模型是否可用。
   */
  availability(): Promise<LanguageModelAvailability>;
}

/**
 * SummarizerSession 接口
 */
interface SummarizerSession {
  /**
   * 运行总结。
   * @param text 要总结的文本。
   */
  summarize(text: string): Promise<string>;

  /**
   * 销毁会话。
   */
  destroy(): Promise<void>;
}

/**
 * Summarizer API (window.Summarizer)
 */
interface Summarizer {
  /**
   * 创建一个新的总结会话。
   * 如果模型是 'downloadable'，这将触发下载。
   */
  create(): Promise<SummarizerSession>;
}

// 扩展全局 Window 接口
declare global {
  interface Window {
    LanguageModel: LanguageModel;
    Summarizer: Summarizer;
    // 你可以稍后在这里添加 Proofreader, Writer 等...
  }
  
  // 添加文档中提到的 userActivation
  interface Navigator {
    userActivation: {
      readonly isActive: boolean;
    }
  }
}

// 保持这个空导出，以确保文件被视为一个模块
export {};
