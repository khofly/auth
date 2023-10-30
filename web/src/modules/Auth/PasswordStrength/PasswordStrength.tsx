import { Progress, Text, Popover, Box } from '@mantine/core';
import { IFC, ITranslations } from '@ts/global.types';
import { PASSWORD_LENGTH } from '@utils/constants/auth';

import { IconCheck, IconX } from '@tabler/icons-react';
import useGlobalCtx from 'src/store/ol-global/use-global-ctx';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} sx={{ display: 'flex', alignItems: 'center' }} mt={7} size="sm">
      {meets ? <IconCheck size="1rem" /> : <IconX size="1rem" />} <Box ml={10}>{label}</Box>
    </Text>
  );
}

const getRequirements = (content: ITranslations) => [
  { re: /[0-9]/, label: content.pages.auth_register.strength.number },
  { re: /[a-z]/, label: content.pages.auth_register.strength.lowercase },
  { re: /[A-Z]/, label: content.pages.auth_register.strength.uppercase },
  //   { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string, content: ITranslations) {
  let multiplier = password.length > PASSWORD_LENGTH - 1 ? 0 : 1;
  console.log(multiplier);

  const requirements = getRequirements(content);

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

interface Props extends IFC {
  value: string;
}

const PasswordStrength: React.FC<Props> = ({ children, value }) => {
  const { content, translate } = useGlobalCtx();

  const checks = getRequirements(content).map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={translate(requirement.label)}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value, content);
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
          label={translate(content.pages.auth_register.strength.minLength, `${PASSWORD_LENGTH}`)}
          meets={value.length > PASSWORD_LENGTH - 1}
        />

        {checks}
      </Popover.Dropdown>
    </Popover>
  );
};

export default PasswordStrength;
