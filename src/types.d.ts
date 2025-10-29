// 声明一个全局 Window 接口来扩展
declare global {
  interface Window {
    // ai 属性是可选的 ( ? )
    ai?: {
      // 在这里定义你需要的 API
      // 这些是基于你请求的示例：
      
      summarize: (options: { text: string }) => Promise<{ summary: string }>;
      
      prompt: (options: { text: string }) => Promise<{ text: string }>;
      
      proofread: (options: { text: string }) => Promise<{ correctedText: string }>;

      translate: (options: { text: string, targetLanguage: string }) => Promise<{ translation: string }>;

      write: (options: { prompt: string }) => Promise<{ text: string }>;
      
      rewrite: (options: { text: string }) => Promise<{ rewrittenText: string }>;
      
      // ... (添加其他 API，例如 multimodal)
    };
  }
}

// 添加一个空的 export {} 
// 这会将此文件视为一个“模块”而不是“脚本”，
// 这是正确扩展全局类型的最佳实践。
export {};