import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/aceternity/tabs";
import { 
  Home, 
  Building2, 
  Users, 
  CreditCard, 
  ClipboardList, 
  DollarSign, 
  Building, 
  MessageSquare, 
  Settings, 
  LogOut,
  Globe,
  Coins
} from "lucide-react";
import { users } from "@/data/mockData";
import { useLocale, locales } from "@/contexts/LocaleContext";
import { useCurrency, currencies } from "@/contexts/CurrencyContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [currentUser] = useState(users[0]); // Using the admin user for demo
  const { currentLocale, setLocale } = useLocale();
  const { currentCurrency, setCurrency } = useCurrency();

  // Define tabs for the header
  const headerTabs = [
    {
      title: t('navigation.home'),
      value: 'home',
      content: null,
    },
    {
      title: t('navigation.properties'),
      value: 'properties',
      content: null,
    },
    {
      title: t('navigation.tenants'),
      value: 'tenants',
      content: null,
    },
    {
      title: t('navigation.tasks'),
      value: 'tasks',
      content: null,
    },
    {
      title: t('navigation.messages'),
      value: 'messages'),
      content: null,
    },
  ];

  // Get current path for active state
  const getIsActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">{t('app.name')}</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t('navigation.home')} asChild isActive={getIsActive('/')}>
                  <Link to="/">
                    <Home />
                    <span>{t('navigation.home')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t('navigation.properties')} asChild isActive={getIsActive('/properties')}>
                  <Link to="/properties">
                    <Building2 />
                    <span>{t('navigation.properties')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t('navigation.tenants')} asChild isActive={getIsActive('/tenants')}>
                  <Link to="/tenants">
                    <Users />
                    <span>{t('navigation.tenants')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t('navigation.payments')} asChild isActive={getIsActive('/payments')}>
                  <Link to="/payments">
                    <CreditCard />
                    <span>{t('navigation.payments')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t('navigation.tasks')} asChild isActive={getIsActive('/tasks')}>
                  <Link to="/tasks">
                    <ClipboardList />
                    <span>{t('navigation.tasks')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t('navigation.expenses')} asChild isActive={getIsActive('/expenses')}>
                  <Link to="/expenses">
                    <DollarSign />
                    <span>{t('navigation.expenses')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t('navigation.facilities')} asChild isActive={getIsActive('/facilities')}>
                  <Link to="/facilities">
                    <Building />
                    <span>{t('navigation.facilities')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t('navigation.messages')} asChild isActive={getIsActive('/messages')}>
                  <Link to="/messages">
                    <MessageSquare />
                    <span>{t('navigation.messages')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.username} />
                  <AvatarFallback>{currentUser.firstName?.[0]}{currentUser.lastName?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{currentUser.firstName} {currentUser.lastName}</span>
                  <span className="text-xs text-muted-foreground">{currentUser.userType}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex flex-col">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <SidebarTrigger />
            
            <div className="flex-1 flex items-center">
              <div className="hidden md:block">
                <Tabs 
                  tabs={headerTabs}
                  containerClassName="w-auto"
                  contentClassName="hidden" // Hide content as we're using React Router
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{currentLocale.flag}</span>
                    <span className="hidden md:inline">{currentLocale.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {locales.map((locale) => (
                    <DropdownMenuItem 
                      key={locale.code}
                      onClick={() => setLocale(locale)}
                      className="cursor-pointer"
                    >
                      <span className="mr-2">{locale.flag}</span>
                      {locale.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Currency Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Coins className="h-4 w-4" />
                    <span>{currentCurrency.symbol}</span>
                    <span className="hidden md:inline">{currentCurrency.code}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {currencies.map((currency) => (
                    <DropdownMenuItem 
                      key={currency.code}
                      onClick={() => setCurrency(currency)}
                      className="cursor-pointer"
                    >
                      <span className="mr-2">{currency.symbol}</span>
                      {currency.name} ({currency.code})
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                {t('navigation.settings')}
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;