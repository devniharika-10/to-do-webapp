let taskInput=document.getElementById("taskInput");
let taskDesc=document.getElementById("taskDesc");
let taskDate=document.getElementById("taskDate");

let taskList=document.getElementById("taskList");

let totalTasks=document.getElementById("totalTasks");
let completedTasks=document.getElementById("completedTasks");

/* ENTER KEY ADD TASK */

taskInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){

addTask();

}

});

/* LOAD TASKS */

window.onload=function(){

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

tasks.forEach(task=>createTask(task.text,task.desc,task.date,task.completed));

updateCounter();

};

/* ADD TASK */

function addTask(){

let text=taskInput.value.trim();
let desc=taskDesc.value.trim();
let date=taskDate.value;

if(text==="") return;

createTask(text,desc,date,false);

saveTasks();

taskInput.value="";
taskDesc.value="";
taskDate.value="";

updateCounter();

}

/* CREATE TASK */

function createTask(text,desc,date,completed){

let li=document.createElement("li");

if(completed) li.classList.add("completed");

let taskInfo=document.createElement("div");
taskInfo.className="task-info";

let title=document.createElement("span");
title.textContent=text;

taskInfo.appendChild(title);

/* DESCRIPTION ONLY IF USER ENTERS */

if(desc!==""){

let description=document.createElement("span");

description.className="description";

description.textContent=desc;

taskInfo.appendChild(description);

}

/* DATE */

if(date!==""){

let taskDateEl=document.createElement("span");

taskDateEl.className="date";

taskDateEl.textContent=date;

taskInfo.appendChild(taskDateEl);

}

/* ACTIONS */

let actions=document.createElement("div");
actions.className="actions";

/* COMPLETE */

li.onclick=function(){

li.classList.toggle("completed");

saveTasks();
updateCounter();

};

/* DELETE */

let deleteBtn=document.createElement("button");

deleteBtn.textContent="Delete";

deleteBtn.className="delete";

deleteBtn.onclick=function(e){

e.stopPropagation();

li.remove();

saveTasks();

updateCounter();

};

/* EDIT */

let editBtn=document.createElement("button");

editBtn.textContent="Edit";

editBtn.className="edit";

editBtn.onclick=function(e){

e.stopPropagation();

let newTask=prompt("Edit task:",title.textContent);

if(newTask!==null){

title.textContent=newTask;

saveTasks();

}

};

actions.appendChild(editBtn);
actions.appendChild(deleteBtn);

li.appendChild(taskInfo);
li.appendChild(actions);

taskList.appendChild(li);

}

/* SAVE TASKS */

function saveTasks(){

let tasks=[];

document.querySelectorAll("#taskList li").forEach(li=>{

tasks.push({

text:li.querySelector(".task-info span").textContent,

desc:li.querySelector(".description") ? li.querySelector(".description").textContent : "",

date:li.querySelector(".date") ? li.querySelector(".date").textContent : "",

completed:li.classList.contains("completed")

});

});

localStorage.setItem("tasks",JSON.stringify(tasks));

}

/* FILTER */

function filterTasks(type){

let tasks=document.querySelectorAll("#taskList li");

tasks.forEach(task=>{

if(type==="all"){

task.style.display="flex";

}

else if(type==="completed"){

task.style.display=task.classList.contains("completed") ? "flex":"none";

}

else{

task.style.display=!task.classList.contains("completed") ? "flex":"none";

}

});

}

/* COUNTER */

function updateCounter(){

let tasks=document.querySelectorAll("#taskList li");

let completed=document.querySelectorAll(".completed");

totalTasks.textContent="Total: "+tasks.length;

completedTasks.textContent="Completed: "+completed.length;

}