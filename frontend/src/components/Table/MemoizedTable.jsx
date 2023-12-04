import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import { isURL } from "../../utils/URL_Checker";
import LinkPreview from "../LinkPreview";


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
                {isURL(cell.value) ? (
                  <LinkPreview>
                    <Link href={cell.value} target="_blank" rel="noreferrer">
                      {cell.value}
                    </Link>
                  </LinkPreview>
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
));

MemoizedTable.displayName = 'MemoizedTable';

export default MemoizedTable;
