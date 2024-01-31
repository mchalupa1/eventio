import { useState } from 'react';

const useGrip = () => {
  const [grip, setGrip] = useState(true);

  const toggleGrip = () => {
    setGrip((prevGrip) => !prevGrip);
  };

  return { grip, toggleGrip };
};

export default useGrip;