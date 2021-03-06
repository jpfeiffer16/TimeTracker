use rusqlite::Connection;
use chrono::prelude::*;
use super::helpers;
use super::models::day::Day;
use super::models::task::Task;
use super::models::note::Note;
use super::models::category::Category;
use rusqlite::Error;
use std::iter::FromIterator;

fn ensure_schema(db: &String) {
    let conn = get_connection(db);
    conn.execute("CREATE TABLE  IF NOT EXISTS`categories` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);", &[]);
    conn.execute("CREATE TABLE IF NOT EXISTS `days` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `date` DATETIME, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);", &[]);
    conn.execute("CREATE TABLE IF NOT EXISTS `notes` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `title` VARCHAR(255), `text` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `categoryId` INTEGER REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);", &[]);
    conn.execute("CREATE TABLE IF NOT EXISTS `tasks` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255), `time` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `dayId` INTEGER NOT NULL REFERENCES `days` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, synced TINYINT(1));", &[]);
}

pub fn get_days(dateFrom: Option<&String>, dateTo: Option<&String>, db: &String) -> Vec<Day> {
    ensure_schema(db);
    let conn = get_connection(db);
    let mut query = format!(
        "select * from days where {} and {}",
        match dateFrom {
            Some(_dateFrom) => format!("date > '{}'", helpers::get_sqlite_date(_dateFrom.to_string())),
            None => "1=1".to_string()
        },
        match dateTo {
            Some(_dateTo) => format!("date < '{}'", helpers::get_sqlite_date(_dateTo.to_string())),
            None => "1=1".to_string()
        }
    );
    // println!("{}", query);
    let mut stmnt = conn.prepare(&query).unwrap();
    let day_iter = stmnt
        .query_map(&[], |row| {
            let tasks_vec = get_tasks_for_day(row.get(0), db);
            Day {
                id: row.get(0),
                date: Some(helpers::get_iso_date(row.get(1))),
                created_at: Some(helpers::get_iso_date(row.get(2))),
                updated_at: Some(helpers::get_iso_date(row.get(3))),
                tasks: tasks_vec,
            }
        })
        .unwrap();
    let mut final_result = Vec::new();
    for day_result in day_iter {
        final_result.push(day_result.unwrap());
    }
    final_result
}

pub fn get_day(id: i64, db: &String) -> Day {
    ensure_schema(db);
    let conn = get_connection(db);    
    let mut stmnt = conn.prepare(&format!("select * from days where id = {}", id)).unwrap();
    let mut day_iter = stmnt
        .query_map(&[], |row| {
            let tasks_vec = get_tasks_for_day(row.get(0), db);
            Day {
                id: row.get(0),
                date: Some(helpers::get_iso_date(row.get(1))),
                created_at: Some(helpers::get_iso_date(row.get(2))),
                updated_at: Some(helpers::get_iso_date(row.get(3))),
                tasks: tasks_vec,
            }
        })
        .unwrap();
    day_iter.nth(0).unwrap().unwrap()
}

pub fn save_day(day: Day, db: &String) -> Result<i64, ()> {
    ensure_schema(db);
    let conn = get_connection(db);
    let mut query;
    match day.id {
        Some(id) => query = format!(
            "UPDATE days SET date='{}',updatedAt='{}' WHERE (id = {})",
            helpers::get_sqlite_date(day.date.unwrap()),
            //TODO: Fix this, we need to actually update the timestamp
            Local::now(),
            id
        ),
        None => query = format!(
            "INSERT INTO days (date, createdAt, updatedAt) VALUES ('{}', '{}', '{}')",
            helpers::get_sqlite_date(day.date.unwrap()),
            Local::now(),
            Local::now()
            //TODO: Fix this, we need to actually update the timestamp
            // day.updated_at,
        )
    }
    println!("{}", query);
    conn.execute(&query, &[]);
    let last_row = conn.last_insert_rowid();
    for task in day.tasks {
        save_task(task, match day.id { Some(id) => id, None => last_row }, db);
    }
    Ok(match day.id {
        Some(id) => id,
        None => last_row
    })
}

pub fn remove_day(id: i64, db: &String) {
    ensure_schema(db);
    let conn = get_connection(db);
    conn.execute(&format!(
        "delete from tasks where dayId = {}",
        id
    ), &[]);
    conn.execute(&format!(
        "delete from days where id = {}",
        id
    ), &[]);
}

pub fn save_task(task:Task, day_id: i64, db: &String) -> Result<(), ()> {
    ensure_schema(db);
    let conn = get_connection(db);
    let mut query;
    println!("{:?}", task);
    match (task.id) {
        Some(id) => query = format!(
            "UPDATE tasks SET description='{}',time={},dayId={},updatedAt='{}' WHERE (id = {})",
            task.description.unwrap(),
            task.time.unwrap(),
            day_id,
            Local::now(),
            id
        ),
        None => query = format!(
            "INSERT INTO tasks (description, time, dayId, createdAt, updatedAt) VALUES ('{}', {}, {}, '{}', '{}')",
            task.description.unwrap(),
            task.time.unwrap(),
            day_id,
            Local::now(),
            Local::now()
        )
    }
    println!("{}", query);
    conn.execute(&query, &[]);
    Ok(())
}

pub fn remove_task(id: i64, db: &String) {
    ensure_schema(db);
    let conn = get_connection(db);
    conn.execute(&format!(
        "delete from tasks where id = {}",
        id
    ), &[]);
}

