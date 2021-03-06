import type { AppProps } from 'next/app';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex direction='column' minH='100vh'>
        <Header />
        <RecoilRoot>
          <Box style={{ flex: '1' }}>
            <Container maxW='container.sm'>
              <Component {...pageProps} />
            </Container>
          </Box>
        </RecoilRoot>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
