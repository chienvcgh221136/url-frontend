import { toast } from 'react-toastify';

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.info('Copied to clipboard!');
};

export default copyToClipboard;
