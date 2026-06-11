export const handleFilter = (rows, statusFilter, searchText, setFilteredRows) => {
  let data = rows;

  // Filter by status
  if (statusFilter) {
    data = data.filter((row) => row.status === statusFilter);
  }

  // Filter by search text in name, mobile, email, queryDescription, or response
  if (searchText) {
    const lowerCaseSearchText = searchText.toLowerCase();
    data = data.filter(
      (row) =>
        ["queryDescription", "response"].some(
          (field) =>
            row[field] &&
            row[field].toString().toLowerCase().includes(lowerCaseSearchText)
        ) ||
        (row.student &&
          ["name", "mobile", "emailId"].some(
            (field) =>
              row.student[field] &&
              row.student[field]
                .toString()
                .toLowerCase()
                .includes(lowerCaseSearchText)
          ))
    );
  }

  setFilteredRows(data);
};
