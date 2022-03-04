interface UserType {
  issuer: string;
  publicAddress: string;
}

interface IconProps extends React.SVGProps<SVGAElement> {
  fill?: string;
  selected?: boolean;
}

export type { UserType, IconProps };
