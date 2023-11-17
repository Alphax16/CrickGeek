import React from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { Box, Input, Table, Spinner,Thead, Tbody, Tr, Th, Td, Center } from '@chakra-ui/react';


function ExcelTable({ data }) {
  const columns = React.useMemo(() => {
    if (data.length === 0) {
      return [];
    }
    const keys = Object.keys(data[0]);
    return keys.map((key) => ({
      Header: key,
      accessor: key,
    }));
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <Box>
      <Center>
      <Input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        width={'70%'}
        my={6}
      />
      </Center>
      <Center>
        {data.length!=0? 
      <Table {...getTableProps()} variant="simple" w="97%">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  bgColor="gray.200"
                  p={2}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        ' 🔽'
                      ) : (
                        ' 🔼'
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    p={2}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>:
      <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='#C1E836'
      size='xl'
    />}
      </Center>
    </Box>
  );
}

export default ExcelTable;
