declare module "*.jpg";
declare module "*.png";

export type UserType = {
  $id: string;
  avatar: string;
  username: string;
};
export type VideoType = {
  $id: string;
  title: string;
  thembnail: string;
  creator: UserType;
  prompt: string;
  videoUrl: string;
};
