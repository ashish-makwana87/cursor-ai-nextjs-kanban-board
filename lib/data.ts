export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://picsum.photos/200/300?random=1",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://picsum.photos/200/300?random=2",
  },
  {
    id: "3",
    name: "Alex Johnson",
    avatar: "https://picsum.photos/200/300?random=3",
  },
];
