import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FormControl, IconButton, InputLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import ReactTooltip from "react-tooltip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DetailsModal from "../../components/DetailsModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import dynamic from "next/dynamic";
import AddNewModal from "../../components/AddNewModal";

const ReactTooltip = dynamic(() => import("react-tooltip"), { ssr: false });

const columns = [
  { id: "name", label: "Name" },
  { id: "cast", label: "Cast" },
  { id: "language", label: "Language" },
  { id: "genre", label: "Genre" },
  { id: "locations", label: "No of Locations" },
  { id: "details", label: "Details" },
  { id: "edit", label: "Edit" },
];

function createData(name, cast, language, genre, locations, id) {
  return {
    name,
    cast: cast.join(", ").trim(),
    language,
    genre,
    locations,
    id,
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  textAlign: "center",
  width: 175,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Movies() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setrows] = useState([]);
  const [locationSelected, setlocationSelected] = useState({});
  const [openModal, setopenModal] = useState(false);
  const [openAddMovieModal, setopenAddMovieModal] = useState(false);
  const [openDetailsRowId, setopenDetailsRowId] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectLocation = (id, value) => {
    let tempLocationSelected = { ...locationSelected };
    tempLocationSelected[id] = value;
    setlocationSelected(tempLocationSelected);
  };

  const handleViewDetails = (id) => {
    setopenDetailsRowId(id);
    setopenModal(true);
  };

  const deleteIcon = (id) => (
    <IconButton data-for="delete" onClick={() => deleteMovie(id)}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );

  const editIcon = (
    <IconButton data-for="edit" onClick={() => console.log("edited")}>
      <EditIcon color="primary" />
    </IconButton>
  );

  const renderCellValue = (col, row) => {
    const value = row[col];
    let returnValue = "";
    switch (col) {
      case "details":
        returnValue = (
          <button
            data-tip
            data-for="view"
            className="bg-gray-300 hover:bg-gray-600 hover:text-white 
            py-2 px-4 rounded-md font-semibold disabled:bg-white 
           disabled:text-black disabled:cursor-not-allowed"
            disabled={!locationSelected[row.id]}
            onClick={() => handleViewDetails(row.id)}
          >
            View Details
          </button>
        );
        break;
      case "edit":
        returnValue = (
          <div>
            {deleteIcon(row.id)}
            {editIcon}
          </div>
        );
        break;
      case "locations":
        returnValue = (
          <div>
            <FormControl fullWidth>
              <InputLabel className="z-0" id="location-simple-select-label">
                Location
              </InputLabel>
              <Select
                labelId="location-simple-select-label"
                id="location-simple-select"
                value={locationSelected[row.id] || ""}
                label="Location"
                onChange={(e) => handleSelectLocation(row.id, e.target.value)}
              >
                {value.map((v) => (
                  <MenuItem key={v.label} value={v.value}>
                    {v.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        );
        break;
      default:
        returnValue = value;
        break;
    }
    return returnValue;
  };

  const fetchMovies = async () => {
    const rowData = [];
    const { movies } = await fetch("/api/movies", {
      method: "GET",
    }).then((result) => result.json());

    movies.forEach((movie) =>
      rowData.push(
        createData(
          movie.name,
          movie.cast,
          movie.language,
          movie.genre,
          movie.location,
          movie.id
        )
      )
    );

    setrows([...rowData]);
  };

  const deleteMovie = async (id) => {
    fetch(`/api/movies/${id}`, {
      method: "DELETE",
    }).then(() => {
      const tempRows = rows.filter((row) => row.id != id);
      setrows(tempRows);
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col w-full" id={"detailModals"}>
      <DetailsModal
        open={openModal}
        closeModal={() => setopenModal(false)}
        city={locationSelected[openDetailsRowId]}
        id={openDetailsRowId}
      />
      <AddNewModal
        open={openAddMovieModal}
        closeModal={() => setopenAddMovieModal(false)}
      />
      <ReactTooltip id="edit" type="info">
        <span>Edit movie details</span>
      </ReactTooltip>
      <ReactTooltip id="delete" type="info">
        <span>delete movie listing</span>
      </ReactTooltip>
      <ReactTooltip id="view" type="info">
        <span>More more details about movie</span>
      </ReactTooltip>
      <div className="flex px-4 py-4 bg-slate-300 mb-10 justify-center text-3xl">
        MOVIES
      </div>
      <Paper sx={{ width: "auto", overflow: "hidden", margin: "auto" }}>
        <IconButton
          onClick={() => setopenAddMovieModal(true)}
          size="large"
          id="addMovie"
        >
          <AddCircleIcon fontSize="large" color="primary" />
        </IconButton>
        <TableContainer sx={{}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        // const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {renderCellValue(column.id, row)}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
