import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TimerComponent } from './components/timer/timer.component';

export const routes: Routes = [
    {
        path: '',
        title: 'To Do List',
        component: TodoListComponent
    },{
        path: 'pomodoro',
        title: 'Pomodoro Timer',
        component: TimerComponent
    }
];
