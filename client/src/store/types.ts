export type User = {
  id?: number;
  name: string;
  email: string;
  imageUrl?: string;
};

export type Group = {
  id?: number;
  name: string;
  imageUrl?: string;
  inviteCode?: string;
  owner: User;
  createdAt?: string;
  updatedAt?: string;
  members?: GroupMember[];
};

export const MemberRole = {
  ADMIN: "admin",
  MEMBER: "member",
  MODERATOR: "moderator",
} as const;

export type MemberRoleType = (typeof MemberRole)[keyof typeof MemberRole];

export type GroupMember = {
  id: number;
  user: User;
  group: Group;
  groupId: number;
  userId: number;
  role: MemberRoleType;
};

export type Message = {
  id: number;
  message: string;
  userId: number;
  user: User;
  group: Group;
  groupId: number;
  createdAt: string;
};
