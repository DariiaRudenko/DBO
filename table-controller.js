function removeTable() {
    document.getElementById('myTable').innerHTML = '';
}
function renderTable(data) {
    // removeTable();
    //удаляет таблицу
    // var countdata = myStatementData.length;
    var table = document.createElement('table');
    //table.parentNode.removeChild(table);
    table.setAttribute('border', '1');
    table.setAttribute('color', '000');
    table.setAttribute('width', '1080');
    table.setAttribute('height', '500');
    table.setAttribute('class', 'main-table');
    table.setAttribute('id', 'content');

    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    tr.innerHTML = '<td bgcolor = "silver" id = "date_col">Дата</td><td bgcolor = "silver" id = "time_col">Время</td><td bgcolor = "silver" id = "type_col">Тип</td><td bgcolor = "silver" id = "income_col">Приход</td><td bgcolor = "silver" id = "outcome_col">Расход</td>', type = 'type';
    tbody.appendChild(tr);
    // var items = ['date', 'date', 'type', 'amount', 'amount'];
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            if (j == 0) {
                var date = new Date(data[i].date);//создание обьекта времени из item
                var item = date.toLocaleDateString();//приведение к формату представления DD//MM//YYYY
            } else if (j == 1) {
                var time = new Date(data[i].date);//создание обьекта времени из item
                var item = time.toTimeString();
            } else if (j == 2) {
                var item = data[i].type;
            } else if (j == 3) {
                var item = data[i].amount;
                if (item > 0) {
                    item.toLocaleString('ru-RU');
                } else {
                    item = " ";
                }
            }
            else if (j == 4) {
                var item = data[i].amount;
                if (item < 0) {
                    item.toLocaleString('ru-RU');
                } else {
                    item = " ";
                }
            }
            td.innerHTML = item[type] ? item[type] : item;// var  = условие ? первое значение : второе значение
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.getElementById('myTable').appendChild(table);
}
renderTable(myStatementData);

function byDateComparator(a, b) {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;
};
var sortList = document.getElementById('sortlist');
sortList.addEventListener('change', () => { // создает новый отсортированный массив и вызывает построение новой таблицы с уже отсортированным массивом
    if (sortList.value == 's2') {
        // const newArray = myStatementData.slice();
        // newArray.sort(byDateComparator);
        removeTable();
        renderGroupedTable(getSortedDataMap(myStatementData));
        //renderTable(newArray);
    } else {
        removeTable();
        renderTable(myStatementData);
        window.alert("Not implemented yet");
    }
});

//const dataSorting = myStatementData.sort(sortFunction); 
function toogleHideColumn(column) {
    if (!document.getElementById('date_toogle').checked &&
        !document.getElementById('time_toogle').checked &&
        !document.getElementById('type_toogle').checked &&
        !document.getElementById('income_toogle').checked &&
        !document.getElementById('outcome_toogle').checked) {
        column.checked = column.checked ? "false" : "true";
        window.alert("Нельзя скрывать все колонки");
    } else {
        hideTableColumn(column.value);
    }
}

function hideTableColumn(column) {
    table = document.getElementById('myTable');
    rows = table.getElementsByTagName('tr');
    for (var row = 0; row < rows.length; row++) {
        cels = rows[row].getElementsByTagName('td');
        cels[column].style.display = cels[column].style.display == "none" ? "" : "none";
    }
}

function renderGroupedTable(sordedMap) {
    const table = document.createElement('table');
    table.setAttribute('class', 'main-table');
    table.setAttribute('id', 'content');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = '<td bgcolor = "silver" id = "date_col">Дата</td><td bgcolor = "silver" id = "income_col">Приход</td><td bgcolor = "silver" id = "outcome_col">Расход</td>', type = 'type';
    tbody.appendChild(tr);
    tbody.setAttribute('class', 'table-content');
    // var items = ['date', 'date', 'type', 'amount', 'amount'];
    Object.keys(sordedMap).forEach((key) => {
        const tableRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.innerText = key || ''; 
        const incomeCell = document.createElement('td');
        incomeCell.innerText = sordedMap[key].income || '';
        const outcomeCell = document.createElement('td');
        outcomeCell.innerText = sordedMap[key].outcome || '';
        tableRow.appendChild(dateCell);
        tableRow.appendChild(incomeCell);
        tableRow.appendChild(outcomeCell);
        tbody.appendChild(tableRow);
    });
    table.appendChild(tbody);
    document.getElementById('myTable').appendChild(table);
}
 

function getSortedDataMap(data) {
    return data.reduce((acc, { amount, date: fullDate }) => {
        const data = fullDate.substr(0, 10);

        if(amount < 0) {
            acc[data] = {...acc[data], outcome: acc[data] && acc[data].outcome ? acc[data].outcome + amount : amount}; 
        } else {
            acc[data] = {...acc[data], income: acc[data] && acc[data].income ?  acc[data].income + amount : amount};
        }

        return acc;
    }, {});
}
