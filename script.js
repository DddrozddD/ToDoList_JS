const AddTaskBtn = document.getElementById('AddBtn');
const InputTitle = document.getElementById('TitleInp');
const ToDoList = document.getElementById('List');
const AmountLi = document.getElementById('Spravi');
const ThisDate = document.getElementById('getDate');

/*var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
ThisDate.min = `${yyyy}-${mm}-${dd}`;

    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var name_input = document.getElementById('getDate');
    name_input.min.value = year + "-" + month + "-" + day;
*/

let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem(`tasks`));


function Task(title, date){
	this.title = title;
	this.date = date;
	this.completed = false;
}

const ApdateList = () => {
	updateUl();
	FillList();
}

const createLi = (task,index) => {
	if(task.date != ''){
	return `<li class="lst-group-item d-flex justify-content-between w-75 m-auto border mt-3 ListItem " >
	<div class=' w-75 '>
			<span class="${task.completed ? 'text-muted text-decoration-line-through' : ''}">${task.title}</span>
			<span class="${task.completed ? 'text-muted text-decoration-line-through' : ''} float-end">Зробити до ${task.date}</span>
			</div>
			<div>
			<input onclick="CompTask(${index})" class="btnComplete" type="checkbox" ${task.completed ? 'checked' : ''}>
			<button onclick="DelTask(${index})" class="btnDelete btn-danger ">Видалити</button>
		</div>
		</li>`
	}
	else{
		return `<li class="lst-group-item d-flex justify-content-between w-75 m-auto border mt-3 ListItem " >
	<div class=' w-75 '>
			<span class="${task.completed ? 'text-muted text-decoration-line-through' : ''}">${task.title}</span>
			<span class="${task.completed ? 'text-muted text-decoration-line-through' : ''} float-end"> ${task.date}</span>
			</div>
			<div>
			<input onclick="CompTask(${index})" class="btnComplete" type="checkbox" ${task.completed ? 'checked' : ''}>
			<button onclick="DelTask(${index})" class="btnDelete btn-danger ">Видалити</button>
		</div>
		</li>`
	}
}

const FillList = () => {
	var dop = 0;
	ToDoList.innerHTML ="";
	if(tasks.length > 0){
		tasks.forEach((item, index) => {
			if(!item.completed){
			ToDoList.innerHTML += createLi(item, index);
			dop++;
		}
		})
		tasks.forEach((item, index) => {
			if(item.completed){
			ToDoList.innerHTML += createLi(item, index);
		}
		})
		AmountLi.textContent = "";
		AmountLi.innerHTML = `${dop}`;
	}

}

FillList();

const updateUl = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

 const CompTask = (id) => {
	tasks[id].completed = !tasks[id].completed;
ApdateList();
}

AddTaskBtn.addEventListener('click', () => {
	if(InputTitle.value == ''){
		alert(`Error`);
	}
	else{
	tasks.push(new Task(InputTitle.value, ThisDate.value));
	ApdateList();
	InputTitle.value = '';ThisDate.value = '';
}
})


const DelTask = (id) => {
	tasks.splice(id, 1);
	ApdateList();
}