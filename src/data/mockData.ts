import { 
  User, UserType, Property, PropertyType, PropertyStatus, PropertyAmenities, 
  LocationAmenities, Tenant, Listing, ListingType, ListingStatus, 
  Message, MessageType, MessageStatus, Task, TaskStatus, TaskCategory, TaskPriority 
} from '../types';

// Mock Users
export const users: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@rentalproc.com',
    firstName: 'Admin',
    lastName: 'User',
    userType: UserType.ADMIN,
    avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
    isActive: true
  },
  {
    id: 2,
    username: 'sarah',
    email: 'sarah@rentalproc.com',
    firstName: 'Sarah',
    lastName: 'Smith',
    userType: UserType.AGENT,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    isActive: true
  },
  {
    id: 3,
    username: 'alex',
    email: 'alex@gmail.com',
    firstName: 'Alex',
    lastName: 'Tenant',
    userType: UserType.TENANT,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
    isActive: true
  },
  {
    id: 4,
    username: 'michael',
    email: 'michael@rentalproc.com',
    firstName: 'Michael',
    lastName: 'Johnson',
    userType: UserType.OWNER,
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop',
    isActive: true
  },
  {
    id: 5,
    username: 'jessica',
    email: 'jessica@gmail.com',
    firstName: 'Jessica',
    lastName: 'Williams',
    userType: UserType.BUYER,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    isActive: true
  }
];

// Mock Properties
export const properties: Property[] = [
  {
    id: 1,
    name: 'Luxury Downtown Apartment',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    type: PropertyType.RESIDENTIAL,
    status: PropertyStatus.LISTED_FOR_RENT,
    size: 1200,
    yearBuilt: 2015,
    price: 3500,
    bedrooms: 2,
    bathrooms: 2,
    description: 'Modern luxury apartment in the heart of downtown with amazing city views.',
    amenities: [
      PropertyAmenities.WIFI,
      PropertyAmenities.PARKING,
      PropertyAmenities.AIR_CONDITIONING,
      PropertyAmenities.HEATING,
      PropertyAmenities.BALCONY
    ],
    locationAmenities: [
      LocationAmenities.CITY_CENTER,
      LocationAmenities.PARK,
      LocationAmenities.MARKET
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    ownerId: 4
  },
  {
    id: 2,
    name: 'Suburban Family Home',
    address: '456 Oak Avenue',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60007',
    country: 'USA',
    type: PropertyType.RESIDENTIAL,
    status: PropertyStatus.LISTED_FOR_SALE,
    size: 2400,
    yearBuilt: 2005,
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    description: 'Spacious family home in a quiet suburban neighborhood with a large backyard.',
    amenities: [
      PropertyAmenities.PARKING,
      PropertyAmenities.AIR_CONDITIONING,
      PropertyAmenities.HEATING,
      PropertyAmenities.WASHER,
      PropertyAmenities.DRYER
    ],
    locationAmenities: [
      LocationAmenities.SCHOOL,
      LocationAmenities.PARK,
      LocationAmenities.MARKET
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
    ],
    ownerId: 4
  },
  {
    id: 3,
    name: 'Downtown Office Space',
    address: '789 Business Plaza',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
    type: PropertyType.COMMERCIAL,
    status: PropertyStatus.LISTED_FOR_RENT,
    size: 3000,
    yearBuilt: 2018,
    price: 8500,
    description: 'Modern office space in prime downtown location with high-speed internet and meeting rooms.',
    amenities: [
      PropertyAmenities.WIFI,
      PropertyAmenities.AIR_CONDITIONING,
      PropertyAmenities.HEATING,
      PropertyAmenities.ELEVATOR,
      PropertyAmenities.WORKSPACE
    ],
    locationAmenities: [
      LocationAmenities.CITY_CENTER,
      LocationAmenities.MARKET,
      LocationAmenities.PHARMACY
    ],
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop'
    ],
    ownerId: 4
  },
  {
    id: 4,
    name: 'Beachfront Condo',
    address: '101 Ocean Drive',
    city: 'Miami',
    state: 'FL',
    zipCode: '33139',
    country: 'USA',
    type: PropertyType.RESIDENTIAL,
    status: PropertyStatus.LISTED_FOR_SALE,
    size: 1800,
    yearBuilt: 2010,
    price: 750000,
    bedrooms: 3,
    bathrooms: 2,
    description: 'Beautiful beachfront condo with stunning ocean views and resort-style amenities.',
    amenities: [
      PropertyAmenities.WIFI,
      PropertyAmenities.PARKING,
      PropertyAmenities.AIR_CONDITIONING,
      PropertyAmenities.BALCONY,
      PropertyAmenities.TV
    ],
    locationAmenities: [
      LocationAmenities.CITY_CENTER,
      LocationAmenities.MARKET,
      LocationAmenities.HOSPITAL
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop'
    ],
    ownerId: 4
  },
  {
    id: 5,
    name: 'Industrial Warehouse',
    address: '555 Industrial Parkway',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75247',
    country: 'USA',
    type: PropertyType.INDUSTRIAL,
    status: PropertyStatus.LISTED_FOR_RENT,
    size: 10000,
    yearBuilt: 2008,
    price: 12000,
    description: 'Large industrial warehouse with loading docks and high ceilings, suitable for manufacturing or storage.',
    locationAmenities: [
      LocationAmenities.MARKET,
      LocationAmenities.FIRE_STATION
    ],
    images: [
      'https://images.unsplash.com/photo-1565626424178-c699f6601afd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553678324-f84674bd7b24?w=800&h=600&fit=crop'
    ],
    ownerId: 4
  }
];

