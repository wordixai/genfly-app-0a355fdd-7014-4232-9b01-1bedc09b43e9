import { useParams, useNavigate } from "react-router-dom";
import { properties } from "@/data/mockData";
import PropertyDetails from "@/components/properties/PropertyDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const propertyId = parseInt(id || "0");
  const property = properties.find(p => p.id === propertyId);
  
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/properties")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate("/properties")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      
      <PropertyDetails property={property} />
    </div>
  );
};

export default PropertyDetail;