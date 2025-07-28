
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

const ColorPaletteSection = () => {
  const colorTokens = [
    { name: 'Primary', cssVar: '--primary', class: 'bg-primary' },
    { name: 'Primary Foreground', cssVar: '--primary-foreground', class: 'bg-primary-foreground' },
    { name: 'Secondary', cssVar: '--secondary', class: 'bg-secondary' },
    { name: 'Secondary Foreground', cssVar: '--secondary-foreground', class: 'bg-secondary-foreground' },
    { name: 'Destructive', cssVar: '--destructive', class: 'bg-destructive' },
    { name: 'Destructive Foreground', cssVar: '--destructive-foreground', class: 'bg-destructive-foreground' },
    { name: 'Muted', cssVar: '--muted', class: 'bg-muted' },
    { name: 'Muted Foreground', cssVar: '--muted-foreground', class: 'bg-muted-foreground' },
    { name: 'Accent', cssVar: '--accent', class: 'bg-accent' },
    { name: 'Accent Foreground', cssVar: '--accent-foreground', class: 'bg-accent-foreground' },
    { name: 'Popover', cssVar: '--popover', class: 'bg-popover' },
    { name: 'Popover Foreground', cssVar: '--popover-foreground', class: 'bg-popover-foreground' },
    { name: 'Card', cssVar: '--card', class: 'bg-card' },
    { name: 'Card Foreground', cssVar: '--card-foreground', class: 'bg-card-foreground' },
    { name: 'Border', cssVar: '--border', class: 'bg-border' },
    { name: 'Input', cssVar: '--input', class: 'bg-input' },
    { name: 'Ring', cssVar: '--ring', class: 'bg-ring' },
    { name: 'Background', cssVar: '--background', class: 'bg-background' },
    { name: 'Foreground', cssVar: '--foreground', class: 'bg-foreground' },
  ];

  const copyColorToken = (cssVar: string) => {
    navigator.clipboard.writeText(`hsl(var(${cssVar}))`);
    toast.success('Color token copied to clipboard!');
  };

  return (
    <Card variant="enhanced">
      <CardHeader>
        <CardTitle className="text-2xl font-baloo">Color System</CardTitle>
        <CardDescription>
          Design system color tokens using HSL values with CSS custom properties
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorTokens.map((color) => (
            <div key={color.name} className="border border-border rounded-lg p-4 space-y-3">
              <div className={`w-full h-16 rounded-lg ${color.class} border border-border`} />
              <div className="space-y-2">
                <h4 className="font-medium text-sm">{color.name}</h4>
                <div className="flex items-center justify-between">
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {color.cssVar}
                  </code>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => copyColorToken(color.cssVar)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPaletteSection;
