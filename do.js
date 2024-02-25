'use strict';
const dataShow = document.querySelector('.data-show');
const btn = document.querySelectorAll('.search-btn button');
const addText = document.querySelector('.add-text');
const addcontent = document.querySelector('.add-content');
const addTodo = document.querySelector('.add-Todo');

// 儲存篩選的字串
let searchText = '';
//  初始陣列
let arr = [];
if (localStorage.getItem('todoList')) {
  arr = JSON.parse(localStorage.getItem('todoList'));
}

let JsonText = JSON.stringify(arr);
let parseText = JSON.parse(JsonText);

// 篩選按鈕
btn.forEach((item) => {
  item.addEventListener('click', () => {
    searchText = item.dataset.search;
    switchData(searchText);
  });
});

output(arr);

//  新增todo list
addTodo.addEventListener('click', () => {
  const text = addText.value;
  const content = quill.root.innerHTML;
  let id = 0;
  // 找尋array的最後一個ID
  if (arr.length !== 0) {
    id = arr[arr.length - 1].id;
  }

  if (text != '') {
    const addArr = {
      id: id + 1,
      check: false,
      text: text, //標題
      content: content, //內文
      reply: [], //回覆
    };
    arr.push(addArr);
  }
  addText.value = '';
  // 共用的印製fn
  output(arr);
});
// 編輯
function editText(id) {
  arr.map((item) => {
    if (item.id == id) {
      const content = prompt('修改文字');
      if (content != '' || content == null) {
        item.text = content;
      }
    }
  });
  output(arr);
}
//  刪除
function deleteText(id) {
  if (confirm('是否要刪除') == true) {
    const deleteArr = arr.filter((item) => {
      if (item.id != id) {
        return item;
      }
    });
    arr = deleteArr;
    output(deleteArr);
  }
}
//內文

function contentText(id) {
  arr.map((item) => {
    if (item.id == id) {
      item.content = content;
    }
  });
  output(arr);
}
function replyText(id, replyContent) {
  arr = arr.map((item) => {
    if (item.id == id) {
      item.reply.push(replyContent);
    }

    return item;
  });
  output(arr); // 重新渲染 todo 列表
}

//  勾選執行
function checkTodo(id) {
  arr.map((item) => {
    if (item.id == id) {
      item.check = !item.check;
    }
  });
  switchData(searchText);
}
//  輸出的fn
function output(addArr) {
  // 把原本的刪除掉
  dataShow.innerHTML = '';
  dataShow.addEventListener('click', function (event) {
    const id = event.target.getAttribute('data-id');

    const replyInput = document.querySelector(`.reply-text[data-id="${id}"]`);

    const replyContent = replyInput.value;
    if (replyContent) {
      replyText(id, replyContent);
      replyInput.value = '';
    }
  });
  addArr.forEach((item) => {
    const replies = item.reply.map((reply, index) => `<div>B${index + 1}: ${reply}</div>`).join('');

    dataShow.innerHTML += `
    <tr>
        <td>
        <label class="container">
        <input type="checkbox" ${item.check ? 'checked' : ''} onclick="checkTodo(${item.id})"/>
        <svg>
          <path
            d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"
          ></path>
        </svg>
      </label>
        </td>
        <td>${item.text}</td>
        <td>${item.content}</td>
        <td>${replies}</td>
        <td>
          <button type="button" onclick="editText(${item.id})">編輯標題</button>
          <button type="button" onclick="deleteText(${item.id})">刪除</button>
          <form>
            <input type="text" class="reply-text" data-id="${item.id}" />
            <button class="reply-btn" data-id="${item.id}" type="button">回覆</button>



        




          </form>
        </td>
    </tr>`;
  });

  //製作成 JSON 格式，以利儲存至 localStorage 里面
  const arrData = JSON.stringify(arr);
  // localStorage 存入數據
  localStorage.setItem('todoList', arrData);
}

//  篩選印製
function switchData(text) {
  switch (text) {
    case 'all':
      output(arr);
      break;
    case 'isTodo':
      const todoArr = arr.filter((checkTodo) => {
        console.log(checkTodo.check);
        if (checkTodo.check === true) {
          console.log(checkTodo);
          return checkTodo;
        }
      });
      output(todoArr);
      break;

    default:
      output(arr);
      break;
  }
}
