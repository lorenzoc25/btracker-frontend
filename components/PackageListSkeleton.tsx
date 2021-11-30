import { Skeleton, VStack } from '@chakra-ui/react';

const PackageListSkeleton = () => (
  <VStack
    spacing={6}
    my="2em"
    py={2}
    px={{ base: 4, md: 35, lg: 50 }}
  >
    <Skeleton
      w="full"
      height="128px"
      rounded="md"
    />
    <Skeleton
      w="full"
      height="128px"
      rounded="md"
    />
    <Skeleton
      w="full"
      height="128px"
      rounded="md"
    />
  </VStack>
);

export default PackageListSkeleton;
