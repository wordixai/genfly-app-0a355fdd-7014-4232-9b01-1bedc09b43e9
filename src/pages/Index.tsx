import { useState } from "react";
import { properties, tenants, tasks, messages, users } from "@/data/mockData";
import StatsCards from "@/components/dashboard/StatsCards";
import PropertyGrid from "@/components/dashboard/PropertyGrid";
import TaskList from "@/components/dashboard/TaskList";
import MessageList from "@/components/dashboard/MessageList";
import { useTranslation } from "react-i18next";
import { HoverEffect, Card, CardTitle, CardDescription } from "@/components/ui/aceternity/card-hover-effect";
import { Building2, Users, CreditCard, ClipboardList } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  
  // Calculate total monthly revenue from tenants
  const totalRevenue = tenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0);
  
  // Get featured properties (for sale or rent)
  const featuredProperties = properties.filter(
    property => property.status === "LISTED_FOR_SALE" || property.status === "LISTED_FOR_RENT"
  ).slice(0, 3);
  
  // Get open tasks
  const openTasks = tasks.filter(task => task.status === "OPEN").slice(0, 3);
  
  // Get recent messages
  const recentMessages = [...messages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  // Feature cards for Aceternity UI hover effect
  const features = [
    {
      title: "Property Management",
      description: "Manage all your properties in one place with detailed information and analytics.",
      icon: <Building2 className="h-6 w-6" />
    },
    {
      title: "Tenant Management",
      description: "Keep track of all your tenants, their leases, and payment history.",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Financial Tracking",
      description: "Monitor rent payments, expenses, and generate financial reports.",
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      title: "Task Management",
      description: "Create and assign maintenance tasks and track their progress.",
      icon: <ClipboardList className="h-6 w-6" />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {t('dashboard.welcome')}
        </p>
      </div>
      
      <StatsCards 
        propertyCount={properties.length}
        tenantCount={tenants.length}
        totalRevenue={totalRevenue}
        taskCount={openTasks.length}
      />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.featuredProperties')}</h2>
        <PropertyGrid properties={featuredProperties} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskList tasks={openTasks} />
        <MessageList messages={recentMessages} users={users} />
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <HoverEffect items={features} />
      </div>
    </div>
  );
};

export default Index;