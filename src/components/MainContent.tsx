import { Box, Heading, Textarea, Button, Text, useToast } from '@chakra-ui/react';
import { useAppStore } from '../store';
import { useState } from 'react';
import '../types.d.ts'; // 导入我们新的类型定义

export default function MainContent() {
  const { isLoading, aiOutput, setLoading, setAiOutput } = useAppStore();
  const [inputText, setInputText] = useState('');
  const toast = useToast();

  const handleSummarize = async () => {
    // 1. 检查新的 API 是否存在
    if (!window.LanguageModel || !window.Summarizer) {
       toast({
        title: 'AI Not Available',
        description: 'Could not find LanguageModel or Summarizer API. Check Chrome flags.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    let session: SummarizerSession | null = null;
    try {
      // 2. 检查新的 API 可用性状态 (来自你的文档)
      const availability = await window.LanguageModel.availability();

      if (availability === 'unavailable') {
        toast({ title: 'AI Unavailable', description: 'Your device does not support this AI.', status: 'error' });
        setLoading(false);
        return;
      }

      if (availability === 'downloading') {
        toast({ title: 'AI Model Downloading', description: 'Please wait... The AI model is downloading.', status: 'info' });
        setLoading(false);
        return;
      }

      // 如果是 'downloadable'，用户点击 (User Activation) 会触发下载
      if (availability === 'downloadable') {
         if (!navigator.userActivation.isActive) {
            toast({
              title: 'Interaction Required',
              description: 'Please click the button again to start the AI model download.',
              status: 'info',
              duration: 3000,
            });
            setLoading(false);
            // 尝试触发下载
            await window.Summarizer.create();
            return;
         }
      }

      // 3. 创建一个新的 Summarizer 会话 (来自你的文档)
      // 这将处理 'available' 状态，或者在 'downloadable' 状态下完成下载
      session = await window.Summarizer.create();
      
      // 4. 使用会话进行总结
      const result = await session.summarize(inputText);
      
      setAiOutput(result);

    } catch (error: any) {
      console.error('Error handling AI request:', error);
      setAiOutput(`An error occurred: ${error.message}`);
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

