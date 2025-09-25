import { useEffect, useRef } from 'react';
import { useNotification } from '@strapi/helper-plugin';
import pluginId from '../pluginId';

const Initializer = ({ setPlugin }) => {
  const ref = useRef();
  const toggleNotification = useNotification();

  useEffect(() => {
    ref.current = setPlugin;
  }, [setPlugin]);

  useEffect(() => {
    if (ref.current) {
      ref.current(pluginId);
      
      toggleNotification({
        type: 'info',
        message: 'Plugin CSV Actions cargado correctamente',
      });
    }
  }, [toggleNotification]);

  return null;
};

export default Initializer;