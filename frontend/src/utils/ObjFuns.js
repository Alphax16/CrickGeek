function getKeyFromValue(object, value) {
    console.log('Object.values:', Object.values(object));
    console.log('Value:', value);
    if (Object.values(object).includes(value)) {
        console.log('Match Found!');
        return Object.keys(object).find(key => object[key] === value);
    }
    else
        return null;
}

export { getKeyFromValue };
