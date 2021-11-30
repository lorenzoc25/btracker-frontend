import {
  chakra,
  Center,
  Text,
  Box,
  Flex,
  Stack,
  useColorModeValue,
  useToast,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChatIcon } from '@chakra-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import HistStat from './HistStat';
import { Package as PackageType, Status } from '../types/package';

interface PackageProps {
  item: PackageType;
}

const getStatusColor = (status: Status): string[] => {
  if (status === Status.Delivered) {
    return ['green.600', 'green.200'];
  } if (status === Status.Accepted) {
    return ['orange.400', 'orange.300'];
  } if (status === Status.InTransit) {
    return ['cyan.600', 'cyan.200'];
  }
  return ['red.500', 'red.400'];
};

const Details = ({ item }: PackageProps) => {
  const router = useRouter();
  const { tracking } = router.query;
  const toast = useToast();
  const statColor = getStatusColor(item.status);

  return (
    <Flex
      pb={4}
      px={{ base: 4, md: 35, lg: 50 }}
      w="full"
      alignItems="center"
      justifyContent="center"
      mt="2em"
    >
      <Box
        w="full"
        mx="auto"
        px={4}
        py={3}
        bg={useColorModeValue('white', 'gray.700')}
        rounded="md"
      >
        <Flex justifyContent="space-between" alignItems="start">
          <chakra.h3
            fontSize="2xl"
            fontWeight="bold"
            mb={0}
            px={0}
            p={4}
            color={useColorModeValue('blue.600', 'blue.200')}
          >
            {item.name}
          </chakra.h3>

        </Flex>

        <Box>
          <chakra.p
            fontSize="md"
            color={useColorModeValue('gray.600', 'gray.300')}
            ml="1em"
          >
            {`${item.carrier} - ${item.tracking}`}
          </chakra.p>
        </Box>

        <Box>
          <Flex
            alignItems="center"
            mt="1em"
            mb="2em"
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            <chakra.p
              fontWeight="light"
              ml="1em"
            >
              Status:&nbsp;
            </chakra.p>
            <chakra.p
              fontWeight="semibold"
              color={useColorModeValue(statColor[0], statColor[1])}
            >
              {item.status}
            </chakra.p>
          </Flex>

          <Stack align="stretch">
            {
              item.history?.map(
                (hist) => <HistStat key={hist.timestamp} hist={hist} />,
              )
            }
          </Stack>
          <CopyToClipboard text={`https://btracker.xyz/detail/${tracking}`}>
            <Center p={8}>
              <Button
                w="full"
                maxW="xl"
                colorScheme="messenger"
                leftIcon={<ChatIcon />}
                onClick={() => toast({
                  title: '',
                  description: 'Link copied to clipboard!',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                })}
              >
                <Center>
                  <Text>Share with Other</Text>
                </Center>
              </Button>
            </Center>
          </CopyToClipboard>
        </Box>
      </Box>
    </Flex>
  );
};

export default Details;
