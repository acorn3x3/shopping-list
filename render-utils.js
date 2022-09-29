export function renderGrocery(grocery) {
    const li = document.createElement('li');
    if (grocery.complete === true) {
        li.classList.add('complete');
    }
}
