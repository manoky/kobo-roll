import { JwtPayload } from "jsonwebtoken";

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
  imgUrl: string;
}

interface FavouriteProps {
  videoId: string;
  imgUrl: string;
}

interface JwtProps extends JwtPayload {
  issuer: string;
}

export type {
  UserType,
  IconProps,
  VideoQueryType,
  UpdateParamsType,
  FavouriteProps,
  JwtProps,
};
