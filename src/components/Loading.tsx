import { CircularProgress, Center } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Center my={5}>
      <CircularProgress isIndeterminate color='teal.400' />
    </Center>
  );
}
