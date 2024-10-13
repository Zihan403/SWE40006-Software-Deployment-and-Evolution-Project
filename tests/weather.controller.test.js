const axios = require("axios");
const weatherService = require("../services/weather.service");

jest.mock("axios");

describe("Weather Service", () => {
  it("should fetch weather data for a given city", async () => {
    const city = "London";
    const mockApiResponse = {
      location: {
        name: "London",
        country: "United Kingdom",
      },
      current: {
        temp_c: 15,
        is_day: 1,
        condition: { text: "Cloudy" },
        wind_kph: 10,
        humidity: 80,
        uv: 4,
      },
    };

    axios.get.mockResolvedValue({ data: mockApiResponse });

    const weatherData = await weatherService.fetchWeatherDataForCity(city);

    expect(weatherData.location).toBe("London");
    expect(weatherData.country).toBe("United Kingdom");
    expect(weatherData.temperature).toBe(15);
    expect(weatherData.is_day).toBe("Day");
    expect(weatherData.condition).toBe("Cloudy");
  });
  it("should handle API errors gracefully", async () => {
    const city = "InvalidCity";

    axios.get.mockRejectedValue(new Error("Error fetching weather data"));

    await expect(weatherService.fetchWeatherDataForCity(city)).rejects.toThrow(
      "Error fetching weather data"
    );
  });

  it("should handle invalid API response structure", async () => {
    const city = "London";

    const mockApiResponse = {
      invalidField: "Invalid Data",
    };

    axios.get.mockResolvedValue({ data: mockApiResponse });

    await expect(weatherService.fetchWeatherDataForCity(city)).rejects.toThrow(
      "Error fetching weather data"
    );
  });

  it("should handle missing fields in the API response", async () => {
    const city = "London";
    const mockApiResponse = {
      location: {
        name: "London",
        country: "United Kingdom",
      },
    };

    axios.get.mockResolvedValue({ data: mockApiResponse });

    await expect(weatherService.fetchWeatherDataForCity(city)).rejects.toThrow(
      "Error fetching weather data"
    );
  });

  it("should handle undefined latitude and longitude", async () => {
    axios.get.mockResolvedValue({});

    await expect(
      weatherService.fetchWeatherDataForCity(undefined, undefined)
    ).rejects.toThrow("Error fetching weather data");
  });

  it("should handle null or empty city name", async () => {
    axios.get.mockResolvedValue({});

    await expect(weatherService.fetchWeatherDataForCity(null)).rejects.toThrow(
      "Error fetching weather data"
    );

    await expect(weatherService.fetchWeatherDataForCity("")).rejects.toThrow(
      "Error fetching weather data"
    );
  });
});
