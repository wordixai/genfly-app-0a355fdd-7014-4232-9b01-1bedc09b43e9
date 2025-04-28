import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, CreditCard, ClipboardList } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/contexts/CurrencyContext";
import { motion } from "framer-motion";

interface StatsCardsProps {
  propertyCount: number;
  tenantCount: number;
  totalRevenue: number;
  taskCount: number;
}

const StatsCards = ({ propertyCount, tenantCount, totalRevenue, taskCount }: StatsCardsProps) => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20">
            <CardTitle className="text-sm font-medium">{t('dashboard.stats.totalProperties')}</CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{propertyCount}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.stats.propertiesUnderManagement')}</p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20">
            <CardTitle className="text-sm font-medium">{t('dashboard.stats.activeTenants')}</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{tenantCount}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.stats.currentOccupancy')}</p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20">
            <CardTitle className="text-sm font-medium">{t('dashboard.stats.monthlyRevenue')}</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.stats.fromRentAndFees')}</p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20">
            <CardTitle className="text-sm font-medium">{t('dashboard.stats.openTasks')}</CardTitle>
            <ClipboardList className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{taskCount}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.stats.tasksRequiringAttention')}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default StatsCards;