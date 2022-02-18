const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
const POPULAR_PATH =
  "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

const COMMON_PATH = (query: string) => `search?part=snippet&q=${query}`;

export { BASE_URL, POPULAR_PATH, COMMON_PATH };
