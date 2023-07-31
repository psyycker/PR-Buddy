import type React from 'react';
import { useEffect } from 'react';
import { getAppConfig } from 'utils/fs-utils';
import { WebviewWindow } from '@tauri-apps/api/window';

interface IProps {
  children: React.ReactNode
}

const WizardInitWrapper: React.FC<IProps> = ({ children }: IProps) => {
  useEffect(() => {
    getAppConfig().then(async (config) => {
      // TODO finish the implementation and enable in future
      return;
      if (!config.initialized) {
        const wizardWindow = WebviewWindow.getByLabel('wizard');
        try {
          await wizardWindow?.show();
          await wizardWindow?.setFocus();
        } catch (e) {
          console.error(e);
        }
      }
    }).catch((err) => { console.error(err); });
  }, []);

  return children;
};

export default WizardInitWrapper;
