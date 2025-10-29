import { Box, Heading, Textarea, Button, Text, useToast } from '@chakra-ui/react';
import { useAppStore } from '../store';
import { useState } from 'react';
import '../types.d.ts'; // 确保 TypeScript 导入了我们的类型

export default function MainContent() {
  const { isLoading, aiOutput, setLoading, setAiOutput } = useAppStore();
  const [inputText, setInputText] = useState('');
  const toast = useToast();

  const handleSummarize = async () => {
    // 1. 更改检查：我们检查 canCreateTextSession
    if (!window.ai || !(await window.ai.canCreateTextSession())) {
      toast({
        title: 'AI Not Available',
        description: 'Please use a compatible Google Chrome version and enable the AI flags.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    let session = null;
    try {
      // 2. 创建一个会话
      session = await window.ai.createTextSession();
      
      // 3. 构造提示词 (Prompt)
      const prompt = `Please summarize the following text: ${inputText}`;

      // 4. 使用会话执行提示词
      const result = await session.prompt(prompt);
      
      setAiOutput(result); // 官方 API 直接返回字符串

    } catch (error) {
      console.error('Error handling AI request:', error);
      setAiOutput('An error occurred.');
    } finally {
      // 5. 销毁会话
      if (session) {
        await session.destroy();
      }
      setLoading(false);
    }
  };

  return (
    <Box p={8} h='100%'>
      <Heading size='lg' mb={4}>Course Editor</Heading>
      
      <Textarea 
        placeholder="Write your course content here..."
        h="300px"
        mb={4}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      
      <Button 
        onClick={handleSummarize}
        isLoading={isLoading}
        colorScheme='blue'
        disabled={!inputText}
      >
        Summarize Text
      </Button>

      {aiOutput && (
        <Box mt={4} p={4} bg='gray.100' borderRadius='md'>
          <Heading size='sm' mb={2}>AI Summary:</Heading>
          <Text whiteSpace='pre-wrap'>{aiOutput}</Text>
        </Box>
      )}
    </Box>
  );
}