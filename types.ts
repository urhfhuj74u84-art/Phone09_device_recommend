
export enum AppState {
  WELCOME,
  QUIZ,
  LOADING,
  RESULTS,
}

export interface UserAnswers {
  priorities?: string[];
  previousBrand?: string;
  budget?: string;
  storage?: string;
  screenSize?: string;
}

export interface Recommendation {
  model: string;
  reason: string;
}

export interface Smartphone {
  brand: string;
  model: string;
  release_date: string;
  os: string;
  soc_chip: string;
  display_size_in: string;
  display_type: string;
  refresh_rate_hz: string;
  peak_brightness_nits: string;
  main_camera_mp: string;
  telephoto_optical_zoom: string;
  ultrawide_mp: string;
  front_camera_mp: string;
  battery_mAh: string;
  wired_charge_W: string;
  wireless_charge_W: string;
  ram_gb: string;
  storage_gb_options: string;
  ip_rating: string;
  weight_g: string;
  dimensions_mm: string;
  biometrics: string;
  sim: string;
  connectivity: string;
  stylus_support: string;
  storage_expandable: string;
  materials: string;
  warranty_months: string;
  sw_update_years: string;
  security_update_years: string;
  msrp_krw: string;
  street_price_krw: string;
  price_asof: string;
  notable_pros: string;
  notable_cons: string;
  availability_regions: string;
  [key: string]: string;
}
