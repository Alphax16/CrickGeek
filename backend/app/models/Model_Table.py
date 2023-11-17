import pandas as pd


def CSV2JSON(csv_file_path="./Data"):
    """
        Convert a CSV file to a list of dictionaries using pandas.

        Parameters:
        - csv_file_path (str): Path to the input CSV file.

        Returns:
        - data (list): List of dictionaries representing the CSV data.
    """

    df = pd.read_csv(csv_file_path)
    data = df.to_dict(orient='records')

    return data


def get_paginated_data(page, page_size, csv_file_path="./Data/IPL_Data.csv"):
    try:
        df = pd.read_csv(csv_file_path)
        total_records = len(df)

        start_index = (page - 1) * page_size
        end_index = min(start_index + page_size, total_records)

        # sl_no = list(range(1, total_records + 1))

        paginated_data = df.iloc[start_index:end_index].to_dict(
            orient='records')

        return {
            'data': paginated_data,
            'totalRecords': total_records,
            'currentPage': page,
            'pageSize': page_size,
        }
    except Exception as ex:
        raise ex
