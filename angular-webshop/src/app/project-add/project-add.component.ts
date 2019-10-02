import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  newProject: Project = new Project();
  projects: BehaviorSubject<any> = this.ds.projectList;

  constructor (private ds: DataService, private router: Router) {
    this.ds.readTableByQuery('projects', {})
  }

  ngOnInit() {
  }

  async onCreate() {
    if (this.newProject.title) {
      for (let i = 0; i < this.projects.value.length; i++) {
        if (this.projects.value[i].title === this.newProject.title) {
          alert('This title already exists, please write another one!');
          break;
        }
      }
    }
    if (this.newProject.title === undefined || this.newProject.seo === undefined || this.newProject.institution === undefined || this.newProject.shortd === undefined || this.newProject.longd === undefined || this.newProject.contact === undefined || this.newProject.categoryid === undefined || this.newProject.donation === undefined || this.newProject.goal === undefined || this.newProject.balance === undefined || this.newProject.pictureurl === undefined || this.newProject.link === undefined) {
      alert('Please write something to every inputbox')
    } else if (this.newProject.goal == 0 || this.newProject.donation == 0 || this.newProject.balance == 0 || this.newProject.goal < 0 || this.newProject.donation < 0 || this.newProject.balance < 0 || !Number.isInteger(this.newProject.goal) || !Number.isInteger(this.newProject.donation) || !Number.isInteger(this.newProject.balance)) {
      alert('Please write a positive even number, which is not null!')
    } else if (typeof this.newProject.goal !== 'number' || typeof this.newProject.donation !== 'number' || typeof this.newProject.donation !== 'number') {
      alert('Please write a number!')
    } else {
      this.ds.createRecord('projects', this.newProject).subscribe(
        () => this.router.navigate(["/api/projects"])
      )
    }
  }

  onKey(event: any) {
    this.newProject.seo = event.target.value.toString()               // Convert to string
      .normalize('NFD')               // Change diacritics
      .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
      .replace(/\s+/g, '-')            // Change whitespace to dashes
      .toLowerCase()                  // Change to lowercase
      .replace(/&/g, '-and-')          // Replace ampersand
      .replace(/[^a-z0-9\-]/g, '')     // Remove anything that is not a letter, number or dash
      .replace(/-+/g, '-')             // Remove duplicate dashes
      .replace(/^-*/, '')              // Remove starting dashes
      .replace(/-*$/, '');             // Remove trailing dashes
  }
}
