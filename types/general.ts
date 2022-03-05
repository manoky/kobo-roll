interface UserType {
  issuer: string;
  publicAddress: string;
}

interface IconProps extends React.SVGProps<SVGAElement> {
  fill?: string;
  selected?: boolean;
}

interface VideoQueryType {
  userId: string;
  videoId: number;
}

interface UpdateParamsType extends VideoQueryType {
  favourited?: number;
  watched?: boolean;
}

export type { UserType, IconProps, VideoQueryType, UpdateParamsType };
