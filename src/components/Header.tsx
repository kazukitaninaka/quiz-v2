// import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { Flex, Link, Text } from '@chakra-ui/react';

export default function Header() {
  return (
    <Flex p={5} backgroundColor='blue.500' as='header'>
      <Link href='/' _hover={{ textDecoration: 'none' }}>
        <Text fontSize='2xl' fontWeight='bold' color='white'>
          Quiz
        </Text>
      </Link>
      <Flex alignItems='center' color='white' ml={8}>
        <Link href='/ranking' _hover={{ textDecoration: 'none' }}>
          <Text fontSize='lg' fontWeight='bold'>
            Ranking
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
