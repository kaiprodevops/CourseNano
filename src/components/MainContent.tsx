import { Box, Heading, Textarea, Button, Text, useToast } from '@chakra-ui/react';
import { useAppStore } from '../store';
import { useState } from 'react';

// --- TypeScript Definition ---
// The hackathon docs should provide a .d.ts file.
// If not, you can create a file like `src/types.d.ts`
// and add this to make TypeScript aware of the new API:
/*
declare global {
  interface Window {
    ai?: {
      summarize: (options: { text: string }) => Promise<{ summary: string }>;
      // ... add other APIs like prompt(), proofread(), etc.
    };
  }
}
*/
// -----------------------------


export default function MainContent() {
  const { isLoading, aiOutput, setLoading, setAiOutput } = useAppStore();
  const [inputText, setInputText] = useState('');
  const toast = useToast();

  const handleSummarize = async () => {
    // Check if the client-side API is available
    if (!window.ai || !window.ai.summarize) {
      toast({
        title: 'AI Not Available',
        description: 'Please use a compatible Google Chrome version.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      // Call the client-side API
      const result = await window.ai.summarize({ text: inputText });
      setAiOutput(result.summary);
    } catch (error) {
      console.error('Error summarizing:', error);
      setAiOutput('An error occurred.');
    } finally {
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