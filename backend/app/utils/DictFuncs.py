def getIndicesFromValues(mydict, val):
    #     print(list(mydict.values()).index(val))
    key_list = list(mydict.keys())
    value_list = list(mydict.values())
    return [key_list[i] for i in [idx for idx, value in enumerate(value_list) if value == val]]
