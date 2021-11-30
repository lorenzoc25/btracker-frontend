import { Skeleton, VStack } from '@chakra-ui/react';

const PackageListSkeleton = () => (
  <VStack
    spacing={6}
    py={2}
    px={{ base: 4, md: 35, lg: 50 }}
  >
    <Skeleton
      w="full"
      height="128px"
    />
    <Skeleton
      w="full"
      height="128px"
    />
    <Skeleton
      w="full"
      height="128px"
    />
  </VStack>
);

export default PackageListSkeleton;
