import { Button, ButtonProps } from '@mantine/core';

interface Props extends ButtonProps {
  onClick?: any;
}

const AuthButton: React.FC<Props> = (props) => {
  return <Button {...props} variant="default" color="gray" />;
};

export default AuthButton;
