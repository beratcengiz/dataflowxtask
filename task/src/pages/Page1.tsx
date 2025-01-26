import React, { useState } from "react";
import { usePosts } from "../contexts/PostsContext";
import { useDelete } from "../service/useDeleteQuery"; // useDelete hook'u import et
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

export const Page1: React.FC = () => {
  const { posts, error, loading } = usePosts(); // Postları Context'ten alıyoruz
  const { mutate: deletePost} = useDelete(
    'https://jsonplaceholder.typicode.com/posts', // Silinecek kaynağın URL'si
    'posts' 
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

  const handleDeletePost = (id: number) => {
    console.log(`Post silindi: ${id}`);
    deletePost(id); // Silme işlemi tetikleniyor
  };

  if (loading) {
    return <CircularProgress />; // Yükleniyor durumu
  }

  if (error) {
    return <div>Error: {error}</div>; // Hata durumu
  }

  return (
    <div>
      <h2>Gönderiler Sayfası</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Başlık</TableCell>
              <TableCell>İçerik</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post: any) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeletePost(post.id)}
                    // disabled={isDeleting} // Silme işlemi yapılıyorsa buton pasif olur
                  >
                    Delete
                    {/* {isDeleting ? "Siliniyor..." : "Sil"} */}
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
        count={posts?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
