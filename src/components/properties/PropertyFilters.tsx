import { useState } from "react";
import { PropertyType, PropertyStatus } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, X } from "lucide-react";

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export interface PropertyFilters {
  search: string;
  type: PropertyType | "";
  status: PropertyStatus | "";
  minPrice: number;
  maxPrice: number;
  bedrooms: number | null;
  bathrooms: number | null;
}

const initialFilters: PropertyFilters = {
  search: "",
  type: "",
  status: "",
  minPrice: 0,
  maxPrice: 1000000,
  bedrooms: null,
  bathrooms: null
};

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (value: number[]) => {
    const [min, max] = value;
    setPriceRange([min, max]);
    setFilters(prev => ({
      ...prev,
      minPrice: min,
      maxPrice: max
    }));
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max
    });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setPriceRange([0, 1000000]);
    onFilterChange(initialFilters);
  };

  return (
    <div className="space-y-4 p-4 bg-muted/40 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="pl-8"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {Object.values(PropertyType).map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value={PropertyStatus.LISTED_FOR_SALE}>For Sale</SelectItem>
              <SelectItem value={PropertyStatus.LISTED_FOR_RENT}>For Rent</SelectItem>
              <SelectItem value={PropertyStatus.ACTIVE}>Active</SelectItem>
              <SelectItem value={PropertyStatus.SOLD}>Sold</SelectItem>
              <SelectItem value={PropertyStatus.RENTED}>Rented</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filters.bedrooms?.toString() || ""}
            onValueChange={(value) => handleFilterChange("bedrooms", value ? parseInt(value) : null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filters.bathrooms?.toString() || ""}
            onValueChange={(value) => handleFilterChange("bathrooms", value ? parseInt(value) : null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Bathrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Price Range</span>
          <span className="text-sm">${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
        </div>
        <Slider
          defaultValue={[0, 1000000]}
          value={[filters.minPrice, filters.maxPrice]}
          min={0}
          max={1000000}
          step={10000}
          onValueChange={handlePriceRangeChange}
        />
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={resetFilters}>
          <X className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;