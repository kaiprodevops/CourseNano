import { Box, Heading, Button, VStack } from '@chakra-ui/react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export default function Sidebar() {
  // This hook automatically updates when the database changes!
  const courses = useLiveQuery(() => db.courses.toArray());

  const addCourse = () => {
    db.courses.add({
      title: 'New Course',
      content: 'Start writing...',
      createdAt: new Date(),
    });
  };

  return (
    <Box p={4}>
      <Heading size='md' mb={4}>CourseNano</Heading>
      <Button onClick={addCourse} colorScheme='blue' w='100%' mb={4}>
        + New Course
      </Button>
      
      {/* List of courses from Dexie */}
      <VStack align='stretch' spacing={2}>
        {courses?.map((course) => (
          <Box key={course.id} p={2} bg='gray.100' borderRadius='md' cursor='pointer'>
            {course.title}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}