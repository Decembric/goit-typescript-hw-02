import axios from "axios";

type Image = {
  id: string;
  alt_description: string;
  urls: {
    thumb: string;
    regular: string;
  };
};

interface UnsplashResponse {
  results: Image[];
  total_pages: number;
}

const ACCESS_KEY = "5nAhYfgdLBZBbd44An99fi5_47kds_YhXWW6_yj3JZo"
axios.defaults.baseURL = "https://api.unsplash.com"



export const getImages = async (query: string, currentPage: number): Promise<UnsplashResponse> => {
  const response = await axios.get("/search/photos", { params: { client_id: ACCESS_KEY, query: query, page: currentPage, per_page: 20 } })
  return { results: response.data.results, total_pages: response.data.total_pages }
}