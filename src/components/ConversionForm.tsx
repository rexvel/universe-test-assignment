import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components';
import { Button } from '@/components';

interface FormValues {
  text: string;
}

interface Props {
  onConvert: (text: string) => void;
}

export const ConversionForm: React.FC<Props> = ({ onConvert }) => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    if (data.text.trim() === '') {
      setError('Text cannot be empty');
      console.error(errors);
    } else {
      setError(null);
      onConvert(data.text);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Textarea {...register('text')} placeholder="Enter your text here" className="flex-grow w-full" />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <Button type="submit" className="w-full">
        Convert text to pdf
      </Button>
    </form>
  );
};
