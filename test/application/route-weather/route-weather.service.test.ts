import { Test, TestingModule } from '@nestjs/testing';
import { Geocoding } from '../../../src/application/geocoding/contracts/geocoding';
import { Routing } from '../../../src/application/routing/contracts';
import { Weather } from '../../../src/application/weather/contracts';
import {
  RouteSamplerService,
  RouteWeatherService,
} from '../../../src/application/route-weather/providers';

describe('RouteWeatherService - computeRouteWeatherFromAddress', () => {
  let service: RouteWeatherService;

  const mockFromToCoordinates = { lat: 1, lon: 2 };
  const mockWaypoints = [
    { location: { lat: 10, lon: 20 }, timestamp: 0 },
    { location: { lat: 11, lon: 21 }, timestamp: 3600 },
  ];
  const mockRoute = {
    waypoints: mockWaypoints,
    duration: 3600,
    distance: 10000,
  };
  const mockSampled = mockWaypoints;
  const mockWeatherResult = [
    { location: mockWaypoints[0].location, temp: 12 },
    { location: mockWaypoints[1].location, temp: 14 },
  ];

  const mockGeocoding = {
    getCoordinates: jest.fn().mockResolvedValue(mockFromToCoordinates),
  };
  const mockRouting = {
    getRoute: jest.fn().mockResolvedValue(mockRoute),
  };
  const mockSampler = {
    sampleRoute: jest.fn().mockResolvedValue(mockSampled),
  };
  const mockWeather = {
    getWeatherAt: jest.fn().mockResolvedValue(mockWeatherResult),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouteWeatherService,
        { provide: Geocoding, useValue: mockGeocoding },
        { provide: Routing, useValue: mockRouting },
        { provide: Weather, useValue: mockWeather },
        { provide: RouteSamplerService, useValue: mockSampler },
      ],
    }).compile();

    service = module.get<RouteWeatherService>(RouteWeatherService);
    jest.clearAllMocks();
  });

  it('should return distance, duration and weather and call mocked services', async () => {
    const departure = new Date('2025-01-01T00:00:00Z');

    const result = await service.computeRouteWeatherFromAddress({
      from: 'A',
      to: 'B',
      departure,
    });

    expect(result.distance).toBe(mockRoute.distance);
    expect(result.duration).toBe(mockRoute.duration);
    expect(result.weather).toBe(mockWeatherResult);

    expect(mockGeocoding.getCoordinates).toHaveBeenCalledTimes(2);
    expect(mockRouting.getRoute).toHaveBeenCalledWith(
      mockFromToCoordinates,
      mockFromToCoordinates,
    );
    expect(mockSampler.sampleRoute).toHaveBeenCalledWith(mockWaypoints, 20);

    expect(mockWeather.getWeatherAt).toHaveBeenCalledTimes(1);
    const calledArg = mockWeather.getWeatherAt.mock.calls[0][0];
    expect(Array.isArray(calledArg)).toBe(true);
    expect(calledArg).toHaveLength(mockSampled.length);
    expect(calledArg[0]).toMatchObject({
      id: expect.any(Number),
      location: mockSampled[0].location,
      passageDatetime: expect.any(Date),
    });
  });
});
