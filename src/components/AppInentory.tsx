import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchApps,
  fetchAppDetails,
  setSelectedAppId,
  setSortField,
  setSortOrder,
  setPage,
  setRowsPerPage,
  Order,
  SortField,
} from "../store/appSlice.ts";

import {
  selectApps,
  selectLoading,
  selectError,
  selectSortField,
  selectSortOrder,
  selectPage,
  selectRowsPerPage,
  selectTotalCount,
  selectSelectedAppId,
  selectAppDetails,
  selectLoadingDetails,
  selectErrorDetails,
} from "../store/appSlice.ts";

import { AppDispatch } from "../store/store";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Paper,
  Stack,
  Avatar,
  TablePagination,
  CircularProgress,
  Drawer,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DoubleSortIcon from "./DoubleSortIcon";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function AppInventory() {
  const dispatch = useDispatch<AppDispatch>();

  const apps = useSelector(selectApps);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const sortField = useSelector(selectSortField);
  const sortOrder = useSelector(selectSortOrder);
  const page = useSelector(selectPage);
  const rowsPerPage = useSelector(selectRowsPerPage);
  const totalCount = useSelector(selectTotalCount);

  const selectedAppId = useSelector(selectSelectedAppId);
  const appDetails = useSelector(selectAppDetails);
  const loadingDetails = useSelector(selectLoadingDetails);
  const errorDetails = useSelector(selectErrorDetails);

  useEffect(() => {
    dispatch(fetchApps());
  }, [dispatch]);

  const sortedApps = stableSort(apps, getComparator(sortOrder, sortField));
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageApps = sortedApps.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">Error loading apps: {error}</Typography>
      </Box>
    );
  }

  const handleRequestSort = (field: SortField) => {
    if (sortField === field) {
      dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
    } else {
      dispatch(setSortField(field));
      dispatch(setSortOrder("asc"));
    }
    dispatch(setPage(0));
  };

  const handleRowClick = (appId: string) => {
    dispatch(setSelectedAppId(appId));
    dispatch(fetchAppDetails(appId));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
    queueMicrotask(() => window.scrollTo({ top: 0 }));
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
    queueMicrotask(() => window.scrollTo({ top: 0 }));
  };

  const handleCloseDrawer = () => {
    dispatch(setSelectedAppId(null));
  };

  return (
    <Box sx={{ display: "flex", p: 2 }}>
      <Box sx={{ flex: 1, mr: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          App Inventory
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sortDirection={sortField === "name" ? sortOrder : false}
                >
                  <TableSortLabel
                    active={sortField === "name"}
                    direction={sortField === "name" ? sortOrder : "asc"}
                    IconComponent={(props) => (
                      <DoubleSortIcon
                        direction={props.direction}
                        active={props.active}
                      />
                    )}
                    onClick={() => handleRequestSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  sortDirection={sortField === "category" ? sortOrder : false}
                >
                  <TableSortLabel
                    active={sortField === "category"}
                    direction={sortField === "category" ? sortOrder : "asc"}
                    IconComponent={(props) => (
                      <DoubleSortIcon
                        direction={props.direction}
                        active={props.active}
                      />
                    )}
                    onClick={() => handleRequestSort("category")}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  sortDirection={sortField === "connector" ? sortOrder : false}
                >
                  <TableSortLabel
                    active={sortField === "connector"}
                    direction={sortField === "connector" ? sortOrder : "asc"}
                    IconComponent={(props) => (
                      <DoubleSortIcon
                        direction={props.direction}
                        active={props.active}
                      />
                    )}
                    onClick={() => handleRequestSort("connector")}
                  >
                    Connector
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pageApps.map((app) => (
                <TableRow
                  key={app.appId}
                  hover
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(app.appId)}
                >
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {app.logos?.app && (
                        <Avatar
                          alt={app.name}
                          src={app.logos.app}
                          sx={{ width: 32, height: 32 }}
                        />
                      )}
                      <Typography>{app.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{app.category}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {app.connector}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <Drawer
        anchor="right"
        open={Boolean(selectedAppId)}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: { width: 360, p: 2 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        {loadingDetails && (
          <Box textAlign="center" mt={2}>
            <CircularProgress />
          </Box>
        )}
        {errorDetails && (
          <Box textAlign="center" mt={2}>
            <Typography color="error">{errorDetails}</Typography>
          </Box>
        )}
        {appDetails && !loadingDetails && !errorDetails && (
          <>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              {appDetails.logo && (
                <Avatar
                  alt={appDetails.name}
                  src={appDetails.logo}
                  sx={{ width: 32, height: 32 }}
                />
              )}
              <Typography variant="h6">{appDetails.name}</Typography>
            </Stack>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Category: {appDetails.category}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Last classification: {appDetails.lastClassification}
            </Typography>

            {appDetails.connector && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <Avatar
                  src={appDetails.connector.logo}
                  alt={appDetails.connector.name}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                <Typography>{appDetails.connector.name}</Typography>
              </Box>
            )}

            {appDetails.users && (
              <>
                <Typography variant="subtitle1">Users:</Typography>
                {appDetails.users.map((u) => (
                  <Stack
                    key={u.id}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    {u.pic && (
                      <Avatar
                        src={u.pic}
                        alt={u.name}
                        sx={{ width: 24, height: 24 }}
                      />
                    )}
                    <Typography>{u.name}</Typography>
                  </Stack>
                ))}
              </>
            )}
          </>
        )}
      </Drawer>
    </Box>
  );
}
