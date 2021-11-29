import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  useState,
  useContext,
  ChangeEvent,
} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { AppContext } from '../context/context';

interface SignUpResponse {
  token: string;
  username: string;
  email: string;
}

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { dispatch } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onUsernameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => setUsername(event.target.value);

  const onEmailChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => setEmail(event.target.value);

  const onPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => setPassword(event.target.value);

  const onButtonClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post<SignUpResponse>(
        'http://localhost:4000/user',
        {
          email,
          username,
          password,
        },
      );
      const { token } = response.data;
      dispatch({
        type: 'SetToken',
        payload: {
          token,
        },
      });
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: 'Failed to sign up',
          description: error.response?.data?.message || '',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>BTracker</title>
      </Head>

      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading fontSize="4xl" textAlign="center">
              Sign up
            </Heading>
            <Text fontSize="lg" color="gray.600">
              to gain access to easily track all your packages
            </Text>
          </Stack>

          <Box
            rounded="lg"
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="lg"
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={onUsernameChange}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={onEmailChange}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={onPasswordChange}
                  />
                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  bg="blue.400"
                  color="white"
                  isLoading={loading}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={onButtonClick}
                >
                  Sign up
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align="center">
                  Already a user?
                  {' '}
                  <Link href="/login">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignUpPage;
