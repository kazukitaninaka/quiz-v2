import { Flex, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Flex p={5} backgroundColor='blue.500' as='footer'>
      <Text color='white'>Copyrights &copy; 2021 Kazuki Taninaka. All rights reserved</Text>
    </Flex>
  );
}
