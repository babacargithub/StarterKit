export function remove_array_item(item, array)
{
    let index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}
