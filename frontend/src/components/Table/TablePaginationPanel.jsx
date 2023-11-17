import { HStack, Button, Text } from "@chakra-ui/react";


const TablePaginationPanel = ({ pageIndex, pageCount, gotoPage, nextPage, previousPage }) => (
  <HStack spacing={4} mt={4}>
    <Button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
      {'<<'}
    </Button>
    <Button onClick={() => previousPage()} disabled={pageIndex === 0}>
      {'<'}
    </Button>
    <Text>{`${pageIndex + 1}/${pageCount}`}</Text>
    <Button onClick={() => nextPage()} disabled={pageIndex === pageCount - 1}>
      {'>'}
    </Button>
    <Button onClick={() => gotoPage(pageCount - 1)} disabled={pageIndex === pageCount - 1}>
      {'>>'}
    </Button>
  </HStack>
);

export default TablePaginationPanel;
