
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TypographySection = () => {
  const typographyStyles = [
    { name: 'Display Large', class: 'text-5xl font-baloo font-bold', text: 'Display Large' },
    { name: 'Display Medium', class: 'text-4xl font-baloo font-bold', text: 'Display Medium' },
    { name: 'Display Small', class: 'text-3xl font-baloo font-bold', text: 'Display Small' },
    { name: 'Headline Large', class: 'text-2xl font-baloo font-bold', text: 'Headline Large' },
    { name: 'Headline Medium', class: 'text-xl font-baloo font-semibold', text: 'Headline Medium' },
    { name: 'Headline Small', class: 'text-lg font-baloo font-semibold', text: 'Headline Small' },
    { name: 'Title Large', class: 'text-lg font-poppins font-semibold', text: 'Title Large' },
    { name: 'Title Medium', class: 'text-base font-poppins font-semibold', text: 'Title Medium' },
    { name: 'Title Small', class: 'text-sm font-poppins font-semibold', text: 'Title Small' },
    { name: 'Body Large', class: 'text-base font-poppins font-normal', text: 'Body Large' },
    { name: 'Body Medium', class: 'text-sm font-poppins font-normal', text: 'Body Medium' },
    { name: 'Body Small', class: 'text-xs font-poppins font-normal', text: 'Body Small' },
    { name: 'Label Large', class: 'text-sm font-poppins font-medium', text: 'Label Large' },
    { name: 'Label Medium', class: 'text-xs font-poppins font-medium', text: 'Label Medium' },
    { name: 'Label Small', class: 'text-xs font-poppins font-medium', text: 'Label Small' },
  ];

  return (
    <Card variant="enhanced">
      <CardHeader>
        <CardTitle className="text-2xl font-baloo">Typography Scale</CardTitle>
        <CardDescription>
          Typography styles and hierarchy used throughout the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {typographyStyles.map((style) => (
            <div key={style.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className={style.class}>{style.text}</div>
                <div className="text-xs text-muted-foreground mt-2 font-mono">
                  {style.name} • {style.class}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TypographySection;
