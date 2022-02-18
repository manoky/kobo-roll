type ThumbnailsProps = {
  high: {
    url: string;
  };
};

type SnippetProps = {
  title: string;
  thumbnails: ThumbnailsProps;
};

type ItemProps = {
  id: {
    videoId: string;
  };
  snippet: SnippetProps;
};

interface ResponseVideoProps {
  items: ItemProps[];
}

interface VideoProps {
  title: string;
  id: string;
  imgUrl: string;
}

export type { ResponseVideoProps, VideoProps };
