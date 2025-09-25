import React from 'react';
import { CheckPermissions } from '@strapi/helper-plugin';
import pluginId from '../pluginId';

const Initializer = ({ setPlugin }) => {
  const ref = React.useRef(setPlugin);

  React.useEffect(() => {
    ref.current(pluginId);
  }, []);

  return null;
};

export default Initializer;