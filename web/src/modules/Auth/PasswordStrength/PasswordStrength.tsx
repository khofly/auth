import { Progress, Text, Popover, Box } from '@mantine/core';
import { DotNestedKeys, IFC } from '@ts/global.types';
import { PASSWORD_LENGTH } from '@utils/constants/auth';

import { IconCheck, IconX } from '@tabler/icons-react';
import { ITranslations, useTranslations } from '@store/global';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text c={meets ? 'teal' : 'red'} style={{ display: 'flex', alignItems: 'center' }} mt={7} size="sm">
      {meets ? <IconCheck size="1rem" /> : <IconX size="1rem" />} <Box ml={10}>{label}</Box>
    </Text>
  );
}

const REQUIREMENTS: {
  re: RegExp;
  label: DotNestedKeys<ITranslations>;
}[] = [
  { re: /[0-9]/, label: 'pages.auth_register.strength.number' },
  { re: /[a-z]/, label: 'pages.auth_register.strength.lowercase' },
  { re: /[A-Z]/, label: 'pages.auth_register.strength.uppercase' },
  //   { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > PASSWORD_LENGTH - 1 ? 0 : 1;

  REQUIREMENTS.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (REQUIREMENTS.length + 1)) * multiplier, 10);
}

interface Props extends IFC {
  value: string;
}

const PasswordStrength: React.FC<Props> = ({ children, value }) => {
  const translate = useTranslations();

  const checks = REQUIREMENTS.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={translate(requirement.label)}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover
      withArrow
      trapFocus={false}
      position="bottom"
      width="target"
      transitionProps={{ transition: 'pop' }}
    >
      <Popover.Target>{children}</Popover.Target>

      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />

        <PasswordRequirement
          label={translate('pages.auth_register.strength.minLength', `${PASSWORD_LENGTH}`)}
          meets={value.length > PASSWORD_LENGTH - 1}
        />

        {checks}
      </Popover.Dropdown>
    </Popover>
  );
};

export default PasswordStrength;
