from joblib import load
import pandas as pd
import sys


class PredictionController:
    def __init__(self):
        with open("./app/models/pickles/ICC_Test_Cricket_Runs/ICC_Test_Cricket_Runs_Predictor.joblib", 'rb') as fpk:
            self.model = load(fpk)
        self.le = load(
            "./app/models/pickles/ICC_Test_Cricket_Runs/ICC_Test_Cricket_LabelEncoder.joblib")
        self.ohe = load(
            "./app/models/pickles/ICC_Test_Cricket_Runs/ICC_Test_Cricket_OneHotEncoder.joblib")
        self.scaler = load(
            "./app/models/pickles/ICC_Test_Cricket_Runs/ICC_Test_Cricket_MinMaxScaler.joblib")

    def df_preprocessing(self, df, var_index=-1):
        columns = ['Mat', 'Inn', 'NO', 'HS', 'Avg', '100',
                   '50', '0', 'Country', 'years_played', 'Debut_year']
        X = df[columns]
        X.HS = X.HS.apply(lambda x: str(x).replace('*', ''))
        X[['100', '50', '0', 'NO', 'HS']] = X[[
            '100', '50', '0', 'NO', 'HS']].astype('int64')

    #     if 'Runs' in df.columns:
    #         y = df[['Runs']].to_numpy()
    #         le = preprocessing.LabelEncoder()
    #         le_data = le.fit_transform(df.Country)
    #         _ = le_data.reshape(-1,1)
    #         ohe = preprocessing.OneHotEncoder()
    #         X_new_data = ohe.fit_transform(le_data.reshape(-1,1)).toarray()
    #         X_new_cols = ohe.get_feature_names_out(['Country'])
    #         X[X_new_cols] = X_new_data
    #         X.drop(columns=['Country'],inplace = True)
    #         scaler = preprocessing.MinMaxScaler()
    #         X_new = scaler.fit_transform(X)
    #         joblib.dump(le, "LabelEncoder.joblib")
    #         joblib.dump(ohe, "OneHotEncoder.joblib")
    #         joblib.dump(scaler, "MinMaxScaler.joblib")
    #         if var_index != -1:
    #             return X_new[var_index],y[var_index]
    #         else:
    #             return X_new, y
    #     else:
    #         y = np.array([0])

    # #         le = preprocessing.LabelEncoder()
    #         le = load("LabelEncoder.joblib")

    #         le_data = le.transform(df.Country)
    #         _ = le_data.reshape(-1,1)
    # #         ohe = preprocessing.OneHotEncoder()
    #         ohe = load("OneHotEncoder.joblib")

    #         X_new_data = ohe.transform(le_data.reshape(-1,1)).toarray()
    #         X_new_cols = ohe.get_feature_names_out(['Country'])
    #         X[X_new_cols] = X_new_data
    #         X.drop(columns=['Country'],inplace = True)

    # #         scaler = preprocessing.MinMaxScaler()
    #         scaler = load("MinMaxScaler.joblib")

    #         X_new = scaler.transform(X)
    #         if var_index != -1:
    #             return X_new[var_index],y[var_index]
    #         else:
    #             return X_new, y

        # y = np.array([0])

        le_data = self.le.transform(df.Country)
        _ = le_data.reshape(-1, 1)

        X_new_data = self.ohe.transform(le_data.reshape(-1, 1)).toarray()
        X_new_cols = self.ohe.get_feature_names_out(['Country'])
        X[X_new_cols] = X_new_data
        X.drop(columns=['Country'], inplace=True)

        X_new = self.scaler.transform(X)
        if var_index != -1:
            return X_new[var_index], y[var_index]
        else:
            return X_new

    def predict(self, features):
        feats_cols = ['Mat', 'Inn', 'NO', 'HS', 'Avg', '100',
                      '50', '0', 'Country', 'years_played', 'Debut_year']
        features_dict = {feats_cols[i]: [features[i]]
                         for i in range(len(feats_cols))}
        features_df = pd.DataFrame(features_dict)
        X = self.df_preprocessing(features_df)
        print(X.shape, file=sys.stdout)
        X_pred = self.model.predict(X)
        prediction = X_pred[0]
        return prediction


# def main():
#     predictionController = PredictionController()
#     print(predictionController.predict(pd.DataFrame({'Mat': [10],
#                                                      'Inn': [10],
#                                                      'NO': [10],
#                                                      'HS': [10],
#                                                      'Avg': [10],
#                                                      '100': [10],
#                                                      '50': [10],
#                                                      '0': [10],
#                                                      'Country': ['INDIA'],
#                                                      'years_played': [10],
#                                                      'Debut_year': [2017]
#                                                      })))


# if __name__ == '__main__':
#     main()
