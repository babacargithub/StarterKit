export function sum_array(field, array)
{

    let total = 0;
    for (let i = 0; i <array.length; i++) {
        total = total+ Number.parseInt(array[i][field])
    }
    return total;

}
