import { DashboardMetrics, Fees, PaymentScheduleStage, PropertyBundle, Rates, SecurityDeposit, Taxes } from '@pms/shared/src/models';

export const propertyBundles: PropertyBundle[] = [
  {
    property: {
      id: '1',
      name: 'Seaside Escape',
      nickname: 'Beach House',
      displayName: 'Seaside Escape',
      email: 'host@seaside.com',
      phone: '+1 555-1000',
      address: '123 Ocean View',
      city: 'Miami',
      region: 'FL',
      country: 'USA',
      postalCode: '33010',
      registrationNumber: 'REG-001',
      currency: 'USD',
      colorTag: '#3b82f6',
      description: 'Bright beachfront condo with panoramic views',
      beds: 3,
      baths: 2,
      guests: 6,
      distributed: true,
      ready: true,
      tags: ['beach', 'family']
    },
    instructions: {
      checkInTime: '15:00',
      checkOutTime: '11:00',
      wifiName: 'SeasideWifi',
      wifiPassword: 'sunnydays',
      doorCode: '1234',
      checkInInstructions: 'Use keypad to enter. Lock automatically.',
      checkOutInstructions: 'Kindly load dishwasher and take out trash.',
      directions: 'Third building on the left after the roundabout.',
      houseRules: 'No smoking, no pets.',
      paymentInstructions: '50% due at booking, balance at check-in.',
      specialInstructions: 'Beach towels in the hallway closet.'
    },
    rates: {
      nightlyPrice: 240,
      weeklyPrice: 1500,
      monthlyPrice: 5200,
      minimumStay: 2,
      maximumStay: 30,
      extraGuestFee: 20,
      maxGuestCount: 8
    }
  },
  {
    property: {
      id: '2',
      name: 'Mountain Retreat',
      nickname: 'Cabin',
      displayName: 'Mountain Retreat',
      email: 'host@retreat.com',
      phone: '+1 555-2222',
      address: '77 Pine Cone Road',
      city: 'Aspen',
      region: 'CO',
      country: 'USA',
      postalCode: '81611',
      registrationNumber: 'REG-002',
      currency: 'USD',
      colorTag: '#10b981',
      description: 'Cozy cabin with fireplace and hot tub.',
      beds: 4,
      baths: 3,
      guests: 8,
      distributed: false,
      ready: false,
      tags: ['ski', 'mountain']
    },
    instructions: {
      checkInTime: '16:00',
      checkOutTime: '10:00',
      wifiName: 'CabinNet',
      wifiPassword: 'pineforest',
      doorCode: '9876',
      checkInInstructions: 'Lockbox beside the door. Code provided at booking.',
      checkOutInstructions: 'Leave keys on the table and text host.',
      directions: 'Follow Pine Cone Road until the end of the cul-de-sac.',
      houseRules: 'Quiet hours after 10pm.',
      paymentInstructions: 'Full payment due at booking.',
      specialInstructions: 'Snow chains required in winter.'
    },
    rates: {
      nightlyPrice: 320,
      weeklyPrice: 2000,
      monthlyPrice: 7000,
      minimumStay: 3,
      maximumStay: 21,
      extraGuestFee: 30,
      maxGuestCount: 10
    }
  }
];

export const dashboardMetrics: DashboardMetrics = {
  totalRevenue: 125000,
  monthlyOccupancy: [
    { month: 'Jan', rate: 72 },
    { month: 'Feb', rate: 68 },
    { month: 'Mar', rate: 75 },
    { month: 'Apr', rate: 70 },
    { month: 'May', rate: 78 },
    { month: 'Jun', rate: 81 },
    { month: 'Jul', rate: 84 },
    { month: 'Aug', rate: 79 },
    { month: 'Sep', rate: 73 },
    { month: 'Oct', rate: 70 },
    { month: 'Nov', rate: 65 },
    { month: 'Dec', rate: 74 }
  ],
  monthlyRevenue: [
    { month: 'Jan', airbnb: 18000, booking: 12000, direct: 8000 },
    { month: 'Feb', airbnb: 15000, booking: 10000, direct: 7000 },
    { month: 'Mar', airbnb: 20000, booking: 12000, direct: 9000 },
    { month: 'Apr', airbnb: 17000, booking: 11000, direct: 8500 },
    { month: 'May', airbnb: 22000, booking: 14000, direct: 9000 },
    { month: 'Jun', airbnb: 23000, booking: 15000, direct: 10000 },
    { month: 'Jul', airbnb: 25000, booking: 16000, direct: 11000 },
    { month: 'Aug', airbnb: 24000, booking: 15500, direct: 10500 },
    { month: 'Sep', airbnb: 19000, booking: 12500, direct: 9500 },
    { month: 'Oct', airbnb: 17000, booking: 11500, direct: 8500 },
    { month: 'Nov', airbnb: 14000, booking: 10000, direct: 7000 },
    { month: 'Dec', airbnb: 21000, booking: 14500, direct: 9000 }
  ],
  monthlyBookings: [
    { month: 'Jan', bookings: 60 },
    { month: 'Feb', bookings: 55 },
    { month: 'Mar', bookings: 65 },
    { month: 'Apr', bookings: 58 },
    { month: 'May', bookings: 70 },
    { month: 'Jun', bookings: 76 },
    { month: 'Jul', bookings: 80 },
    { month: 'Aug', bookings: 77 },
    { month: 'Sep', bookings: 62 },
    { month: 'Oct', bookings: 59 },
    { month: 'Nov', bookings: 52 },
    { month: 'Dec', bookings: 68 }
  ],
  upcomingArrivals: [
    { date: '2024-06-20', time: '14:00', property: 'Seaside Escape', guest: 'Jane Doe', nights: 5 },
    { date: '2024-06-22', time: '16:00', property: 'Mountain Retreat', guest: 'John Smith', nights: 3 }
  ],
  upcomingDepartures: [
    { date: '2024-06-18', time: '11:00', property: 'Seaside Escape', guest: 'Alan Turing', nights: 4 },
    { date: '2024-06-19', time: '10:00', property: 'Mountain Retreat', guest: 'Ada Lovelace', nights: 2 }
  ],
  notifications: [
    'New booking pending approval',
    'Security deposit released for Jane Doe',
    'Payment failed for reservation #12345'
  ]
};

export const defaultFees: Fees = {
  cleaning: 120,
  community: 45,
  management: 85
};

export const defaultTaxes: Taxes[] = [
  { name: 'City Tax', amount: 10, modality: 'per_day', isPercent: false },
  { name: 'Tourism', amount: 5, modality: 'per_stay', isPercent: true }
];

export const securityDeposit: SecurityDeposit = {
  amount: 400,
  type: 'credit_card',
  modality: 'per_stay'
};

export const paymentSchedule: PaymentScheduleStage[] = [
  { stage: 1, daysBeforeCheckIn: 30, paymentMoment: 'Booking', percent: 50 },
  { stage: 2, daysBeforeCheckIn: 0, paymentMoment: 'Arrival', percent: 50 }
];

export const baseRates: Rates = {
  nightlyPrice: 220,
  weeklyPrice: 1400,
  monthlyPrice: 4800,
  minimumStay: 2,
  maximumStay: 30,
  extraGuestFee: 25,
  maxGuestCount: 8
};
