// types.ts
export type GroupType = {
  _id: string;
  title: string;
  type: "todo" | "list"; 
};

export type ListType = {
  _id: string;
  name: string;
  groupId: string; 
};

export type TodoType = {
  _id: string;
  title: string;
  amount: number;
  unit: string;
  completed?: boolean;
  groupId: string; 
};

