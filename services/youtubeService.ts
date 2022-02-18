import { ResponseVideoProps, VideoProps } from "types/videoTypes";
import { BASE_URL, POPULAR_PATH, COMMON_PATH } from "constants/routes";

const API_KEY = process.env.YOUTUBE_API_KEY;

const getVideos = async (query: string) => {
  try {
    const PATH = query.includes("popular") ? POPULAR_PATH : COMMON_PATH(query);
    const res = await fetch(`${BASE_URL}/${PATH}&maxResults=25&key=${API_KEY}`);

    if (!res.ok) {
      console.log(await res.json());
      return [];
    }
    const data: ResponseVideoProps = await res.json();

    const parsedData: VideoProps[] = data?.items.map((item) => ({
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item?.id.videoId ?? item.id,
    }));

    return parsedData;
  } catch (err) {
    console.log(err);
  }
};

export { getVideos };
