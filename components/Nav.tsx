import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

interface NavProps {
  isLoggedIn: boolean;
}

const Nav = ({ isLoggedIn } : NavProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const userButton = (<>
          <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}>
          <Avatar
              size={'sm'}
           />
              </MenuButton><MenuList alignItems={'center'}>
              <br />
              <Center>
                  <Avatar />
              </Center>
              <br />
              <Center>
                  <p>Username</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Your Packages</MenuItem>
              <MenuItem>Logout</MenuItem>
          </MenuList>
        </>);
  const signInBtnGroup = (<>
      <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              href={'/login'}>
              Sign In
            </Button>
            <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'blue.400'}
              href={'#'}
              _hover={{
                bg: 'blue.300',
              }}>
              Sign Up
            </Button>
          </Stack>  
      </>);
  return (
      <>
        <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box>BTracker</Box>
  
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                <Menu>
                  {isLoggedIn ? userButton : signInBtnGroup}
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </>
  );
};

export default Nav;
