import Dexie, { Table } from 'dexie';

// Define the structure of a Course
export interface ICourse {
  id?: number;
  title: string;
  createdAt: Date;
  content: string; // This could store the AI-generated text
}

export class CourseNanoDB extends Dexie {
  // 'courses' is the table name
  courses!: Table<ICourse>; 

  constructor() {
    super('courseNanoDB'); // Database name
    this.version(1).stores({
      courses: '++id, title, createdAt', // Primary key 'id' auto-increments
    });
  }
}

// Export a single instance of the database
export const db = new CourseNanoDB();