pub fn get_tasks_for_day(day_id: i64, db: &String) -> Vec<Task> {
    ensure_schema(db);
    let conn = get_connection(db);
    let mut task_stmnt =
        conn.prepare(&format!("select * from tasks where dayId = {}", day_id))
            .unwrap();
    let task_iter = task_stmnt
        .query_map(&[], |row| Task {
            id: row.get(0),
            description: row.get(1),
            time: row.get(2),
            created_at: Some(helpers::get_iso_date(row.get(3))),
            updated_at: Some(helpers::get_iso_date(row.get(4))),
            day_id: row.get(5),
            synced: row.get(6),
        })
        .unwrap();
    let mut final_task_vec = Vec::new();
    for task in task_iter {
        final_task_vec.push(task.unwrap());
    }
    final_task_vec
}


pub fn get_notes(db: &String) -> Vec<Note> {
    ensure_schema(db);    
    let conn = get_connection(db);
    let mut task_stmnt =
        conn.prepare("select * from notes")
            .unwrap();
    let iter = task_stmnt
        .query_map(&[], |row| Note {
            id: row.get(0),
            title: row.get(1),
            text: row.get(2),
            created_at: row.get(3),            
            updated_at: row.get(4),
            category_id: row.get(5)
        })
        .unwrap();
    let mut final_vec = Vec::new();
    for row in iter {
        final_vec.push(row.unwrap());
    }
    final_vec
}

pub fn get_note(id: i64,db: &String) -> Result<Note, Error> {
    ensure_schema(db);
    let conn = get_connection(db);
    let mut task_stmnt =
        conn.prepare(&format!("select * from notes where id = {}", id))
            .unwrap();
    let mut result = task_stmnt
        .query_map(&[], |row| Note {
            id: row.get(0),
            title: row.get(1),
            text: row.get(2),
            created_at: row.get(3),
            updated_at: row.get(4),
            category_id: row.get(5)
        }).unwrap();
    result.nth(0).unwrap()
}

pub fn save_note(note: Note, db: &String) -> Result<i64, ()> {
    ensure_schema(db);
    let conn = get_connection(db);
    let mut query;

    match note.id {
        Some(id) => query = format!(
            "UDATE notes SET title='{}', text='{}', updatedAt='{}' categoryId='{}' WHERE id={}",
            note.title.unwrap(),
            note.text.unwrap(),
            note.category_id.unwrap(),
            Local::now(),
            id
        ),
        None => query = format!(
            "INSERT INTO notes (title, text, updatedAt, createdAt, categoryId) VALUES ('{}', '{}', '{}', '{}', '{}')",
            note.title.unwrap(),
            note.text.unwrap(),
            note.category_id.unwrap(),            
            Local::now(),
            Local::now()
        )
    }

    println!("{}", query);
    
    conn.execute(&query, &[]);
    
    match note.id {
        Some(id) => Ok(id),
        None => Ok(conn.last_insert_rowid())
    }
}

pub fn get_categories(db: &String) -> Result<Vec<Category>, Error>{
    ensure_schema(db);
    let conn = get_connection(db);
    let mut stmnt = conn.prepare("SELECT * FROM categories").unwrap();
    let itr = stmnt.query_map(&[], |row| {
        Category {
            id: row.get(0),
            name: row.get(1),
            created_at: row.get(2),
            updated_at: row.get(3)
        }
    }).unwrap();
    let mut final_vec = Vec::new();
    for row in itr {
        final_vec.push(row.unwrap());
    }
    Ok(final_vec)
}

pub fn get_category(id: i64, db: &String) -> Result<Category, Error> {
    ensure_schema(db);
    let conn = get_connection(db);
    let mut task_stmnt =
        conn.prepare(&format!("select * from categories where id = {}", id))
            .unwrap();
    let mut result = task_stmnt
        .query_map(&[], |row| Category {
            id: row.get(0),
            name: row.get(1),
            created_at: row.get(2),           
            updated_at: row.get(3)
        }).unwrap();
    Ok(result.nth(0).unwrap().unwrap())
}

pub fn remove_category(id: i64, db: &String) {
    ensure_schema(db);
    let conn = get_connection(db);    
    let query = format!("delete from categories where id = {}", id);
    conn.execute(&query, &[]);
}

pub fn save_category(category: Category, db: &String) -> Result<i64, ()> {
    ensure_schema(db);
    let conn = get_connection(db);

    let mut query;

    match category.id {
        Some(id) => query = format!(
            "UDATE categories SET name='{}', updatedAt='{}' WHERE id={}",
            category.name.unwrap(),
            Local::now(),
            id
        ),
        None => query = format!(
            "INSERT INTO categories (name, updatedAt, createdAt) VALUES ('{}', '{}', '{}')",
            category.name.unwrap(),
            Local::now(),
            Local::now()
        )
    }

    conn.execute(&query, &[]);
    
    match category.id {
        Some(id) => Ok(id),
        None => Ok(conn.last_insert_rowid())
    }
}

pub fn remove_note(id: i64, db: &String) {
    ensure_schema(db);
    let conn = get_connection(db);
    conn.execute(&format!(
        "delete from notes where id = {}",
        id
    ), &[]);
}

fn get_connection(path: &String) -> Connection {
    Connection::open(path).unwrap()
}
