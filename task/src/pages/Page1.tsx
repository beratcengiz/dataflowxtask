// components/Page1.tsx
import React, { useState } from "react";
import { usePosts } from "../contexts/PostsContext";
import { useDelete } from "../service/useDeleteQuery";
import { useCreatePost } from "../service/useCreatePostQuery";
import { useUpdatePost } from "../service/useUpdatePost";
import { Post, CreatePostInput} from "../models/PostModel";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export const Page1: React.FC = () => {
  const { posts, error, loading } = usePosts(); // Buradaki usePosts, Post'ların API'den çekilmesi için gerekli olabilir.
  const { mutate: deletePost } = useDelete(
    "https://jsonplaceholder.typicode.com/posts",
    "posts"
  );
  const { mutate: createPost } = useCreatePost(
    "https://jsonplaceholder.typicode.com/posts",
    "posts"
  );
  const { mutate: updatePost } = useUpdatePost(
    "https://jsonplaceholder.typicode.com/posts",
    "posts"
  );

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [newPostTitle, setNewPostTitle] = useState<string>("");
  const [newPostBody, setNewPostBody] = useState<string>("");

  const [editPostTitle, setEditPostTitle] = useState<string>("");
  const [editPostBody, setEditPostBody] = useState<string>("");
  const [editPostId, setEditPostId] = useState<number | null>(null);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('event',event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeletePost = (id: number) => {
    deletePost(id);
  };

  const handleCreatePost = () => {
    if (newPostTitle && newPostBody) {
      const newPost: CreatePostInput = {
        title: newPostTitle,
        body: newPostBody,
      };
      createPost(newPost);
      setNewPostTitle("");
      setNewPostBody("");
      setOpenDialog(false);
    } else {
      alert("Başlık ve içerik giriniz!");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenEditDialog = (post: Post) => {
    setEditPostId(post.id);
    setEditPostTitle(post.title);
    setEditPostBody(post.body);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleUpdatePost = () => {
    if (editPostTitle && editPostBody && editPostId !== null) {
      const updatedPost: any = {
        id: editPostId,
        title: editPostTitle,
        body: editPostBody,
      };
      updatePost(updatedPost);
      setEditPostTitle("");
      setEditPostBody("");
      setEditPostId(null);
      setOpenEditDialog(false);
    } else {
      alert("Başlık ve içerik giriniz!");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#3f51b5", marginBottom: "20px" }}>
        Gönderiler Sayfası
      </h2>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{
          backgroundColor: "#4caf50",
          "&:hover": { backgroundColor: "#388e3c" },
          marginBottom: "20px",
        }}
      >
        Yeni Post Ekle
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Yeni Post Ekle</DialogTitle>
        <DialogContent>
          <TextField
            label="Başlık"
            variant="outlined"
            fullWidth
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="İçerik"
            variant="outlined"
            fullWidth
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            İptal
          </Button>
          <Button onClick={handleCreatePost} color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Postu Güncelle</DialogTitle>
        <DialogContent>
          <TextField
            label="Başlık"
            variant="outlined"
            fullWidth
            value={editPostTitle}
            onChange={(e) => setEditPostTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="İçerik"
            variant="outlined"
            fullWidth
            value={editPostBody}
            onChange={(e) => setEditPostBody(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            İptal
          </Button>
          <Button onClick={handleUpdatePost} color="primary">
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                Başlık
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                İçerik
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                İşlemler
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post: Post) => (
                <TableRow
                  key={post.id}
                  sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenEditDialog(post)}
                        sx={{ width: "80px" }}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeletePost(post.id)}
                        sx={{
                          width: "80px",
                          borderColor: "#f44336",
                          color: "#f44336",
                          "&:hover": {
                            borderColor: "#d32f2f",
                            color: "#d32f2f",
                          },
                        }}
                      >
                        Sil
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={posts?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
