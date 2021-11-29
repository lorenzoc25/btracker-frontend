import {
  chakra,
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
import Link from 'next/link';
import { useContext } from 'react';
import SearchPopup from './SearchPopup';
import { AppContext } from '../context/context';

interface NavProps {
  isLoggedIn: boolean;
}

const Nav = ({ isLoggedIn } : NavProps) => {
  const { state, dispatch } = useContext(AppContext);

  const { colorMode, toggleColorMode } = useColorMode();
  const textBgLight = useColorModeValue('blue', 'blue.100');
  const textBgDark = useColorModeValue('blue.400', 'blue.300');
  const handleLogOutClick = () => {
    dispatch({
      type: 'SetToken',
      payload: {
        token: '',
      },
    });
  };

  const UserButton = (
    <>
      <SearchPopup />
      <MenuButton
        as={Button}
        cursor="pointer"
        minW={0}
        leftIcon={(
          <Avatar
            size="sm"
          />
        )}
      >
        { state.username }
      </MenuButton>

      <MenuList alignItems="center">
        <br />
        <Center>
          <Avatar />
        </Center>
        <br />
        <Center>
          <p>{ state.username }</p>
        </Center>
        <br />
        <MenuDivider />
        <Link href="/">
          <MenuItem>Your Packages</MenuItem>
        </Link>
        <MenuItem onClick={handleLogOutClick}>Logout</MenuItem>
      </MenuList>
    </>
  );

  const SignInButtonGroup = (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify="flex-end"
      direction="row"
      spacing={6}
    >
      <Link
        href="/login"
      >
        <Button
          fontSize="sm"
          fontWeight={400}
        >
          Sign In
        </Button>
      </Link>

      <Link
        href="/signup"
      >
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize="sm"
          fontWeight={600}
          color="white"
          bg="blue.400"
          _hover={{
            bg: 'blue.300',
          }}
        >
          Sign Up
        </Button>
      </Link>
    </Stack>
  );
  return (
    <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          {' '}
          <chakra.p fontWeight="bold" bgGradient={`linear(to-l, ${textBgLight}, ${textBgDark})`} bgClip="text">Btracker</chakra.p>
        </Box>
        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              {isLoggedIn ? UserButton : SignInButtonGroup}
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Nav;
