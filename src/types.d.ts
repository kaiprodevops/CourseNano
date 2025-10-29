// 1. 定义 TextSession 接口
interface TextSession {
  /**
   * Runs the prompt for this session.
   * @param text The prompt text.
   * @returns A string containing the response.
   */
  prompt(text: string): Promise<string>;

  /**
   * Destroys the session.
   */
  destroy(): Promise<void>;
}

// 2. 扩展全局 Window 接口
declare global {
  interface Window {
    ai?: {
      /**
       * Checks if a text session can be created.
       * @returns 'readily', 'after-download', or 'no'.
       */
      canCreateTextSession(): Promise<'readily' | 'after-download' | 'no'>;

      /**
       * Creates a new text session.
       * @returns A Promise that resolves to a new TextSession object.
       */
      createTextSession(): Promise<TextSession>;
    };
  }
}

// 保持这个空导出，以确保文件被视为一个模块
export {};