export interface Listing {
  id: number;
  title: string;
  slug: string;
  description: string;
  address: string;
  sqft: number;
  wifi_speed: number;
  max_person: number;
  bathroom_type: string;
  attachments?: string[];
  price_per_day: number;
  washing_machine_available: boolean;
  kitchen_available: boolean;
  parking_area: boolean;
  clothesline_available: boolean;
}
