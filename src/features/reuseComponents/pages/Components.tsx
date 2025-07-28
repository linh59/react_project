
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Copy } from 'lucide-react';
import { componentLibrary } from '@/data/componentLibrary';
import ComponentPreview from '@/components/ComponentPreview';
import TypographySection from '@/components/TypographySection';
import ColorPaletteSection from '@/components/ColorPaletteSection';
import { toast } from 'sonner';

const Components = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredComponents = componentLibrary.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(componentLibrary.map(comp => comp.category))];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-baloo font-bold text-primary mb-4">UI Components</h1>
        <p className="text-lg text-muted-foreground font-poppins">
          Complete reference for all reusable components in the design system
        </p>
      </div>

      <Tabs defaultValue="components" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="space-y-6">
          {/* Search */}
          <Card variant="enhanced">
            <CardHeader>
              <CardTitle className="text-xl">Search Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Component Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Components List */}
          <div className="space-y-8">
            {filteredComponents.map((component) => (
              <Card key={component.id} variant="enhanced" className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-baloo">{component.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="outline" className="mr-2 text-xs">
                          {component.category}
                        </Badge>
                        {component.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Props Documentation */}
                  {component.props.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 font-baloo">Props</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2 font-medium">Name</th>
                              <th className="text-left p-2 font-medium">Type</th>
                              <th className="text-left p-2 font-medium">Default</th>
                              <th className="text-left p-2 font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {component.props.map((prop) => (
                              <tr key={prop.name} className="border-b border-border/50">
                                <td className="p-2 font-mono text-xs bg-muted/30 rounded">
                                  {prop.name}
                                  {prop.required && <span className="text-red-500 ml-1">*</span>}
                                </td>
                                <td className="p-2 font-mono text-xs">{prop.type}</td>
                                <td className="p-2 font-mono text-xs text-muted-foreground">
                                  {prop.defaultValue || '-'}
                                </td>
                                <td className="p-2 text-xs">{prop.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Examples */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold font-baloo">Examples</h4>
                    {component.examples.map((example, index) => (
                      <div key={index} className="border border-border rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-border bg-muted/30">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">{example.title}</h5>
                              <p className="text-sm text-muted-foreground mt-1">
                                {example.description}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(example.code)}
                              className="ml-4"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                        <div className="p-6">
                          <ComponentPreview>
                            {example.preview}
                          </ComponentPreview>
                        </div>
                        <div className="p-4 bg-muted/20 border-t border-border">
                          <pre className="text-xs overflow-x-auto">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="typography">
          <TypographySection />
        </TabsContent>

        <TabsContent value="colors">
          <ColorPaletteSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Components;
