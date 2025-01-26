import React, { useState } from "react";
import { Comment } from "../models/CommentModel";
import { useComments } from "../contexts/CommentsContext";
import { useDelete } from "../service/useDeleteQuery";
import { useCreatePost } from "../service/useCreatePostQuery";
import { useUpdatePost } from "../service/useUpdatePost";
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

export const Page2: React.FC = () => {
  const { comments, error, loading } = useComments();
  const { mutate: deleteComment } = useDelete(
    "https://jsonplaceholder.typicode.com/comments",
    "comments"
  );
  const { mutate: createComment } = useCreatePost(
    "https://jsonplaceholder.typicode.com/comments",
    "comments"
  );
  const { mutate: updateComment } = useUpdatePost(
    "https://jsonplaceholder.typicode.com/comments",
    "comments"
  );

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [newCommentName, setNewCommentName] = useState<string>("");
  const [newCommentEmail, setNewCommentEmail] = useState<string>("");
  const [newCommentBody, setNewCommentBody] = useState<string>("");

  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentName, setEditCommentName] = useState<string>("");
  const [editCommentEmail, setEditCommentEmail] = useState<string>("");
  const [editCommentBody, setEditCommentBody] = useState<string>("");

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

  // Yorum silme işlemi
  const handleDeleteComment = (id: number) => {
    deleteComment(id);
  };

  const handleCreateComment = () => {
    if (newCommentName && newCommentEmail && newCommentBody) {
      const newComment: any = {
        name: newCommentName,
        email: newCommentEmail,
        body: newCommentBody,
      };

      createComment(newComment);
      setNewCommentName("");
      setNewCommentEmail("");
      setNewCommentBody("");
      setOpenDialog(false);
    } else {
      alert("Ad, email ve içerik giriniz!");
    }
  };

  const handleUpdateComment = () => {
    if (
      editCommentName &&
      editCommentEmail &&
      editCommentBody &&
      editCommentId !== null
    ) {
      const updatedComment: any = {
        id: editCommentId,
        name: editCommentName,
        email: editCommentEmail,
        body: editCommentBody,
      };

      updateComment(updatedComment);
      setEditCommentId(null);
      setEditCommentName("");
      setEditCommentEmail("");
      setEditCommentBody("");
      setOpenEditDialog(false);
    } else {
      alert("Ad, email ve içerik giriniz!");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenEditDialog = (comment: Comment) => {
    setEditCommentId(comment.id);
    setEditCommentName(comment.name);
    setEditCommentEmail(comment.email);
    setEditCommentBody(comment.body);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
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
        Yorumlar Sayfası
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
        Yeni Yorum Ekle
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Yeni Yorum Ekle</DialogTitle>
        <DialogContent>
          <TextField
            label="Ad"
            variant="outlined"
            fullWidth
            value={newCommentName}
            onChange={(e) => setNewCommentName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={newCommentEmail}
            onChange={(e) => setNewCommentEmail(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="İçerik"
            variant="outlined"
            fullWidth
            value={newCommentBody}
            onChange={(e) => setNewCommentBody(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            İptal
          </Button>
          <Button onClick={handleCreateComment} color="primary">
            Yorum Ekle
          </Button>
        </DialogActions>
      </Dialog>

      {/* Yorum Güncelleme Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Yorumu Güncelle</DialogTitle>
        <DialogContent>
          <TextField
            label="Ad"
            variant="outlined"
            fullWidth
            value={editCommentName}
            onChange={(e) => setEditCommentName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={editCommentEmail}
            onChange={(e) => setEditCommentEmail(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="İçerik"
            variant="outlined"
            fullWidth
            value={editCommentBody}
            onChange={(e) => setEditCommentBody(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            İptal
          </Button>
          <Button onClick={handleUpdateComment} color="primary">
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                Ad
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                Yorum
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                İşlemler
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((comment: Comment) => (
                <TableRow
                  key={comment.id}
                  sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell>{comment.name}</TableCell>
                  <TableCell>{comment.email}</TableCell>
                  <TableCell>{comment.body}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenEditDialog(comment)}
                        sx={{ width: "80px" }}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteComment(comment.id)}
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
        count={comments?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
