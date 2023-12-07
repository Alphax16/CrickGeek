import Papa from 'papaparse';


const csvToJson = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const csvString = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(new Error('Error parsing CSV: ' + error.message));
        },
      });
    });
  } catch (error) {
    throw new Error('Error loading CSV file: ' + error.message);
  }
};

export { csvToJson };
