export interface SmappenPeliasResponse {
  geocoding: Geocoding;
  type: 'FeatureCollection';
  features: GeoFeature[];
  bbox: [number, number, number, number];
}

export interface Geocoding {
  version: string;
  attribution: string;
  query: GeocodingQuery;
  warnings?: string[];
  engine: Engine;
  timestamp: number;
}

export interface GeocodingQuery {
  text: string;
  size: number;
  layers?: string[];
  private: boolean;
  lang: Language;
  querySize: number;
  parser: string;
  parsed_text: ParsedText;
}

export interface Language {
  name: string;
  iso6391: string;
  iso6393: string;
  via: string;
  defaulted: boolean;
}

export type ParsedText =
  | { subject: string }
  | { housenumber: string; street: string; postalcode: string; city: string };

export interface Engine {
  name: string;
  author: string;
  version: string;
}

export interface GeoFeature {
  type: 'Feature';
  geometry: Geometry;
  properties: Properties;
  bbox?: [number, number, number, number];
}

export interface Geometry {
  type: 'Point';
  coordinates: [number, number];
}

export interface Properties {
  id: string;
  gid: string;
  layer: string;
  source: string;
  source_id: string;
  country_code: string;
  name: string;
  confidence: number;
  match_type: string;
  accuracy: string;
  country: string;
  country_gid: string;
  country_a: string;
  macroregion: string;
  macroregion_gid: string;
  macroregion_a: string;
  region: string;
  region_gid: string;
  region_a: string;
  macrocounty: string;
  macrocounty_gid: string;
  county: string;
  county_gid: string;
  localadmin: string;
  localadmin_gid: string;
  locality: string;
  locality_gid: string;
  continent: string;
  continent_gid: string;
  label: string;
  postalcode?: string;
  housenumber?: string;
  street?: string;
  addendum?: Addendum;
}

export interface Addendum {
  osm?: { operator?: string; wikidata?: string; website?: string };
  geonames?: { feature_code?: string };
}
