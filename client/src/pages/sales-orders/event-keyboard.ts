export const handleOnkeydown = (id: number, setId: (id: number) => void) => {
  return (e: KeyboardEvent) => {
    if (e.key == 'F1') {
      e.preventDefault();
      const input = document.querySelector('#code') as HTMLInputElement;
      if (input) input.select();
    } else if (e.key == 'F4') {
      e.preventDefault();
      const button = document.querySelector('#new-cart') as HTMLButtonElement;
      if (button) button.click();
    } else if (e.key == 'F2') {
      e.preventDefault();
      const button = document.querySelector('#select-quantity') as HTMLButtonElement;
      if (button) button.click();
    } else if (e.key == 'F3') {
      e.preventDefault();
      const button = document.querySelector('#select-price') as HTMLButtonElement;
      if (button) button.click();
    } else if (e.key == 'Delete') {
      e.preventDefault();
      const button = document.querySelector('#delete-product') as HTMLButtonElement;
      if (button) button.click();
    } else if (e.key == 'ArrowUp') {
      e.preventDefault();
      setId(id - 1);
    } else if (e.key == 'ArrowDown') {
      e.preventDefault();
      setId(id + 1);
    } else if (e.ctrlKey && e.which == 68) {
      e.preventDefault();
      const button = document.querySelector('#draft') as HTMLButtonElement;
      if (button) button.click();
    } else if (e.ctrlKey && e.which == 79) {
      e.preventDefault();
      const button = document.querySelector('#open-draft') as HTMLButtonElement;
      if (button) button.click();
    } else if (e.key == 'F12') {
      e.preventDefault();
      const button = document.querySelector('#pay') as HTMLButtonElement;
      if (button) button.click();
    }

    // else if (e.ctrlKey && e.altKey && e.which == 89) {
    //   alert('Kombinasi pintasan Ctrl + Alt + Y ditekan');
    // } else if (e.ctrlKey && e.altKey && e.shiftKey && e.which == 85) {
    //   alert('Kombinasi pintasan Ctrl + Alt + Shift + U ditekan');
    // }
  };
};
