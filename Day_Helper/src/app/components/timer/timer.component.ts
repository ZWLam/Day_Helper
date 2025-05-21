import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pomodoro-timer',
  imports: [FormsModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  isStarted = true;
  isIdle = false;
  isPaused = true;

  hours : number | undefined = undefined;
  minutes : number | undefined = undefined;
  seconds : number | undefined = undefined;

  //typed as number
  time : number = 0;
  display = '00:00:00';
  interval :  ReturnType<typeof setInterval> | undefined;
  timer_started : boolean = false;

  startTimer() {
    if(!this.timer_started){
      if(this.time == 0){
            if(this.hours != undefined){
              this.time += Number(this.hours! * 3600)  
            }

            if(this.minutes != undefined){
              this.time += Number(this.minutes! * 60)
            } 

            if(this.seconds != undefined){
              this.time += Number(this.seconds!)
            }

            this.prepareDisplay(this.hours ?? 0, this.minutes ?? 0, this.seconds ?? 0)
          }
        

          this.isStarted = false;
          this.isPaused = true;
          this.isIdle = true;

          this.timer_started = true;

          this.interval = setInterval(() => {
          if (this.time === 0) {
              this.resetTimer();
            } else {
              this.time--;
            }

            this.transform(this.time)
          }, 1000);
    }

    
  }

  //this takees in time as numbers but do we really?
  
  transform(value: number): void {
    //issue now is if we want to start from 00
    var sec_num = value; 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
    this.prepareDisplay(hours, minutes, seconds)
  }
  
  private prepareDisplay(hours : number, minutes : number, seconds: number): void{
    //to add a 0 in the front
    var displayHours;
    var displayMinutes;
    var displaySeconds;


    if (hours < 10) {
      displayHours = '0' + hours
    }else if (hours == 0){
      hours = 59;
      displayHours = '0' + hours
    }else{
      displayHours = hours;
    }

    if (minutes < 10) {
      displayMinutes = '0' + minutes
    }else if (minutes == 0){
      minutes = 59;
      displayMinutes = '0' + minutes
    }else{
      displayMinutes = minutes;
    }

    if (seconds < 10) {
      displaySeconds = '0' + seconds
    }else if (seconds == 0){
      seconds = 59;
      displaySeconds = '0' + seconds
    }else{
      displaySeconds = seconds;
    }

    this.display = displayHours +':'+ displayMinutes +':'+ displaySeconds;
  }

  pauseTimer() {
    if(this.timer_started == true){
      clearInterval(this.interval);
      this.isStarted = true;
      this.isPaused = false;
      this.isIdle = true;
      this.timer_started = false;
    }
  }

  resetTimer(){
    this.isStarted = true;
    this.isPaused = true;
    this.isIdle = false;
    
    this.timer_started = false;

    clearInterval(this.interval);
    this.display = '00:00:00';
    this.time = 0;

    this.hours = undefined;
    this.minutes = undefined;
    this.seconds = undefined;
  }

}
