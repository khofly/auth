'use client'; // Error components must be Client Components

import Error from '@module/Error';

const Index = ({ error }: { error: Error & { digest?: string } }) => {
  return <Error code={500} message={error.message} />;
};

export default Index;
