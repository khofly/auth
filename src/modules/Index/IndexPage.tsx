import { Button, Center, Container, Space } from '@mantine/core';
import Link from 'next/link';

const Index = () => {
  return (
    <>
      <Container size="md" py={40}>
        <Center>
          <Link href="/auth/login">
            <Button>Back to login</Button>
          </Link>

          <Space w="lg" />

          <Link href="/user">
            <Button>User profile</Button>
          </Link>
        </Center>
      </Container>
    </>
  );
};

export default Index;
