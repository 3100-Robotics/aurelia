import { Button } from '@/components/ui/button';
import { useEvent } from '@/hooks';
import { inputSelector, updateValue, useQRScoutState } from '@/store/store';
import { Minus, Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { CounterInputData } from './BaseInputProps';
import { ConfigurableInputProps } from './ConfigurableInput';

export default function CounterInput(props: ConfigurableInputProps) {
  const data = useQRScoutState(
    inputSelector<CounterInputData>(props.section, props.code),
  );

  if (!data) {
    return <div>Invalid input</div>;
  }

  const [value, setValue] = useState(data.defaultValue);

  const resetState = useCallback(
    ({ force }: { force: boolean }) => {
      if (force) {
        setValue(data.defaultValue);
        return;
      }
      switch (data.formResetBehavior) {
        case 'reset':
          setValue(data.defaultValue);
          return;
        case 'increment':
          setValue(prev => (typeof prev === 'number' ? prev + data.step : 1));
          return;
        case 'preserve':
          return;
        default:
          return;
      }
    },
    [value],
  );

  useEvent('resetFields', resetState);

  const handleChange = useCallback(
    (increment: number) => {
      const newVal = value + increment;
      if (data.max !== undefined && newVal > data.max) {
        // Don't fire the event if the new value would be greater than the max
        return;
      }
      if (data.min !== undefined && newVal < data.min) {
        // Don't fire the event if the new value would be less than the min
        return;
      }
      setValue(newVal);
    },
    [data.max, data.min, value],
  );

  useEffect(() => {
    updateValue(props.code, value);
  }, [value]);

  return (
    <div className="my-2 flex flex-row items-center justify-center">
      <Button variant="outline" onClick={() => handleChange(-(data.step || 1))}>
        <Minus />
      </Button>
      <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm     h-9 px-4 py-2'>
        <h2 className="px-4 text-2xl dark:text-white">{value}</h2>
      </div>
      <Button variant="outline" onClick={() => handleChange(data.step || 1)}>
        <Plus />
      </Button>
    </div>
  );
}
