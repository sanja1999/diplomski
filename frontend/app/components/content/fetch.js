import items from "./items.json";

export const getAllItems = () => {
    return {
        data: items,
        itemsMap: items.reduce((acc, item, index) => {
            acc[item.id] = item;
            acc[item.id].index = index;
            return acc;
        }, {})
    };
}
