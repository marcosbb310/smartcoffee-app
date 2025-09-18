"use client"

import React, { useState } from "react"

// Import all UI components
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label"
import { Progress } from "@/app/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Slider } from "@/app/components/ui/slider"
import { Switch } from "@/app/components/ui/switch"
import { Textarea } from "@/app/components/ui/textarea"
import { Toggle } from "@/app/components/ui/toggle"
import { Separator } from "@/app/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/app/components/ui/command"
import { Calendar } from "@/app/components/ui/calendar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/components/ui/alert-dialog"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/app/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/components/ui/hover-card"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/app/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/app/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Skeleton } from "@/app/components/ui/skeleton"
import { Toaster as Sonner } from "@/app/components/ui/sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
// Toast components are not available in sonner, removing unused imports
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
import { AspectRatio } from "@/app/components/ui/aspect-ratio"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/components/ui/carousel"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/collapsible"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/app/components/ui/context-menu"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/app/components/ui/drawer"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { HoverCard as HoverCardPrimitive } from "@/app/components/ui/hover-card"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/app/components/ui/input-otp"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/app/components/ui/resizable"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger } from "@/app/components/ui/sidebar"
import { AnimatedTabs } from "@/app/components/ui/animated-tabs"

export default function UIPage() {
  const [sliderValue, setSliderValue] = useState([50])
  const [progressValue, setProgressValue] = useState(33)
  const [radioValue, setRadioValue] = useState("option1")
  const [checkboxValues, setCheckboxValues] = useState<string[]>([])
  const [switchValue, setSwitchValue] = useState(false)
  const [toggleValue, setToggleValue] = useState(false)
  const [selectValue, setSelectValue] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [accordionValue, setAccordionValue] = useState("")
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [hoverCardOpen, setHoverCardOpen] = useState(false)
  const [menubarOpen, setMenubarOpen] = useState(false)
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [paginationPage, setPaginationPage] = useState(1)
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [resizableSizes, setResizableSizes] = useState([30, 40, 30])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [animatedTabValue, setAnimatedTabValue] = useState("tab1")

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setCheckboxValues([...checkboxValues, value])
    } else {
      setCheckboxValues(checkboxValues.filter(v => v !== value))
    }
  }

  const animatedTabs = [
    { id: "tab1", label: "Tab 1" },
    { id: "tab2", label: "Tab 2" },
    { id: "tab3", label: "Tab 3" }
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">UI Components Showcase</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive showcase of all available UI components
        </p>
      </div>

      {/* Basic Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button styles and variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
              <CardDescription>Text input and form controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="input1">Text Input</Label>
                <Input id="input1" placeholder="Enter text..." />
              </div>
              <div>
                <Label htmlFor="textarea1">Textarea</Label>
                <Textarea 
                  id="textarea1" 
                  placeholder="Enter longer text..." 
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="select1">Select</Label>
                <Select value={selectValue} onValueChange={setSelectValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
              <CardDescription>Checkboxes, switches, and toggles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="checkbox1" 
                    checked={checkboxValues.includes("option1")}
                    onCheckedChange={(checked) => handleCheckboxChange("option1", checked as boolean)}
                  />
                  <Label htmlFor="checkbox1">Checkbox 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="checkbox2" 
                    checked={checkboxValues.includes("option2")}
                    onCheckedChange={(checked) => handleCheckboxChange("option2", checked as boolean)}
                  />
                  <Label htmlFor="checkbox2">Checkbox 2</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="switch1" 
                    checked={switchValue}
                    onCheckedChange={setSwitchValue}
                  />
                  <Label htmlFor="switch1">Switch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Toggle 
                    pressed={toggleValue}
                    onPressedChange={setToggleValue}
                  >
                    Toggle
                  </Toggle>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Radio Group</Label>
                <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="radio1" />
                    <Label htmlFor="radio1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="radio2" />
                    <Label htmlFor="radio2">Option 2</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Interactive Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sliders & Progress</CardTitle>
              <CardDescription>Range controls and progress indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Slider: {sliderValue[0]}</Label>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Progress: {progressValue}%</Label>
                <Progress value={progressValue} className="w-full" />
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
                    -10%
                  </Button>
                  <Button size="sm" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                    +10%
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges & Alerts</CardTitle>
              <CardDescription>Status indicators and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              
              <Alert>
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert message.
                </AlertDescription>
              </Alert>
              
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  This is an error alert message.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatars & Skeleton</CardTitle>
              <CardDescription>User representations and loading states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Navigation Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Navigation Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>Tabbed navigation</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tab 1 Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>This is the content for tab 1.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tab2" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tab 2 Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>This is the content for tab 2.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tab 3 Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>This is the content for tab 3.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Animated Tabs</CardTitle>
              <CardDescription>Custom animated tab component</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatedTabs 
                tabs={animatedTabs}
                defaultTab="tab1"
                onChange={setAnimatedTabValue}
              />
              <div className="mt-4 p-4 border rounded">
                <p>Selected tab: {animatedTabValue}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Breadcrumbs</CardTitle>
            <CardDescription>Navigation breadcrumb trail</CardDescription>
          </CardHeader>
          <CardContent>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>UI Showcase</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>
      </section>

      {/* Modal Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Modal Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>Modal dialog component</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is a dialog description. It can contain any content.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Dialog content goes here.</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sheet</CardTitle>
              <CardDescription>Slide-out panel</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>
                      This is a sheet description.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p>Sheet content goes here.</p>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Dialog</CardTitle>
              <CardDescription>Confirmation dialog</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Item</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the item.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setAlertDialogOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => setAlertDialogOpen(false)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Utility Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Utility Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
              <CardDescription>Collapsible content sections</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other components.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collapsible</CardTitle>
              <CardDescription>Simple collapsible content</CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline">Toggle Content</Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 p-4 border rounded">
                  <p>This content is collapsible!</p>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Separator</CardTitle>
            <CardDescription>Visual content separator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Content above separator</p>
              <Separator />
              <p>Content below separator</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Data Display */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Data Display</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Table</CardTitle>
            <CardDescription>Data table component</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jane Smith</TableCell>
                  <TableCell>
                    <Badge variant="outline">Inactive</Badge>
                  </TableCell>
                  <TableCell>User</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pagination</CardTitle>
            <CardDescription>Page navigation controls</CardDescription>
          </CardHeader>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </section>

      {/* Advanced Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Advanced Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Command Palette</CardTitle>
              <CardDescription>Search and command interface</CardDescription>
            </CardHeader>
            <CardContent>
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem>
                      <span>Calculator</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Date picker component</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Carousel</CardTitle>
            <CardDescription>Image and content carousel</CardDescription>
          </CardHeader>
          <CardContent>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">1</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">2</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">3</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
