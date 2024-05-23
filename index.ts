import inquirer from "inquirer";
import chalk from "chalk"; // Importing Chalk for colorful output

class Student {
  static counter = 1000;
  id: number;
  name: string;
  course: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.course = [];
    this.balance = 100;
  }

  enroll_course(course: string) {
    this.course.push(course);
  }

  view_balance() {
    console.log(chalk.blue(`Balance for ${this.name} : ${this.balance}`));
  }

  pay_fee(amount: number) {
    this.balance -= amount;
    console.log(chalk.green(`${amount} fees paid Successfully ${this.name}`));
  }

  show_status() {
    console.log(chalk.yellow(`ID : ${this.id}`));
    console.log(chalk.yellow(`NAME : ${this.name}`));
    console.log(chalk.yellow(`COURSE : ${this.course}`));
    console.log(chalk.yellow(`BALANCE : ${this.balance}`));
  }
}

class Student_manager {
  students: Student[];

  constructor() {
    this.students = [];
  }

  add_student(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(
      chalk.green(
        `Student : ${name} added Successfully. Student ID ${student.id}`
      )
    );
  }

  enroll_student(student_id: number, course: string) {
    let student = this.find_student(student_id);

    if (student) {
      student.enroll_course(course);
      console.log(
        chalk.green(`${student.name} Enrolled in ${course} Successfully`)
      );
    }
  }

  view_student_balance(student_id: number) {
    let student = this.find_student(student_id);

    if (student) {
      student.view_balance();
    } else {
      console.log(chalk.red("STUDENT NOT FOUND. PLEASE ENTER A CORRECT STUDENT ID"));
    }
  }
  pay_student_fees(student_id: number, amount: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.pay_fee(amount);
    } else {
      console.log(chalk.red("STUDENT NOT FOUND. PLEASE ENTER THE CORRECT ID"));
    }
  }

  show_students_status(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.show_status();
    }
  }

  find_student(student_id: number) {
    return this.students.find((std) => std.id === student_id);
  }
}

async function main() {
  console.log(chalk.cyan("WELCOME TO STUDENT MANAGEMENT SYSTEM"));
  console.log(chalk.cyan("-".repeat(50)));

  let student_manager = new Student_manager();

  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option",
        choices: [
          chalk.magenta("Add Student"),
          chalk.magenta("Enroll Student"),
          chalk.magenta("View Student Balance"),
          chalk.magenta("Pay Fees"),
          chalk.magenta("Student Status"),
          chalk.red("Exit"),
        ],
      },
    ]);
    switch (choice.choice) {
      case chalk.magenta("Add Student"):
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: chalk.yellow("Enter the Student Name"),
          },
        ]);
        student_manager.add_student(name_input.name);
        break;

      case chalk.magenta("Enroll Student"):
        let course_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: chalk.yellow("Enter a Student ID"),
          },
          {
            name: "course",
            type: "input",
            message: chalk.yellow("Enter the course Name"),
          },
        ]);
        student_manager.enroll_student(
          course_input.student_id,
          course_input.course
        );
        break;

      case chalk.magenta("View Student Balance"):
        let balance_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: chalk.yellow("Enter a Student ID"),
          },
        ]);
        student_manager.view_student_balance(balance_input.student_id);
        break;

      case chalk.magenta("Pay Fees"):
        let fees_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: chalk.yellow("Enter a Student ID"),
          },
          {
            name: "amount",
            type: "number",
            message: chalk.yellow("Enter the Amount to pay"),
          },
        ]);
        student_manager.pay_student_fees(
          fees_input.student_id,
          fees_input.amount
        );
        break;

      case chalk.magenta("Student Status"):
        let status_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: chalk.yellow("Enter a Student ID"),
          },
        ]);
        student_manager.show_students_status(status_input.student_id);
        break;

      case chalk.red("Exit"):
        console.log(chalk.yellow("Exiting..........."));
        process.exit();
    }
  }
}
main();
