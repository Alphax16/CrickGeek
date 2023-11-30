import React, { useState, useMemo, useEffect } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import {
  HStack,
  Button,
  Text,
  Box,
  Input,
  Table,
  Spinner,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  VStack,
} from '@chakra-ui/react';

import TableMenuPanel from './TableMenuPanel';
import TablePaginationPanel from './TablePaginationPanel';


function ExcelTable({ data }) {
    const [columns, setColumns] = useState([]);
  
    const toggleColumn = (columnId) => {
      setColumns((prevColumns) =>
        prevColumns.map((col) => (col.id === columnId ? { ...col, isVisible: !col.isVisible } : col))
      );
    };
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state: { globalFilter, pageIndex, pageSize },
      setGlobalFilter,
      page,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
    } = useTable(
      { columns, data, initialState: { pageSize: 10 } },
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    useEffect(() => {
      if (data.length > 0) {
        const keys = Object.keys(data[0]);
        setColumns(keys.map((key) => ({ Header: key, accessor: key, id: key, isVisible: true })));
      }
    }, [data]);
  
    return (
      <Box py={"16"} bgColor={"#12504B"} color={"#fff"} minW={"100vw"} minH={"100vh"}>
        <Center>
          <Input
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            width={'70%'}
            my={6}
          />
        </Center>
        <HStack>
          {data.length !== 0 ? (
            <VStack>
              <TableMenuPanel columns={columns} toggleColumn={toggleColumn} />

              <VStack>
                <Table {...getTableProps()} variant="simple" w="97%">
                    <Thead>
                    {headerGroups.map((headerGroup, index) => (
                    <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, columnIndex) => (
                        <Th
                            key={columnIndex}
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            bgColor="gray.200"
                            p={2}
                            style={{ display: column.isVisible ? 'table-cell' : 'none' }}
                        >
                            {column.render('Header')}
                            <span>
                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                            </span>
                        </Th>
                        ))}
                    </Tr>
                    ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {rows.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <Tr key={rowIndex} {...row.getRowProps()}>
                            {row.cells.map((cell, cellIndex) => (
                                <Td
                                key={cellIndex}
                                {...cell.getCellProps()}
                                p={2}
                                style={{ display: cell.column.isVisible ? 'table-cell' : 'none' }}
                                >
                                {cell.render('Cell')}
                                </Td>
                            ))}
                            </Tr>
                        );
                        })}
                    </Tbody>
                </Table>
                <TablePaginationPanel
                  pageIndex={pageIndex}
                  pageCount={pageCount}
                  gotoPage={gotoPage}
                  nextPage={nextPage}
                  previousPage={previousPage}
                />
              </VStack>
            </VStack>
          ) : (
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="#C1E836" size="xl" />
          )}
        </HStack>
      </Box>
    );
  }
  
  export default ExcelTable;
