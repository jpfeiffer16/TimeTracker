use rusqlite::Connection;
use super::helpers;
use super::models::day::Day;
use super::models::task::Task;

pub fn get_days(dateFrom: Option<&String>, dateTo: Option<&String>) -> Vec<Day> {
    let conn = Connection::open("../data.sqlite").unwrap();
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
            let tasks_vec = get_tasks_for_day(row.get(0));
            Day {
                id: row.get(0),
                date: helpers::get_iso_date(row.get(1)),
                created_at: helpers::get_iso_date(row.get(2)),
                updated_at: helpers::get_iso_date(row.get(3)),
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

pub fn get_day(id: i64) -> Day {
    let conn = Connection::open("../data.sqlite").unwrap();    
    let mut stmnt = conn.prepare(&format!("select * from days where id = {}", id)).unwrap();
    let mut day_iter = stmnt
        .query_map(&[], |row| {
            let tasks_vec = get_tasks_for_day(row.get(0));
            Day {
                id: row.get(0),
                date: helpers::get_iso_date(row.get(1)),
                created_at: helpers::get_iso_date(row.get(2)),
                updated_at: helpers::get_iso_date(row.get(3)),
                tasks: tasks_vec,
            }
        })
        .unwrap();
    day_iter.nth(0).unwrap().unwrap()
}

pub fn save_day(day: Day) -> Result {
    
}

pub fn get_tasks_for_day(day_id: i64) -> Vec<Task> {
    let conn = Connection::open("../data.sqlite").unwrap();
    let mut task_stmnt =
        conn.prepare(&format!("select * from tasks where dayId = {}", day_id))
            .unwrap();
    let task_iter = task_stmnt
        .query_map(&[], |task_row| Task {
            id: task_row.get(0),
            description: task_row.get(1),
            time: task_row.get(2),
            created_at: helpers::get_iso_date(task_row.get(3)),
            updated_at: helpers::get_iso_date(task_row.get(4)),
            day_id: task_row.get(5),
            synced: task_row.get(6),
        })
        .unwrap();
    let mut final_task_vec = Vec::new();
    for task in task_iter {
        final_task_vec.push(task.unwrap());
    }
    final_task_vec
}