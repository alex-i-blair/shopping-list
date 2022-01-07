

export async function renderItem(item) {
    const itemEl = document.createElement('p');
    if (item.bought) {
        itemEl.classList.add('complete', 'list-item');

    } else {
        itemEl.classList.add('incomplete', 'list-item');
    }
    itemEl.textContent = `${item.quantity} ${item.item}`;
    // console.log(itemEl);
    return itemEl;
}