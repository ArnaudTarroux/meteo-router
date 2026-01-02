export interface OpenRouteResponse {
  type: 'FeatureCollection';
  bbox: [number, number, number, number];
  features: Feature[];
  metadata: Metadata;
}

export interface Feature {
  bbox: [number, number, number, number];
  type: 'Feature';
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  segments: Segment[];
  way_points: [number, number];
  summary: Summary;
}

export interface Segment {
  distance: number;
  duration: number;
  steps: Step[];
}

export interface Step {
  distance: number;
  duration: number;
  type: number;
  instruction: string;
  name: string;
  way_points: [number, number];
  exit_number?: number;
}

export interface Summary {
  distance: number;
  duration: number;
}

export interface Geometry {
  coordinates: [number, number][];
  type: 'LineString';
}

export interface Metadata {
  attribution: string;
  service: string;
  timestamp: number;
  query: Query;
  engine: Engine;
}

export interface Query {
  coordinates: [[number, number], [number, number]];
  profile: string;
  profileName: string;
  format: string;
}

export interface Engine {
  version: string;
  build_date: string;
  graph_date: string;
  osm_date: string;
}
