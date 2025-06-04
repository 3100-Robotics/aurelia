import { Button } from '@/components/ui/button';
import { useQRScoutState } from '@/store/store';
import { Copy } from 'lucide-react';
import { Section } from '../core/Section';

export function DevPanel() {
  const formData = useQRScoutState(state => state.formData);

  return (
    <Section>
      <div className="flex flex-col justify-center items-center gap-4">
        <Button
          variant="secondary"
          onClick={() =>
            navigator.clipboard.writeText(
              formData.sections
                .map(s => s.fields)
                .flat()
                .map(f => f.title)
                .join('\t'),
            )
          }
        >
          <Copy className="h-5 w-5" />
          TEst22
        </Button>
      </div>
    </Section>
  );
}
