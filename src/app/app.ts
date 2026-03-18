import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];

  searchTerm: string = '';

  form = {
    nombre: '',
    Entidad: '',
    Email: '',
  };

  editIndex: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/users.json').subscribe(
      (res) => {
        this.users = [...res.rows];
        this.filteredUsers = [...this.users];
      },
      (err) => console.log(err),
    );
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.nombre.toLowerCase().includes(term) ||
        user.Entidad.toLowerCase().includes(term) ||
        user.Email.toLowerCase().includes(term),
    );
  }

  save() {
    if (!this.form.nombre.trim() || !this.form.Entidad.trim() || !this.form.Email.trim()) {
      alert('Todos los campos son obligatorios');
      return;
    }
    if (this.editIndex === null) {
      this.users.push({ ...this.form });
    } else {
      this.users[this.editIndex] = { ...this.form };
      this.editIndex = null;
    }

    this.filteredUsers = [...this.users];
    this.form = { nombre: '', Entidad: '', Email: '' };
  }

  edit(index: number) {
    this.form = { ...this.users[index] };
    this.editIndex = index;
  }

  delete(index: number) {
    this.users.splice(index, 1);
    this.filteredUsers = [...this.users];
  }
}
