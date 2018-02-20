use rusqlite::Connection;
use rocket_contrib::{Json, Value};
use super::super::helpers as helpers;

#[post("/", format = "application/json")]
pub fn get_days() -> Json<Vec<super::super::models::day::Day>> {
    let conn = Connection::open("../data.sqlite").unwrap();
    let mut stmnt = conn.prepare("select * from days").unwrap();
    let day_iter = stmnt.query_map(&[], |row| {
        let id_string: i64 = row.get(0);
        println!("{}", &format!("select * from tasks where dayId = {}", id_string));
        let mut task_stmnt = conn.prepare(&format!("select * from tasks where dayId = {}", id_string)).unwrap();
        let task_iter = task_stmnt.query_map(&[], |task_row| {
            super::super::models::task::Task {
                id: task_row.get(0),
                description: task_row.get(1),
                time: task_row.get(2),
                created_at: helpers::get_iso_date(task_row.get(3)),
                updated_at: helpers::get_iso_date(task_row.get(4)),
                day_id: task_row.get(5),
                synced: task_row.get(6)
            }
        }).unwrap();
        let mut final_task_vec = Vec::new();
        for task in task_iter {
            final_task_vec.push(task.unwrap());
        }
        super::super::models::day::Day {
            id: row.get(0),
            date: helpers::get_iso_date(row.get(1)),
            created_at: helpers::get_iso_date(row.get(2)),
            updated_at: helpers::get_iso_date(row.get(3)),
            tasks: final_task_vec
        }
    }).unwrap();
    let mut final_result = Vec::new();
    for day_result in day_iter {
        final_result.push(day_result.unwrap());
    }
    Json(final_result)
}
