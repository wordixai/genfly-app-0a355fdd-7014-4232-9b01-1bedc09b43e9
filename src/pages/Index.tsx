import { useState } from "react";
import { properties, tenants, tasks, messages, users } from "@/data/mockData";
import StatsCards from "@/components/dashboard/StatsCards";
import PropertyGrid from "@/components/dashboard/PropertyGrid";
import TaskList from "@/components/dashboard/TaskList";
import MessageList from "@/components/dashboard/MessageList";

const Index = () => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your property management dashboard.
        </p>
      </div>
      
      <StatsCards 
        propertyCount={properties.length}
        tenantCount={tenants.length}
        totalRevenue={totalRevenue}
        taskCount={openTasks.length}
      />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Featured Properties</h2>
        <PropertyGrid properties={featuredProperties} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskList tasks={openTasks} />
        <MessageList messages={recentMessages} users={users} />
      </div>
    </div>
  );
};

export default Index;