import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import { HStack, Button, Text, Box, Input, Table, Spinner, Thead, Tbody, Tr, Th, Td, Center, VStack } from '@chakra-ui/react';
import TableMenuPanel from './TableMenuPanel';
import MemoizedTable from './MemoizedTable';
import TablePaginationPanel from './TablePaginationPanel';


function ExcelTable({ data, title }) {
  const {
    columns,
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
    {
      columns: useMemo(() => {
        if (data.length === 0) {
          return [];
        }

        const slNoColumn = {
          Header: 'Sl. No.',
          accessor: (row, index) => index + 1,
        };

        const keys = Object.keys(data[0]);

        return [slNoColumn, ...keys.map((key) => ({ Header: key, accessor: key }))];
      }, [data]),
      data,
      initialState: { pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    console.log('Current Page Index:', pageIndex);
  }, [pageIndex]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleColumnVisibility = (columnId) => {
    // Implement logic to toggle the visibility of the selected column
    // This might involve updating the column state in some way
  };

  const slNoColumn = useMemo(() => columns.find((column) => column.Header === 'Sl. No.'), [columns]);

  return (
    <Box py={"16"} bgColor={"primary.oceanBlue"} color="#fff" minW="100vw" minH="100vh">
      <Center>
        <VStack>
          <Text
              fontSize={{ base: "xl", lg: "4xl" }}
              fontWeight={"bold"}
              my={"5%"}
              color={"#fff"}
              >
            {title}
          </Text>
          <HStack>
            <Input
              value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
                width={'70%'}
              my={6}
            />
            <Button onClick={() => setIsMenuOpen(true)}>Show/Hide Columns</Button>
          </HStack>
          <TableMenuPanel
            columns={columns}
            slNoColumn={slNoColumn}
            toggleColumnVisibility={toggleColumnVisibility}
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        </VStack>
      </Center>
      <Center>
        {data.length !== 0 ? (
          <VStack>
            <MemoizedTable
              getTableProps={getTableProps}
              headerGroups={headerGroups}
              rows={page}
              prepareRow={prepareRow}
            />
            <TablePaginationPanel
              pageIndex={pageIndex}
              pageCount={pageCount}
              gotoPage={gotoPage}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          </VStack>
        ) : (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="#C1E836" size="xl" />
        )}
      </Center>
    </Box>
  );
}

export default ExcelTable;
