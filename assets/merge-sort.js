async function merge(left, mid, right) {
    await sleep(delay);

    var i, j;
    var n1 = mid - left + 1;
    var n2 = right - mid;
    var L = [];
    var R = [];

    for(i = 0; i < n1; i++) {
        L.push(arr[left + i]);
        setColor(left + i, LEFT);
    }
    for(j = 0; j < n2; j++) {
        R.push(arr[mid + j + 1]);
        setColor(mid + j + 1, RIGHT);
    }

    L.push(Infinity);
    R.push(Infinity);

    i = 0;
    j = 0;

    for(var k = left; k <= right; k++) {
        await sleep(delay);

        if(L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }

        setHeight(k, arr[k]);
        setColor(k, SELECTED);
    }

    await sleep(delay);

    if(left == 0 && right == size - 1)
        setColorRange(left, right, SORTED);
    else
        setColorRange(left, right, UNSORTED);
}

async function mergeSort(left, right) {
    if(left < right) {
        var mid = Math.floor( (left + right) / 2 );

        await mergeSort(left, mid);

        await mergeSort(mid + 1, right);

        await merge(left, mid, right);
    }
}
