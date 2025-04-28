import { Property } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatCurrency } from "@/lib/formatters";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const mainImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop";

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <img 
            src={mainImage} 
            alt={property.name} 
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="absolute top-2 right-2">
          <Badge variant={property.status === "LISTED_FOR_SALE" ? "destructive" : "default"}>
            {property.status === "LISTED_FOR_SALE" ? "For Sale" : "For Rent"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{property.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{property.address}, {property.city}, {property.state}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold">
              {formatCurrency(property.price || 0)}
              {property.status === "LISTED_FOR_RENT" && <span className="text-sm font-normal">/mo</span>}
            </p>
          </div>
          
          <div className="flex gap-2">
            {property.bedrooms && (
              <div className="text-sm">
                <span className="font-medium">{property.bedrooms}</span> bd
              </div>
            )}
            {property.bathrooms && (
              <div className="text-sm">
                <span className="font-medium">{property.bathrooms}</span> ba
              </div>
            )}
            {property.size && (
              <div className="text-sm">
                <span className="font-medium">{property.size.toLocaleString()}</span> sqft
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Badge variant="outline">{property.type}</Badge>
        <p className="text-xs text-muted-foreground">
          {property.yearBuilt ? `Built in ${property.yearBuilt}` : ""}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;