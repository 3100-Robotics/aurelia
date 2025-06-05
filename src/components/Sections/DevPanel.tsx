import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Section } from '../core/Section';

export function DevPanel() {
  return (
    <Section>
      <div className="flex flex-col justify-center items-center gap-4">
        <Button
          variant="secondary"
          onClick={() => {
            localStorage.removeItem("aurelia");
            localStorage.removeItem("vite-ui-theme");
          }
          }
        >
          <Copy className="h-5 w-5" />
          Reset save
        </Button>
      </div>
    </Section>
  );
}
