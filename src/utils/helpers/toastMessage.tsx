import { XCircle } from 'lucide-react';
import { type ToastOptions, toast } from 'react-toastify';

import { Button } from '@/components/shared';

export const showToastMessage = (
  type: 'error' | 'success',
  description: string,
  options: ToastOptions = {},
) => {
  const content = (
    <div>
      <strong className={type === 'success' ? 'text-green-2' : 'text-red-2'}>
        {type === 'success' ? 'Success' : 'Error'}
      </strong>
      <p>{description}</p>
    </div>
  );

  const _options: ToastOptions | undefined = {
    bodyClassName: 'items-start',
    className: 'bg-white',
    closeButton: ({ closeToast }) => (
      <Button
        className="cursor-pointer self-start border-none p-0"
        color="outline"
        onClick={closeToast}
      >
        <XCircle className="size-5 text-gray-600/50" />
      </Button>
    ),
    ...options,
  };

  if (type === 'success') {
    return toast.success(content, _options);
  } else {
    return toast.error(content, _options);
  }
};
