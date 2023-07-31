import { Button, createStyles } from '@mantine/core';
import { WebviewWindow } from '@tauri-apps/api/window';
import { useUpdatePrs } from 'contexts/pull-requests-context';
import { type FC } from 'react';
import { Container, SubContainer, Title } from './header.styled';

const useStyles = createStyles({
  button: {
    position: 'absolute',
    right: 10,
  },
  refreshBtn: {
    position: 'absolute',
    right: 110,
  },
});

interface IProps {
  canRefresh: boolean
}

const Header: FC<IProps> = ({ canRefresh }: IProps) => {
  const updatePrs = useUpdatePrs();
  const { classes } = useStyles();

  const onSettingsClick = async (): Promise<void> => {
    const settingsWindow = WebviewWindow.getByLabel('settings');
    try {
      await settingsWindow?.show();
      await settingsWindow?.setFocus();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <SubContainer>
        <Title>PR Buddy</Title>
        {canRefresh && <Button className={classes.refreshBtn} onClick={updatePrs}>Refresh</Button>}
        <Button onClick={onSettingsClick} className={classes.button}>Settings</Button>
      </SubContainer>
    </Container>
  );
};

export default Header;
