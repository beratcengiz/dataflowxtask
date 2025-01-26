export interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
  }
  

  export interface CreateCommentInput {
    name?: string;
    email?: string;
    body?: string;
  }

  export interface UpdateCommentInput {
    id?: number;
    name?: string;
    email?: string;
    body?: string;
  }
  