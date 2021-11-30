import { Box, Text } from '@chakra-ui/react';
import Package from './Package';
import { Package as PackageType } from '../types/package';

interface PackageListProps {
  items : PackageType[];
  isExtended: boolean;
}

const PackageList = ({
  items,
  isExtended,
}: PackageListProps) => (items === undefined ? (
  <Box textAlign="center">
    <Text fontSize="md">
      Your package list is currently empty.
    </Text>
  </Box>
) : (
  <>
    {
      items.map(
        (item) => <Package key={item.tracking} item={item} isExtended={isExtended} />,
      )
    }
  </>
));

export default PackageList;
