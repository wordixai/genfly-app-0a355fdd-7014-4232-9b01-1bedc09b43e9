import { useState, useEffect } from "react";
import { properties } from "@/data/mockData";
import { Property } from "@/types";
import PropertyGrid from "@/components/dashboard/PropertyGrid";
import PropertyFilters, { PropertyFilters as FilterType } from "@/components/properties/PropertyFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Properties = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [filters, setFilters] = useState<FilterType>({
    search: "",
    type: "",
    status: "",
    minPrice: 0,
    maxPrice: 1000000,
    bedrooms: null,
    bathrooms: null
  });

  useEffect(() => {
    const filtered = properties.filter(property => {
      // Search filter
      if (filters.search && !property.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !property.address.toLowerCase().includes(filters.search.toLowerCase()) &&
          !property.city.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Type filter
      if (filters.type && property.type !== filters.type) {
        return false;
      }
      
      // Status filter
      if (filters.status && property.status !== filters.status) {
        return false;
      }
      
      // Price filter
      if (property.price && (property.price < filters.minPrice || property.price > filters.maxPrice)) {
        return false;
      }
      
      // Bedrooms filter
      if (filters.bedrooms !== null && property.bedrooms && property.bedrooms < filters.bedrooms) {
        return false;
      }
      
      // Bathrooms filter
      if (filters.bathrooms !== null && property.bathrooms && property.bathrooms < filters.bathrooms) {
        return false;
      }
      
      return true;
    });
    
    setFilteredProperties(filtered);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">
            Manage your property portfolio
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>
      
      <PropertyFilters onFilterChange={handleFilterChange} />
      
      {filteredProperties.length > 0 ? (
        <PropertyGrid properties={filteredProperties} />
      ) : (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default Properties;