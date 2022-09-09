export const getDeepArrayParent = ( rootObj, pathArray, childProp ) => {
    const parentPathArr = [...pathArray];
    let target;

    parentPathArr.pop();
    parentPathArr.forEach(key => {
        target = target ? target[childProp][+key] : rootObj[+key];
    });

    return target;
};
