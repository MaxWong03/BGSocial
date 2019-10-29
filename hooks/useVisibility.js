import { useState } from 'react';

export default function useVisibility (initial) {
  const [visible, setVisible] = useState(initial);
  
  const showModal = () => setVisible(true);

  const closeModal = () => setVisible(false);

  return {
    visible,
    showModal,
    closeModal
  }
}