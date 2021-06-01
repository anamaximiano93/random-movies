import React from "react";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import { Link } from "react-router-dom";

export default function PaginationPage({
  linkPage,
  pageLink,
  total_pages_pagination,
  onPage,
  search,
}) {
  const classes = useStyles();

  const handleChangePagePagination = (_, value) => {
    onPage(value);
  };

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div className={classes.pagination}>
      <Pagination
        className={classes.paginationContainer}
        page={pageLink}
        count={total_pages_pagination}
        variant="outlined"
        shape="rounded"
        size="large"
        siblingCount={isMobile ? 0 : 1}
        onChange={handleChangePagePagination}
        renderItem={(item) => (
          <PaginationItem
            shape="rounded"
            classes={{ selected: classes.selectedCss }}
            size="large"
            selected={true}
            className={classes.paginationItem}
            component={Link}
            to={`/${linkPage}${
              search ? " " : item.page === 1 ? "/" + 1 : `/${item.page}`
            }`}
            {...item}
          />
        )}
      />
    </div>
  );
}

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
  pagination: {
    marginBottom: spacing(4),
    marginTop: spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    margin: "0px 0px 15px 0px",
  },
  paginationItem: {
    background: palette.primary.main,
    color: palette.secondary.main,
    fontSize: "18px",
    fontWeight: "bold",
    "&:hover": {
      background: palette.secondary.main, //"#796679",
      color: palette.primary.main,
      borderColor: palette.primary.main,
      borderWidth: `${spacing(1)}px`,
    },
  },
  selectedCss: {
    background: `${palette.secondary.main} !important`, //"#796679 !important",
    color: palette.primary.main,
    borderColor: "#796679", //theme.palette.primary.main,
    borderWidth: `${spacing(1)}px`,
  },

  /* mobile version*/
  [breakpoints.down("xs")]: {},

  [breakpoints.down("sm")]: {},

  [breakpoints.down("md")]: {},
}));
