export function renderGrocery(grocery) {
    const li = document.createElement('li');
    if (grocery.complete === true) {
        li.classList.add('complete');
    }
    const p = document.createElement('p');
    p.textContent = grocery.quantity + '                    ' + grocery.description;
    li.append(p);
    return li;
}
//aaaaaaaaaaaaa