// Mock Tenants
export const tenants: Tenant[] = [
  {
    id: 1,
    userId: 3,
    facilityId: 1,
    leaseStart: new Date('2023-01-01'),
    leaseEnd: new Date('2023-12-31'),
    rentAmount: 3500
  }
];

// Mock Listings
export const listings: Listing[] = [
  {
    id: 1,
    propertyId: 1,
    userId: 2,
    title: 'Luxury Downtown Apartment for Rent',
    description: 'Modern luxury apartment in the heart of downtown with amazing city views.',
    price: 3500,
    type: ListingType.RENT,
    status: ListingStatus.ACTIVE,
    images: properties[0].images,
    availableFrom: new Date('2023-06-01')
  },
  {
    id: 2,
    propertyId: 2,
    userId: 2,
    title: 'Spacious Family Home for Sale',
    description: 'Spacious family home in a quiet suburban neighborhood with a large backyard.',
    price: 450000,
    type: ListingType.SALE,
    status: ListingStatus.ACTIVE,
    images: properties[1].images
  },
  {
    id: 3,
    propertyId: 3,
    userId: 2,
    title: 'Modern Office Space for Rent',
    description: 'Modern office space in prime downtown location with high-speed internet and meeting rooms.',
    price: 8500,
    type: ListingType.RENT,
    status: ListingStatus.ACTIVE,
    images: properties[2].images,
    availableFrom: new Date('2023-07-01')
  },
  {
    id: 4,
    propertyId: 4,
    userId: 2,
    title: 'Beachfront Condo for Sale',
    description: 'Beautiful beachfront condo with stunning ocean views and resort-style amenities.',
    price: 750000,
    type: ListingType.SALE,
    status: ListingStatus.ACTIVE,
    images: properties[3].images
  },
  {
    id: 5,
    propertyId: 5,
    userId: 2,
    title: 'Industrial Warehouse for Rent',
    description: 'Large industrial warehouse with loading docks and high ceilings, suitable for manufacturing or storage.',
    price: 12000,
    type: ListingType.RENT,
    status: ListingStatus.ACTIVE,
    images: properties[4].images,
    availableFrom: new Date('2023-08-01')
  }
];

// Mock Messages
export const messages: Message[] = [
  {
    id: 1,
    senderId: 3,
    chatRoomId: 1,
    content: 'Hello, I need to report a maintenance issue with my apartment.',
    messageType: MessageType.CHAT,
    status: MessageStatus.READ,
    createdAt: new Date('2023-05-05T05:33:00')
  },
  {
    id: 2,
    senderId: 1,
    chatRoomId: 1,
    content: 'Hi there! What seems to be the problem?',
    messageType: MessageType.CHAT,
    status: MessageStatus.READ,
    createdAt: new Date('2023-05-05T06:33:00')
  },
  {
    id: 3,
    senderId: 3,
    chatRoomId: 1,
    content: 'The sink in the kitchen is leaking.',
    messageType: MessageType.CHAT,
    status: MessageStatus.READ,
    createdAt: new Date('2023-05-05T07:33:00')
  },
  {
    id: 4,
    senderId: 1,
    chatRoomId: 1,
    content: "I'll dispatch a plumber to check it out. What times are you available this week?",
    messageType: MessageType.CHAT,
    status: MessageStatus.READ,
    createdAt: new Date('2023-05-05T08:33:00')
  },
  {
    id: 5,
    senderId: 3,
    chatRoomId: 1,
    content: "I'm available any day after 5pm or anytime on the weekend.",
    messageType: MessageType.CHAT,
    status: MessageStatus.READ,
    createdAt: new Date('2023-05-05T09:33:00')
  }
];

// Mock Tasks
export const tasks: Task[] = [
  {
    id: 1,
    userId: 1,
    assignedToId: 2,
    propertyId: 1,
    title: 'Fix kitchen sink',
    description: 'Tenant reported leaking sink in unit 101',
    dueDate: new Date('2023-05-10'),
    status: TaskStatus.OPEN,
    category: TaskCategory.MAINTENANCE,
    priority: TaskPriority.MEDIUM
  },
  {
    id: 2,
    userId: 1,
    assignedToId: 2,
    propertyId: 2,
    title: 'Schedule property showing',
    description: 'Potential buyer interested in viewing the property',
    dueDate: new Date('2023-05-15'),
    status: TaskStatus.OPEN,
    category: TaskCategory.ADMINISTRATIVE,
    priority: TaskPriority.LOW
  },
  {
    id: 3,
    userId: 1,
    propertyId: 3,
    title: 'Renew business license',
    description: 'Business license for commercial property expires next month',
    dueDate: new Date('2023-06-01'),
    status: TaskStatus.OPEN,
    category: TaskCategory.ADMINISTRATIVE,
    priority: TaskPriority.HIGH
  },
  {
    id: 4,
    userId: 1,
    assignedToId: 2,
    propertyId: 1,
    title: 'Quarterly inspection',
    description: 'Routine quarterly inspection of all units',
    dueDate: new Date('2023-06-15'),
    status: TaskStatus.OPEN,
    category: TaskCategory.INSPECTION,
    priority: TaskPriority.MEDIUM
  },
  {
    id: 5,
    userId: 1,
    propertyId: 4,
    title: 'Update listing photos',
    description: 'Take new photos of the property for the listing',
    dueDate: new Date('2023-05-20'),
    status: TaskStatus.OPEN,
    category: TaskCategory.ADMINISTRATIVE,
    priority: TaskPriority.LOW
  }
];