import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect } from 'react-table';
import { Box, Center, VStack, HStack, Text, Input, Table, Thead, Tbody, Tr, Th, Td, Button, Spinner } from '@chakra-ui/react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import TableMenuPanel from './TableMenuPanel';
import TablePaginationPanel from './TablePaginationPanel';
import Swal from 'sweetalert2';

const initializeColumns = (data) => {
  if (!data || data.length === 0) {
    return [];
  }

  return Object.keys(data[0]).map((key) => ({
    Header: key,
    accessor: key,
    isVisible: true,
  }));
};

function ImagesTable({ data, serviceName, title }) {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuPanelOpen, setMenuPanelOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState({});

  const toggleColumnVisibility = (columnId) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, isVisible: !col.isVisible } : col
      )
    );
  };

  useEffect(() => {
    setColumns(initializeColumns(data));
  }, [data]);

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
    toggleAllRowsSelected,
    getToggleAllRowsSelectedProps,
  } = useTable(
    {
      columns: useMemo(() => columns.filter((col) => col.isVisible), [columns]),
      data,
      initialState: { pageSize: 10, selectedRowIds },
      getRowId: (row) => row.id,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <input type="checkbox" {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const visibleColumns = headerGroups[0]?.headers.filter((column) => column.isVisible) || [];

  useEffect(() => {
    setSelectedRowIds(toggleAllRowsSelected ? { 0: true } : {});
  }, [toggleAllRowsSelected]);

  const handleDownloadImages = () => {
    const selectedImages = rows
      .filter((row) => selectedRowIds[row.id])
      .map((row) => ({
        id: row.values.id,
        name: row.values.name,
        url: row.values.url,
      }));

    if (selectedImages.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Images Selected',
        text: 'Please select at least one image to download.',
      });
      return;
    }

    console.log('Selected Images:', selectedImages);
    downloadImages(selectedImages, serviceName, setLoading);
  };

  const openMenuPanel = () => {
    setMenuPanelOpen(true);
  };

  const closeMenuPanel = () => {
    setMenuPanelOpen(false);
  };

  return (
    <Box py="16" bgColor="primary.oceanBlue" color="#fff" minW={"100vw"} minH={"100vh"}>
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

          <Center>
            {data.length !== 0 ? (
              <VStack>
                <HStack>
                  <Input
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                    width={'70%'}
                    my={6}
                  />

                  <Button onClick={openMenuPanel}>Open Menu Panel</Button>
                </HStack>

                <Table {...getTableProps()} variant="simple" w="70vw">
                  <Thead>
                    <Tr>
                      {visibleColumns.map((column, columnIndex) => (
                        <Th
                          key={columnIndex}
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          bgColor="gray.200"
                          p={2}
                        >
                          {column.render('Header')}
                          <span>
                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                          </span>
                        </Th>
                      ))}
                    </Tr>
                  </Thead>

                  <Tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
                      prepareRow(row);
                      return (
                        <Tr key={rowIndex} {...row.getRowProps()}>
                          {row.cells.map((cell, cellIndex) => (
                            <Td key={cellIndex} {...cell.getCellProps()} p={2}>
                              {cell.column.id === 'selection' ? (
                                <input type="checkbox" {...row.getToggleRowSelectedProps()} />
                              ) : cell.column.id === 'url' ? (
                                <img src={cell.value} alt="Preview" style={{ width: '50px', height: 'auto' }} />
                              ) : (
                                cell.render('Cell')
                              )}
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
      
                <Button colorScheme="blue" onClick={handleDownloadImages} my={4} disabled={loading}>
                  {loading ? <Spinner size="sm" /> : 'Download Images'}
                </Button>
      
                <TableMenuPanel
                  columns={columns}
                  toggleColumnVisibility={toggleColumnVisibility}
                  isOpen={menuPanelOpen}
                  onClose={closeMenuPanel}
                />
              </VStack>
              ) : (
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="#C1E836" size="xl" />
              )
            }
          </Center>
          
        </VStack>
      </Center>
    </Box>
  );
}

export default ImagesTable;
