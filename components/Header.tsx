// import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { Flex, Link, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex p={5} backgroundColor="blue.500" as="header">
      <Link href="/">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Quiz
        </Text>
      </Link>
      <Flex alignItems="center" color="white">
        <Link href="/ranking">
          <Text fontSize="lg" fontWeight="bold" ml={8}>
            Ranking
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
