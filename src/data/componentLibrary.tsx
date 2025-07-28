import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, 
  Send, 
  Download, 
  Plus, 
  Settings, 
  User, 
  Eye, 
  EyeOff, 
  Calendar, 
  Mail, 
  Phone,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

export type PropInfo = {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
  options?: string[];
}

export interface ComponentInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  props: PropInfo[];
  examples: Array<{
    title: string;
    description: string;
    code: string;
    preview: React.ReactNode;
  }>;
}

export const componentLibrary: ComponentInfo[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Form Controls',
    description: 'A versatile button component with multiple variants and states.',
    props: [
      {
        name: 'variant',
        type: 'string',
        description: 'Button appearance style',
        required: false,
        defaultValue: 'default',
        options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
      },
      {
        name: 'size',
        type: 'string',
        description: 'Button size',
        required: false,
        defaultValue: 'default',
        options: ['default', 'sm', 'lg', 'icon']
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Whether the button is disabled',
        required: false,
        defaultValue: 'false'
      },
      {
        name: 'onClick',
        type: 'function',
        description: 'Click event handler',
        required: false
      }
    ],
    examples: [
      {
        title: 'Default Button',
        description: 'Standard button with default styling',
        code: '<Button>Click me</Button>',
        preview: <Button>Click me</Button>
      },
      {
        title: 'Button Variants',
        description: 'Different button styles',
        code: `<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
        preview: (
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        )
      },
      {
        title: 'Button with Icons',
        description: 'Buttons with leading or trailing icons',
        code: `<Button><Send className="mr-2 h-4 w-4" />Send</Button>
<Button variant="outline"><Download className="mr-2 h-4 w-4" />Download</Button>
<Button size="icon"><Plus className="h-4 w-4" /></Button>`,
        preview: (
          <div className="flex gap-2">
            <Button><Send className="mr-2 h-4 w-4" />Send</Button>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download</Button>
            <Button size="icon"><Plus className="h-4 w-4" /></Button>
          </div>
        )
      },
      {
        title: 'Button Sizes',
        description: 'Different button sizes',
        code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`,
        preview: (
          <div className="flex items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        )
      }
    ]
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Form Controls',
    description: 'Text input field with various configurations and icon support.',
    props: [
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text',
        required: false
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Whether the input is disabled',
        required: false,
        defaultValue: 'false'
      },
      {
        name: 'type',
        type: 'string',
        description: 'Input type',
        required: false,
        defaultValue: 'text',
        options: ['text', 'email', 'password', 'number', 'tel', 'url']
      },
      {
        name: 'value',
        type: 'string',
        description: 'Input value',
        required: false
      },
      {
        name: 'onChange',
        type: 'function',
        description: 'Change event handler',
        required: false
      }
    ],
    examples: [
      {
        title: 'Basic Input',
        description: 'Standard text input',
        code: '<Input placeholder="Enter text..." />',
        preview: <Input placeholder="Enter text..." />
      },
      {
        title: 'Input with Label',
        description: 'Input field with a label',
        code: `<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>`,
        preview: (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        )
      },
      {
        title: 'Input with Icons',
        description: 'Input fields with prefix and suffix icons',
        code: `<div className="space-y-4">
  <div className="relative">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input placeholder="Search..." className="pl-8" />
  </div>
  <div className="relative">
    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input type="email" placeholder="Email" className="pl-8" />
  </div>
</div>`,
        preview: (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="email" placeholder="Email" className="pl-8" />
            </div>
          </div>
        )
      },
      {
        title: 'Password Input',
        description: 'Password input with toggle visibility',
        code: `<div className="relative">
  <Input type="password" placeholder="Password" className="pr-10" />
  <Button size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent">
    <EyeOff className="h-4 w-4" />
  </Button>
</div>`,
        preview: (
          <div className="relative">
            <Input type="password" placeholder="Password" className="pr-10" />
            <Button size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent">
              <EyeOff className="h-4 w-4" />
            </Button>
          </div>
        )
      }
    ]
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Layout',
    description: 'A flexible content container with header, body, and footer sections.',
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
        required: false
      }
    ],
    examples: [
      {
        title: 'Basic Card',
        description: 'Simple card with content',
        code: `<Card>
  <CardContent className="p-6">
    <p>Card content goes here.</p>
  </CardContent>
</Card>`,
        preview: (
          <Card>
            <CardContent className="p-6">
              <p>Card content goes here.</p>
            </CardContent>
          </Card>
        )
      },
      {
        title: 'Card with Header',
        description: 'Card with title and description',
        code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description or subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This is the main content area of the card.</p>
  </CardContent>
</Card>`,
        preview: (
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description or subtitle</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the main content area of the card.</p>
            </CardContent>
          </Card>
        )
      }
    ]
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'Data Display',
    description: 'Small status indicator or label component.',
    props: [
      {
        name: 'variant',
        type: 'string',
        description: 'Badge style variant',
        required: false,
        defaultValue: 'default',
        options: ['default', 'secondary', 'destructive', 'outline']
      }
    ],
    examples: [
      {
        title: 'Badge Variants',
        description: 'Different badge styles',
        code: `<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`,
        preview: (
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        )
      }
    ]
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'Feedback',
    description: 'Brief notification messages that appear temporarily.',
    props: [
      {
        name: 'title',
        type: 'string',
        description: 'Toast title',
        required: false
      },
      {
        name: 'description',
        type: 'string',
        description: 'Toast description',
        required: false
      },
      {
        name: 'variant',
        type: 'string',
        description: 'Toast appearance style',
        required: false,
        defaultValue: 'default',
        options: ['default', 'destructive']
      }
    ],
    examples: [
      {
        title: 'Toast Variants',
        description: 'Different types of toast notifications',
        code: `import { toast } from '@/components/ui/sonner';

// Success Toast
toast.success('Operation completed successfully!');

// Error Toast
toast.error('Something went wrong!');

// Warning Toast
toast.warning('Please check your input!');

// Info Toast
toast.info('New update available!');`,
        preview: (
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => toast.success('Operation completed successfully!')}
              variant="default"
            >
              Success Toast
            </Button>
            <Button 
              onClick={() => toast.error('Something went wrong!')}
              variant="destructive"
            >
              Error Toast
            </Button>
            <Button 
              onClick={() => toast.warning('Please check your input!')}
              variant="outline"
            >
              Warning Toast
            </Button>
            <Button 
              onClick={() => toast.info('New update available!')}
              variant="secondary"
            >
              Info Toast
            </Button>
          </div>
        )
      }
    ]
  },
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'Overlay',
    description: 'Modal dialog for important communications or actions.',
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Controls the open state',
        required: false
      },
      {
        name: 'onOpenChange',
        type: 'function',
        description: 'Callback fired when open state changes',
        required: false
      }
    ],
    examples: [
      {
        title: 'Basic Dialog',
        description: 'Simple modal dialog',
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description goes here.
      </DialogDescription>
    </DialogHeader>
    <div className="flex justify-end space-x-2">
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  </DialogContent>
</Dialog>`,
        preview: (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a sample dialog with title and description.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </div>
            </DialogContent>
          </Dialog>
        )
      }
    ]
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Organize content into multiple sections with tab navigation.',
    props: [
      {
        name: 'defaultValue',
        type: 'string',
        description: 'The default active tab',
        required: false
      },
      {
        name: 'value',
        type: 'string',
        description: 'The controlled active tab',
        required: false
      }
    ],
    examples: [
      {
        title: 'Basic Tabs',
        description: 'Simple tabbed interface',
        code: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for Tab 1</TabsContent>
  <TabsContent value="tab2">Content for Tab 2</TabsContent>
  <TabsContent value="tab3">Content for Tab 3</TabsContent>
</Tabs>`,
        preview: (
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <p>Content for Tab 1</p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4">
              <p>Content for Tab 2</p>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4">
              <p>Content for Tab 3</p>
            </TabsContent>
          </Tabs>
        )
      }
    ]
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Form Controls',
    description: 'Checkbox input for binary choices.',
    props: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'Checked state',
        required: false
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Disabled state',
        required: false,
        defaultValue: 'false'
      }
    ],
    examples: [
      {
        title: 'Checkbox States',
        description: 'Different checkbox states',
        code: `<div className="space-y-2">
  <div className="flex items-center space-x-2">
    <Checkbox id="terms1" />
    <Label htmlFor="terms1">Accept terms and conditions</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="terms2" checked />
    <Label htmlFor="terms2">Checked by default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="terms3" disabled />
    <Label htmlFor="terms3">Disabled checkbox</Label>
  </div>
</div>`,
        preview: (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" />
              <Label htmlFor="terms1">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" checked />
              <Label htmlFor="terms2">Checked by default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms3" disabled />
              <Label htmlFor="terms3">Disabled checkbox</Label>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Form Controls',
    description: 'Toggle switch for on/off states.',
    props: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'Checked state',
        required: false
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Disabled state',
        required: false,
        defaultValue: 'false'
      }
    ],
    examples: [
      {
        title: 'Switch States',
        description: 'Different switch states',
        code: `<div className="space-y-4">
  <div className="flex items-center space-x-2">
    <Switch id="airplane-mode" />
    <Label htmlFor="airplane-mode">Airplane Mode</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Switch id="notifications" checked />
    <Label htmlFor="notifications">Notifications</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Switch id="wifi" disabled />
    <Label htmlFor="wifi">WiFi (Disabled)</Label>
  </div>
</div>`,
        preview: (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" checked />
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="wifi" disabled />
              <Label htmlFor="wifi">WiFi (Disabled)</Label>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: 'typography',
    name: 'Typography',
    category: 'Typography',
    description: 'Text styling system with consistent hierarchy.',
    props: [],
    examples: [
      {
        title: 'Headings',
        description: 'Different heading levels',
        code: `<div className="space-y-4">
  <h1 className="text-4xl font-bold">Heading 1</h1>
  <h2 className="text-3xl font-semibold">Heading 2</h2>
  <h3 className="text-2xl font-semibold">Heading 3</h3>
  <h4 className="text-xl font-medium">Heading 4</h4>
</div>`,
        preview: (
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <h3 className="text-2xl font-semibold">Heading 3</h3>
            <h4 className="text-xl font-medium">Heading 4</h4>
          </div>
        )
      },
      {
        title: 'Body Text',
        description: 'Body text in different sizes',
        code: `<div className="space-y-2">
  <p className="text-lg">Large body text</p>
  <p className="text-base">Default body text</p>
  <p className="text-sm">Small body text</p>
  <p className="text-xs text-muted-foreground">Caption text</p>
</div>`,
        preview: (
          <div className="space-y-2">
            <p className="text-lg">Large body text</p>
            <p className="text-base">Default body text</p>
            <p className="text-sm">Small body text</p>
            <p className="text-xs text-muted-foreground">Caption text</p>
          </div>
        )
      }
    ]
  }
];
