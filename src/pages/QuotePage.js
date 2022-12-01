import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Toolbar,
  OutlinedInput,
  InputAdornment,
  TextField,
  CardContent,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { QuotesListHead, QuotesListToolbar } from '../sections/@dashboard/quotes';
// mock
import QUOTELIST from '../_mock/quotes';
// component
// import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'author', label: 'Author', alignRight: false },
  { id: 'en', label: 'Quotes', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_quotes) => _quotes.author.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _quotes.en.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function QuotesPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [quotes, setQuotes] = useState([]);
  const [author, setAuthor] = useState("Soffan MA");

  const getQuotes = useCallback(async () => {
    try {
      const response = await axios.get(`https://programming-quotes-api.herokuapp.com/Quotes/author/${author}`);

    //   console.log(response.data);
      setQuotes(response.data);
    //   console.log(quotes.length);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getQuotes();
    
  }, [getQuotes]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = quotes.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quotes.length) : 0;

  const filteredQuotess = applySortFilter(quotes, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredQuotess.length && !!filterName;

  const handleChange = event => {
    setAuthor(event.target.value);
  }
  const handleSearch = event => {
    event.preventDefault();
    try {
      if(author === undefined || author === null || author === '') {
        const response = axios
        .get(`https://programming-quotes-api.herokuapp.com/Quotes/author/Soffan MA`)
        .then(response => {
          // console.log(response.data);
          setQuotes(response.data);
          //   console.log(quotes.length);
        });
      } else {
        const response = axios
        .get(`https://programming-quotes-api.herokuapp.com/Quotes/author/${author}`)
        .then(response => {
          // console.log(response.data);
          setQuotes(response.data);
          //   console.log(quotes.length);
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Helmet>
        <title> Quotes | TA RPLBK Kel 29 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Quotes
          </Typography>
          <Button href="../addquotes" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Quotes
          </Button>
        </Stack>

        <Card>
          
          <div style={{ 
            padding: '1rem 24px',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
           }}>
            <TextField
              id="input-with-icon-textfield"
              label="Search by Author from API"
              value={author}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '100%', mr: 3 }}
            />
            <Button variant="contained" size="large" onClick={handleSearch}>
              <Iconify icon="eva:search-fill" sx={{ color: 'text.white', width: 20, height: 20 }} />
            </Button>
          </div>
          <QuotesListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <QuotesListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={quotes.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredQuotess.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, author, en } = row;
                    const selectedQuotes = selected.indexOf(author) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedQuotes}>
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedQuotes} onChange={(event) => handleClick(event, name)} />
                        </TableCell> */}

                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{author}</TableCell>
                        <TableCell align="left">{en}</TableCell>

                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={quotes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        <Card sx={{ mt: 4, }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Authors
            </Typography>
            <Typography gutterBottom>
              Default : Soffan MA
            </Typography>
            <ul>
            <li>
              <Typography gutterBottom>
                Edsger W. Dijkstra
              </Typography>
              </li>
              <li>
              <Typography gutterBottom>
                Tony Hoare
              </Typography>
              </li>
              <li>
              <Typography gutterBottom>
                Fred Brooks
              </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
