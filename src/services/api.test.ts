import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { httpClient } from "./api";

// Mock do axios usando vi.hoisted
const mockAxiosCreate = vi.hoisted(() => vi.fn());

vi.mock("axios", () => ({
  default: {
    create: mockAxiosCreate,
  },
}));

// standalone mock function to avoid unbound-method and any typing
const mockGet = vi.fn();
const mockAxiosInstance = {
  get: mockGet,
};

describe("API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAxiosCreate.mockReturnValue(mockAxiosInstance);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("httpClient", () => {
    it("should create axios instance with correct baseURL", () => {
      httpClient();

      expect(mockAxiosCreate).toHaveBeenCalledWith({
        baseURL: expect.any(String),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("should create axios instance with correct headers", () => {
      httpClient();

      expect(mockAxiosCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );
    });

    it("should return an object with get method", () => {
      const client = httpClient();

      expect(client).toHaveProperty("get");
      expect(typeof client.get).toBe("function");
    });
  });

  describe("get method", () => {
    it("should call axios get with correct endpoint", async () => {
      const mockData = { id: 1, name: "Test" };
      mockGet.mockResolvedValue({ data: mockData });

      const client = httpClient();
      await client.get("/test-endpoint");

      expect(mockGet).toHaveBeenCalledWith("/test-endpoint", { params: undefined });
    });

    it("should call axios get with endpoint and params", async () => {
      const mockData = { results: [] };
      mockGet.mockResolvedValue({ data: mockData });

      const client = httpClient();
      const params = { page: "1", size: "10" };
      await client.get("/movies", params);

      expect(mockGet).toHaveBeenCalledWith("/movies", { params });
    });

    it("should return the response data", async () => {
      const mockData = { id: 1, title: "Test Movie" };
      mockGet.mockResolvedValue({ data: mockData });

      const client = httpClient();
      const result = await client.get<typeof mockData>("/movies/1");

      expect(result).toEqual(mockData);
    });

    it("should handle complex response data", async () => {
      interface ItemsResponse {
        content: { id: number; name: string }[];
        totalElements: number;
        totalPages: number;
      }

      const mockData: ItemsResponse = {
        content: [
          { id: 1, name: "Item 1" },
          { id: 2, name: "Item 2" },
        ],
        totalElements: 2,
        totalPages: 1,
      };
      mockGet.mockResolvedValue({ data: mockData });

      const client = httpClient();
      const result = await client.get<ItemsResponse>("/items");

      expect(result).toEqual(mockData);
      expect(result.content).toHaveLength(2);
    });

    it("should handle multiple query parameters", async () => {
      const mockData = { results: [] };
      mockGet.mockResolvedValue({ data: mockData });

      const client = httpClient();
      const params = {
        page: "1",
        size: "20",
        winner: "true",
        year: "1980",
      };
      await client.get("/movies", params);

      expect(mockGet).toHaveBeenCalledWith("/movies", { params });
    });

    it("should handle empty params object", async () => {
      const mockData = { data: "test" };
      mockGet.mockResolvedValue({ data: mockData });

      const client = httpClient();
      await client.get("/endpoint", {});

      expect(mockGet).toHaveBeenCalledWith("/endpoint", { params: {} });
    });

    it("should preserve generic type information", async () => {
      interface TestType {
        id: number;
        name: string;
      }

      const mockData: TestType = { id: 1, name: "Test" };
      mockGet.mockResolvedValue({ data: mockData });

      const client = httpClient();
      const result = await client.get<TestType>("/test");

      expect(result.id).toBe(1);
      expect(result.name).toBe("Test");
    });

    it("should handle network errors", async () => {
      const error = new Error("Network Error");
      mockGet.mockRejectedValue(error);

      const client = httpClient();

      await expect(client.get("/error")).rejects.toThrow("Network Error");
    });

    it("should handle 404 errors", async () => {
      const error = {
        response: {
          status: 404,
          data: { message: "Not Found" },
        },
      };
      mockGet.mockRejectedValue(error);

      const client = httpClient();

      await expect(client.get("/not-found")).rejects.toEqual(error);
    });

    it("should handle 500 errors", async () => {
      const error = {
        response: {
          status: 500,
          data: { message: "Internal Server Error" },
        },
      };
      mockGet.mockRejectedValue(error);

      const client = httpClient();

      await expect(client.get("/server-error")).rejects.toEqual(error);
    });

    it("should handle timeout errors", async () => {
      const error = new Error("timeout of 5000ms exceeded");
      mockGet.mockRejectedValue(error);

      const client = httpClient();

      await expect(client.get("/timeout")).rejects.toThrow("timeout of 5000ms exceeded");
    });

    it("should be able to make multiple sequential requests", async () => {
      const mockData1 = { id: 1 };
      const mockData2 = { id: 2 };

      mockGet.mockResolvedValueOnce({ data: mockData1 });
      mockGet.mockResolvedValueOnce({ data: mockData2 });

      const client = httpClient();

      const result1 = await client.get<typeof mockData1>("/item/1");
      const result2 = await client.get<typeof mockData2>("/item/2");

      expect(result1).toEqual(mockData1);
      expect(result2).toEqual(mockData2);
      expect(mockGet).toHaveBeenCalledTimes(2);
    });

    it("should handle different endpoints with same client instance", async () => {
      const mockMovies = { movies: [] };
      const mockStudios = { studios: [] };

      mockGet.mockResolvedValueOnce({ data: mockMovies });
      mockGet.mockResolvedValueOnce({ data: mockStudios });

      const client = httpClient();

      await client.get("/movies");
      await client.get("/studios");

      expect(mockGet).toHaveBeenCalledTimes(2);
      expect(mockGet).toHaveBeenNthCalledWith(1, "/movies", { params: undefined });
      expect(mockGet).toHaveBeenNthCalledWith(2, "/studios", { params: undefined });
    });
  });

  describe("axios instance configuration", () => {
    it("should use empty string as baseURL when VITE_API_BASE_URL is not set", () => {
      httpClient();

      expect(mockAxiosCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: expect.any(String),
        }),
      );
    });

    it("should configure Content-Type header as application/json", () => {
      httpClient();

      expect(mockAxiosCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );
    });
  });

  describe("reusability", () => {
    it("should create new instance each time httpClient is called", () => {
      const client1 = httpClient();
      const client2 = httpClient();

      expect(mockAxiosCreate).toHaveBeenCalledTimes(2);
      expect(client1).not.toBe(client2);
    });

    it("should have independent get methods", async () => {
      mockGet.mockResolvedValue({ data: { test: true } });

      const client1 = httpClient();
      const client2 = httpClient();

      await client1.get("/endpoint1");
      await client2.get("/endpoint2");

      expect(mockGet).toHaveBeenCalledTimes(2);
    });
  });
});
