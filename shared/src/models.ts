export interface Property {
  id: string;
  name: string;
  nickname: string;
  displayName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  registrationNumber: string;
  currency: string;
  colorTag: string;
  description: string;
  beds: number;
  baths: number;
  guests: number;
  distributed: boolean;
  ready: boolean;
  tags?: string[];
}

export interface RentalInstructions {
  checkInTime: string;
  checkOutTime: string;
  wifiName: string;
  wifiPassword: string;
  doorCode: string;
  checkInInstructions: string;
  checkOutInstructions: string;
  directions: string;
  houseRules: string;
  paymentInstructions: string;
  specialInstructions: string;
}

export interface Rates {
  nightlyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  minimumStay: number;
  maximumStay: number;
  extraGuestFee: number;
  maxGuestCount: number;
}

export interface Fees {
  cleaning: number;
  community: number;
  management: number;
}

export interface Taxes {
  name: string;
  amount: number;
  modality: 'per_day' | 'per_stay';
  isPercent: boolean;
}

export interface SecurityDeposit {
  amount: number;
  type: 'credit_card' | 'cash';
  modality: 'per_stay' | 'per_booking';
}

export interface DashboardMetrics {
  totalRevenue: number;
  monthlyOccupancy: { month: string; rate: number }[];
  monthlyRevenue: { month: string; airbnb: number; booking: number; direct: number }[];
  monthlyBookings: { month: string; bookings: number }[];
  upcomingArrivals: Array<{
    date: string;
    time: string;
    property: string;
    guest: string;
    nights: number;
  }>;
  upcomingDepartures: Array<{
    date: string;
    time: string;
    property: string;
    guest: string;
    nights: number;
  }>;
  notifications: string[];
}

export interface PaymentScheduleStage {
  stage: number;
  daysBeforeCheckIn: number;
  paymentMoment: string;
  percent: number;
}

export interface Room {
  name: string;
  roomType: string;
  roomSubType: string;
  size: string;
  bathroomType: string;
  description: string;
}

export interface PropertyBundle {
  property: Property;
  instructions: RentalInstructions;
  rates: Rates;
  rooms?: Room[];
}
