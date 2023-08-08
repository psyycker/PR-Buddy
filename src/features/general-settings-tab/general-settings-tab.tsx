import { useConfig } from 'contexts/config-context';
import { Text } from '@mantine/core';
import DebouncedTextInput from 'components/debounced-text-input';
import { type FC } from 'react';
import { Container, Title } from './general-settings-tab.styled';

const GeneralSettings: FC = () => {
  const { generalConfig, updateSingleValue, isLoading } = useConfig();

  const updateGeneralConfig = (
    key: string,
    isNumber: boolean = false,
  ) => (newValue: string|number) => {
    let finalValue: string | number = newValue;
    if (finalValue === '' && isNumber) {
      finalValue = 0;
    }
    if (isNumber && typeof finalValue === 'string') {
      finalValue = parseInt(finalValue, 10);
    }
    updateSingleValue(key, finalValue);
  };

  if (isLoading) return null;

  return (
    <Container>
      <Title>General Settings</Title>
      <Text size="sm">Hide Pull Requests older than (days) (0 disables the feature):</Text>
      <DebouncedTextInput
        initialState={generalConfig.filterOlderThanDays}
        onChange={updateGeneralConfig('filterOlderThanDays', true)}
        placeholder="Enter value"
      />

      <Text size="sm">Hide Pull Requests with X or more approvals (0 disables the feature):</Text>
      <DebouncedTextInput
        initialState={generalConfig.hideAfterApprovals}
        onChange={updateGeneralConfig('hideAfterApprovals', true)}
        placeholder="Enter value"
      />
    </Container>
  );
};

export default GeneralSettings;
