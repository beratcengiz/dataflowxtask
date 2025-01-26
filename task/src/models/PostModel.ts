export interface Post {
    id: number;
    title: string;
    body: string;
  }
  
  export interface CreatePostInput {
    title: string;
    body: string;
  }
  
  export interface UpdatePostInput {
    id: number;
    title: string;
    body: string;
  }
  