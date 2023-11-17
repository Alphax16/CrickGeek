import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";


const MemoizedTable = React.memo(({ getTableProps, headerGroups, rows, prepareRow }) => (
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
  
      <Tbody>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <Tr key={rowIndex} {...row.getRowProps()}>
              {row.cells.map((cell, cellIndex) => (
                <Td key={cellIndex} {...cell.getCellProps()} p={2}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  ));

export default MemoizedTable;
