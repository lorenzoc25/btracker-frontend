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

interface SignInResponse {
  token: string;
  username: string;
  email: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { dispatch } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => setEmail(event.target.value);

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => setPassword(event.target.value);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post<SignInResponse>(
        '/session',
        {
          email,
          password,
        },
      );

      dispatch({
        type: 'SetToken',
        payload: {
          token: response.data.token,
        },
      });

      dispatch({
        type: 'SetUsername',
        payload: {
          username: response.data.username,
        },
      });

      dispatch({
        type: 'SetEmail',
        payload: {
          email: response.data.email,
        },
      });

      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: 'Failed to sign in',
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
        <title>Sign In | BTracker</title>
      </Head>

      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading
              fontSize="4xl"
              textAlign="center"
            >
              Sign in to your account
            </Heading>
            <Text
              fontSize="lg"
              color="gray.600"
              textAlign="center"
            >
              to track all your valuable packages
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="lg"
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
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

              <Stack spacing={10}>
                <Button
                  mt="1em"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={loading}
                  onClick={handleButtonClick}
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default LoginPage;
