import React, { useState } from "react";
import { useComments } from "../contexts/CommentsContext";
import { useDelete } from "../service/useDeleteQuery"; // useDelete hook'unu import et
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
} from "@mui/material";

export const Page2: React.FC = () => {
  const { comments, error, loading } = useComments();
  const { mutate: deleteComment} = useDelete(
    'https://jsonplaceholder.typicode.com/comments', // Silinecek kaynak URL
    'comments' // Query Key
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteComment = (id: number) => {
    console.log(`Yorum silindi: ${id}`);
    deleteComment(id); // Silme işlemi tetikleniyor
  };

  if (loading) {
    return <CircularProgress />; // Yükleniyor durumu
  }

  if (error) {
    return <div>Error: {error}</div>; // Hata durumu
  }

  return (
    <div>
      <h2>Yorumlar Sayfası</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ad</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Yorum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((comment: any) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.name}</TableCell>
                <TableCell>{comment.email}</TableCell>
                <TableCell>{comment.body}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </Button>
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
