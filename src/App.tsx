import { Grid, GridItem, Box } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  return (
    // Use Chakra Grid to create the two-column layout
    <Grid
      templateAreas={`"sidebar main"`}
      gridTemplateColumns={'260px 1fr'} // Sidebar 260px wide, main content takes the rest
      gridTemplateRows={'100vh'}
      h='100vh'
      w='100vw'
      overflow='hidden'
    >
      {/* Sidebar Area */}
      <GridItem area={'sidebar'} bg='gray.50' borderRight='1px solid' borderColor='gray.200'>
        <Sidebar />
      </GridItem>

      {/* Main Content Area */}
      <GridItem area={'main'} bg='white'>
        <MainContent />
      </GridItem>
    </Grid>
  );
}

export default App;