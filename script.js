// script.js

document.addEventListener('DOMContentLoaded', () => {
const daysContainer = document.getElementById('days');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const eventDateInput = document.getElementById('event-date');
const eventTitleInput = document.getElementById('event-title');
const addEventBtn = document.getElementById('add-event');
const eventList = document.getElementById('event-list');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const events = JSON.parse(localStorage.getItem('events')) || {};

function renderCalendar() {
daysContainer.innerHTML = '';
monthYear.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

const firstDay = new Date(currentYear, currentMonth, 1).getDay();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

for (let i = 0; i < firstDay; i++) {
daysContainer.innerHTML += '<div></div>';
}

for (let i = 1; i <= daysInMonth; i++) {
const dayDiv = document.createElement('div');
dayDiv.textContent = i;
dayDiv.addEventListener('click', () => displayEvents(new Date(currentYear, currentMonth, i)));
daysContainer.appendChild(dayDiv);
}
}

function displayEvents(date) {
const dateString = date.toISOString().split('T')[0];
const dayEvents = events[dateString] || [];
eventList.innerHTML = '';
dayEvents.forEach(event => {
const li = document.createElement('li');
li.textContent = event;
eventList.appendChild(li);
});
}

function addEvent() {
const date = new Date(eventDateInput.value);
const title = eventTitleInput.value.trim();
if (!date || !title) {
alert('Please enter a valid date and event title.');
return;
}
const dateString = date.toISOString().split('T')[0];
if (!events[dateString]) {
events[dateString] = [];
}
events[dateString].push(title);
localStorage.setItem('events', JSON.stringify(events));
eventTitleInput.value = '';
displayEvents(date);
}

prevMonthBtn.addEventListener('click', () => {
if (currentMonth === 0) {
currentMonth = 11;
currentYear--;
} else {
currentMonth--;
}
renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
if (currentMonth === 11) {
currentMonth = 0;
currentYear++;
} else {
currentMonth++;
}
renderCalendar();
});

addEventBtn.addEventListener('click', addEvent);

renderCalendar();
});
