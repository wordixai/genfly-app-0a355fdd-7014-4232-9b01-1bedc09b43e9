import { Property, PropertyAmenities, LocationAmenities } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin, Calendar, Home, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/contexts/CurrencyContext";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/aceternity/spotlight";

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();

  const formatAmenityName = (amenity: string) => {
    // Convert camelCase to Title Case with spaces
    return amenity
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold">{property.name}</h1>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
        </div>
      </motion.div>

      {property.images && property.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={image} 
                      alt={`${property.name} - Image ${index + 1}`} 
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-2">
              <CarouselPrevious className="relative left-0 translate-y-0" />
              <CarouselNext className="relative right-0 translate-y-0" />
            </div>
          </Carousel>
        </motion.div>
      )}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('propertyDetail.price')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(property.price || 0)}
              {property.status === "LISTED_FOR_RENT" && <span className="text-sm font-normal">/mo</span>}
            </div>
            <Badge className="mt-2">{property.status.replace(/_/g, ' ')}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('propertyDetail.details')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                <span>{property.type}</span>
              </div>
              {property.yearBuilt && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{t('common.builtIn')} {property.yearBuilt}</span>
                </div>
              )}
              {property.size && (
                <div className="col-span-2">
                  <span className="font-medium">{property.size.toLocaleString()}</span> {t('common.sqft')}
                </div>
              )}
              {property.bedrooms && (
                <div>
                  <span className="font-medium">{property.bedrooms}</span> {t('common.bd')}
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <span className="font-medium">{property.bathrooms}</span> {t('common.ba')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('propertyDetail.location')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p>{property.address}</p>
              <p>{property.city}, {property.state} {property.zipCode}</p>
              <p>{property.country}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Spotlight className="rounded-md">
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle>{t('propertyDetail.description')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{property.description || t('propertyDetail.noDescription')}</p>
            </CardContent>
          </Card>
        </Spotlight>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Tabs defaultValue="amenities">
          <TabsList>
            <TabsTrigger value="amenities">{t('propertyDetail.amenities')}</TabsTrigger>
            <TabsTrigger value="location">{t('propertyDetail.locationFeatures')}</TabsTrigger>
          </TabsList>
          <TabsContent value="amenities" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                {property.amenities && property.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>{formatAmenityName(amenity)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>{t('propertyDetail.noAmenities')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="location" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                {property.locationAmenities && property.locationAmenities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.locationAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>{formatAmenityName(amenity)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>{t('propertyDetail.noLocationFeatures')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PropertyDetails;