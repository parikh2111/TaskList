// @ts-nocheck
	// Define UI Vars
	const form = document.querySelector('#task-form');
	const taskList = document.querySelector('.collection');
	const clearBtn = document.querySelector('.clear-tasks');
	const filter = document.querySelector('#filter');
	const taskInput = document.querySelector('#task');

	// Load all event Listeners
	loadEventListeners();

	// Load all event Listeners
	function loadEventListeners() {
		// DOM Load evene
		document.addEventListener('DOMContentLoaded',getTasks);
		// add task event
		form.addEventListener('submit', addTask);
		// Remove task event
		taskList.addEventListener('click',removeTask);

		// Clear  All Tasks
		clearBtn.addEventListener('click',clearTasks);
		
		//Filter Tasks event
		filter.addEventListener('keyup',filterTasks);
	}

	// Get Tasks from Local Storage

	function getTasks(){
		let tasks;
		if(localStorage.getItem('tasks') === null ){
			tasks = [];
		}else{
			tasks = JSON.parse(localStorage.getItem('tasks'));
		}
		tasks.forEach(function(task){

			// Creat Li element
			const li = document.createElement('li');
			// Add Class
			li.className = 'collection-item';
			// create text node and append to li
			li.appendChild(document.createTextNode(task));
			// Create new link element 
			const link = document.createElement('a');
			// Add Class
			link.className = 'delete-item secondary-content';
			// Add icon Html
			link.innerHTML = '<i class = "fa fa-remove"></i>';
			//Append The Link to li
			li.appendChild(link);

			// append li to ul
			taskList.appendChild(li);

		});
	}



	// Add task
	function addTask(e){
		if(taskInput.value === '') {
	   alert('Add a task');
		}

	// Creat Li element
	const li = document.createElement('li');
	// Add Class
	li.className = 'collection-item';
	// create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element 
	const link = document.createElement('a');
	// Add Class
	link.className = 'delete-item secondary-content';
	// Add icon Html
	link.innerHTML = '<i class = "fa fa-remove"></i>';
	//Append The Link to li
	li.appendChild(link);

	// append li to ul
	taskList.appendChild(li);

	//Store in Local Storage
	
	storeTaskInLocaStorage(taskInput.value);	

	// Clear Inpiut
	taskInput.value = '';

	e.preventDefault();
}

// Store Task
function storeTaskInLocaStorage(task){
	let tasks;
	if(localStorage.getItem('tasks') === null ){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks')); 
	}
	tasks.push(task);
	localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Remove Task
function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		
		if(confirm('Are You Sure?')){
			e.target.parentElement.parentElement.remove();

			// Remove form Local Storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);

		}
	}
}

//Remove Task from LS

function removeTaskFromLocalStorage(taskItem){
	let tasks;
	if(localStorage.getItem('tasks') === null ){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks')); 
	}

	tasks.forEach(function(task, index){
		if(taskItem.textContent === task ){
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task
function clearTasks(){
	 //tasklist.innerHTML = '' ;
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}
	// Clear from Local Storage
	clearTasksFromLocalStorage();

}

// Clear Tasks from Local Storage Function

function clearTasksFromLocalStorage (){
	localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
 const text = e.target.value.toLowerCase();
 
 document.querySelectorAll('.collection-item').forEach(function(task){
	 const item = task.firstChild.textContent;
	 if(item.toLowerCase().indexOf(text) != -1){
		 task.style.display = 'block';
	 }else{
		 task.style.display = 'none';
	 }
 });		

}