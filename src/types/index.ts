// Core types based on Prisma schema
export type User = {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType: UserType;
  avatarUrl?: string;
  isActive: boolean;
}

export enum UserType {
  ADMIN = "ADMIN",
  AGENCY = "AGENCY",
  AGENT = "AGENT",
  OWNER = "OWNER",
  TENANT = "TENANT",
  BUYER = "BUYER",
  SELLER = "SELLER",
  USER = "USER"
}

export type Property = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: PropertyType;
  status: PropertyStatus;
  size?: number;
  yearBuilt?: number;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  amenities?: PropertyAmenities[];
  locationAmenities?: LocationAmenities[];
  images?: string[];
  ownerId: number;
}

export enum PropertyType {
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL",
  INDUSTRIAL = "INDUSTRIAL",
  LAND = "LAND"
}

export enum PropertyStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  MAINTENANCE = "MAINTENANCE",
  LISTED_FOR_SALE = "LISTED_FOR_SALE",
  LISTED_FOR_RENT = "LISTED_FOR_RENT",
  UNDER_CONTRACT = "UNDER_CONTRACT",
  SOLD = "SOLD",
  RENTED = "RENTED"
}

export enum PropertyAmenities {
  WIFI = "wifi",
  PARKING = "parking",
  AIR_CONDITIONING = "airConditioning",
  HEATING = "heating",
  KITCHEN = "kitchen",
  BREAKFAST_INCLUDED = "breakfastIncluded",
  PET_FRIENDLY = "petFriendly",
  TV = "tv",
  WASHER = "washer",
  DRYER = "dryer",
  BALCONY = "balcony",
  FIREPLACE = "fireplace",
  IRON = "iron",
  HAIR_DRYER = "hairDryer",
  COFFEE_MAKER = "coffeeMaker",
  WORKSPACE = "workspace",
  ELEVATOR = "elevator"
}

export enum LocationAmenities {
  CITY_CENTER = "CityCenter",
  SCHOOL = "School",
  POLICE_STATION = "PoliceStation",
  FIRE_STATION = "FireStation",
  PARK = "Park",
  MOSQUE = "Mosque",
  CHURCH = "Church",
  SINAGOG = "Sinagog",
  HOSPITAL = "Hospital",
  PHARMACY = "Pharmacy",
  MARKET = "Market",
  DRY_CENTER = "DryCenter"
}

export type Tenant = {
  id: number;
  userId: number;
  facilityId: number;
  leaseStart: Date;
  leaseEnd: Date;
  rentAmount: number;
}

export type Listing = {
  id: number;
  propertyId: number;
  userId: number;
  title: string;
  description?: string;
  price: number;
  type: ListingType;
  status: ListingStatus;
  images?: string[];
  availableFrom?: Date;
}

export enum ListingType {
  RENT = "RENT",
  SALE = "SALE",
  BOOKING = "BOOKING"
}

export enum ListingStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  CLOSED = "CLOSED",
  EXPIRED = "EXPIRED"
}

export type Message = {
  id: number;
  senderId: number;
  chatRoomId?: number;
  content: string;
  messageType: MessageType;
  status: MessageStatus;
  createdAt: Date;
}

export enum MessageType {
  CHAT = "CHAT",
  SYSTEM = "SYSTEM",
  NOTIFICATION = "NOTIFICATION"
}

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ"
}

export type Task = {
  id: number;
  userId: number;
  assignedToId?: number;
  propertyId?: number;
  facilityId?: number;
  title: string;
  description?: string;
  dueDate?: Date;
  status: TaskStatus;
  category?: TaskCategory;
  priority?: TaskPriority;
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export enum TaskCategory {
  MAINTENANCE = "MAINTENANCE",
  REPAIR = "REPAIR",
  CLEANING = "CLEANING",
  INSPECTION = "INSPECTION",
  ADMINISTRATIVE = "ADMINISTRATIVE",
  FINANCIAL = "FINANCIAL",
  TENANT_REQUEST = "TENANT_REQUEST",
  OTHER = "OTHER"
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

// Currency and Locale types
export type Currency = {
  code: string;
  symbol: string;
  name: string;
}

export type Locale = {
  code: string;
  name: string;
  flag: string;
}